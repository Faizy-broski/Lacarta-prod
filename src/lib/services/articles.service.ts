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
  status: 'draft' | 'published' | 'scheduled' | 'archived' | 'pending'
  published_at: string | null
  scheduled_at: string | null
  views: number
  created_at: string
  updated_at: string
  editor_id: string | null
  // Joined fields
  author?: {
    id?: string
    full_name: string
    email?: string
    profile_photo_url: string | null
    bio: string | null
    role: string
    facebook_url: string | null
    twitter_url: string | null
    instagram_url: string | null
    website_url: string | null
  } | null
  editor?: { full_name: string; role: string } | null
  category?: { name: string }
  // Featured
  is_featured: boolean
  featured_position: number | null
  featured_at: string | null
}

// ─── Author resolver (avoids PostgREST FK disambiguation issues) ──────────────

async function resolveAuthors(articles: Article[]): Promise<Article[]> {
  const authorIds = [...new Set(articles.map((a) => a.author_id).filter(Boolean))]
  if (authorIds.length === 0) return articles

  const { data: users } = await supabase
    .from('users')
    .select('id, full_name, email, profile_photo_url, bio, role, facebook_url, twitter_url, instagram_url, website_url')
    .in('id', authorIds)

  const userMap = Object.fromEntries((users ?? []).map((u) => [u.id, u]))
  return articles.map((a) => ({ ...a, author: userMap[a.author_id] ?? null }))
}

export type ArticleInsert = Omit<Article, 'id' | 'created_at' | 'updated_at' | 'views' | 'author' | 'editor' | 'category'>
export type ArticleUpdate = Partial<ArticleInsert>

// ─── Queries ──────────────────────────────────────────────────────────────────

export async function fetchArticles(filters?: {
  status?: string
  author_id?: string
  category_id?: string
  limit?: number
  offset?: number
}) {
  let query = supabase
    .from('articles')
    .select('*, category:categories!category_id(name)', { count: 'exact' })
    .order('created_at', { ascending: false })

  if (filters?.status) query = query.eq('status', filters.status)
  if (filters?.author_id) query = query.eq('author_id', filters.author_id)
  if (filters?.category_id) query = query.eq('category_id', filters.category_id)

  const limit = filters?.limit ?? 10
  const offset = filters?.offset ?? 0
  query = query.range(offset, offset + limit - 1)

  const { data, error, count } = await query
  if (error) { console.error('[articles.service]', error.message); return { articles: [], total: 0 } }
  const articles = await resolveAuthors((data ?? []) as Article[])
  return { articles, total: count ?? 0 }
}

export async function fetchArticleBySlug(slug: string) {
  const { data, error } = await supabase
    .from('articles')
    .select('*, category:categories!category_id(name)')
    .eq('slug', slug)
    .single()

  if (error) { console.error('[articles.service]', error.message); return null }
  const [resolved] = await resolveAuthors([data as Article])
  return resolved ?? null
}

export async function fetchArticleById(id: string) {
  const { data, error } = await supabase
    .from('articles')
    .select('*, category:categories!category_id(name)')
    .eq('id', id)
    .single()

  if (error) { console.error('[articles.service]', error.message); return null }
  const [resolved] = await resolveAuthors([data as Article])
  return resolved ?? null
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

export async function fetchPopularArticles(limit = 4): Promise<Article[]> {
  const { data, error } = await supabase
    .from('articles')
    .select('*, category:categories!category_id(name)')
    .eq('status', 'published')
    .order('views', { ascending: false })
    .limit(limit)

  if (error) { console.error('[articles.service]', error.message); return [] }
  return resolveAuthors((data ?? []) as Article[])
}

export async function getArticleCount(status?: string) {
  let query = supabase.from('articles').select('*', { count: 'exact', head: true })
  if (status) query = query.eq('status', status)
  const { count, error } = await query
  if (error) { console.error('[articles.service]', error.message); return 0 }
  return count ?? 0
}

// ─── Content Stats (for dashboard overview cards) ─────────────────────────────

export interface ContentStats {
  totalArticles: number
  articlesThisMonth: number
  drafts: number
  categories: number
  published: number
  resources: number
}

export async function fetchContentStats(authorId?: string): Promise<ContentStats> {
  const startOfMonth = new Date()
  startOfMonth.setDate(1)
  startOfMonth.setHours(0, 0, 0, 0)

  let articlesBase = supabase.from('articles').select('*', { count: 'exact', head: true })
  if (authorId) articlesBase = articlesBase.eq('author_id', authorId)

  const [
    { count: totalArticles },
    { count: articlesThisMonth },
    { count: drafts },
    { count: categories },
    { count: published },
    { count: resources },
  ] = await Promise.all([
    articlesBase,
    (() => {
      let q = supabase.from('articles').select('*', { count: 'exact', head: true }).gte('created_at', startOfMonth.toISOString())
      if (authorId) q = q.eq('author_id', authorId)
      return q
    })(),
    (() => {
      let q = supabase.from('articles').select('*', { count: 'exact', head: true }).eq('status', 'draft')
      if (authorId) q = q.eq('author_id', authorId)
      return q
    })(),
    supabase.from('categories').select('*', { count: 'exact', head: true }),
    (() => {
      let q = supabase.from('articles').select('*', { count: 'exact', head: true }).eq('status', 'published')
      if (authorId) q = q.eq('author_id', authorId)
      return q
    })(),
    supabase.from('resources').select('*', { count: 'exact', head: true }).eq('status', 'active'),
  ])

  return {
    totalArticles: totalArticles ?? 0,
    articlesThisMonth: articlesThisMonth ?? 0,
    drafts: drafts ?? 0,
    categories: categories ?? 0,
    published: published ?? 0,
    resources: resources ?? 0,
  }
}

// ─── Featured Articles ────────────────────────────────────────────────────────

export async function fetchFeaturedArticles(limit = 4): Promise<Article[]> {
  const { data, error } = await supabase
    .from('articles')
    .select('*, category:categories!category_id(name)')
    .eq('is_featured', true)
    .eq('status', 'published')
    .order('featured_position', { ascending: true, nullsFirst: false })
    .limit(limit)

  if (error) { console.error('[articles.service] fetchFeaturedArticles:', error.message); return [] }
  return resolveAuthors((data ?? []) as Article[])
}

/** Toggle featured status. Pass position=null to unfeature. */
export async function toggleArticleFeatured(
  id: string,
  featured: boolean,
  position?: number | null
): Promise<void> {
  const updates: Partial<Article> = {
    is_featured: featured,
    featured_position: featured ? (position ?? null) : null,
    featured_at: featured ? new Date().toISOString() : null,
  }
  const { error } = await supabase.from('articles').update(updates).eq('id', id)
  if (error) throw error
}

/** Lightweight list of published articles for the featured story picker. */
export async function fetchPublishedArticlesPicker(limit = 50) {
  const { data, error } = await supabase
    .from('articles')
    .select('id, title, slug, cover_image, category:categories!category_id(name)')
    .eq('status', 'published')
    .order('created_at', { ascending: false })
    .limit(limit)

  if (error) { console.error('[articles.service] fetchPublishedArticlesPicker:', error.message); return [] }
  return (data ?? []).map((a: any) => ({
    id: a.id as string,
    title: a.title as string,
    slug: a.slug as string,
    cover_image: (a.cover_image ?? null) as string | null,
    category_name: (a.category?.name ?? null) as string | null,
  }))
}
