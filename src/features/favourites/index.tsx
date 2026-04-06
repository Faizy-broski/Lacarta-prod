'use client'

import { useEffect, useState } from 'react'
import { Heart, BookOpen, MapPin, Clock, Loader2 } from 'lucide-react'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { useAuthStore } from '@/lib/auth/auth.store'
import { fetchFavorites, removeFavorite } from '@/lib/services/favorites.service'
import { supabase } from '@/lib/supabase'

interface SavedItem {
  id: string
  item_type: string
  item_id: string
  title: string
  category: string
  saved_on: string
}

export function FavouritesPage() {
  const user = useAuthStore((s) => s.user)
  const [items, setItems] = useState<SavedItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user?.id) return

    async function load() {
      const favs = await fetchFavorites(user!.id)
      if (favs.length === 0) { setLoading(false); return }

      // Batch-resolve article titles
      const articleIds = favs.filter((f) => f.item_type === 'article').map((f) => f.item_id)
      const listingIds = favs.filter((f) => f.item_type === 'listing').map((f) => f.item_id)

      const titleMap = new Map<string, { title: string; category: string }>()

      if (articleIds.length) {
        const { data } = await supabase
          .from('articles')
          .select('id, title, category:categories!category_id(name)')
          .in('id', articleIds)
        data?.forEach((a: any) => titleMap.set(a.id, { title: a.title, category: a.category?.name ?? '—' }))
      }
      if (listingIds.length) {
        const { data } = await supabase
          .from('listings')
          .select('id, title, category:categories!category_id(name)')
          .in('id', listingIds)
        data?.forEach((l: any) => titleMap.set(l.id, { title: l.title, category: l.category?.name ?? '—' }))
      }

      setItems(
        favs.map((f) => ({
          id: f.id,
          item_type: f.item_type,
          item_id: f.item_id,
          title: titleMap.get(f.item_id)?.title ?? f.item_type,
          category: titleMap.get(f.item_id)?.category ?? f.item_type,
          saved_on: new Date(f.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        }))
      )
      setLoading(false)
    }

    load()
  }, [user?.id])

  const handleRemove = async (item: SavedItem) => {
    await removeFavorite(user!.id, item.item_type, item.item_id)
    setItems((prev) => prev.filter((i) => i.id !== item.id))
  }

  return (
    <>
      <Header />

      <Main>
        <div className='mb-6 flex h-20 items-center justify-between'>
          <div>
            <h1 className='font-antigua text-3xl font-bold tracking-tight'>
              Favourites
            </h1>
            <p className='text-xs text-muted-foreground'>
              Articles and stories you have saved.
            </p>
          </div>
          <div className='flex items-center gap-2'>
            <Badge variant='secondary' className='gap-1'>
              <Heart className='h-3 w-3' />
              {loading ? '…' : items.length} saved
            </Badge>
          </div>
        </div>

        {loading ? (
          <div className='flex items-center justify-center py-16'>
            <Loader2 className='h-6 w-6 animate-spin text-muted-foreground' />
          </div>
        ) : items.length === 0 ? (
          <div className='py-16 text-center text-muted-foreground'>
            No saved items yet. Browse articles and listings to save your favourites.
          </div>
        ) : (
        <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-3'>
          {items.map((item) => (
            <Card key={item.id} className='group cursor-pointer transition-shadow hover:shadow-md'>
              <CardHeader className='pb-2'>
                <div className='flex items-start justify-between gap-2'>
                  <Badge variant='outline' className='text-[10px]'>
                    {item.category}
                  </Badge>
                  <Button
                    variant='ghost'
                    size='icon'
                    className='h-7 w-7 shrink-0 text-[#CF9921] hover:text-[#CF9921]/80'
                    onClick={() => handleRemove(item)}
                  >
                    <Heart className='h-4 w-4 fill-current' />
                  </Button>
                </div>
                <h2 className='font-antigua pt-1 text-base font-semibold leading-snug tracking-tight'>
                  {item.title}
                </h2>
              </CardHeader>
              <CardContent className='pt-0'>
                <div className='flex flex-col gap-1.5 text-xs text-muted-foreground'>
                  <div className='flex items-center gap-1'>
                    <BookOpen className='h-3 w-3' />
                    Saved on {item.saved_on}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        )}
      </Main>
    </>
  )
}
