'use client'

import { useEffect, useState } from 'react'
import { NotebookPen, Clock, Loader2, Send } from 'lucide-react'
import { toast } from 'sonner'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { fetchDraftAndPendingEvents, fetchEvents, updateEvent, type Event } from '@/lib/services/events.service'
import { useAuthStore } from '@/lib/auth/auth.store'

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime()
  const mins = Math.floor(diff / 60000)
  if (mins < 60) return `${mins}m ago`
  const hrs = Math.floor(mins / 60)
  if (hrs < 24) return `${hrs}h ago`
  const days = Math.floor(hrs / 24)
  return `${days}d ago`
}

export default function DraftEvents() {
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)
  const [acting, setActing] = useState<string | null>(null)

  const user = useAuthStore((s) => s.user)
  const isAdmin = ['admin', 'owner', 'assistant'].includes(user?.role?.[0] ?? '')

  useEffect(() => {
    if (isAdmin) {
      // Admins: show only drafts (pending events are handled separately in PendingEvents)
      fetchEvents({ status: 'draft' }).then((data) => {
        setEvents(data)
        setLoading(false)
      })
    } else {
      // Clients: show own drafts + pending (own submissions), explicitly scoped to user id
      fetchDraftAndPendingEvents(9, user?.accountNo).then((data) => {
        setEvents(data)
        setLoading(false)
      })
    }
  }, [isAdmin])

  const submitForReview = async (id: string) => {
    setActing(id)
    try {
      await updateEvent(id, { status: 'pending' })
      setEvents((prev) => prev.map((e) => e.id === id ? { ...e, status: 'pending' } : e))
      toast.success('Event submitted for review.')
    } catch {
      toast.error('Failed to submit event.')
    } finally {
      setActing(null)
    }
  }

  if (loading) {
    return (
      <div className='flex justify-center py-10'>
        <Loader2 className='h-6 w-6 animate-spin text-muted-foreground' />
      </div>
    )
  }

  if (events.length === 0) return null

  return (
    <div className='space-y-5'>
      <div className='flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between'>
        <div>
          <h2 className='font-antigua text-lg font-semibold'>
            {isAdmin ? 'Drafts' : 'My Events'}
          </h2>
          <p className='text-sm text-muted-foreground'>{events.length} item{events.length !== 1 ? 's' : ''}</p>
        </div>
      </div>

      <div className='grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3'>
        {events.map((event) => (
          <Card key={event.id} className='rounded-xl border bg-white p-4 pb-3 shadow-sm transition hover:shadow-md'>
            <CardContent className='flex h-full flex-col justify-between space-y-4 p-0'>

              {/* Title */}
              <div className='flex items-start gap-3 sm:items-center'>
                <div className='flex shrink-0 items-center justify-center rounded-lg bg-gold/10 p-2'>
                  <NotebookPen size={18} className='text-gold' />
                </div>
                <p className='truncate text-sm font-medium'>{event.title}</p>
              </div>

              {/* Author */}
              <div className='flex items-center gap-2'>
                <div className='flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-muted text-[10px] font-bold uppercase text-muted-foreground'>
                  {event.creator?.full_name?.[0] ?? '?'}
                </div>
                <p className='text-xs text-muted-foreground'>
                  {event.creator?.full_name ? `Created by ${event.creator.full_name}` : 'Unknown author'}
                </p>
              </div>

              {/* Footer */}
              <CardFooter className='p-0'>
                <div className='flex w-full flex-wrap items-center justify-between gap-2 border-t pt-2'>
                  <div className='flex flex-wrap items-center gap-2'>
                    <div className='flex items-center gap-1 text-xs text-muted-foreground'>
                      <Clock size={14} />
                      {timeAgo(event.created_at)}
                    </div>

                    {event.status === 'pending' && (
                      <Badge className='rounded-full bg-yellow-100 text-xs font-normal text-yellow-700 hover:bg-yellow-100'>
                        Awaiting Review
                      </Badge>
                    )}
                    {event.status === 'draft' && (
                      <Badge className='rounded-full bg-blue-100 text-xs font-normal text-blue-700 hover:bg-blue-100'>
                        Draft
                      </Badge>
                    )}
                  </div>

                  {/* Clients: submit draft for review; pending = waiting */}
                  {!isAdmin && event.status === 'draft' && (
                    <Button
                      size='sm'
                      variant='ghost'
                      className='h-7 gap-1 p-1 text-xs font-medium text-gold hover:bg-gold/10 hover:text-gold'
                      disabled={acting === event.id}
                      onClick={() => submitForReview(event.id)}
                    >
                      {acting === event.id
                        ? <Loader2 className='h-3 w-3 animate-spin' />
                        : <Send className='h-3 w-3' />}
                      Submit for Review
                    </Button>
                  )}
                  {!isAdmin && event.status === 'pending' && (
                    <span className='text-xs text-muted-foreground italic'>Under review</span>
                  )}
                </div>
              </CardFooter>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
