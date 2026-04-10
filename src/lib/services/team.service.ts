import { supabase } from '@/lib/supabase'

// ─── Types ────────────────────────────────────────────────────────────────────

export interface TeamMember {
  id: string
  slug: string
  name: string
  role: string
  bio: string | null
  bio_extended: string | null
  photo_url: string | null
  favorite_movie: string | null
  favorite_song: string | null
  favorite_club: string | null
  favorite_book: string | null
  favorite_food: string | null
  email: string | null
  twitter_url: string | null
  instagram_url: string | null
  linkedin_url: string | null
  display_order: number
  is_published: boolean
  created_at: string
  updated_at: string
}

export type TeamMemberInsert = Omit<TeamMember, 'id' | 'created_at' | 'updated_at'>
export type TeamMemberUpdate = Partial<TeamMemberInsert>

// ─── Queries ──────────────────────────────────────────────────────────────────

export async function fetchTeamMembers(publishedOnly = true): Promise<TeamMember[]> {
  let query = supabase
    .from('team_members')
    .select('*')
    .order('display_order', { ascending: true })

  if (publishedOnly) query = query.eq('is_published', true)

  const { data, error } = await query
  if (error) { console.error('[team.service]', error.message); return [] }
  return (data ?? []) as TeamMember[]
}

export async function fetchTeamMemberBySlug(slug: string): Promise<TeamMember | null> {
  const { data, error } = await supabase
    .from('team_members')
    .select('*')
    .eq('slug', slug)
    .eq('is_published', true)
    .single()

  if (error) { console.error('[team.service]', error.message); return null }
  return data as TeamMember
}

export async function fetchTeamMemberById(id: string): Promise<TeamMember | null> {
  const { data, error } = await supabase
    .from('team_members')
    .select('*')
    .eq('id', id)
    .single()

  if (error) { console.error('[team.service]', error.message); return null }
  return data as TeamMember
}

export async function createTeamMember(member: TeamMemberInsert): Promise<TeamMember> {
  const { data, error } = await supabase
    .from('team_members')
    .insert(member)
    .select()
    .single()

  if (error) throw error
  return data as TeamMember
}

export async function updateTeamMember(id: string, updates: TeamMemberUpdate): Promise<TeamMember> {
  const { data, error } = await supabase
    .from('team_members')
    .update(updates)
    .eq('id', id)
    .select()
    .single()

  if (error) throw error
  return data as TeamMember
}

export async function deleteTeamMember(id: string): Promise<void> {
  const { error } = await supabase.from('team_members').delete().eq('id', id)
  if (error) throw error
}
