import { supabase } from '@/lib/supabase'

// ─── Types ────────────────────────────────────────────────────────────────────

export interface AdSpace {
  id: string
  placement: 'home' | 'category' | 'search' | 'blog'
  listing_id: string | null
  image_url: string | null
  link_url: string | null
  is_active: boolean
  created_by: string | null
  starts_at: string | null
  expires_at: string | null
  created_at: string
  updated_at: string
  // Joined
  listing?: { title: string; cover_image: string }
}

export type AdSpaceInsert = Omit<AdSpace, 'id' | 'created_at' | 'updated_at' | 'listing'>
export type AdSpaceUpdate = Partial<AdSpaceInsert>

// ─── Queries ──────────────────────────────────────────────────────────────────

export async function fetchAdSpaces(placement?: string) {
  let query = supabase
    .from('ad_spaces')
    .select('*, listing:listings!listing_id(title, cover_image)')
    .order('created_at', { ascending: false })

  if (placement) query = query.eq('placement', placement)

  const { data, error } = await query
  if (error) { console.error('[ad-spaces.service]', error.message); return [] }
  return data as AdSpace[]
}

export async function fetchActiveAd(placement: string) {
  const { data, error } = await supabase
    .from('ad_spaces')
    .select('*, listing:listings!listing_id(title, cover_image)')
    .eq('placement', placement)
    .eq('is_active', true)
    .limit(1)
    .single()

  if (error) return null
  return data as AdSpace
}

export async function upsertAdSpace(adSpace: AdSpaceInsert & { id?: string }) {
  const { data, error } = await supabase
    .from('ad_spaces')
    .upsert(adSpace)
    .select()
    .single()

  if (error) throw error
  return data as AdSpace
}

export async function deleteAdSpace(id: string) {
  const { error } = await supabase.from('ad_spaces').delete().eq('id', id)
  if (error) throw error
}
