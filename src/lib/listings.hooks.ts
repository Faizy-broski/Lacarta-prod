'use client'

/**
 * listings.hooks.ts
 *
 * React hooks for fetching listing data in Client Components.
 * Do NOT import this in Server Components — use listings.service.ts instead.
 */

import { useEffect, useState } from 'react'
import {
  fetchPublicListings,
  fetchListingBySlug,
  fetchFeaturedListings,
  fetchNearbyListings,
  type ListingCategory,
  type PublicListing,
  type PortalListing,
} from '@/lib/listings.service'

// ─── React hooks ─────────────────────────────────────────────────────────────

interface UsePublicListingsResult {
  listings: PublicListing[]
  loading: boolean
  error: string | null
}

/**
 * Hook: fetch published listings for a category.
 *
 * @example
 *   const { listings, loading } = usePublicListings('hotel')
 */
export function usePublicListings(
  category: ListingCategory,
  limit = 50
): UsePublicListingsResult {
  const [listings, setListings] = useState<PublicListing[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    setLoading(true)

    fetchPublicListings(category, limit).then((data) => {
      if (!cancelled) {
        setListings(data)
        setError(data.length === 0 ? 'No listings found' : null)
        setLoading(false)
      }
    })

    return () => {
      cancelled = true
    }
  }, [category, limit])

  return { listings, loading, error }
}

/**
 * Hook: fetch a single listing by slug.
 *
 * @example
 *   const { listing, loading } = useListing('sofitel-legend-santa-clara')
 */
export function useListing(slug: string) {
  const [listing, setListing] = useState<PublicListing | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!slug) {
      setListing(null)
      setError(null)
      setLoading(false)
      return
    }

    let cancelled = false
    setLoading(true)

    fetchListingBySlug(slug).then((data) => {
      if (!cancelled) {
        setListing(data)
        setError(data ? null : 'Listing not found')
        setLoading(false)
      }
    })

    return () => {
      cancelled = true
    }
  }, [slug])

  return { listing, loading, error }
}

/**
 * Hook: fetch featured listings for the homepage hero / cards.
 *
 * @example
 *   const { listings, loading } = useFeaturedListings()
 */
export function useFeaturedListings(limit = 12) {
  const [listings, setListings] = useState<PublicListing[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    setLoading(true)

    fetchFeaturedListings(limit).then((data) => {
      if (!cancelled) {
        setListings(data)
        setError(data.length === 0 ? 'No featured listings found' : null)
        setLoading(false)
      }
    })

    return () => {
      cancelled = true
    }
  }, [limit])

  return { listings, loading, error }
}

/**
 * Hook: fetch listings in the same neighborhood as the current listing.
 * Used for the "Around This Place" section on detail pages.
 *
 * Returns [] while neighborhood is empty (i.e., while the listing is loading).
 */
export function useNearbyListings(
  categoryName: string,
  detailPageBase: string,
  neighborhood: string,
  excludeSlug: string,
  limit = 8
): { listings: PortalListing[]; loading: boolean } {
  const [listings, setListings] = useState<PortalListing[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!categoryName || !neighborhood) {
      setListings([])
      return
    }

    let cancelled = false
    setLoading(true)

    fetchNearbyListings(categoryName, detailPageBase, neighborhood, excludeSlug, limit).then(
      (data) => {
        if (!cancelled) {
          setListings(data)
          setLoading(false)
        }
      }
    )

    return () => {
      cancelled = true
    }
  }, [categoryName, detailPageBase, neighborhood, excludeSlug, limit])

  return { listings, loading }
}
