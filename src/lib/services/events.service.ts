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
  is_featured: boolean
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

// ─── Helpers ──────────────────────────────────────────────────────────────────

function today(): string {
  return new Date().toISOString().split('T')[0]
}

function dateInDays(n: number): string {
  const d = new Date()
  d.setDate(d.getDate() + n)
  return d.toISOString().split('T')[0]
}

// ─── Core CRUD ────────────────────────────────────────────────────────────────

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
  if (error) { console.error('[events.service] fetchEvents:', error.message); return [] }
  return data as Event[]
}

export async function fetchEventById(id: string) {
  const { data, error } = await supabase
    .from('events')
    .select('*, creator:users!created_by(full_name), category:categories!category_id(name)')
    .eq('id', id)
    .single()

  if (error) { console.error('[events.service] fetchEventById:', error.message); return null }
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

// ─── Specialised fetchers ─────────────────────────────────────────────────────

/** Published events from today onward, ordered by date. */
export async function fetchUpcomingEvents(limit = 5): Promise<Event[]> {
  const { data, error } = await supabase
    .from('events')
    .select('*, creator:users!created_by(full_name), category:categories!category_id(name)')
    .eq('status', 'published')
    .gte('event_date', today())
    .order('event_date', { ascending: true })
    .limit(limit)

  if (error) { console.error('[events.service] fetchUpcomingEvents:', error.message); return [] }
  return data as Event[]
}

/** Draft and pending events — admins see all, normal users see own (also enforced by RLS). */
export async function fetchDraftAndPendingEvents(limit = 9, createdBy?: string): Promise<Event[]> {
  let query = supabase
    .from('events')
    .select('*, creator:users!created_by(full_name), category:categories!category_id(name)')
    .in('status', ['draft', 'pending'])
    .order('created_at', { ascending: false })
    .limit(limit)

  // Explicitly scope to user when not admin (RLS also enforces this)
  if (createdBy) query = query.eq('created_by', createdBy)

  const { data, error } = await query
  if (error) { console.error('[events.service] fetchDraftAndPendingEvents:', error.message); return [] }
  return data as Event[]
}

/** Featured published events for the homepage/admin panel. */
export async function fetchFeaturedEvents(limit = 4): Promise<Event[]> {
  const { data, error } = await supabase
    .from('events')
    .select('*, creator:users!created_by(full_name), category:categories!category_id(name)')
    .eq('status', 'published')
    .eq('is_featured', true)
    .order('event_date', { ascending: true })
    .limit(limit)

  if (error) { console.error('[events.service] fetchFeaturedEvents:', error.message); return [] }
  return data as Event[]
}

/** Toggle the is_featured flag for an event. */
export async function toggleEventFeatured(id: string, featured: boolean): Promise<void> {
  const { error } = await supabase
    .from('events')
    .update({ is_featured: featured })
    .eq('id', id)

  if (error) throw error
}

// ─── Stats ────────────────────────────────────────────────────────────────────

export interface EventStats {
  upcoming: number
  thisWeek: number
  featured: number
  drafts: number
  past: number
}

export async function fetchEventStats(createdBy?: string): Promise<EventStats> {
  const t = today()
  const weekEnd = dateInDays(7)

  function base() {
    let q = supabase.from('events').select('*', { count: 'exact', head: true })
    if (createdBy) q = (q as any).eq('created_by', createdBy)
    return q
  }

  const [upcoming, thisWeek, featured, drafts, past] = await Promise.all([
    base().eq('status', 'published').gte('event_date', t),
    base().eq('status', 'published').gte('event_date', t).lte('event_date', weekEnd),
    base().eq('status', 'published').eq('is_featured', true),
    base().in('status', ['draft', 'pending']),
    base().eq('status', 'published').lt('event_date', t),
  ])

  return {
    upcoming: upcoming.count ?? 0,
    thisWeek: thisWeek.count ?? 0,
    featured: featured.count ?? 0,
    drafts: drafts.count ?? 0,
    past: past.count ?? 0,
  }
}

// ─── Category counts ──────────────────────────────────────────────────────────

export interface EventCategoryCount {
  name: string
  count: number
}

export interface EventCategory {
  id: string
  name: string
}

export async function fetchEventCategories(): Promise<EventCategory[]> {
  const { data, error } = await supabase
    .from('categories')
    .select('id, name')
    .eq('type', 'event')
    .eq('status', 'active')
    .order('name', { ascending: true })

  if (error) { console.error('[events.service] fetchEventCategories:', error.message); return [] }
  return (data ?? []) as EventCategory[]
}

export async function createEventCategory(name: string): Promise<EventCategory> {
  const { data, error } = await supabase
    .from('categories')
    .insert({ name: name.trim(), type: 'event', status: 'active' })
    .select('id, name')
    .single()

  if (error) throw error
  return data as EventCategory
}

export async function deleteEventCategory(id: string): Promise<void> {
  const { error } = await supabase.from('categories').delete().eq('id', id)
  if (error) throw error
}

export async function fetchEventCategoryCounts(): Promise<EventCategoryCount[]> {
  const { data: cats, error: catError } = await supabase
    .from('categories')
    .select('id, name')
    .eq('type', 'event')
    .eq('status', 'active')
    .order('name', { ascending: true })

  if (catError) { console.error('[events.service] fetchEventCategoryCounts (categories):', catError.message); return [] }

  // Count published events per category
  const { data: events, error: evError } = await supabase
    .from('events')
    .select('category_id')
    .eq('status', 'published')

  if (evError) { console.error('[events.service] fetchEventCategoryCounts (events):', evError.message); return [] }

  const countMap: Record<string, number> = {}
  for (const e of (events ?? []) as { category_id: string | null }[]) {
    if (e.category_id) countMap[e.category_id] = (countMap[e.category_id] ?? 0) + 1
  }

  return (cats ?? []).map((c: { id: string; name: string }) => ({
    name: c.name,
    count: countMap[c.id] ?? 0,
  }))
}

// ─── Insights ─────────────────────────────────────────────────────────────────

export interface EventInsights {
  nextEventTitle: string | null
  nextEventDate: string | null
  nextFeaturedTitle: string | null
  busiestDay: string | null
  totalPublished: number
}

export async function fetchEventInsights(createdBy?: string): Promise<EventInsights> {
  const t = today()

  function maybeScope<T>(q: T): T {
    if (createdBy) return (q as any).eq('created_by', createdBy)
    return q
  }

  const [nextEvent, nextFeatured, allUpcoming, { count: totalPublished }] = await Promise.all([
    maybeScope(
      supabase.from('events')
        .select('title, event_date')
        .eq('status', 'published')
        .gte('event_date', t)
        .order('event_date', { ascending: true })
        .limit(1)
    ).single(),
    maybeScope(
      supabase.from('events')
        .select('title, event_date')
        .eq('status', 'published')
        .eq('is_featured', true)
        .gte('event_date', t)
        .order('event_date', { ascending: true })
        .limit(1)
    ).single(),
    maybeScope(
      supabase.from('events')
        .select('event_date')
        .eq('status', 'published')
        .gte('event_date', t)
    ),
    maybeScope(
      supabase.from('events')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'published')
    ),
  ])

  // Find busiest day (day with most upcoming events)
  let busiestDay: string | null = null
  if (allUpcoming.data && allUpcoming.data.length > 0) {
    const dayCounts: Record<string, number> = {}
    for (const row of allUpcoming.data as { event_date: string }[]) {
      dayCounts[row.event_date] = (dayCounts[row.event_date] ?? 0) + 1
    }
    busiestDay = Object.entries(dayCounts).sort((a, b) => b[1] - a[1])[0]?.[0] ?? null
  }

  return {
    nextEventTitle: nextEvent.data?.title ?? null,
    nextEventDate: nextEvent.data?.event_date ?? null,
    nextFeaturedTitle: nextFeatured.data?.title ?? null,
    busiestDay,
    totalPublished: totalPublished ?? 0,
  }
}
