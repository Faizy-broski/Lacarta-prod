'use client'
import { useEffect, useState } from 'react'
import { FilePen, Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { fetchArticles, type Article } from '@/lib/services/articles.service'
import { useAuthStore } from '@/lib/auth/auth.store'

const STATUS_STYLE: Record<string, string> = {
  draft: 'bg-yellow-50 text-yellow-700 border-yellow-200',
  scheduled: 'bg-blue-50 text-blue-700 border-blue-200',
  archived: 'bg-gray-100 text-gray-600 border-gray-200',
}

export default function DraftCard() {
  const user = useAuthStore((s) => s.user)
  const [drafts, setDrafts] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const isContentRole = ['owner', 'admin', 'assistant', 'editor'].includes(user?.role?.[0] ?? '')
    fetchArticles({
      status: 'draft',
      // Editors only see their own drafts; others see all
      author_id: user?.role?.[0] === 'editor' ? user?.accountNo : undefined,
      limit: 6,
    }).then((data) => {
      setDrafts(data)
      setLoading(false)
    })
  }, [user])

  return (
    <Card className='mt-5 border-0 p-0 shadow-none'>
      <CardHeader className='flex flex-row items-center justify-between px-0'>
        <CardTitle className='font-antigua text-xl'>Drafts</CardTitle>
        <Button variant='link' className='text-amber-400'>
          View All →
        </Button>
      </CardHeader>
      <CardContent className='px-0'>
        {loading ? (
          <div className='flex items-center justify-center py-12'>
            <Loader2 className='h-6 w-6 animate-spin text-muted-foreground' />
          </div>
        ) : drafts.length === 0 ? (
          <div className='py-12 text-center text-sm text-muted-foreground'>
            No drafts at the moment.
          </div>
        ) : (
          <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-2'>
            {drafts.map((draft) => (
              <Card key={draft.id}>
                <CardHeader className='mb-0 pb-0'>
                  <div className='mb-0 flex items-center justify-between pb-0'>
                    <div className='rounded-lg bg-gold/20 p-2'>
                      <FilePen className='h-5 w-5 text-gold' />
                    </div>
                    <Badge
                      variant='outline'
                      className={cn('rounded-full px-2', STATUS_STYLE[draft.status] ?? 'bg-gray-100')}
                    >
                      {draft.status === 'draft' ? 'In Draft' : draft.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className='mt-0 pt-0'>
                  <div className='mt-0 flex items-start justify-between pt-0'>
                    <div>
                      <h3 className='text-md'>{draft.title}</h3>
                      <p className='mt-1 text-xs text-gray-400'>
                        {draft.author?.full_name ?? 'Unknown'} ·{' '}
                        {new Date(draft.updated_at).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                        })}
                      </p>
                    </div>
                  </div>
                  <Button className='mt-3 w-full bg-gradient-to-r from-green to-green-light hover:bg-green-800'>
                    Continue Editing
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
