'use client'

import { useEffect, useState } from 'react'
import { ArrowRight, Loader2, Star } from 'lucide-react'
import { toast } from 'sonner'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Switch } from '@/components/ui/switch'
import { fetchFeaturedArticles, toggleArticleFeatured, type Article } from '@/lib/services/articles.service'

export default function FeaturedStoryCard() {
  const [stories, setStories] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)
  const [toggling, setToggling] = useState<string | null>(null)

  useEffect(() => {
    fetchFeaturedArticles(4).then((data) => {
      setStories(data)
      setLoading(false)
    })
  }, [])

  const handleToggle = async (story: Article) => {
    setToggling(story.id)
    try {
      const newValue = !story.is_featured
      await toggleArticleFeatured(story.id, newValue, newValue ? story.featured_position : null)
      setStories((prev) =>
        prev.map((s) => s.id === story.id ? { ...s, is_featured: newValue } : s)
      )
      toast.success(newValue ? 'Added to featured stories.' : 'Removed from featured stories.')
    } catch {
      toast.error('Failed to update featured status.')
    } finally {
      setToggling(null)
    }
  }

  return (
    <Card className='border-0 px-0 shadow-none'>
      <CardHeader className='flex flex-row items-center justify-between px-0 pb-2'>
        <CardTitle className='font-antigua text-xl'>Featured Stories</CardTitle>
        <Button variant='link' className='text-red-400 px-0' asChild>
          <Link href='/dashboard/content/featured-stories'>
            Manage All <ArrowRight size={15} className='ml-1' />
          </Link>
        </Button>
      </CardHeader>
      <CardContent className='px-0'>
        {loading ? (
          <div className='flex items-center justify-center py-10'>
            <Loader2 className='h-5 w-5 animate-spin text-muted-foreground' />
          </div>
        ) : stories.length === 0 ? (
          <div className='flex flex-col items-center justify-center py-10 text-center gap-2'>
            <Star size={28} className='text-muted-foreground/40' />
            <p className='text-sm text-muted-foreground'>No featured stories yet.</p>
            <Button variant='outline' size='sm' asChild>
              <Link href='/dashboard/content/featured-stories'>Feature an Article</Link>
            </Button>
          </div>
        ) : (
          <div className='flex gap-3 overflow-x-auto pb-2'>
            {stories.map((story, i) => (
              <Card key={story.id} className='min-w-[200px] sm:min-w-[280px] overflow-hidden p-0'>
                <div className='relative aspect-[3.5/1.5] w-full bg-gray-100'>
                  {story.cover_image ? (
                    <img
                      src={story.cover_image}
                      alt={story.title}
                      className='absolute inset-0 h-full w-full object-cover'
                    />
                  ) : (
                    <div className='absolute inset-0 bg-gradient-to-br from-gold/20 to-muted' />
                  )}
                  <div className='absolute top-2 left-2 flex h-6 w-6 items-center justify-center rounded-full bg-gold text-[11px] font-bold text-black shadow'>
                    {story.featured_position ?? i + 1}
                  </div>
                </div>
                <CardContent className='px-2 pb-3 pt-2'>
                  <h3 className='mb-3 text-xs font-semibold line-clamp-2'>{story.title}</h3>
                  <div className='flex items-center justify-between'>
                    <div className='text-sm text-muted-foreground'>
                      Position #{story.featured_position ?? i + 1}
                    </div>
                    <div className='flex items-center gap-2'>
                      <span className='text-sm text-muted-foreground'>Featured</span>
                      {toggling === story.id ? (
                        <Loader2 className='h-4 w-4 animate-spin text-muted-foreground' />
                      ) : (
                        <Switch
                          checked={story.is_featured}
                          onCheckedChange={() => handleToggle(story)}
                        />
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

