'use client'

import { useEffect, useState } from 'react'
import { Clock, MapPin, MoreVertical, Loader2 } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { fetchUpcomingEvents, type Event } from '@/lib/services/events.service'

const CATEGORY_COLORS: Record<string, string> = {
  Music: 'bg-purple-100 text-purple-700',
  Art: 'bg-blue-100 text-blue-700',
  Food: 'bg-green-100 text-green-700',
  Culture: 'bg-gold/10 text-gold',
  Festivals: 'bg-red/10 text-red',
  Sports: 'bg-teal-100 text-teal-700',
}

function formatEventDate(dateStr: string): string {
  return new Date(dateStr + 'T00:00:00').toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

function statusStyle(status: Event['status']): string {
  switch (status) {
    case 'published': return 'text-green-600'
    case 'cancelled': return 'text-red-500'
    default: return 'text-yellow-500'
  }
}

function statusLabel(status: Event['status']): string {
  switch (status) {
    case 'published': return 'Published'
    case 'cancelled': return 'Cancelled'
    case 'pending': return 'Pending'
    default: return 'Draft'
  }
}

export default function UpcomingEvents() {
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchUpcomingEvents(6).then((data) => {
      setEvents(data)
      setLoading(false)
    })
  }, [])

  return (
    <div>
      <div className='mb-4 flex items-center justify-between'>
        <h2 className='font-antigua text-xl font-semibold'>Upcoming Events</h2>
        <Button variant='ghost' size='sm' className='text-red-500 hover:bg-background hover:text-red-600'>
          View all →
        </Button>
      </div>

      {loading ? (
        <div className='flex justify-center py-10'>
          <Loader2 className='h-6 w-6 animate-spin text-muted-foreground' />
        </div>
      ) : events.length === 0 ? (
        <div className='py-10 text-center text-sm text-muted-foreground'>
          No upcoming events. Create one to get started.
        </div>
      ) : (
        <div className='space-y-3'>
          {events.map((event) => {
            const catName = event.category?.name ?? ''
            const catClass = CATEGORY_COLORS[catName] ?? 'bg-gray-100 text-gray-600'

            return (
              <Card key={event.id} className='hover:bg-muted/30'>
                <CardContent className='p-0'>
                  <div className='flex flex-col gap-3 px-4 transition sm:flex-row sm:items-center sm:justify-between'>

                    {/* LEFT */}
                    <div className='flex items-start gap-3 sm:items-center sm:gap-4'>
                      {event.cover_image ? (
                        <img
                          src={event.cover_image}
                          alt={event.title}
                          className='h-12 w-16 flex-shrink-0 rounded-lg object-cover'
                        />
                      ) : (
                        <div className='h-12 w-16 flex-shrink-0 rounded-lg bg-muted' />
                      )}

                      <div className='min-w-0'>
                        <div className='flex flex-wrap items-center gap-2'>
                          <p className='truncate text-sm font-semibold sm:text-base'>
                            {event.title}
                          </p>
                          {event.is_featured && (
                            <Badge className='rounded-full bg-gradient-to-b from-gold to-gold-light text-xs text-white'>
                              ★ Featured
                            </Badge>
                          )}
                        </div>

                        <div className='mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground'>
                          {catName && (
                            <Badge variant='secondary' className={`${catClass} rounded-full font-normal`}>
                              {catName}
                            </Badge>
                          )}
                          <div className='flex items-center gap-1'>
                            <Clock className='h-3 w-3' />
                            {formatEventDate(event.event_date)}
                            {event.start_time && ` • ${event.start_time}`}
                          </div>
                          {event.location && (
                            <div className='flex items-center gap-1'>
                              <MapPin className='h-3 w-3' />
                              {event.location}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* RIGHT */}
                    <div className='flex items-center justify-between gap-4 sm:justify-end'>
                      <div className={`flex items-center gap-2 text-xs sm:text-sm ${statusStyle(event.status)}`}>
                        <span className='h-2 w-2 rounded-full bg-current' />
                        {statusLabel(event.status)}
                      </div>
                      <MoreVertical className='h-4 w-4 flex-shrink-0 cursor-pointer text-muted-foreground' />
                    </div>

                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      )}
    </div>
  )
}
