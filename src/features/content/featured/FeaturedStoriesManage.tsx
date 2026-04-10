'use client'

import { useEffect, useState, useCallback } from 'react'
import { Loader2, Star, X, Search, CheckSquare } from 'lucide-react'
import { toast } from 'sonner'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  fetchFeaturedArticles,
  fetchPublishedArticlesPicker,
  toggleArticleFeatured,
  type Article,
} from '@/lib/services/articles.service'

type PickerItem = {
  id: string
  title: string
  slug: string
  cover_image: string | null
  category_name: string | null
}

const MAX_FEATURED = 4

export function FeaturedStoriesManage() {
  const [featured, setFeatured] = useState<Article[]>([])
  const [picker, setPicker] = useState<PickerItem[]>([])
  const [loadingFeatured, setLoadingFeatured] = useState(true)
  const [loadingPicker, setLoadingPicker] = useState(true)
  const [toggling, setToggling] = useState<string | null>(null)
  const [search, setSearch] = useState('')

  const loadFeatured = useCallback(async () => {
    setLoadingFeatured(true)
    const data = await fetchFeaturedArticles(MAX_FEATURED)
    setFeatured(data)
    setLoadingFeatured(false)
  }, [])

  const loadPicker = useCallback(async () => {
    setLoadingPicker(true)
    const data = await fetchPublishedArticlesPicker(50)
    setPicker(data)
    setLoadingPicker(false)
  }, [])

  useEffect(() => {
    loadFeatured()
    loadPicker()
  }, [loadFeatured, loadPicker])

  const handleAssign = async (item: PickerItem & { is_featured?: boolean }, position: number) => {
    if (featured.length >= MAX_FEATURED && !featuredIds.has(item.id)) {
      toast.error(`Maximum ${MAX_FEATURED} featured stories allowed. Remove one first.`)
      return
    }
    setToggling(item.id)
    try {
      await toggleArticleFeatured(item.id, true, position)
      toast.success(`"${item.title}" set as Position #${position}.`)
      await Promise.all([loadFeatured(), loadPicker()])
    } catch (err: any) {
      toast.error(err?.message ?? 'Failed to feature article.')
    } finally {
      setToggling(null)
    }
  }

  const handleRemove = async (article: Article) => {
    setToggling(article.id)
    try {
      await toggleArticleFeatured(article.id, false, null)
      toast.success(`"${article.title}" removed from featured.`)
      await Promise.all([loadFeatured(), loadPicker()])
    } catch (err: any) {
      toast.error(err?.message ?? 'Failed to unfeature article.')
    } finally {
      setToggling(null)
    }
  }

  // Next available position
  const nextPosition = () => {
    const usedPositions = new Set(featured.map((f) => f.featured_position).filter(Boolean))
    for (let p = 1; p <= MAX_FEATURED; p++) {
      if (!usedPositions.has(p)) return p
    }
    return featured.length + 1
  }

  // Set of currently featured article IDs (to exclude from picker + cap check)
  const featuredIds = new Set(featured.map((f) => f.id))

  const filteredPicker = picker.filter(
    (p) =>
      !featuredIds.has(p.id) &&
      p.title.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <>
      <Header />
      <Main>
        <div className='mb-6'>
          <h1 className='font-antigua text-2xl font-bold tracking-tight'>Featured Stories</h1>
          <p className='mt-1 text-sm text-muted-foreground'>
            Manage the articles displayed in the blog page carousel (max {MAX_FEATURED}).
          </p>
        </div>

        {/* ── Currently Featured ──────────────────────────────────────── */}
        <section className='mb-8'>
          <div className='mb-3 flex items-center justify-between'>
            <h2 className='font-antigua text-lg font-semibold'>
              Currently Featured
              <span className='ml-2 text-sm font-normal text-muted-foreground'>
                ({featured.length}/{MAX_FEATURED})
              </span>
            </h2>
          </div>

          {loadingFeatured ? (
            <div className='flex justify-center py-8'>
              <Loader2 className='h-5 w-5 animate-spin text-muted-foreground' />
            </div>
          ) : featured.length === 0 ? (
            <div className='flex flex-col items-center justify-center rounded-lg border border-dashed py-10 text-center gap-2'>
              <Star size={28} className='text-muted-foreground/40' />
              <p className='text-sm text-muted-foreground'>No featured stories yet. Pick articles below.</p>
            </div>
          ) : (
            <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4'>
              {featured.map((article) => (
                <Card key={article.id} className='overflow-hidden p-0 relative group'>
                  <div className='relative h-36 bg-gray-100'>
                    {article.cover_image ? (
                      <img
                        src={article.cover_image}
                        alt={article.title}
                        className='h-full w-full object-cover'
                      />
                    ) : (
                      <div className='h-full w-full bg-gradient-to-br from-gold/20 to-muted' />
                    )}
                    {/* Position badge */}
                    <div className='absolute top-2 left-2 flex h-7 w-7 items-center justify-center rounded-full bg-gold text-xs font-bold text-black shadow'>
                      #{article.featured_position}
                    </div>
                    {/* Remove button */}
                    <button
                      onClick={() => handleRemove(article)}
                      disabled={toggling === article.id}
                      className='absolute top-2 right-2 flex h-7 w-7 items-center justify-center rounded-full bg-black/60 text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-500'
                    >
                      {toggling === article.id ? (
                        <Loader2 size={12} className='animate-spin' />
                      ) : (
                        <X size={13} />
                      )}
                    </button>
                  </div>
                  <CardContent className='p-3'>
                    <p className='text-xs font-semibold line-clamp-2 mb-1'>{article.title}</p>
                    {article.category?.name && (
                      <Badge variant='outline' className='text-[10px] px-1.5 h-4'>
                        {article.category.name}
                      </Badge>
                    )}
                    {/* Reorder: change position */}
                    <div className='mt-2'>
                      <Select
                        value={String(article.featured_position ?? '')}
                        onValueChange={(val) => handleAssign(
                          { id: article.id, title: article.title, slug: article.slug, cover_image: article.cover_image, category_name: article.category?.name ?? null },
                          Number(val)
                        )}
                        disabled={toggling === article.id}
                      >
                        <SelectTrigger className='h-7 text-xs'>
                          <SelectValue placeholder='Position' />
                        </SelectTrigger>
                        <SelectContent>
                          {Array.from({ length: MAX_FEATURED }, (_, i) => i + 1).map((p) => (
                            <SelectItem key={p} value={String(p)}>
                              Position #{p}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </section>

        {/* ── Article Picker ──────────────────────────────────────────── */}
        <section>
          <div className='mb-3 flex items-center justify-between gap-4 flex-wrap'>
            <h2 className='font-antigua text-lg font-semibold'>Published Articles</h2>
            <div className='relative max-w-xs w-full'>
              <Search size={14} className='absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground' />
              <Input
                className='pl-8 h-8 text-sm'
                placeholder='Search articles…'
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>

          {loadingPicker ? (
            <div className='flex justify-center py-8'>
              <Loader2 className='h-5 w-5 animate-spin text-muted-foreground' />
            </div>
          ) : filteredPicker.length === 0 ? (
            <p className='py-8 text-center text-sm text-muted-foreground'>
              {search ? 'No articles match your search.' : 'All published articles are already featured or there are none.'}
            </p>
          ) : (
            <div className='grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
              {filteredPicker.map((item) => (
                <Card key={item.id} className='overflow-hidden p-0 group'>
                  <div className='relative h-28 bg-gray-100'>
                    {item.cover_image ? (
                      <img
                        src={item.cover_image}
                        alt={item.title}
                        className='h-full w-full object-cover'
                      />
                    ) : (
                      <div className='h-full w-full bg-gradient-to-br from-gold/10 to-muted' />
                    )}
                  </div>
                  <CardContent className='p-3'>
                    <p className='text-xs font-semibold line-clamp-2 mb-2'>{item.title}</p>
                    {item.category_name && (
                      <Badge variant='outline' className='text-[10px] px-1.5 h-4 mb-2'>
                        {item.category_name}
                      </Badge>
                    )}
                    <Button
                      size='sm'
                      className='w-full h-7 text-xs bg-gold hover:bg-gold/90 text-black font-semibold'
                      disabled={toggling === item.id || featured.length >= MAX_FEATURED}
                      onClick={() => handleAssign(item, nextPosition())}
                    >
                      {toggling === item.id ? (
                        <Loader2 size={12} className='animate-spin' />
                      ) : (
                        <>
                          <CheckSquare size={12} className='mr-1' />
                          Feature at #{nextPosition()}
                        </>
                      )}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </section>
      </Main>
    </>
  )
}
