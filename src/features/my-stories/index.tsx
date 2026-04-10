'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Plus, Pencil, Loader2, FileText } from 'lucide-react'
import { format } from 'date-fns'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { fetchMySubmissions, type StorySubmission } from '@/lib/services/story-submissions.service'
import { supabase } from '@/lib/supabase'

const STATUS_STYLE: Record<string, string> = {
  pending: 'bg-yellow-50 text-yellow-700 border-yellow-200',
  approved: 'bg-green-50 text-green-700 border-green-200',
  rejected: 'bg-red-50 text-red-700 border-red-200',
}

export function MyStoriesPage() {
  const router = useRouter()
  const [stories, setStories] = useState<StorySubmission[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!user) return
      fetchMySubmissions(user.id).then((submissions) => {
        setStories(submissions)
        setLoading(false)
      })
    })
  }, [])

  return (
    <>
      <Header />
      <Main>
        <div className='mb-6 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center'>
          <div>
            <h1 className='font-antigua text-2xl font-bold tracking-tight'>
              My Stories
            </h1>
            <p className='text-sm text-muted-foreground'>
              Write and submit stories for editorial review
            </p>
          </div>
          <Button
            onClick={() => router.push('/dashboard/my-stories/create')}
            className='bg-gradient-to-r from-[#CF9921] to-[#D2BB6B] text-white hover:brightness-110'
          >
            <Plus className='mr-2 h-4 w-4' />
            Write Story
          </Button>
        </div>

        {loading ? (
          <div className='flex items-center justify-center py-24'>
            <Loader2 className='h-8 w-8 animate-spin text-muted-foreground' />
          </div>
        ) : stories.length === 0 ? (
          <div className='flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-muted-foreground/20 py-24 text-center'>
            <FileText className='mb-4 h-12 w-12 text-muted-foreground/40' />
            <p className='text-lg font-semibold text-muted-foreground'>
              No stories yet
            </p>
            <p className='mb-6 text-sm text-muted-foreground'>
              Share your Cartagena experience with the world
            </p>
            <Button
              onClick={() => router.push('/dashboard/my-stories/create')}
              className='bg-gradient-to-r from-[#CF9921] to-[#D2BB6B] text-white hover:brightness-110'
            >
              <Plus className='mr-2 h-4 w-4' />
              Write Your First Story
            </Button>
          </div>
        ) : (
          <div className='space-y-3'>
            {stories.map((story) => (
              <Card key={story.id} className='hover:shadow-sm transition'>
                <CardContent className='flex items-center gap-4 p-4'>
                  <div className='flex h-16 w-24 shrink-0 items-center justify-center rounded-lg bg-muted overflow-hidden'>
                    {story.cover_image ? (
                      <img
                        src={story.cover_image}
                        alt={story.title}
                        className='h-full w-full object-cover'
                      />
                    ) : (
                      <FileText className='h-6 w-6 text-muted-foreground/40' />
                    )}
                  </div>
                  <div className='min-w-0 flex-1'>
                    <p className='truncate font-semibold text-sm'>
                      {story.title}
                    </p>
                    {story.content && (
                      <p className='mt-0.5 truncate text-xs text-muted-foreground'>
                        {story.content.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim().slice(0, 120)}
                      </p>
                    )}
                    <p className='mt-1 text-xs text-muted-foreground'>
                      {format(new Date(story.created_at), 'MMM d, yyyy')}
                    </p>
                  </div>
                  <div className='flex items-center gap-3 shrink-0'>
                    <Badge
                      variant='outline'
                      className={`capitalize text-xs ${STATUS_STYLE[story.status] ?? ''}`}
                    >
                      {story.status === 'pending' ? 'Under Review' : story.status}
                    </Badge>
                    {story.status !== 'approved' && (
                      <Button
                        size='sm'
                        variant='outline'
                        onClick={() =>
                          router.push(`/dashboard/my-stories/${story.id}/edit`)
                        }
                      >
                        <Pencil className='mr-1.5 h-3.5 w-3.5' />
                        Edit
                      </Button>
                    )}
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
