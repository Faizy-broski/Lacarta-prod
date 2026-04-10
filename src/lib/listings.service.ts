/**
 * listings.service.ts
 *
 * Server-safe Supabase query layer (no React imports).
 * Import these functions in Server Components and API routes.
 *
 * For React hooks (usePublicListings, useListing, useFeaturedListings),
 * import from '@/lib/listings.hooks' in Client Components.
 */

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
  image?: string
  cover_image?: string
  seo_slug?: string
  status?: string
  category: ListingCategory | string
  slug?: string
  featured?: boolean
  created_at: string
  [key: string]: any
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
  // Resolve category name → UUID (category_id is a UUID column, not a string)
  const { data: cat } = await supabase
    .from('categories')
    .select('id')
    .ilike('name', category)
    .eq('type', 'listing')
    .single()

  if (!cat) {
    console.warn(`[listings.service] fetchPublicListings: category "${category}" not found`)
    return []
  }

  const { data, error } = await supabase
    .from('listings')
    .select('id, title, subtitle, cover_image, category_id, categories(name), seo_slug, status, created_at')
    .eq('category_id', cat.id)
    .in('status', ['active', 'featured'])
    .order('status', { ascending: false })
    .order('created_at', { ascending: false })
    .limit(limit)

  if (error) {
    console.error(`[listings.service] fetchPublicListings(${category}):`, error.message)
    return []
  }
  return (data ?? []).map((row: any) => ({
    ...row,
    category: Array.isArray(row.categories) ? row.categories[0]?.name : row.categories?.name ?? category
  })) as PublicListing[]
}

/**
 * Fetch a single published listing by slug.
 */
export async function fetchListingBySlug(slug: string): Promise<PublicListing | null> {
  const { data, error } = await supabase
    .from('listings')
    .select('*, categories(name)')
    .eq('seo_slug', slug)
    .in('status', ['active', 'featured'])
    .single()

  if (error) {
    console.error(`[listings.service] fetchListingBySlug(${slug}):`, error.message)
    return null
  }
  return data ? ({
    ...data,
    category: Array.isArray(data.categories) ? data.categories[0]?.name : data.categories?.name ?? 'hotel'
  } as PublicListing) : null
}

/**
 * Fetch featured listings across ALL categories (used on the homepage).
 */
export async function fetchFeaturedListings(limit = 12): Promise<PublicListing[]> {
  const { data, error } = await supabase
    .from('listings')
    .select('id, title, subtitle, cover_image, category_id, categories(name), seo_slug, status, created_at')
    .eq('status', 'featured')
    .limit(limit)

  if (error) {
    console.error('[listings.service] fetchFeaturedListings:', error.message)
    return []
  }
  return (data ?? []).map((row: any) => ({
    ...row,
    category: Array.isArray(row.categories) ? row.categories[0]?.name : row.categories?.name ?? 'hotel'
  })) as PublicListing[]
}

// ─── Portal: fetch real listings by category name (for public pages) ─────────

export interface PortalListing {
  id: string
  title: string
  subtitle: string
  image: string
  rating: number
  href: string
  category: string
  types: string[]  // from category_tags — used for frontend type filter pills
  feature_post_type: 'reserve' | 'menu'
}

/**
 * Fetch all active/featured listings for a given category name (e.g. 'Hotels').
 * Looks up the category UUID first, then queries listings by category_id.
 * Returns listings shaped for both PaginationListing and ListingPage components.
 *
 * @param categoryName  Exact category name as stored in DB (e.g. 'Hotels', 'Real Estate')
 * @param detailPageBase  Base URL for detail pages (e.g. 'Detailed-Hotel')
 */
export async function fetchPortalListings(
  categoryName: string,
  detailPageBase: string,
  limit = 100
): Promise<PortalListing[]> {
  const { data: cat } = await supabase
    .from('categories')
    .select('id')
    .ilike('name', categoryName)
    .eq('type', 'listing')
    .single()

  if (!cat) return []

  const { data, error } = await supabase
    .from('listings')
    .select('id, title, subtitle, cover_image, seo_slug, status, category_tags, feature_post_type, categories(name)')
    .eq('category_id', cat.id)
    .in('status', ['active', 'featured'])
    .order('status', { ascending: false })   // featured first
    .order('created_at', { ascending: false })
    .limit(limit)

  if (error) {
    console.error('[listings.service] fetchPortalListings:', error.message)
    return []
  }

  return (data ?? []).map((l: any) => ({
    id: l.id,
    title: l.title ?? '',
    subtitle: l.subtitle ?? '',
    image: l.cover_image ?? '',
    rating: l.rating ?? 0,
    href: `/${detailPageBase}/${l.seo_slug ?? l.id}`,
    category: (l.categories as any)?.name ?? categoryName,
    types: Array.isArray(l.category_tags) ? l.category_tags : [],
    feature_post_type: l.feature_post_type ?? 'reserve',
  }))
}

/**
 * Fetch active listings in the same neighborhood as the current listing.
 * Used for the "Around This Place" section on detail pages.
 *
 * @param categoryName   Display name of the category (e.g. 'Hotels', 'Gastronomy')
 * @param detailPageBase Base URL for detail pages (e.g. 'Detailed-Hotel')
 * @param neighborhood   Neighborhood tag to filter by (e.g. 'Boca Grande')
 * @param excludeSlug    Slug of the current listing to exclude from results
 */
export async function fetchNearbyListings(
  categoryName: string,
  detailPageBase: string,
  neighborhood: string,
  excludeSlug: string,
  limit = 8
): Promise<PortalListing[]> {
  if (!neighborhood) return []

  const { data: cat } = await supabase
    .from('categories')
    .select('id')
    .ilike('name', categoryName)
    .eq('type', 'listing')
    .single()

  if (!cat) return []

  let query = supabase
    .from('listings')
    .select('id, title, subtitle, cover_image, seo_slug, status, category_tags, categories(name)')
    .eq('category_id', cat.id)
    .in('status', ['active', 'featured'])
    .contains('category_tags', [neighborhood])
    .order('status', { ascending: false })
    .limit(limit)

  if (excludeSlug) {
    query = query.neq('seo_slug', excludeSlug)
  }

  const { data, error } = await query

  if (error) {
    console.error('[listings.service] fetchNearbyListings:', error.message)
    return []
  }

  return (data ?? []).map((l: any) => ({
    id: l.id,
    title: l.title ?? '',
    subtitle: l.subtitle ?? '',
    image: l.cover_image ?? '',
    rating: l.rating ?? 0,
    href: `/${detailPageBase}/${l.seo_slug ?? l.id}`,
    category: (l.categories as any)?.name ?? categoryName,
    types: Array.isArray(l.category_tags) ? l.category_tags : [],
  }))
}

// ─── Dashboard: client's own listings ────────────────────────────────────────

export interface ClientListing {
  id: string
  title: string
  subtitle: string | null
  cover_image: string | null
  status: string
  address: string | null
  category: { name: string } | null
  created_at: string
  subscription_tier: string | null
}

export async function fetchClientListings(clientId: string): Promise<ClientListing[]> {
  const { data, error } = await supabase
    .from('listings')
    .select('id, title, subtitle, cover_image, status, address, category:categories!category_id(name), created_at, listing_subscriptions(status, subscription_tiers(name))')
    .eq('client_id', clientId)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('[listings.service] fetchClientListings:', error.message)
    return []
  }
  return (data ?? []).map((row: any) => {
    const subscriptions: Array<{ status: string; subscription_tiers: { name: string } | null }> = Array.isArray(row.listing_subscriptions)
      ? row.listing_subscriptions
      : row.listing_subscriptions ? [row.listing_subscriptions] : []
    const activeSub = subscriptions.find((s) => s.status === 'active' || s.status === 'trialing')
    return {
      id: row.id,
      title: row.title,
      subtitle: row.subtitle,
      cover_image: row.cover_image,
      status: row.status,
      address: row.address,
      category: Array.isArray(row.category) ? row.category[0] ?? null : row.category ?? null,
      created_at: row.created_at,
      subscription_tier: activeSub?.subscription_tiers?.name?.toLowerCase() ?? null,
    } satisfies ClientListing
  })
}
