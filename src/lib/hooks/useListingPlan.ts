/**
 * useListingPlan.ts
 *
 * React hook that resolves the active subscription tier for a listing
 * and exposes a hasFeature() check function.
 *
 * Admin / Owner / Assistant roles bypass all gates — hasFeature always returns true.
 *
 * Usage:
 *   const { hasFeature, tier, isLoading } = useListingPlan(listingId, categoryGroup, userRole)
 *   {hasFeature('gallery') && <PhotoGallerySection />}
 */

'use client'

import { useEffect, useState, useCallback } from 'react'
import { fetchListingSubscription } from '@/lib/services/subscriptions.service'
import {
  PLAN_FEATURES,
  getCategoryGroup,
  type CategoryGroup,
  type FeatureSlug,
  type PlanTier,
} from '@/lib/constants/plan-features'

// ─── Staff roles that bypass all plan gates ───────────────────────────────────

const STAFF_ROLES = ['owner', 'admin', 'assistant']

// ─── Hook ─────────────────────────────────────────────────────────────────────

interface UseListingPlanResult {
  /** Current tier of this listing. 'free' if no subscription record. */
  tier: PlanTier
  /** Returns true if the feature is accessible at the current tier. */
  hasFeature: (slug: FeatureSlug) => boolean
  /** True while the subscription is being fetched. */
  isLoading: boolean
}

/**
 * @param listingId - UUID of the listing. Pass '' for new (unsaved) listings.
 * @param categoryName - Raw category name string (e.g. 'Hotels', 'Real Estate').
 * @param userRole - Current user's role string. Staff bypass all gates.
 */
export function useListingPlan(
  listingId: string | null | undefined,
  categoryName: string,
  userRole: string
): UseListingPlanResult {
  const [tier, setTier] = useState<PlanTier>('free')
  const [isLoading, setIsLoading] = useState(false)

  const isStaff = STAFF_ROLES.includes(userRole)
  const categoryGroup: CategoryGroup = getCategoryGroup(categoryName)

  useEffect(() => {
    // Staff bypass — no need to fetch
    if (isStaff) {
      setTier('elite')  // staff sees everything
      return
    }

    // New listing (no id yet) defaults to Free
    if (!listingId) {
      setTier('free')
      return
    }

    setIsLoading(true)
    fetchListingSubscription(listingId).then((sub) => {
      setTier(sub?.status === 'active' ? (sub.tier_name ?? 'free') : 'free')
      setIsLoading(false)
    })
  }, [listingId, isStaff])

  const hasFeature = useCallback(
    (slug: FeatureSlug): boolean => {
      if (isStaff) return true
      return PLAN_FEATURES[categoryGroup]?.[tier]?.has(slug) ?? false
    },
    [isStaff, categoryGroup, tier]
  )

  return { tier, hasFeature, isLoading }
}
