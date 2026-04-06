import { supabase } from '@/lib/supabase'

// ─── Types ────────────────────────────────────────────────────────────────────

export interface Resource {
  id: string
  title: string
  description: string | null
  file_url: string
  file_size: string | null
  file_type: 'pdf' | 'doc' | 'zip' | 'image' | 'other'
  category_id: string | null
  downloads: number
  status: 'active' | 'inactive'
  created_by: string
  created_at: string
  // Joined
  category?: { name: string }
}

export type ResourceInsert = Omit<Resource, 'id' | 'created_at' | 'downloads' | 'category'>
export type ResourceUpdate = Partial<ResourceInsert>

// ─── Queries ──────────────────────────────────────────────────────────────────

export async function fetchResources(filters?: { status?: string; limit?: number }) {
  let query = supabase
    .from('resources')
    .select('*, category:categories!category_id(name)')
    .order('created_at', { ascending: false })

  if (filters?.status) query = query.eq('status', filters.status)
  if (filters?.limit) query = query.limit(filters.limit)

  const { data, error } = await query
  if (error) { console.error('[resources.service]', error.message); return [] }
  return data as Resource[]
}

export async function createResource(resource: ResourceInsert) {
  const { data, error } = await supabase
    .from('resources')
    .insert(resource)
    .select()
    .single()

  if (error) throw error
  return data as Resource
}

export async function deleteResource(id: string) {
  const { error } = await supabase.from('resources').delete().eq('id', id)
  if (error) throw error
}

export async function incrementDownload(id: string) {
  const { error } = await supabase.rpc('increment_resource_downloads', { resource_id: id })
  if (error) {
    // Fallback: manual increment
    const { data } = await supabase.from('resources').select('downloads').eq('id', id).single()
    if (data) {
      await supabase.from('resources').update({ downloads: data.downloads + 1 }).eq('id', id)
    }
  }
}
