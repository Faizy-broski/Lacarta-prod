/**
 * subscriptions.service.ts
 *
 * Fetch and upsert listing subscription records from the
 * listing_subscriptions table. Used by useListingPlan hook
 * and by the Stripe webhook handler.
 */

import { supabase } from '@/lib/supabase'
import type { PlanTier } from '@/lib/constants/plan-features'

// ─── Types ────────────────────────────────────────────────────────────────────

export interface ListingSubscription {
  id: string
  listing_id: string
  tier_id: string
  tier_name: PlanTier        // joined from subscription_tiers
  billing_period: 'monthly' | 'yearly'
  status: 'active' | 'expired' | 'cancelled' | 'trialing'
  stripe_subscription_id: string | null
  stripe_customer_id: string | null
  current_period_start: string | null
  current_period_end: string | null
  created_at: string
  updated_at: string
}

export interface UpsertSubscriptionInput {
  listing_id: string
  tier_name: PlanTier
  billing_period?: 'monthly' | 'yearly'
  status?: 'active' | 'expired' | 'cancelled' | 'trialing'
  stripe_subscription_id?: string
  stripe_customer_id?: string
  current_period_start?: string
  current_period_end?: string
}

// ─── Fetch ────────────────────────────────────────────────────────────────────

/**
 * Fetch the active subscription for a listing.
 * Returns null if no subscription record exists (= Free tier).
 */
export async function fetchListingSubscription(
  listingId: string
): Promise<ListingSubscription | null> {
  const { data, error } = await supabase
    .from('listing_subscriptions')
    .select(`
      id, listing_id, tier_id, billing_period, status,
      stripe_subscription_id, stripe_customer_id,
      current_period_start, current_period_end,
      created_at, updated_at,
      subscription_tiers ( name )
    `)
    .eq('listing_id', listingId)
    .single()

  if (error) {
    if (error.code === 'PGRST116') return null  // no rows — Free tier
    console.error('[subscriptions.service] fetchListingSubscription:', error.message)
    return null
  }

  const row = data as Record<string, unknown> & {
    subscription_tiers: { name: string }
  }

  return {
    ...row,
    tier_name: (row.subscription_tiers?.name?.toLowerCase() ?? 'free') as PlanTier,
  } as ListingSubscription
}

/**
 * Fetch subscriptions for all listings owned by a client.
 * Used in the Subscriptions dashboard page.
 */
export async function fetchClientListingSubscriptions(
  clientId: string
): Promise<(ListingSubscription & { listing_title: string; listing_cover: string | null })[]> {
  const { data, error } = await supabase
    .from('listing_subscriptions')
    .select(`
      id, listing_id, tier_id, billing_period, status,
      stripe_subscription_id, stripe_customer_id,
      current_period_start, current_period_end,
      created_at, updated_at,
      subscription_tiers ( name ),
      listings!inner ( title, cover_image, client_id )
    `)
    .eq('listings.client_id', clientId)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('[subscriptions.service] fetchClientListingSubscriptions:', error.message)
    return []
  }

  return (data ?? []).map((row: Record<string, unknown> & {
    subscription_tiers: { name: string }
    listings: { title: string; cover_image: string | null }
  }) => ({
    ...row,
    tier_name: (row.subscription_tiers?.name?.toLowerCase() ?? 'free') as PlanTier,
    listing_title: row.listings?.title ?? '',
    listing_cover: row.listings?.cover_image ?? null,
  })) as (ListingSubscription & { listing_title: string; listing_cover: string | null })[]
}

// ─── Upsert (server-side / Stripe webhook) ───────────────────────────────────

/**
 * Upsert a listing subscription. Resolves tier_name to tier_id automatically.
 * Should only be called from server-side code (API routes, webhooks).
 */
export async function upsertListingSubscription(
  input: UpsertSubscriptionInput
): Promise<{ success: boolean; error?: string }> {
  // Resolve tier_id from tier_name
  const { data: tierRow, error: tierError } = await supabase
    .from('subscription_tiers')
    .select('id')
    .ilike('name', input.tier_name)
    .single()

  if (tierError || !tierRow) {
    return { success: false, error: `Tier not found: ${input.tier_name}` }
  }

  const { error } = await supabase
    .from('listing_subscriptions')
    .upsert(
      {
        listing_id: input.listing_id,
        tier_id: tierRow.id,
        billing_period: input.billing_period ?? 'monthly',
        status: input.status ?? 'active',
        stripe_subscription_id: input.stripe_subscription_id ?? null,
        stripe_customer_id: input.stripe_customer_id ?? null,
        current_period_start: input.current_period_start ?? null,
        current_period_end: input.current_period_end ?? null,
      },
      { onConflict: 'listing_id' }
    )

  if (error) {
    console.error('[subscriptions.service] upsertListingSubscription:', error.message)
    return { success: false, error: error.message }
  }

  return { success: true }
}

/**
 * Cancel a listing subscription (sets status = 'cancelled').
 */
export async function cancelListingSubscription(
  listingId: string
): Promise<{ success: boolean; error?: string }> {
  const { error } = await supabase
    .from('listing_subscriptions')
    .update({ status: 'cancelled' })
    .eq('listing_id', listingId)

  if (error) {
    return { success: false, error: error.message }
  }
  return { success: true }
}
