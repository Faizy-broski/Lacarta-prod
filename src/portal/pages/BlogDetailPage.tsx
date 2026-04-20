'use client'

import { useEffect, useState, useRef } from 'react'
import Link from 'next/link'
import { Clock, Loader2, Facebook, Linkedin, Twitter, Globe, Instagram } from 'lucide-react'
import {
  fetchArticleBySlug,
  fetchPopularArticles,
  updateArticle,
  type Article,
} from '@/lib/services/articles.service'
import { fetchComments, createComment, type Comment } from '@/lib/services/comments.service'
import { useAuthStore } from '@/lib/auth/auth.store'
import FavoriteButton from '@public/components/listings/FavoriteButton'
import PortalAuthDialog from '@public/components/auth/PortalAuthDialog'
import { toast } from 'sonner'

// ─── Utilities ────────────────────────────────────────────────────────────────

function formatDate(dateStr: string | null) {
  if (!dateStr) return ''
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'long', day: 'numeric', year: 'numeric',
  })
}

function formatDateUpper(dateStr: string | null) {
  const d = formatDate(dateStr)
  return d ? d.toUpperCase() : ''
}

function readMinutes(body: string | null) {
  if (!body) return 1
  return Math.max(1, Math.ceil(body.replace(/<[^>]*>/g, '').split(/\s+/).length / 200))
}

function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

// ─── Table of Contents helpers ────────────────────────────────────────────────

interface Heading { id: string; text: string; level: number }

function extractHeadings(html: string): Heading[] {
  const out: Heading[] = []
  const re = /<h([23])[^>]*>([\s\S]*?)<\/h\1>/gi
  let i = 0, m: RegExpExecArray | null
  while ((m = re.exec(html)) !== null) {
    const text = m[2].replace(/<[^>]*>/g, '').trim()
    if (text) out.push({ id: `toc-${i++}`, text, level: parseInt(m[1]) })
  }
  return out
}

function injectHeadingIds(html: string): string {
  let n = 0
  return html.replace(/<h([23])([^>]*)>/gi, (_, lvl, attrs) =>
    `<h${lvl}${attrs} id="toc-${n++}">`
  )
}

// ─── Left: Table of Contents ──────────────────────────────────────────────────

function TableOfContents({ headings, activeId }: { headings: Heading[]; activeId: string | null }) {
  if (!headings.length) return null
  return (
    <aside className='hidden xl:block w-[240px] shrink-0'>
      <div className='sticky top-24 max-h-[calc(100vh-7rem)] overflow-y-auto pr-2'>
        <h3 className='mb-5 font-antigua text-lg font-bold text-gray-900 dark:text-white'>
          In this article:
        </h3>
        <ol className='relative ml-[7px] border-l-2 border-gray-200'>
          {headings.map((h) => {
            const active = activeId === h.id
            return (
              <li key={h.id} className='relative pb-1'>
                {/* timeline dot */}
                <span
                  className={`absolute -left-[8px] top-[6px] z-10 h-[14px] w-[14px] rounded-full border-[2.5px] transition-colors ${
                    active
                      ? 'border-gold bg-gold shadow-[0_0_0_3px_rgba(212,175,55,0.2)]'
                      : 'border-gray-300 bg-white'
                  }`}
                />
                <a
                  href={`#${h.id}`}
                  onClick={(e) => {
                    e.preventDefault()
                    document.getElementById(h.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
                  }}
                  className={`block py-2 pl-5 text-[13px] leading-snug transition-colors ${
                    h.level === 3 ? 'pl-8' : ''
                  } ${active ? 'font-semibold text-gold' : 'text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200'}`}
                >
                  {h.text}
                </a>
              </li>
            )
          })}
        </ol>
      </div>
    </aside>
  )
}

// ─── Right: Popular Posts ─────────────────────────────────────────────────────

function PopularPosts({ posts }: { posts: Article[] }) {
  if (!posts.length) return null
  return (
    <aside className='hidden lg:block w-[270px] shrink-0'>
      <div className='sticky top-24'>
        <div className='rounded-t-sm px-4 py-3' style={{ backgroundColor: '#3bbfad' }}>
          <h3 className='text-sm font-black uppercase tracking-wider text-white'>Popular Posts</h3>
        </div>
        <div className='border border-t-0 border-gray-200 divide-y divide-gray-100'>
          {posts.map((post) => (
            <Link key={post.id} href={`/blog/${post.slug}`}
              className='block bg-[#f5f5f5] px-4 py-4 transition-colors hover:bg-white'>
              <p className='mb-2 text-sm font-black leading-snug text-black line-clamp-3'>
                {post.title}
              </p>
              <div className='flex items-center justify-between text-xs text-gray-400'>
                <span>{formatDate(post.published_at ?? post.created_at)}</span>
                <span className='flex items-center gap-1'>
                  <Clock size={10} /> {readMinutes(post.body)} min read
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </aside>
  )
}

// ─── Author Bio ────────────────────────────────────────────────────────────────

function AuthorBio({ article }: { article: Article }) {
  const author = article.author
  if (!author) return null

  const name = author.full_name || 'La Carta'
  const bio  = author.bio || null

  return (
    <div className='mt-10 border-t border-gray-200 pt-8'>
      <div className='flex items-start gap-5'>
        {author.profile_photo_url ? (
          <img src={author.profile_photo_url} alt={name}
            className='h-16 w-16 shrink-0 rounded-full border-2 border-gray-100 object-cover' />
        ) : (
          <div className='flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-gold/20 text-2xl font-black text-gold'>
            {name[0].toUpperCase()}
          </div>
        )}

        <div className='flex-1 min-w-0'>
          <p className='font-black text-base text-black'>{name}</p>

          {bio ? (
            <p className='mt-1 text-sm leading-relaxed italic' style={{ color: '#3bbfad' }}>{bio}</p>
          ) : null}

          {/* Social links */}
          <div className='mt-3 flex flex-wrap items-center gap-3'>
            {author.facebook_url ? (
              <a href={author.facebook_url} target='_blank' rel='noopener noreferrer'
                className='flex items-center gap-1.5 text-xs font-semibold text-[#1877F2] hover:underline'>
                <Facebook size={14} /> Facebook
              </a>
            ) : (
              <p className='text-sm font-black text-gray-600'>No Facebook profile available for this author.</p>
            )}
            {author.twitter_url && (
              <a href={author.twitter_url} target='_blank' rel='noopener noreferrer'
                className='flex items-center gap-1.5 text-xs font-semibold text-black hover:underline'>
                <Twitter size={14} /> Twitter
              </a>
            )}
            {author.instagram_url && (
              <a href={author.instagram_url} target='_blank' rel='noopener noreferrer'
                className='flex items-center gap-1.5 text-xs font-semibold text-[#E1306C] hover:underline'>
                <Instagram size={14} /> Instagram
              </a>
            )}
            {author.website_url && (
              <a href={author.website_url} target='_blank' rel='noopener noreferrer'
                className='flex items-center gap-1.5 text-xs font-semibold text-gray-600 hover:underline'>
                <Globe size={14} /> Website
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Social Share ─────────────────────────────────────────────────────────────

function SocialShare({ title }: { title: string }) {
  const open = (platform: string) => {
    if (typeof window === 'undefined') return
    const url  = encodeURIComponent(window.location.href)
    const text = encodeURIComponent(title)
    const map: Record<string, string> = {
      facebook:  `https://www.facebook.com/sharer/sharer.php?u=${url}`,
      linkedin:  `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
      whatsapp:  `https://wa.me/?text=${text}%20${url}`,
      twitter:   `https://twitter.com/intent/tweet?url=${url}&text=${text}`,
    }
    window.open(map[platform], '_blank', 'noopener,noreferrer,width=600,height=500')
  }

  return (
    <div className='mt-10 border-t border-gray-200 pt-8'>
      <p className='mb-4 text-base font-black uppercase tracking-wider text-black'>Share This:</p>
      <div className='flex flex-wrap gap-3'>
        <button onClick={() => open('facebook')}
          className='flex items-center gap-2 rounded px-5 py-2.5 text-sm font-black text-white transition hover:opacity-90'
          style={{ backgroundColor: '#1877F2' }}>
          <Facebook size={15} fill='white' stroke='none' /> Facebook
        </button>
        <button onClick={() => open('linkedin')}
          className='flex items-center gap-2 rounded px-5 py-2.5 text-sm font-black text-white transition hover:opacity-90'
          style={{ backgroundColor: '#0A66C2' }}>
          <Linkedin size={15} fill='white' stroke='none' /> Linkedin
        </button>
        <button onClick={() => open('whatsapp')}
          className='flex items-center gap-2 rounded px-5 py-2.5 text-sm font-black text-white transition hover:opacity-90'
          style={{ backgroundColor: '#25D366' }}>
          <svg width='15' height='15' viewBox='0 0 24 24' fill='white'>
            <path d='M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z'/>
          </svg>
          Whatsapp
        </button>
        <button onClick={() => open('twitter')}
          className='flex items-center gap-2 rounded px-5 py-2.5 text-sm font-black text-white transition hover:opacity-90'
          style={{ backgroundColor: '#000' }}>
          <svg width='14' height='14' viewBox='0 0 24 24' fill='white'>
            <path d='M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z'/>
          </svg>
          Twitter
        </button>
      </div>
    </div>
  )
}

// ─── Comments ─────────────────────────────────────────────────────────────────

function CommentSection({
  article,
  comments,
  user,
  onOpenAuth,
}: {
  article: Article
  comments: Comment[]
  user: any | null
  onOpenAuth: () => void
}) {
  const [text, setText] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user) { onOpenAuth(); return }
    if (!text.trim()) return
    setSubmitting(true)
    try {
      await createComment(article.id, user.accountNo, text.trim())
      setText('')
      toast.success('Comment submitted for review!')
    } catch {
      toast.error('Could not submit comment.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className='mt-12 border-t border-gray-200 pt-10'>
      <h3 className='font-antigua font-black text-2xl text-black mb-1'>
        Leave a Comment:
      </h3>

      {user ? (
        <p className='mb-6 text-sm text-gray-500'>
          Logged in as{' '}
          <span className='font-semibold' style={{ color: '#3bbfad' }}>
            {user.name || user.email}
          </span>
          . Required fields are marked with <span className='text-red-500 font-bold'>*</span>
        </p>
      ) : (
        <p className='mb-6 text-sm text-gray-500'>
          <button onClick={onOpenAuth}
            className='font-semibold hover:underline' style={{ color: '#3bbfad' }}>
            Sign in
          </button>{' '}
          to leave a comment. Required fields are marked with <span className='text-red-500 font-bold'>*</span>
        </p>
      )}

      <form onSubmit={handleSubmit} className='space-y-4'>
        <div>
          <label className='mb-2 block text-sm font-black text-black'>
            Comment <span className='text-red-500'>*</span>
          </label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={5}
            className='w-full border-b border-gray-300 bg-transparent px-0 py-2 text-sm outline-none focus:border-gray-700 resize-none'
            placeholder='Share your thoughts...'
          />
        </div>

        <button
          type='submit'
          disabled={submitting || !text.trim()}
          className='rounded-full px-6 py-2.5 text-sm font-black text-black transition hover:brightness-110 disabled:opacity-50'
          style={{ backgroundColor: '#f5c542' }}
        >
          {submitting
            ? <span className='flex items-center gap-2'><Loader2 size={14} className='animate-spin' /> Posting…</span>
            : 'Post Comment'}
        </button>
      </form>

      {/* Existing comments */}
      {comments.length > 0 && (
        <div className='mt-10 space-y-6'>
          <h4 className='font-black text-base text-black'>
            {comments.length} Comment{comments.length !== 1 ? 's' : ''}
          </h4>
          {comments.map((c) => (
            <div key={c.id} className='flex gap-4 border-b border-gray-100 pb-6 last:border-0'>
              <div className='flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gold/20 text-sm font-bold text-gold'>
                {(c.user?.full_name || 'U').charAt(0).toUpperCase()}
              </div>
              <div>
                <div className='mb-1 flex items-baseline gap-3'>
                  <span className='text-sm font-black text-black'>{c.user?.full_name ?? 'User'}</span>
                  <span className='text-xs text-gray-400'>{formatDate(c.created_at)}</span>
                </div>
                <p className='text-sm leading-relaxed text-gray-700'>{c.body}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

interface Props { slug: string }


function coverImage(raw: string | null): string | null {
  if (!raw) return null
  return raw.split('|')[0].trim() || null
}

export default function BlogDetailPage({ slug }: Props) {
  const user = useAuthStore((s) => s.user)
  const [article, setArticle]       = useState<Article | null>(null)
  const [popular, setPopular]       = useState<Article[]>([])
  const [comments, setComments]     = useState<Comment[]>([])
  const [loading, setLoading]       = useState(true)
  const [activeId, setActiveId]     = useState<string | null>(null)
  const [authOpen, setAuthOpen]     = useState(false)

  // ── Fetch ────────────────────────────────────────────────────────────────

  useEffect(() => {
    if (!slug) return
    setLoading(true)
    fetchArticleBySlug(slug).then(async (data) => {
      setArticle(data)
      setLoading(false)
      if (!data) return
      updateArticle(data.id, { views: (data.views ?? 0) + 1 } as any).catch(() => {})
      const [cmts, pop] = await Promise.all([
        fetchComments(data.id, 'approved'),
        fetchPopularArticles(5),
      ])
      setComments(cmts)
      setPopular(pop.filter((a) => a.id !== data.id).slice(0, 4))
    })
  }, [slug])

  // ── Scroll spy ───────────────────────────────────────────────────────────

  useEffect(() => {
    if (!article?.body) return
    const observer = new IntersectionObserver(
      (entries) => {
        const hit = entries.find((e) => e.isIntersecting)
        if (hit) setActiveId(hit.target.id)
      },
      { rootMargin: '-10% 0px -75% 0px', threshold: 0 }
    )
    const t = setTimeout(() => {
      document.querySelectorAll('[id^="toc-"]').forEach((el) => observer.observe(el))
    }, 150)
    return () => { clearTimeout(t); observer.disconnect() }
  }, [article?.body])

  // ── States ───────────────────────────────────────────────────────────────

  if (loading) {
    return (
      <div className='flex h-screen w-full items-center justify-center'>
        <Loader2 size={32} className='animate-spin text-gold' />
      </div>
    )
  }

  if (!article) {
    return (
      <div className='flex h-screen flex-col items-center justify-center gap-4'>
        <p className='font-antigua text-xl font-black'>Article not found</p>
        <Link href='/blog' className='text-sm text-gold underline'>← Back to Blog</Link>
      </div>
    )
  }

  const headings  = extractHeadings(article.body ?? '')
  const bodyHtml  = injectHeadingIds(article.body ?? '')
  const mins      = readMinutes(article.body)
  const published = article.published_at ?? article.created_at
  const updated   = article.updated_at !== article.created_at ? article.updated_at : null

  return (
    <div className='min-h-screen bg-white'>
      <PortalAuthDialog open={authOpen} onOpenChange={setAuthOpen} />

      {/* ── Hero ── */}
      <div className='relative h-64 w-full overflow-hidden md:h-[380px]'>
        {coverImage(article.cover_image) ? (
          <img src={coverImage(article.cover_image)!} alt={article.title}
            className='h-full w-full object-cover' />
        ) : (
          <div className='h-full w-full bg-gray-200' />
        )}
        <div className='absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent' />
      </div>

      {/* ── 3-column body ── */}
      <div className='mx-auto max-w-[1400px] px-4 py-10 md:px-8'>
        <div className='flex gap-10'>

          {/* LEFT: ToC */}
          <TableOfContents headings={headings} activeId={activeId} />

          {/* CENTER: Article */}
          <article className='min-w-0 flex-1'>

            {/* Breadcrumb */}
            <nav className='mb-3 text-xs font-semibold'>
              <Link href='/' className='hover:underline' style={{ color: '#3bbfad' }}>
                La Carta - Cartagena Culture &amp; Tourism
              </Link>
              {article.category?.name && (
                <>
                  <span className='mx-1 text-gray-400'>›</span>
                  <Link
                    href={`/blog?category=${encodeURIComponent(article.category.name)}`}
                    className='hover:underline' style={{ color: '#3bbfad' }}>
                    {article.category.name}
                  </Link>
                  <span className='mx-1 text-gray-400'>›</span>
                  <span className='text-gray-500 line-clamp-1'>{article.title}</span>
                </>
              )}
            </nav>

            {/* Title */}
            <h1 className='font-antigua font-black leading-tight text-black'
              style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.6rem)' }}>
              {article.title}
            </h1>

            {/* Meta */}
            <div className='mt-3 flex flex-wrap items-center gap-2 text-[11px] font-bold uppercase tracking-wide text-gray-500'>
              <span className='flex items-center gap-1'>
                <svg viewBox='0 0 20 20' fill='currentColor' className='h-3 w-3 text-gray-400'>
                  <path d='M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zM4 8h12v8H4V8z'/>
                </svg>
                Published: {formatDateUpper(published)}
              </span>
              {updated && (
                <>
                  <span className='text-gray-300'>|</span>
                  <span>Last Updated: {formatDateUpper(updated)}</span>
                </>
              )}
              <span className='text-gray-300'>|</span>
              <span className='flex items-center gap-1'>
                <Clock size={11} /> {mins} min read
              </span>
            </div>

            {/* Author / Editor cards */}
            <div className='mt-4 flex flex-wrap items-stretch gap-3'>
              {/* Written by */}
              <div className='flex items-center gap-3 rounded border border-gray-200 bg-gray-50 px-4 py-3'>
                <span className='text-[10px] font-black uppercase tracking-wider text-gray-400 whitespace-nowrap'>
                  Written by:
                </span>
                {article.author?.profile_photo_url ? (
                  <img src={article.author.profile_photo_url} alt=''
                    className='h-8 w-8 shrink-0 rounded-full object-cover' />
                ) : (
                  <div className='flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gold/20 text-sm font-black text-gold'>
                    {(article.author?.full_name || 'L').charAt(0).toUpperCase()}
                  </div>
                )}
                <div>
                  <p className='text-sm font-black uppercase text-black'>
                    {article.author?.full_name ?? 'La Carta'}
                  </p>
                  {article.author?.role && (
                    <p className='text-[10px] uppercase tracking-wide text-gray-400'>
                      {capitalize(article.author.role)}
                    </p>
                  )}
                </div>
              </div>

              {/* Edited by — only shown if editor exists */}
              {article.editor && (
                <div className='flex items-center gap-3 rounded border border-gray-200 bg-gray-50 px-4 py-3'>
                  <span className='text-[10px] font-black uppercase tracking-wider text-gray-400 whitespace-nowrap'>
                    Edited by:
                  </span>
                  <div className='flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#3bbfad]/20 text-sm font-black' style={{ color: '#3bbfad' }}>
                    {article.editor.full_name[0].toUpperCase()}
                  </div>
                  <div>
                    <p className='text-sm font-black uppercase text-black'>
                      {article.editor.full_name}
                    </p>
                    {article.editor.role && (
                      <p className='text-[10px] uppercase tracking-wide text-gray-400'>
                        {capitalize(article.editor.role)}
                      </p>
                    )}
                  </div>
                </div>
              )}

              <div className='ml-auto flex items-center gap-3 self-start'>
                <div onClick={(e) => e.preventDefault()}>
                  <FavoriteButton listingId={article.id} />
                </div>
                <Link href='/blog' className='text-xs text-gray-400 transition hover:text-gold'>
                  ← Blog
                </Link>
              </div>
            </div>

            {/* Excerpt */}
            {article.excerpt && (
              <p className='mt-6 border-l-4 border-gold pl-4 text-base italic leading-relaxed text-gray-600'>
                {article.excerpt}
              </p>
            )}

            {/* Body */}
            <div className='mt-8'>
              {article.body ? (
                <div
                  className='prose prose-base max-w-none
                    prose-headings:font-antigua prose-headings:font-black prose-headings:text-black
                    prose-a:text-[#3bbfad] prose-a:no-underline hover:prose-a:underline
                    prose-img:rounded-xl prose-img:shadow-md
                    prose-blockquote:border-l-gold prose-blockquote:bg-gold/5 prose-blockquote:rounded-r-xl
                    prose-strong:font-black'
                  dangerouslySetInnerHTML={{ __html: bodyHtml }}
                />
              ) : (
                <p className='py-16 text-center font-antigua text-gray-400'>No content yet.</p>
              )}
            </div>

            {/* Category tag */}
            {article.category?.name && (
              <div className='mt-8 border-t border-gray-100 pt-6'>
                <Link
                  href={`/blog?category=${encodeURIComponent(article.category.name)}`}
                  className='inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-4 py-1.5 text-xs font-bold text-gold transition hover:bg-gold hover:text-white'>
                  {article.category.name}
                </Link>
              </div>
            )}

            {/* Author bio */}
            <AuthorBio article={article} />

            {/* Share */}
            <SocialShare title={article.title} />

            {/* Comments */}
            <CommentSection
              article={article}
              comments={comments}
              user={user}
              onOpenAuth={() => setAuthOpen(true)}
            />
          </article>

          {/* RIGHT: Popular posts */}
          <PopularPosts posts={popular} />

        </div>
      </div>
    </div>
  )
}
