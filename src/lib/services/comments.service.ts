import { supabase } from '@/lib/supabase'

// ─── Types ────────────────────────────────────────────────────────────────────

export interface Comment {
  id: string
  article_id: string
  user_id: string
  body: string
  status: 'pending' | 'approved' | 'rejected'
  created_at: string
  // Joined
  user?: { full_name: string; profile_photo_url: string }
  article?: { title: string }
}

// ─── Queries ──────────────────────────────────────────────────────────────────

export async function fetchComments(articleId?: string, status?: string) {
  let query = supabase
    .from('comments')
    .select('*, user:users!user_id(full_name, profile_photo_url), article:articles!article_id(title)')
    .order('created_at', { ascending: false })

  if (articleId) query = query.eq('article_id', articleId)
  if (status) query = query.eq('status', status)

  const { data, error } = await query
  if (error) { console.error('[comments.service]', error.message); return [] }
  return data as Comment[]
}

export async function createComment(articleId: string, userId: string, body: string) {
  const { data, error } = await supabase
    .from('comments')
    .insert({ article_id: articleId, user_id: userId, body })
    .select()
    .single()

  if (error) throw error
  return data as Comment
}

export async function moderateComment(id: string, status: 'approved' | 'rejected') {
  const { error } = await supabase.from('comments').update({ status }).eq('id', id)
  if (error) throw error
}

export async function deleteComment(id: string) {
  const { error } = await supabase.from('comments').delete().eq('id', id)
  if (error) throw error
}

export async function getCommentCount(articleId?: string, status?: string) {
  let query = supabase.from('comments').select('*', { count: 'exact', head: true })
  if (articleId) query = query.eq('article_id', articleId)
  if (status) query = query.eq('status', status)
  const { count, error } = await query
  if (error) return 0
  return count ?? 0
}
