import { supabase } from '@/lib/supabase'

// ─── Types ────────────────────────────────────────────────────────────────────

export interface Deal {
  id: string
  title: string
  description: string | null
  cover_image: string | null
  listing_id: string | null
  created_by: string
  discount_type: 'percent' | 'fixed' | 'bogo' | 'freebie'
  discount_value: number
  acquire_link: string | null
  status: 'draft' | 'pending' | 'active' | 'scheduled' | 'expired'
  starts_at: string | null
  expires_at: string | null
  created_at: string
  updated_at: string
  // Joined
  listing?: { title: string; cover_image: string }
  creator?: { full_name: string }
}

export type DealInsert = Omit<Deal, 'id' | 'created_at' | 'updated_at' | 'listing' | 'creator'>
export type DealUpdate = Partial<DealInsert>

// ─── Queries ──────────────────────────────────────────────────────────────────

export async function fetchDeals(filters?: {
  status?: string
  created_by?: string
  listing_id?: string
  limit?: number
}) {
  let query = supabase
    .from('deals')
    .select('*, listing:listings!listing_id(title, cover_image), creator:users!created_by(full_name)')
    .order('created_at', { ascending: false })

  if (filters?.status) query = query.eq('status', filters.status)
  if (filters?.created_by) query = query.eq('created_by', filters.created_by)
  if (filters?.listing_id) query = query.eq('listing_id', filters.listing_id)
  if (filters?.limit) query = query.limit(filters.limit)

  const { data, error } = await query
  if (error) { console.error('[deals.service]', error.message); return [] }
  return data as Deal[]
}

export async function createDeal(deal: DealInsert) {
  const { data, error } = await supabase
    .from('deals')
    .insert(deal)
    .select()
    .single()

  if (error) throw error
  return data as Deal
}

export async function updateDeal(id: string, updates: DealUpdate) {
  const { data, error } = await supabase
    .from('deals')
    .update(updates)
    .eq('id', id)
    .select()
    .single()

  if (error) throw error
  return data as Deal
}

export async function deleteDeal(id: string) {
  const { error } = await supabase.from('deals').delete().eq('id', id)
  if (error) throw error
}
