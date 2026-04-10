import { supabase } from '@/lib/supabase'

// ─── Types ────────────────────────────────────────────────────────────────────

export interface StorySubmission {
  id: string
  title: string
  content: string
  neighbourhood: string | null
  cover_image: string | null
  author_id: string
  author_name: string
  author_email: string
  status: 'pending' | 'approved' | 'rejected'
  reviewed_by: string | null
  reviewed_at: string | null
  article_id: string | null
  created_at: string
  updated_at: string
  // Joined
  author?: { full_name: string; profile_photo_url: string | null; role: string } | null
  reviewer?: { full_name: string } | null
}

export type StorySubmissionInsert = {
  title: string
  content: string
  neighbourhood?: string
  cover_image?: string | null
  author_id: string
  author_name: string
  author_email: string
  status?: 'pending' | 'approved' | 'rejected'
}

// ─── Helper ───────────────────────────────────────────────────────────────────

async function resolveRelations(rows: StorySubmission[]): Promise<StorySubmission[]> {
  const authorIds = [...new Set(rows.map((r) => r.author_id).filter(Boolean))]
  const reviewerIds = [...new Set(rows.map((r) => r.reviewed_by).filter(Boolean))] as string[]

  const [authorRes, reviewerRes] = await Promise.all([
    authorIds.length
      ? supabase.from('users').select('id, full_name, profile_photo_url, role').in('id', authorIds)
      : Promise.resolve({ data: [] }),
    reviewerIds.length
      ? supabase.from('users').select('id, full_name').in('id', reviewerIds)
      : Promise.resolve({ data: [] }),
  ])

  const authorMap = Object.fromEntries((authorRes.data ?? []).map((u: any) => [u.id, u]))
  const reviewerMap = Object.fromEntries((reviewerRes.data ?? []).map((u: any) => [u.id, u]))

  return rows.map((r) => ({
    ...r,
    author: authorMap[r.author_id] ?? null,
    reviewer: r.reviewed_by ? reviewerMap[r.reviewed_by] ?? null : null,
  }))
}

// ─── Queries ──────────────────────────────────────────────────────────────────

export async function createSubmission(data: StorySubmissionInsert): Promise<StorySubmission> {
  const { data: row, error } = await supabase
    .from('story_submissions')
    .insert(data)
    .select()
    .single()

  if (error) throw error
  return row as StorySubmission
}

export async function fetchSubmissions(status?: StorySubmission['status']): Promise<StorySubmission[]> {
  let query = supabase
    .from('story_submissions')
    .select('*')
    .order('created_at', { ascending: false })

  if (status) query = query.eq('status', status)

  const { data, error } = await query
  if (error) { console.error('[story-submissions.service]', error.message); return [] }

  return resolveRelations((data ?? []) as StorySubmission[])
}

export async function fetchSubmissionById(id: string): Promise<StorySubmission | null> {
  const { data, error } = await supabase
    .from('story_submissions')
    .select('*')
    .eq('id', id)
    .single()

  if (error) { console.error('[story-submissions.service]', error.message); return null }
  const [resolved] = await resolveRelations([data as StorySubmission])
  return resolved ?? null
}

export async function fetchMySubmissions(authorId: string): Promise<StorySubmission[]> {
  const { data, error } = await supabase
    .from('story_submissions')
    .select('*')
    .eq('author_id', authorId)
    .order('created_at', { ascending: false })

  if (error) { console.error('[story-submissions.service]', error.message); return [] }
  return (data ?? []) as StorySubmission[]
}

export type StorySubmissionUpdate = Partial<StorySubmissionInsert>

export async function updateSubmission(id: string, updates: StorySubmissionUpdate): Promise<StorySubmission | null> {
  const { data, error } = await supabase
    .from('story_submissions')
    .update(updates)
    .eq('id', id)
    .select()
    .maybeSingle()

  if (error) {
    console.error('[story-submissions.service]', error.message)
    return null
  }
  if (!data) return null
  const [resolved] = await resolveRelations([data as StorySubmission])
  return resolved ?? null
}

/**
 * Approve a submission: creates a published article from the submission content,
 * then links the article back to the submission and marks it approved.
 */
export async function approveSubmission(
  submission: StorySubmission,
  reviewerId: string
): Promise<{ articleId: string }> {
  // 1. Generate a slug from the title
  const baseSlug = submission.title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
    .slice(0, 80)

  const uniqueSlug = `${baseSlug}-${Date.now()}`

  // 2. Create the article as published
  const { data: article, error: articleError } = await supabase
    .from('articles')
    .insert({
      title: submission.title,
      slug: uniqueSlug,
      body: submission.content,
      excerpt: submission.content.slice(0, 200),
      author_id: submission.author_id,
      status: 'published',
      published_at: new Date().toISOString(),
      ...(submission.neighbourhood ? { category_id: submission.neighbourhood } : {}),
      ...(submission.cover_image ? { cover_image: submission.cover_image } : {}),
    })
    .select('id')
    .single()

  if (articleError) throw articleError

  // 3. Update submission: mark approved, link article
  const { error: updateError } = await supabase
    .from('story_submissions')
    .update({
      status: 'approved',
      reviewed_by: reviewerId,
      reviewed_at: new Date().toISOString(),
      article_id: article.id,
    })
    .eq('id', submission.id)

  if (updateError) throw updateError

  return { articleId: article.id }
}

export async function rejectSubmission(id: string, reviewerId: string): Promise<void> {
  const { error } = await supabase
    .from('story_submissions')
    .update({
      status: 'rejected',
      reviewed_by: reviewerId,
      reviewed_at: new Date().toISOString(),
    })
    .eq('id', id)

  if (error) throw error
}

export async function getSubmissionCounts(): Promise<{ pending: number; approved: number; rejected: number }> {
  const [{ count: pending }, { count: approved }, { count: rejected }] = await Promise.all([
    supabase.from('story_submissions').select('*', { count: 'exact', head: true }).eq('status', 'pending'),
    supabase.from('story_submissions').select('*', { count: 'exact', head: true }).eq('status', 'approved'),
    supabase.from('story_submissions').select('*', { count: 'exact', head: true }).eq('status', 'rejected'),
  ])

  return { pending: pending ?? 0, approved: approved ?? 0, rejected: rejected ?? 0 }
}
