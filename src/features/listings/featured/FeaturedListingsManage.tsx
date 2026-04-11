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
  fetchFeaturedListingsByCategory,
  fetchActiveListingsPicker,
  toggleListingFeatured,
  MAX_FEATURED_PER_CATEGORY,
  type FeaturedListingItem,
} from '@/lib/services/listings-admin.service'
import { supabase } from '@/lib/supabase'

interface Category {
  id: string
  name: string
}

export function FeaturedListingsManage() {
  const [categories, setCategories] = useState<Category[]>([])
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>('')
  const [selectedCategoryName, setSelectedCategoryName] = useState<string>('')

  const [featured, setFeatured] = useState<FeaturedListingItem[]>([])
  const [picker, setPicker] = useState<FeaturedListingItem[]>([])
  const [loadingFeatured, setLoadingFeatured] = useState(false)
  const [loadingPicker, setLoadingPicker] = useState(false)
  const [toggling, setToggling] = useState<string | null>(null)
  const [search, setSearch] = useState('')

  // Load listing categories once
  useEffect(() => {
    supabase
      .from('categories')
      .select('id, name')
      .eq('type', 'listing')
      .order('name')
      .then(({ data }) => {
        const cats = (data ?? []) as Category[]
        setCategories(cats)
        if (cats.length > 0) {
          setSelectedCategoryId(cats[0].id)
          setSelectedCategoryName(cats[0].name)
        }
      })
  }, [])

  const loadFeatured = useCallback(async (categoryId: string) => {
    if (!categoryId) return
    setLoadingFeatured(true)
    const data = await fetchFeaturedListingsByCategory(categoryId, MAX_FEATURED_PER_CATEGORY)
    setFeatured(data)
    setLoadingFeatured(false)
  }, [])

  const loadPicker = useCallback(async (categoryId: string) => {
    if (!categoryId) return
    setLoadingPicker(true)
    const data = await fetchActiveListingsPicker(categoryId, 60)
    setPicker(data)
    setLoadingPicker(false)
  }, [])

  useEffect(() => {
    if (!selectedCategoryId) return
    loadFeatured(selectedCategoryId)
    loadPicker(selectedCategoryId)
    setSearch('')
  }, [selectedCategoryId, loadFeatured, loadPicker])

  const featuredIds = new Set(featured.map((f) => f.id))

  const nextPosition = () => {
    const used = new Set(featured.map((f) => f.featured_position).filter(Boolean))
    for (let p = 1; p <= MAX_FEATURED_PER_CATEGORY; p++) {
      if (!used.has(p)) return p
    }
    return featured.length + 1
  }

  const handleAssign = async (item: FeaturedListingItem, position: number) => {
    if (featured.length >= MAX_FEATURED_PER_CATEGORY && !featuredIds.has(item.id)) {
      toast.error(`Maximum ${MAX_FEATURED_PER_CATEGORY} featured listings allowed per category. Remove one first.`)
      return
    }
    setToggling(item.id)
    try {
      await toggleListingFeatured(item.id, true, position)
      toast.success(`"${item.title}" set as Position #${position}.`)
      await Promise.all([loadFeatured(selectedCategoryId), loadPicker(selectedCategoryId)])
    } catch (err: any) {
      toast.error(err?.message ?? 'Failed to feature listing.')
    } finally {
      setToggling(null)
    }
  }

  const handleRemove = async (item: FeaturedListingItem) => {
    setToggling(item.id)
    try {
      await toggleListingFeatured(item.id, false, null)
      toast.success(`"${item.title}" removed from featured.`)
      await Promise.all([loadFeatured(selectedCategoryId), loadPicker(selectedCategoryId)])
    } catch (err: any) {
      toast.error(err?.message ?? 'Failed to unfeature listing.')
    } finally {
      setToggling(null)
    }
  }

  const filteredPicker = picker.filter(
    (p) =>
      !featuredIds.has(p.id) &&
      p.title.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <>
      <Header />
      <Main>
        <div className='mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'>
          <div>
            <h1 className='font-antigua text-2xl font-bold tracking-tight'>Featured Listings</h1>
            <p className='mt-1 text-sm text-muted-foreground'>
              Manage the listings displayed in each category&apos;s hero carousel (max {MAX_FEATURED_PER_CATEGORY} per category).
            </p>
          </div>

          {/* Category selector */}
          <div className='w-full sm:w-56'>
            <Select
              value={selectedCategoryId}
              onValueChange={(val) => {
                const cat = categories.find((c) => c.id === val)
                setSelectedCategoryId(val)
                setSelectedCategoryName(cat?.name ?? '')
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder='Select category' />
              </SelectTrigger>
              <SelectContent>
                {categories.map((c) => (
                  <SelectItem key={c.id} value={c.id}>
                    {c.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* ── Currently Featured ─────────────────────────────────────────── */}
        <section className='mb-8'>
          <div className='mb-3 flex items-center justify-between'>
            <h2 className='font-antigua text-lg font-semibold'>
              Currently Featured
              <span className='ml-2 text-sm font-normal text-muted-foreground'>
                ({featured.length}/{MAX_FEATURED_PER_CATEGORY})
              </span>
              {selectedCategoryName && (
                <span className='ml-2 text-sm font-normal text-gold'>· {selectedCategoryName}</span>
              )}
            </h2>
          </div>

          {loadingFeatured ? (
            <div className='flex justify-center py-8'>
              <Loader2 className='h-5 w-5 animate-spin text-muted-foreground' />
            </div>
          ) : featured.length === 0 ? (
            <div className='flex flex-col items-center justify-center rounded-lg border border-dashed py-10 text-center gap-2'>
              <Star size={28} className='text-muted-foreground/40' />
              <p className='text-sm text-muted-foreground'>
                No featured listings for {selectedCategoryName}. Pick active listings below.
              </p>
            </div>
          ) : (
            <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6'>
              {featured.map((item) => (
                <Card key={item.id} className='overflow-hidden p-0 relative group'>
                  <div className='relative h-36 bg-gray-100'>
                    {item.cover_image ? (
                      <img
                        src={item.cover_image}
                        alt={item.title}
                        className='h-full w-full object-cover'
                      />
                    ) : (
                      <div className='h-full w-full bg-gradient-to-br from-gold/20 to-muted' />
                    )}
                    {/* Position badge */}
                    <div className='absolute top-2 left-2 flex h-7 w-7 items-center justify-center rounded-full bg-gold text-xs font-bold text-black shadow'>
                      #{item.featured_position}
                    </div>
                    {/* Remove button */}
                    <button
                      onClick={() => handleRemove(item)}
                      disabled={toggling === item.id}
                      className='absolute top-2 right-2 flex h-7 w-7 items-center justify-center rounded-full bg-black/60 text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-500'
                    >
                      {toggling === item.id ? (
                        <Loader2 size={12} className='animate-spin' />
                      ) : (
                        <X size={13} />
                      )}
                    </button>
                  </div>
                  <CardContent className='p-3'>
                    <p className='text-xs font-semibold line-clamp-2 mb-2'>{item.title}</p>
                    {/* Reorder via position select */}
                    <Select
                      value={String(item.featured_position ?? '')}
                      onValueChange={(val) => handleAssign(item, Number(val))}
                      disabled={toggling === item.id}
                    >
                      <SelectTrigger className='h-7 text-xs'>
                        <SelectValue placeholder='Position' />
                      </SelectTrigger>
                      <SelectContent>
                        {Array.from({ length: MAX_FEATURED_PER_CATEGORY }, (_, i) => i + 1).map((p) => (
                          <SelectItem key={p} value={String(p)}>
                            Position #{p}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </section>

        {/* ── Active Listings Picker ─────────────────────────────────────── */}
        <section>
          <div className='mb-3 flex items-center justify-between gap-4 flex-wrap'>
            <h2 className='font-antigua text-lg font-semibold'>
              Active Listings
              <span className='ml-2 text-sm font-normal text-muted-foreground'>— select to feature</span>
            </h2>
            <div className='relative max-w-xs w-full'>
              <Search size={14} className='absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground' />
              <Input
                className='pl-8 h-8 text-sm'
                placeholder='Search listings…'
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
              {search
                ? 'No listings match your search.'
                : featured.length >= MAX_FEATURED_PER_CATEGORY
                ? `All ${MAX_FEATURED_PER_CATEGORY} slots are filled. Remove a featured listing to add another.`
                : 'No active listings available for this category.'}
            </p>
          ) : (
            <div className='grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
              {filteredPicker.map((item) => (
                <Card
                  key={item.id}
                  className={`overflow-hidden p-0 group ${featuredIds.has(item.id) ? 'ring-2 ring-gold' : ''}`}
                >
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
                    {featuredIds.has(item.id) && (
                      <div className='absolute top-2 left-2'>
                        <Badge className='bg-gold text-black border-0 text-[10px] h-4 px-1.5'>
                          Featured #{item.featured_position}
                        </Badge>
                      </div>
                    )}
                  </div>
                  <CardContent className='p-3'>
                    <p className='text-xs font-semibold line-clamp-2 mb-2'>{item.title}</p>
                    {item.subtitle && (
                      <p className='text-[10px] text-muted-foreground line-clamp-1 mb-2'>{item.subtitle}</p>
                    )}
                    <Button
                      size='sm'
                      className='w-full h-7 text-xs bg-gold hover:bg-gold/90 text-black font-semibold'
                      disabled={toggling === item.id || (featured.length >= MAX_FEATURED_PER_CATEGORY && !featuredIds.has(item.id))}
                      onClick={() =>
                        featuredIds.has(item.id)
                          ? handleRemove(item)
                          : handleAssign(item, nextPosition())
                      }
                    >
                      {toggling === item.id ? (
                        <Loader2 size={12} className='animate-spin' />
                      ) : featuredIds.has(item.id) ? (
                        <>
                          <X size={12} className='mr-1' />
                          Remove
                        </>
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
