import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { createClient } from '@supabase/supabase-js'

// ─── Clients ────────────────────────────────────────────────────────────────────

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-05-28.basil',
})

// Service-role client — bypasses RLS for server-side writes
function getServiceClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY!
  if (!key) throw new Error('SUPABASE_SERVICE_ROLE_KEY not set')
  return createClient(url, key)
}

// ─── Helpers ────────────────────────────────────────────────────────────────────

async function resolveTierId(supabase: ReturnType<typeof createClient>, tierName: string) {
  const { data } = await supabase
    .from('subscription_tiers')
    .select('id')
    .ilike('name', tierName)
    .single()
  return data?.id as string | undefined
}

async function upsertSubscription(
  supabase: ReturnType<typeof createClient>,
  params: {
    listingId: string
    tierId: string
    billingPeriod: string
    status: string
    stripeSubscriptionId: string
    stripeCustomerId: string
    currentPeriodStart: Date | null
    currentPeriodEnd: Date | null
  }
) {
  const { error } = await supabase.from('listing_subscriptions').upsert(
    {
      listing_id: params.listingId,
      tier_id: params.tierId,
      billing_period: params.billingPeriod,
      status: params.status,
      stripe_subscription_id: params.stripeSubscriptionId,
      stripe_customer_id: params.stripeCustomerId,
      current_period_start: params.currentPeriodStart?.toISOString() ?? null,
      current_period_end: params.currentPeriodEnd?.toISOString() ?? null,
      updated_at: new Date().toISOString(),
    },
    { onConflict: 'listing_id' }
  )
  if (error) throw new Error(`upsert failed: ${error.message}`)
}

// ─── POST /api/stripe/webhook ───────────────────────────────────────────────────

export async function POST(req: NextRequest) {
  const body = await req.text()
  const sig = req.headers.get('stripe-signature')

  if (!sig) {
    return NextResponse.json({ error: 'Missing stripe-signature' }, { status: 400 })
  }

  let event: Stripe.Event
  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!)
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Webhook verification failed'
    console.error('[stripe/webhook] verification failed:', message)
    return NextResponse.json({ error: message }, { status: 400 })
  }

  try {
    const supabase = getServiceClient()

    switch (event.type) {
      // ── Checkout completed → subscription created ─────────────────────────
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session
        if (session.mode !== 'subscription') break

        const meta = session.metadata ?? {}
        const listingId = meta.listingId
        const tier = meta.tier
        const billingPeriod = meta.billingPeriod ?? 'monthly'

        if (!listingId || !tier) {
          console.error('[stripe/webhook] checkout.session.completed: missing metadata', meta)
          break
        }

        const tierId = await resolveTierId(supabase, tier)
        if (!tierId) {
          console.error('[stripe/webhook] could not resolve tier_id for tier:', tier)
          break
        }

        // Retrieve the subscription to get period dates
        const subId = session.subscription as string
        const sub = await stripe.subscriptions.retrieve(subId)

        await upsertSubscription(supabase, {
          listingId,
          tierId,
          billingPeriod,
          status: 'active',
          stripeSubscriptionId: subId,
          stripeCustomerId: session.customer as string,
          currentPeriodStart: new Date(sub.current_period_start * 1000),
          currentPeriodEnd: new Date(sub.current_period_end * 1000),
        })
        break
      }

      // ── Subscription updated (upgrade/downgrade/renewal) ──────────────────
      case 'customer.subscription.updated': {
        const sub = event.data.object as Stripe.Subscription
        const meta = sub.metadata ?? {}
        const listingId = meta.listingId
        const tier = meta.tier
        const billingPeriod = meta.billingPeriod ?? 'monthly'

        if (!listingId || !tier) break

        const tierId = await resolveTierId(supabase, tier)
        if (!tierId) break

        const status = sub.status === 'active' ? 'active'
          : sub.status === 'past_due' ? 'past_due'
          : 'inactive'

        await upsertSubscription(supabase, {
          listingId,
          tierId,
          billingPeriod,
          status,
          stripeSubscriptionId: sub.id,
          stripeCustomerId: sub.customer as string,
          currentPeriodStart: new Date(sub.current_period_start * 1000),
          currentPeriodEnd: new Date(sub.current_period_end * 1000),
        })
        break
      }

      // ── Subscription cancelled / deleted ──────────────────────────────────
      case 'customer.subscription.deleted': {
        const sub = event.data.object as Stripe.Subscription
        const meta = sub.metadata ?? {}
        const listingId = meta.listingId

        if (!listingId) break

        // Mark as inactive; keep the row for history
        const { error } = await supabase
          .from('listing_subscriptions')
          .update({ status: 'inactive', updated_at: new Date().toISOString() })
          .eq('listing_id', listingId)

        if (error) console.error('[stripe/webhook] cancel update failed:', error.message)
        break
      }

      default:
        // Unhandled event types — ignore
        break
    }
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Handler error'
    console.error('[stripe/webhook] handler error:', message)
    return NextResponse.json({ error: message }, { status: 500 })
  }

  return NextResponse.json({ received: true })
}
