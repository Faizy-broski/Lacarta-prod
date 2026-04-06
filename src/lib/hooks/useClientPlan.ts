'use client'

/**
 * useClientPlan
 *
 * Fetches all listing subscriptions for the current client and returns
 * the highest active tier they have across all their listings.
 *
 * Used to gate dashboard module actions (Submit Deal, Submit Event) on
 * the My Listings page.
 */

import { useEffect, useState } from 'react'
import { fetchClientListingSubscriptions } from '@/lib/services/subscriptions.service'
import type { PlanTier } from '@/lib/constants/plan-features'

const TIER_ORDER: PlanTier[] = ['free', 'standard', 'premium', 'elite']

interface UseClientPlanResult {
  /** Highest active tier this client has across any of their listings */
  highestTier: PlanTier
  /** IDs of listings at or above the given required tier */
  listingIdsAtTier: (requiredTier: PlanTier) => string[]
  /** Whether the client has at least one listing at or above the required tier */
  hasAnyListingAt: (requiredTier: PlanTier) => boolean
  isLoading: boolean
}

export function useClientPlan(
  clientId: string | null | undefined,
  role: string
): UseClientPlanResult {
  const [subs, setSubs] = useState<{ listing_id: string; tier_name: PlanTier; status: string }[]>([])
  const [isLoading, setIsLoading] = useState(false)

  // Staff bypass — they always have full access
  const isStaff = ['owner', 'admin', 'assistant'].includes(role)

  useEffect(() => {
    if (isStaff || !clientId) return
    setIsLoading(true)
    fetchClientListingSubscriptions(clientId).then((data) => {
      setSubs(data.map((s) => ({ listing_id: s.listing_id, tier_name: s.tier_name, status: s.status })))
      setIsLoading(false)
    })
  }, [clientId, isStaff])

  const activeSubs = subs.filter((s) => s.status === 'active')

  const highestTier: PlanTier = isStaff
    ? 'elite'
    : activeSubs.reduce<PlanTier>((best, s) => {
        return TIER_ORDER.indexOf(s.tier_name) > TIER_ORDER.indexOf(best)
          ? s.tier_name
          : best
      }, 'free')

  const listingIdsAtTier = (requiredTier: PlanTier): string[] => {
    if (isStaff) return activeSubs.map((s) => s.listing_id)
    const reqIdx = TIER_ORDER.indexOf(requiredTier)
    return activeSubs
      .filter((s) => TIER_ORDER.indexOf(s.tier_name) >= reqIdx)
      .map((s) => s.listing_id)
  }

  const hasAnyListingAt = (requiredTier: PlanTier): boolean => {
    if (isStaff) return true
    return TIER_ORDER.indexOf(highestTier) >= TIER_ORDER.indexOf(requiredTier)
  }

  return { highestTier, listingIdsAtTier, hasAnyListingAt, isLoading }
}
