/**
 * listings.service.ts
 *
 * Shared Supabase query layer for the public portal.
 *
 * Dashboard admins manage listings via the /dashboard/listings CRUD UI.
 * Those records land in Supabase. Public pages call this service to
 * display live data instead of the static fallback in @public/data/*.ts.
 *
 * Usage example in a public page (Hotels.tsx):
 *
 *   import { usePublicListings } from '@/lib/listings.service'
 *
 *   export default function Hotels() {
 *     const { listings, loading } = usePublicListings('hotel')
 *     // render listings ...
 *   }
 */

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

// ─── Types ────────────────────────────────────────────────────────────────────

export type ListingCategory =
  | 'hotel'
  | 'activity'
  | 'beach'
  | 'boating'
  | 'gastronomy'
  | 'real-estate'
  | 'music'
  | 'elite'

export interface PublicListing {
  id: string
  title: string
  subtitle: string
  image: string
  rating: number
  category: ListingCategory
  slug: string
  featured: boolean
  published: boolean
  created_at: string
}

// ─── Raw fetch (no React) — use in SSG / server contexts ─────────────────────

/**
 * Fetch all published listings for a given category.
 * Returns [] on error so the UI can fall back to static data.
 */
export async function fetchPublicListings(
  category: ListingCategory,
  limit = 50
): Promise<PublicListing[]> {
  const { data, error } = await supabase
    .from('listings')
    .select('id, title, subtitle, image, rating, category, slug, featured, published, created_at')
    .eq('category', category)
    .eq('published', true)
    .order('featured', { ascending: false })
    .order('rating', { ascending: false })
    .limit(limit)

  if (error) {
    console.error(`[listings.service] fetchPublicListings(${category}):`, error.message)
    return []
  }
  return data ?? []
}

/**
 * Fetch a single published listing by slug.
 */
export async function fetchListingBySlug(slug: string): Promise<PublicListing | null> {
  const { data, error } = await supabase
    .from('listings')
    .select('id, title, subtitle, image, rating, category, slug, featured, published, created_at')
    .eq('slug', slug)
    .eq('published', true)
    .single()

  if (error) {
    console.error(`[listings.service] fetchListingBySlug(${slug}):`, error.message)
    return null
  }
  return data
}

/**
 * Fetch featured listings across ALL categories (used on the homepage).
 */
export async function fetchFeaturedListings(limit = 12): Promise<PublicListing[]> {
  const { data, error } = await supabase
    .from('listings')
    .select('id, title, subtitle, image, rating, category, slug, featured, published, created_at')
    .eq('published', true)
    .eq('featured', true)
    .order('rating', { ascending: false })
    .limit(limit)

  if (error) {
    console.error('[listings.service] fetchFeaturedListings:', error.message)
    return []
  }
  return data ?? []
}

// ─── React hooks — use inside public page components ─────────────────────────

interface UsePublicListingsResult {
  listings: PublicListing[]
  loading: boolean
  error: string | null
}

/**
 * Hook: fetch published listings for a category.
 *
 * Falls back to an empty array on error so pages can show static data.
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
    if (!slug) return
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
