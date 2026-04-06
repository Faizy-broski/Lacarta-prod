import { supabase } from '@/lib/supabase'

// ─── Types ────────────────────────────────────────────────────────────────────

export interface Article {
  id: string
  title: string
  slug: string
  excerpt: string | null
  body: string | null
  cover_image: string | null
  category_id: string | null
  author_id: string
  status: 'draft' | 'published' | 'scheduled' | 'archived'
  published_at: string | null
  scheduled_at: string | null
  views: number
  created_at: string
  updated_at: string
  // Joined fields
  author?: { full_name: string; profile_photo_url: string }
  category?: { name: string }
}

export type ArticleInsert = Omit<Article, 'id' | 'created_at' | 'updated_at' | 'views' | 'author' | 'category'>
export type ArticleUpdate = Partial<ArticleInsert>

// ─── Queries ──────────────────────────────────────────────────────────────────

export async function fetchArticles(filters?: {
  status?: string
  author_id?: string
  category_id?: string
  limit?: number
}) {
  let query = supabase
    .from('articles')
    .select('*, author:users!author_id(full_name, profile_photo_url), category:categories!category_id(name)')
    .order('created_at', { ascending: false })

  if (filters?.status) query = query.eq('status', filters.status)
  if (filters?.author_id) query = query.eq('author_id', filters.author_id)
  if (filters?.category_id) query = query.eq('category_id', filters.category_id)
  if (filters?.limit) query = query.limit(filters.limit)

  const { data, error } = await query
  if (error) { console.error('[articles.service]', error.message); return [] }
  return data as Article[]
}

export async function fetchArticleBySlug(slug: string) {
  const { data, error } = await supabase
    .from('articles')
    .select('*, author:users!author_id(full_name, profile_photo_url), category:categories!category_id(name)')
    .eq('slug', slug)
    .single()

  if (error) { console.error('[articles.service]', error.message); return null }
  return data as Article
}

export async function createArticle(article: ArticleInsert) {
  const { data, error } = await supabase
    .from('articles')
    .insert(article)
    .select()
    .single()

  if (error) throw error
  return data as Article
}

export async function updateArticle(id: string, updates: ArticleUpdate) {
  const { data, error } = await supabase
    .from('articles')
    .update(updates)
    .eq('id', id)
    .select()
    .single()

  if (error) throw error
  return data as Article
}

export async function deleteArticle(id: string) {
  const { error } = await supabase.from('articles').delete().eq('id', id)
  if (error) throw error
}

export async function getArticleCount(status?: string) {
  let query = supabase.from('articles').select('*', { count: 'exact', head: true })
  if (status) query = query.eq('status', status)
  const { count, error } = await query
  if (error) { console.error('[articles.service]', error.message); return 0 }
  return count ?? 0
}
