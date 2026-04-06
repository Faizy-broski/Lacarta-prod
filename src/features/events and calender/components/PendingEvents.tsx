'use client'

import { useEffect, useState } from 'react'
import { CheckCircle, XCircle, Loader2, CalendarClock } from 'lucide-react'
import { toast } from 'sonner'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { fetchEvents, updateEvent, type Event } from '@/lib/services/events.service'

export default function PendingEvents() {
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)
  const [acting, setActing] = useState<string | null>(null)

  useEffect(() => {
    fetchEvents({ status: 'pending' }).then((data) => {
      setEvents(data)
      setLoading(false)
    })
  }, [])

  const handle = async (id: string, action: 'published' | 'cancelled') => {
    setActing(id)
    try {
      await updateEvent(id, { status: action })
      setEvents((prev) => prev.filter((e) => e.id !== id))
      toast.success(action === 'published' ? 'Event approved and published.' : 'Event rejected.')
    } catch {
      toast.error('Failed to update event.')
    } finally {
      setActing(null)
    }
  }

  if (loading) {
    return (
      <div className='flex items-center justify-center py-10'>
        <Loader2 className='h-5 w-5 animate-spin text-muted-foreground' />
      </div>
    )
  }

  if (events.length === 0) {
    return (
      <div className='py-10 text-center text-sm text-muted-foreground'>
        No pending events awaiting approval.
      </div>
    )
  }

  return (
    <div className='space-y-3'>
      {events.map((ev) => (
        <Card key={ev.id} className='border-yellow-200 bg-yellow-50/40'>
          <CardHeader className='pb-1'>
            <div className='flex items-start justify-between gap-3'>
              <div className='flex items-center gap-2'>
                <CalendarClock className='h-4 w-4 shrink-0 text-yellow-600' />
                <div>
                  <p className='font-medium leading-tight'>{ev.title}</p>
                  <p className='text-xs text-muted-foreground'>
                    {new Date(ev.event_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    {ev.location ? ` · ${ev.location}` : ''}
                    {ev.creator ? ` · by ${ev.creator.full_name}` : ''}
                  </p>
                </div>
              </div>
              <Badge variant='outline' className='shrink-0 border-yellow-300 bg-yellow-100 text-yellow-700 text-[10px]'>
                Pending Review
              </Badge>
            </div>
          </CardHeader>
          {ev.description && (
            <CardContent className='pb-2 pt-0'>
              <p className='text-xs text-muted-foreground line-clamp-2'>{ev.description}</p>
            </CardContent>
          )}
          <CardContent className='flex gap-2 pb-3 pt-1'>
            <Button
              size='sm'
              className='h-8 gap-1.5 bg-green-600 hover:bg-green-700 text-white'
              disabled={acting === ev.id}
              onClick={() => handle(ev.id, 'published')}
            >
              {acting === ev.id ? <Loader2 className='h-3.5 w-3.5 animate-spin' /> : <CheckCircle className='h-3.5 w-3.5' />}
              Approve
            </Button>
            <Button
              size='sm'
              variant='outline'
              className='h-8 gap-1.5 border-red-300 text-red-600 hover:bg-red-50'
              disabled={acting === ev.id}
              onClick={() => handle(ev.id, 'cancelled')}
            >
              <XCircle className='h-3.5 w-3.5' />
              Reject
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
