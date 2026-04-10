import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

export const dynamic = 'force-dynamic'

// ─── Stripe client (lazy) ──────────────────────────────────────────────────────

let _stripe: Stripe | null = null
function getStripe(): Stripe {
  if (!_stripe) {
    _stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
      apiVersion: '2025-05-28.basil',
    })
  }
  return _stripe
}

// ─── Price ID lookup ───────────────────────────────────────────────────────────

type PriceTier = 'standard' | 'premium' | 'elite'
type BillingPeriod = 'monthly' | 'yearly'
type PriceGroup = 'A' | 'B'

function getPriceId(tier: PriceTier, period: BillingPeriod, group: PriceGroup): string {
  const key = `STRIPE_PRICE_${tier.toUpperCase()}_${period.toUpperCase()}_${group}` as keyof NodeJS.ProcessEnv
  const priceId = process.env[key]
  if (!priceId || priceId === 'price_REPLACE_ME') {
    throw new Error(`Stripe price ID not configured: ${key}`)
  }
  return priceId
}

// ─── Category → Price Group mapping ───────────────────────────────────────────

function getCategoryGroup(categoryName: string): PriceGroup {
  const name = categoryName.toLowerCase()
  if (
    name.includes('gastronom') ||
    name.includes('nightlife') ||
    name.includes('activit') ||
    name.includes('boating') ||
    name.includes('pool') ||
    name.includes('beach') && !name.includes('resort')
  ) {
    return 'B'
  }
  return 'A'
}

// ─── POST /api/stripe/checkout ─────────────────────────────────────────────────

export interface CheckoutRequestBody {
  listingId: string
  listingTitle: string
  categoryName: string
  tier: PriceTier
  billingPeriod: BillingPeriod
  clientEmail: string
  clientId: string
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as CheckoutRequestBody
    const { listingId, listingTitle, categoryName, tier, billingPeriod, clientEmail, clientId } = body

    if (!listingId || !tier || !billingPeriod || !clientEmail || !clientId) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    if (tier === 'free' as string) {
      return NextResponse.json({ error: 'Cannot checkout for Free tier' }, { status: 400 })
    }

    const group = getCategoryGroup(categoryName)
    const priceId = getPriceId(tier, billingPeriod, group)
    const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000'

    const session = await getStripe().checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card'],
      customer_email: clientEmail,
      line_items: [{ price: priceId, quantity: 1 }],
      metadata: {
        listingId,
        listingTitle,
        tier,
        billingPeriod,
        clientId,
        categoryName,
      },
      subscription_data: {
        metadata: {
          listingId,
          tier,
          billingPeriod,
          clientId,
        },
      },
      success_url: `${appUrl}/dashboard/subscriptions?success=1&listing=${listingId}`,
      cancel_url: `${appUrl}/dashboard/subscriptions?cancelled=1&listing=${listingId}`,
    })

    return NextResponse.json({ url: session.url })
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Internal error'
    console.error('[stripe/checkout]', message)
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
