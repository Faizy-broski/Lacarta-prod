import { supabase } from '@/lib/supabase'

// ─── Types ────────────────────────────────────────────────────────────────────

export interface Favorite {
  id: string
  user_id: string
  item_type: 'listing' | 'article' | 'deal' | 'event' | 'page'
  item_id: string   // for 'page': the pathname e.g. "/beaches"
  item_title?: string | null  // for 'page': human-readable title stored at save time
  created_at: string
}

export interface FavoriteWithDetails extends Favorite {
  title: string
  cover_image: string | null
  seo_slug: string | null
  category_name: string | null
}

// ─── Queries ──────────────────────────────────────────────────────────────────

export async function fetchFavorites(userId: string, itemType?: string) {
  let query = supabase
    .from('favorites')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })

  if (itemType) query = query.eq('item_type', itemType)

  const { data, error } = await query
  if (error) { console.error('[favorites.service]', error.message); return [] }
  return data as Favorite[]
}

/**
 * Fetch favorites for a user and enrich each entry with listing title,
 * cover_image, seo_slug, and category name by joining the listings table.
 */
export async function fetchFavoritesWithDetails(userId: string): Promise<FavoriteWithDetails[]> {
  const { data: favs, error } = await supabase
    .from('favorites')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })

  if (error) { console.error('[favorites.service]', error.message); return [] }
  if (!favs || favs.length === 0) return []

  const listingIds = (favs as Favorite[])
    .filter((f) => f.item_type === 'listing')
    .map((f) => f.item_id)

  let listingMap: Record<string, { title: string; cover_image: string | null; seo_slug: string | null; category_name: string | null }> = {}

  if (listingIds.length > 0) {
    const { data: listings } = await supabase
      .from('listings')
      .select('id, title, cover_image, seo_slug, categories(name)')
      .in('id', listingIds)

    if (listings) {
      for (const l of listings as any[]) {
        listingMap[l.id] = {
          title: l.title ?? 'Untitled',
          cover_image: l.cover_image ?? null,
          seo_slug: l.seo_slug ?? null,
          category_name: l.categories?.name ?? null,
        }
      }
    }
  }

  return (favs as Favorite[]).map((fav) => {
    if (fav.item_type === 'page') {
      return {
        ...fav,
        title: fav.item_title ?? fav.item_id,
        cover_image: null,
        seo_slug: fav.item_id,  // the pathname is the link target
        category_name: 'Pages',
      }
    }
    const details = fav.item_type === 'listing' ? listingMap[fav.item_id] : null
    return {
      ...fav,
      title: details?.title ?? fav.item_id,
      cover_image: details?.cover_image ?? null,
      seo_slug: details?.seo_slug ?? null,
      category_name: details?.category_name ?? null,
    }
  })
}

export async function addFavorite(
  userId: string,
  itemType: Favorite['item_type'],
  itemId: string,
  itemTitle?: string
) {
  const { data, error } = await supabase
    .from('favorites')
    .insert({ user_id: userId, item_type: itemType, item_id: itemId })
    .select()
    .single()

  if (error) throw new Error(error.message)
  return data as Favorite
}

export async function removeFavorite(userId: string, itemType: string, itemId: string) {
  const { error } = await supabase
    .from('favorites')
    .delete()
    .eq('user_id', userId)
    .eq('item_type', itemType)
    .eq('item_id', itemId)

  if (error) throw error
}

export async function isFavorited(userId: string, itemType: string, itemId: string) {
  const { count, error } = await supabase
    .from('favorites')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', userId)
    .eq('item_type', itemType)
    .eq('item_id', itemId)

  if (error) return false
  return (count ?? 0) > 0
}
