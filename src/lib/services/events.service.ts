import { supabase } from '@/lib/supabase'

// ─── Types ────────────────────────────────────────────────────────────────────

export interface Event {
  id: string
  title: string
  description: string | null
  cover_image: string | null
  category_id: string | null
  listing_id: string | null
  created_by: string
  status: 'draft' | 'pending' | 'published' | 'cancelled'
  event_date: string
  start_time: string | null
  end_time: string | null
  location: string | null
  latitude: number | null
  longitude: number | null
  is_recurring: boolean
  recurrence_rule: string | null
  created_at: string
  updated_at: string
  // Joined
  creator?: { full_name: string }
  category?: { name: string }
}

export type EventInsert = Omit<Event, 'id' | 'created_at' | 'updated_at' | 'creator' | 'category'>
export type EventUpdate = Partial<EventInsert>

// ─── Queries ──────────────────────────────────────────────────────────────────

export async function fetchEvents(filters?: {
  status?: string
  created_by?: string
  from_date?: string
  to_date?: string
  limit?: number
}) {
  let query = supabase
    .from('events')
    .select('*, creator:users!created_by(full_name), category:categories!category_id(name)')
    .order('event_date', { ascending: true })

  if (filters?.status) query = query.eq('status', filters.status)
  if (filters?.created_by) query = query.eq('created_by', filters.created_by)
  if (filters?.from_date) query = query.gte('event_date', filters.from_date)
  if (filters?.to_date) query = query.lte('event_date', filters.to_date)
  if (filters?.limit) query = query.limit(filters.limit)

  const { data, error } = await query
  if (error) { console.error('[events.service]', error.message); return [] }
  return data as Event[]
}

export async function fetchEventById(id: string) {
  const { data, error } = await supabase
    .from('events')
    .select('*, creator:users!created_by(full_name), category:categories!category_id(name)')
    .eq('id', id)
    .single()

  if (error) { console.error('[events.service]', error.message); return null }
  return data as Event
}

export async function createEvent(event: EventInsert) {
  const { data, error } = await supabase
    .from('events')
    .insert(event)
    .select()
    .single()

  if (error) throw error
  return data as Event
}

export async function updateEvent(id: string, updates: EventUpdate) {
  const { data, error } = await supabase
    .from('events')
    .update(updates)
    .eq('id', id)
    .select()
    .single()

  if (error) throw error
  return data as Event
}

export async function deleteEvent(id: string) {
  const { error } = await supabase.from('events').delete().eq('id', id)
  if (error) throw error
}
