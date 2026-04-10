'use client'

import { useEffect, useState } from 'react'
import { Eye, Loader2 } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card'
import { Switch } from '@/components/ui/switch'
import { fetchFeaturedEvents, fetchUpcomingEvents, toggleEventFeatured, type Event } from '@/lib/services/events.service'

function formatDate(dateStr: string): string {
  return new Date(dateStr + 'T00:00:00').toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

export default function FeaturedEvents() {
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)
  const [toggling, setToggling] = useState<string | null>(null)

  useEffect(() => {
    // Show featured events; if none yet, fall back to upcoming published events
    fetchFeaturedEvents(4).then(async (featured) => {
      if (featured.length > 0) {
        setEvents(featured)
      } else {
        const upcoming = await fetchUpcomingEvents(4)
        setEvents(upcoming)
      }
      setLoading(false)
    })
  }, [])

  const handleToggle = async (event: Event) => {
    setToggling(event.id)
    try {
      const newValue = !event.is_featured
      await toggleEventFeatured(event.id, newValue)
      setEvents((prev) => prev.map((e) => e.id === event.id ? { ...e, is_featured: newValue } : e))
      toast.success(newValue ? 'Event added to homepage.' : 'Event removed from homepage.')
    } catch {
      toast.error('Failed to update featured status.')
    } finally {
      setToggling(null)
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
      <div className='flex items-start justify-between'>
        <div>
          <h2 className='font-antigua text-lg font-semibold'>Featured Events</h2>
          <p className='text-sm text-muted-foreground'>Toggle homepage visibility</p>
        </div>
        <Button variant='outline' className='bg-white text-sm font-medium'>
          Manage Featured
        </Button>
      </div>

      <div className='grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
        {events.map((event, i) => (
          <Card key={event.id} className='overflow-hidden rounded-md border border-gray-200 shadow-xs pt-0 pb-3 gap-2'>

            {/* Image */}
            <CardHeader className='relative p-0'>
              <div className='h-34 w-full bg-muted'>
                {event.cover_image ? (
                  <img
                    src={event.cover_image}
                    alt={event.title}
                    className='h-full w-full object-cover'
                  />
                ) : (
                  <div className='h-full w-full bg-gradient-to-br from-gold/20 to-muted' />
                )}
              </div>
              {/* Order badge */}
              <div className='absolute top-2 left-2 flex h-6 w-6 items-center justify-center rounded-full bg-linear-to-r from-gold to-gold-light text-xs font-semibold text-white shadow'>
                {i + 1}
              </div>
            </CardHeader>

            {/* Content */}
            <CardContent className='px-4'>
              <h3 className='font-antigua truncate text-sm font-medium py-0'>{event.title}</h3>
              <p className='text-xs text-muted-foreground'>{formatDate(event.event_date)}</p>
              {event.category?.name && (
                <p className='mt-0.5 text-xs text-muted-foreground'>{event.category.name}</p>
              )}
            </CardContent>

            <CardFooter className='px-4'>
              <div className='flex w-full items-center justify-between border-t pt-3'>
                <div className='flex items-center gap-2 text-xs text-muted-foreground'>
                  <Eye size={12} />
                  Homepage
                </div>
                {toggling === event.id ? (
                  <Loader2 className='h-4 w-4 animate-spin text-muted-foreground' />
                ) : (
                  <Switch
                    checked={event.is_featured}
                    onCheckedChange={() => handleToggle(event)}
                  />
                )}
              </div>
            </CardFooter>

          </Card>
        ))}
      </div>
    </div>
  )
}
