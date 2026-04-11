/**
 * listings-admin.service.ts
 *
 * Dashboard-only service for listing submission review and featured management.
 * All functions require the caller to be owner/admin/assistant/editor.
 */

import { supabase } from '@/lib/supabase'

// ─── Types ────────────────────────────────────────────────────────────────────

export type ListingSubmissionStatus = 'pending' | 'active' | 'rejected'

export interface ListingSubmission {
  id: string
  title: string
  subtitle: string | null
  cover_image: string | null
  status: string
  address: string | null
  created_at: string
  reviewed_at: string | null
  reviewed_by: string | null
  category_id: string | null
  client_id: string | null
  category: { id: string; name: string } | null
  client: { id: string; full_name: string | null; email: string | null; profile_photo_url: string | null } | null
  reviewer: { full_name: string | null } | null
}

export interface FeaturedListingItem {
  id: string
  title: string
  subtitle: string | null
  cover_image: string | null
  seo_slug: string | null
  is_featured: boolean
  featured_position: number | null
  featured_at: string | null
  category: { name: string } | null
}

// ─── Submission review ────────────────────────────────────────────────────────

/**
 * Fetch all listing submissions, optionally filtered by status.
 * 'pending'  — awaiting review
 * 'active'   — approved listings
 * 'rejected' — rejected listings
 * undefined  — all statuses
 */
export async function fetchListingSubmissions(
  status?: ListingSubmissionStatus
): Promise<ListingSubmission[]> {
  let query = supabase
    .from('listings')
    .select(`
      id, title, subtitle, cover_image, status, address, created_at,
      reviewed_at, reviewed_by, category_id, client_id,
      category:categories!category_id(id, name),
      client:users!client_id(id, full_name, email, profile_photo_url),
      reviewer:users!reviewed_by(full_name)
    `)
    .not('client_id', 'is', null)       // only client-submitted listings
    .order('created_at', { ascending: false })

  if (status) {
    query = query.eq('status', status)
  } else {
    // All review-relevant statuses (exclude admin-created 'inactive'/'featured')
    query = query.in('status', ['pending', 'active', 'rejected'])
  }

  const { data, error } = await query

  if (error) {
    console.error('[listings-admin] fetchListingSubmissions:', error.message)
    return []
  }

  return (data ?? []).map((row: any) => ({
    ...row,
    category: Array.isArray(row.category) ? row.category[0] ?? null : row.category ?? null,
    client:   Array.isArray(row.client)   ? row.client[0]   ?? null : row.client   ?? null,
    reviewer: Array.isArray(row.reviewer) ? row.reviewer[0] ?? null : row.reviewer ?? null,
  })) as ListingSubmission[]
}

/**
 * Approve a pending listing — sets status to 'active' and records reviewer.
 */
export async function approveListing(id: string, reviewerId: string): Promise<void> {
  const { error } = await supabase
    .from('listings')
    .update({
      status:      'active',
      reviewed_by: reviewerId,
      reviewed_at: new Date().toISOString(),
    })
    .eq('id', id)

  if (error) throw new Error(error.message)
}

/**
 * Reject a pending listing — sets status to 'rejected' and records reviewer.
 */
export async function rejectListing(id: string, reviewerId: string): Promise<void> {
  const { error } = await supabase
    .from('listings')
    .update({
      status:      'rejected',
      reviewed_by: reviewerId,
      reviewed_at: new Date().toISOString(),
    })
    .eq('id', id)

  if (error) throw new Error(error.message)
}

/**
 * Returns count of pending/active/rejected client-submitted listings.
 */
export async function getListingSubmissionCounts(): Promise<{
  pending: number
  active: number
  rejected: number
}> {
  const { data, error } = await supabase
    .from('listings')
    .select('status')
    .not('client_id', 'is', null)
    .in('status', ['pending', 'active', 'rejected'])

  if (error) return { pending: 0, active: 0, rejected: 0 }

  const counts = { pending: 0, active: 0, rejected: 0 }
  for (const row of data ?? []) {
    const s = row.status as keyof typeof counts
    if (s in counts) counts[s]++
  }
  return counts
}

// ─── Featured management ──────────────────────────────────────────────────────

const MAX_FEATURED_PER_CATEGORY = 6

export { MAX_FEATURED_PER_CATEGORY }

/**
 * Fetch currently featured listings for a given category (by category UUID).
 */
export async function fetchFeaturedListingsByCategory(
  categoryId: string,
  limit = MAX_FEATURED_PER_CATEGORY
): Promise<FeaturedListingItem[]> {
  const { data, error } = await supabase
    .from('listings')
    .select('id, title, subtitle, cover_image, seo_slug, is_featured, featured_position, featured_at, category:categories!category_id(name)')
    .eq('category_id', categoryId)
    .eq('is_featured', true)
    .order('featured_position', { ascending: true, nullsFirst: false })
    .limit(limit)

  if (error) {
    console.error('[listings-admin] fetchFeaturedListingsByCategory:', error.message)
    return []
  }

  return (data ?? []).map((row: any) => ({
    ...row,
    category: Array.isArray(row.category) ? row.category[0] ?? null : row.category ?? null,
  })) as FeaturedListingItem[]
}

/**
 * Fetch active (non-featured) listings for the picker, by category.
 */
export async function fetchActiveListingsPicker(
  categoryId: string,
  limit = 50
): Promise<FeaturedListingItem[]> {
  const { data, error } = await supabase
    .from('listings')
    .select('id, title, subtitle, cover_image, seo_slug, is_featured, featured_position, featured_at, category:categories!category_id(name)')
    .eq('category_id', categoryId)
    .eq('status', 'active')
    .order('created_at', { ascending: false })
    .limit(limit)

  if (error) {
    console.error('[listings-admin] fetchActiveListingsPicker:', error.message)
    return []
  }

  return (data ?? []).map((row: any) => ({
    ...row,
    category: Array.isArray(row.category) ? row.category[0] ?? null : row.category ?? null,
  })) as FeaturedListingItem[]
}

/**
 * Toggle featured status for a listing.
 * @param id          Listing UUID
 * @param featured    true = feature, false = unfeature
 * @param position    Position (1–MAX_FEATURED_PER_CATEGORY), null when unfeaturing
 */
export async function toggleListingFeatured(
  id: string,
  featured: boolean,
  position: number | null
): Promise<void> {
  const { error } = await supabase
    .from('listings')
    .update({
      is_featured:       featured,
      featured_position: featured ? position : null,
      featured_at:       featured ? new Date().toISOString() : null,
    })
    .eq('id', id)

  if (error) throw new Error(error.message)
}
