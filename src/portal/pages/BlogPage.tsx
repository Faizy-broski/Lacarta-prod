'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import {
  Search, Star, Activity, Users, Newspaper, Palette, Trophy,
  Briefcase, Waves, Building2, UtensilsCrossed, Globe, BedDouble,
  Loader2, Clock, Eye, ChevronLeft, ChevronRight, Tag,
  type LucideIcon,
} from 'lucide-react'
import useEmblaCarousel from 'embla-carousel-react'
import { fetchArticles, fetchFeaturedArticles, type Article } from '@/lib/services/articles.service'
import { supabase } from '@/lib/supabase'
import FavoriteButton from '@public/components/listings/FavoriteButton'

// ── Category icon map ────────────────────────────────────────────────────────
const ICON_MAP: Record<string, LucideIcon> = {
  'Activities':        Activity,
  'People':            Users,
  'News':              Newspaper,
  'Art & Fashion':     Palette,
  'Sports':            Trophy,
  'Business':          Briefcase,
  'Beaches':           Waves,
  'Real Estate':       Building2,
  'Gastronomy':        UtensilsCrossed,
  'Culture & Tourism': Globe,
  'Accommodations':    BedDouble,
  'Boating':           Waves,
  'Culture':           Globe,
}

type CategoryItem = { id: string; label: string; Icon: LucideIcon }
const POPULAR_ITEM: CategoryItem = { id: '__popular__', label: 'Popular', Icon: Star }

function formatDate(dateStr: string | null) {
  if (!dateStr) return ''
  return new Date(dateStr).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
}

function readMinutes(body: string | null) {
  if (!body) return 1
  const words = body.replace(/<[^>]*>/g, '').split(/\s+/).length
  return Math.max(1, Math.ceil(words / 200))
}

// ── Article card ─────────────────────────────────────────────────────────────
function ArticleCard({ article }: { article: Article }) {
  return (
    <Link
      href={`/blog/${article.slug}`}
      className='flex gap-3 bg-white p-3 rounded cursor-pointer hover:shadow-lg transition relative group'
    >
      <div className='flex-shrink-0 rounded overflow-hidden w-[90px] h-[90px]'>
        {article.cover_image ? (
          <img src={article.cover_image} alt={article.title} className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-300' />
        ) : (
          <div className='w-full h-full bg-gray-200 flex items-center justify-center text-gray-400 text-xs'>No image</div>
        )}
      </div>
      <div className='flex-1 min-w-0 pr-8'>
        <span className='text-[10px] font-bold uppercase text-gold mb-1 block'>
          {article.category?.name ?? ''}
        </span>
        <h3 className='font-black text-sm leading-snug mb-1 text-black line-clamp-3 group-hover:text-gold transition-colors'>
          {article.title}
        </h3>
        <p className='text-xs uppercase font-semibold text-gray-500'>
          {article.author?.full_name ?? 'La Carta'}
        </p>
        <div className='flex items-center gap-2 mt-0.5 text-gray-400 text-[10px]'>
          <span>{formatDate(article.published_at ?? article.created_at)}</span>
          <span>·</span>
          <Clock size={10} />
          <span>{readMinutes(article.body)} min read</span>
          {article.views > 0 && (
            <>
              <span>·</span>
              <Eye size={10} />
              <span>{article.views}</span>
            </>
          )}
        </div>
      </div>
      <div className='absolute top-3 right-3' onClick={(e) => e.preventDefault()}>
        <FavoriteButton listingId={article.id} className='!p-1.5' />
      </div>
    </Link>
  )
}

// ── Featured hero card ────────────────────────────────────────────────────────
function FeaturedCard({ article }: { article: Article }) {
  return (
    <Link href={`/blog/${article.slug}`} className='relative overflow-hidden block h-72 md:h-auto md:[grid-row:1/3] group'>
      {article.cover_image ? (
        <img src={article.cover_image} alt={article.title} className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-500' />
      ) : (
        <div className='w-full h-full bg-gray-300' />
      )}
      <div className='absolute inset-0' style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.82) 55%, transparent 100%)' }} />
      <div className='absolute top-4 left-4'>
        <span className='text-xs font-black px-3 py-1 rounded-full bg-gold text-black'>
          {article.category?.name ?? 'Culture'}
        </span>
      </div>
      <div className='absolute bottom-0 left-0 right-0 p-5'>
        <h2 className='font-antigua font-black text-white text-lg md:text-xl leading-snug mb-3 line-clamp-3'>
          {article.title}
        </h2>
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-2'>
            {article.author?.profile_photo_url ? (
              <img src={article.author.profile_photo_url} alt='' className='w-8 h-8 rounded-full object-cover border-2 border-white' />
            ) : (
              <div className='w-8 h-8 rounded-full bg-gold/70 flex items-center justify-center text-white text-xs font-bold border-2 border-white'>
                {(article.author?.full_name ?? 'L')[0]}
              </div>
            )}
            <div>
              <p className='text-white font-bold text-xs'>{article.author?.full_name ?? 'La Carta'}</p>
              <p className='text-gray-300 text-xs'>{formatDate(article.published_at ?? article.created_at)}</p>
            </div>
          </div>
          <span className='text-white text-xs font-bold'>{readMinutes(article.body)} MIN READ</span>
        </div>
      </div>
    </Link>
  )
}

// ── Grid thumbnail card ───────────────────────────────────────────────────────
function GridCard({ article }: { article: Article }) {
  return (
    <Link href={`/blog/${article.slug}`} className='overflow-hidden block relative group'>
      {article.cover_image ? (
        <img src={article.cover_image} alt={article.title} className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-300' />
      ) : (
        <div className='w-full h-full bg-gray-200' />
      )}
      <div className='absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors' />
      <div className='absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity'>
        <p className='text-white text-xs font-bold line-clamp-2'>{article.title}</p>
      </div>
    </Link>
  )
}

// ── Featured Carousel ─────────────────────────────────────────────────────────
function FeaturedCarousel({ articles }: { articles: Article[] }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'start' })
  const [canPrev, setCanPrev] = useState(false)
  const [canNext, setCanNext] = useState(false)
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    if (!emblaApi) return
    const onSelect = () => {
      setCanPrev(emblaApi.canScrollPrev())
      setCanNext(emblaApi.canScrollNext())
      setCurrent(emblaApi.selectedScrollSnap())
    }
    emblaApi.on('select', onSelect)
    onSelect()
    // autoplay
    const timer = setInterval(() => emblaApi.scrollNext(), 5000)
    return () => { clearInterval(timer); emblaApi.off('select', onSelect) }
  }, [emblaApi])

  if (articles.length === 0) return null

  return (
    <div className='relative group/carousel'>
      {/* Slides */}
      <div ref={emblaRef} className='overflow-hidden'>
        <div className='flex'>
          {articles.map((article) => (
            <div key={article.id} className='relative min-w-0 flex-[0_0_100%]'>
              <Link href={`/blog/${article.slug}`} className='block relative h-[420px] md:h-[560px]'>
                {article.cover_image ? (
                  <img src={article.cover_image} alt={article.title} className='h-full w-full object-cover' />
                ) : (
                  <div className='h-full w-full bg-gray-300' />
                )}
                <div className='absolute inset-0' style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.85) 30%, rgba(0,0,0,0.15) 100%)' }} />

                <div className='absolute bottom-0 left-0 right-0 p-6 md:p-10'>
                  <span className='mb-3 inline-block rounded-full bg-gold px-3 py-1 text-xs font-black text-black'>
                    {article.category?.name ?? 'Culture'}
                  </span>
                  <h2 className='font-antigua font-black text-white text-xl md:text-3xl leading-snug mb-4 max-w-2xl line-clamp-3'>
                    {article.title}
                  </h2>
                  <div className='flex items-center justify-between max-w-2xl'>
                    <div className='flex items-center gap-3'>
                      {article.author?.profile_photo_url ? (
                        <img src={article.author.profile_photo_url} alt='' className='h-9 w-9 rounded-full border-2 border-white object-cover' />
                      ) : (
                        <div className='flex h-9 w-9 items-center justify-center rounded-full border-2 border-white bg-gold/70 text-xs font-bold text-white'>
                          {(article.author?.full_name || 'L').charAt(0)}
                        </div>
                      )}
                      <div>
                        <p className='text-sm font-bold text-white'>{article.author?.full_name ?? 'La Carta'}</p>
                        <p className='text-xs text-gray-300'>{formatDate(article.published_at ?? article.created_at)}</p>
                      </div>
                    </div>
                    <span className='text-xs font-bold uppercase text-white'>{readMinutes(article.body)} min read</span>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Arrows */}
      {canPrev && (
        <button
          onClick={() => emblaApi?.scrollPrev()}
          className='absolute left-3 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-black/50 text-white opacity-0 transition group-hover/carousel:opacity-100 hover:bg-black/70'
        >
          <ChevronLeft size={22} />
        </button>
      )}
      {canNext && (
        <button
          onClick={() => emblaApi?.scrollNext()}
          className='absolute right-3 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-black/50 text-white opacity-0 transition group-hover/carousel:opacity-100 hover:bg-black/70'
        >
          <ChevronRight size={22} />
        </button>
      )}

      {/* Dots */}
      <div className='absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2'>
        {articles.map((_, i) => (
          <button
            key={i}
            onClick={() => emblaApi?.scrollTo(i)}
            className={`h-2 rounded-full transition-all ${i === current ? 'w-6 bg-gold' : 'w-2 bg-white/60 hover:bg-white'}`}
          />
        ))}
      </div>
    </div>
  )
}

// ── Recent article row ────────────────────────────────────────────────────────
function RecentCard({ article }: { article: Article }) {
  return (
    <Link href={`/blog/${article.slug}`} className='flex gap-4 group'>
      <div className='flex-shrink-0 w-24 h-20 rounded-xl overflow-hidden'>
        {article.cover_image ? (
          <img src={article.cover_image} alt='' className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-300' />
        ) : (
          <div className='w-full h-full bg-gray-200' />
        )}
      </div>
      <div className='flex-1 min-w-0'>
        <span className='text-[10px] font-bold uppercase text-gold'>{article.category?.name ?? ''}</span>
        <h4 className='font-black text-sm text-black leading-snug mt-0.5 line-clamp-2 group-hover:text-gold transition-colors'>
          {article.title}
        </h4>
        <p className='text-xs text-gray-400 mt-1'>
          {formatDate(article.published_at ?? article.created_at)}
        </p>
      </div>
    </Link>
  )
}

// ── Main page ─────────────────────────────────────────────────────────────────
export default function BlogPage() {
  const [articles, setArticles] = useState<Article[]>([])
  const [featuredArticles, setFeaturedArticles] = useState<Article[]>([])
  const [categories, setCategories] = useState<CategoryItem[]>([POPULAR_ITEM])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [searchInput, setSearchInput] = useState('')
  const [activeCategory, setActiveCategory] = useState<string | null>(null) // null = Popular/all
  const [categoryIds, setCategoryIds] = useState<Record<string, string>>({})

  // Fetch featured articles for carousel (independent of category filter)
  useEffect(() => {
    fetchFeaturedArticles(6).then((data) => {
      setFeaturedArticles(data)
    })
  }, [])

  // Fetch all categories from DB once — builds both the category nav + UUID map
  useEffect(() => {
    supabase
      .from('categories')
      .select('id, name')
      .eq('type', 'blog')
      .order('name', { ascending: true })
      .then(({ data }) => {
        if (!data) return
        const map: Record<string, string> = {}
        const items: CategoryItem[] = [POPULAR_ITEM]
        data.forEach((c: any) => {
          map[c.name] = c.id
          items.push({
            id: c.id,
            label: c.name as string,
            Icon: ICON_MAP[c.name] ?? Tag,
          })
        })
        setCategoryIds(map)
        setCategories(items)
      })
  }, [])

  const loadArticles = useCallback(async (categoryLabel: string | null, searchTerm: string) => {
    setLoading(true)
    const filters: Parameters<typeof fetchArticles>[0] = { status: 'published', limit: 50 }

    if (categoryLabel && categoryLabel !== 'Popular') {
      // Use the category UUID directly from the map
      const catId = categoryIds[categoryLabel]
      if (catId) filters.category_id = catId
    }

    let { articles: results } = await fetchArticles(filters)

    if (categoryLabel === 'Popular') {
      results = [...results].sort((a, b) => (b.views ?? 0) - (a.views ?? 0))
    }

    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase()
      results = results.filter(
        (a) => a.title.toLowerCase().includes(q) || (a.excerpt ?? '').toLowerCase().includes(q)
      )
    }

    setArticles(results)
    setLoading(false)
  }, [categoryIds])

  useEffect(() => {
    loadArticles(activeCategory, search)
  }, [activeCategory, search, loadArticles])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    setSearch(searchInput)
    setActiveCategory(null)
  }

  const featured = articles[0] ?? null
  const mosaicGrid = articles.slice(1, 5)
  const listArticles = search || activeCategory ? articles : articles.slice(5)
  const recent = articles.slice(0, 6)

  return (
    <div className='min-h-screen bg-white'>

      {/* Teal banner */}
      <div className='w-full py-2 text-center text-sm font-bold bg-[#3bbfad] text-white'>
        Download our FREE Cartagena Travel Guide!
      </div>

      {/* ── Featured Carousel ── */}
      {<FeaturedCarousel articles={featuredArticles.length > 0 ? featuredArticles : articles.slice(0, 8)} />}

      {/* ── What Would You Like To Learn About ── */}
      <div className='px-4 md:px-10 py-12 max-w-[1400px] mx-auto'>
        <p className='text-sm mb-4'>
          <span className='font-semibold italic text-gold'>La Carta – Cartagena Culture &amp; Tourism</span>
          <span className='font-bold text-black'> › Blog</span>
          {activeCategory && (
            <><span className='text-black'> › </span><span className='font-bold text-black'>{activeCategory}</span></>
          )}
        </p>

        <h1 className='font-antigua font-black mb-6' style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', color: '#000', lineHeight: 1.1 }}>
          {activeCategory ? activeCategory : 'What Would You Like To Learn About?'}
        </h1>

        {/* Search */}
        <form onSubmit={handleSearch} className='flex mb-12 max-w-[900px]'>
          <input
            type='text'
            placeholder='Search articles...'
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className='flex-1 px-4 py-3 text-sm outline-none border border-r-0 border-gray-200 bg-[#f0f4ff]'
          />
          <button type='submit' className='px-5 flex items-center justify-center bg-gold hover:brightness-110 transition'>
            <Search size={18} color='#000' />
          </button>
        </form>

        {/* Category icon grid */}
        <div className='grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-8 mb-4'>
          {categories.map(({ id, label, Icon }) => {
            const isActive = activeCategory === label || (label === 'Popular' && activeCategory === null)
            return (
              <button
                key={id}
                onClick={() => {
                  setActiveCategory(label === 'Popular' ? null : label)
                  setSearch('')
                  setSearchInput('')
                }}
                className={`flex flex-col items-center gap-3 transition ${isActive ? 'opacity-100' : 'opacity-50 hover:opacity-80'}`}
              >
                <Icon size={64} strokeWidth={1.2} color={isActive ? '#d0a439' : '#000'} />
                <span className={`text-sm font-semibold text-center leading-tight ${isActive ? 'text-gold' : 'text-black'}`}>
                  {label}
                </span>
                {isActive && <span className='w-8 h-0.5 bg-gold rounded-full' />}
              </button>
            )
          })}
        </div>
      </div>

      {/* ── Article grid on gold background ── */}
      <div className='py-10 px-4 md:px-10 bg-gold'>
        <div className='max-w-[1400px] mx-auto'>
          {loading ? (
            <div className='flex justify-center py-16'>
              <Loader2 size={32} className='animate-spin text-black' />
            </div>
          ) : listArticles.length === 0 ? (
            <div className='text-center py-16'>
              <p className='font-antigua font-black text-xl text-black'>
                {search ? `No articles found for "${search}"` : 'No articles in this category yet.'}
              </p>
              {search && (
                <button onClick={() => { setSearch(''); setSearchInput(''); }} className='mt-4 underline text-black text-sm'>
                  Clear search
                </button>
              )}
            </div>
          ) : (
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3'>
              {listArticles.map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ── Most Recent Articles ── */}
      <div className='py-16 px-4 md:px-10 max-w-[1400px] mx-auto'>
        <h2 className='font-antigua font-black uppercase text-center mb-10' style={{ fontSize: 'clamp(2rem, 6vw, 4rem)', color: '#000', letterSpacing: '0.06em' }}>
          Most Recent Articles
        </h2>

        {loading ? (
          <div className='flex justify-center py-8'>
            <Loader2 size={24} className='animate-spin text-gold' />
          </div>
        ) : recent.length === 0 ? (
          <p className='text-center text-gray-400 font-antigua'>No articles published yet.</p>
        ) : (
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8'>
            {recent.map((a) => <RecentCard key={a.id} article={a} />)}
          </div>
        )}
      </div>

    </div>
  )
}
