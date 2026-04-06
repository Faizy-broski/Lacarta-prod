import { supabase } from '@/lib/supabase'

// ─── Types ────────────────────────────────────────────────────────────────────

export interface Favorite {
  id: string
  user_id: string
  item_type: 'listing' | 'article' | 'deal' | 'event'
  item_id: string
  created_at: string
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

export async function addFavorite(userId: string, itemType: Favorite['item_type'], itemId: string) {
  const { data, error } = await supabase
    .from('favorites')
    .insert({ user_id: userId, item_type: itemType, item_id: itemId })
    .select()
    .single()

  if (error) throw error
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
