'use client'

import { useEffect, useState } from 'react'
import { CalendarCheck, Calendar, TrendingUp, Activity, Loader2 } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { fetchEventInsights, type EventInsights } from '@/lib/services/events.service'
import { useAuthStore } from '@/lib/auth/auth.store'

function formatDate(dateStr: string | null): string {
  if (!dateStr) return '—'
  return new Date(dateStr + 'T00:00:00').toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  })
}

function truncate(str: string | null, len = 28): string {
  if (!str) return '—'
  return str.length > len ? str.slice(0, len) + '…' : str
}

export default function Insights() {
  const [data, setData] = useState<EventInsights | null>(null)
  const user = useAuthStore((s) => s.user)
  const isAdmin = ['admin', 'owner', 'assistant'].includes(user?.role?.[0] ?? '')

  useEffect(() => {
    fetchEventInsights(isAdmin ? undefined : user?.accountNo).then(setData)
  }, [isAdmin, user?.accountNo])

  const items = [
    {
      title: 'Next Event',
      subtitle: data ? truncate(data.nextEventTitle) : null,
      icon: CalendarCheck,
      iconBg: 'bg-yellow-50',
      iconColor: 'text-yellow-500',
    },
    {
      title: 'Busiest Day',
      subtitle: data ? formatDate(data.busiestDay) : null,
      icon: Calendar,
      iconBg: 'bg-green-50',
      iconColor: 'text-green-500',
    },
    {
      title: 'Next Featured',
      subtitle: data ? truncate(data.nextFeaturedTitle) : null,
      icon: TrendingUp,
      iconBg: 'bg-red-50',
      iconColor: 'text-red-500',
    },
    {
      title: 'Total Published',
      subtitle: data ? `${data.totalPublished} event${data.totalPublished !== 1 ? 's' : ''}` : null,
      icon: Activity,
      iconBg: 'bg-yellow-50',
      iconColor: 'text-yellow-500',
    },
  ]

  return (
    <div className='space-y-4'>
      <div className='flex items-center gap-3'>
        <h2 className='font-antigua text-sm font-semibold tracking-wider text-muted-foreground uppercase'>
          Insights
        </h2>
        <div className='h-px flex-1 bg-border' />
      </div>

      <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4'>
        {items.map((item) => {
          const Icon = item.icon
          return (
            <Card key={item.title} className='rounded-xl border bg-white shadow-sm p-0'>
              <CardContent className='flex items-center gap-3 p-3'>
                <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${item.iconBg}`}>
                  <Icon size={18} className={item.iconColor} />
                </div>
                <div className='flex min-w-0 flex-col'>
                  <p className='text-xs text-muted-foreground'>{item.title}</p>
                  {data === null ? (
                    <Loader2 className='mt-0.5 h-3.5 w-3.5 animate-spin text-muted-foreground' />
                  ) : (
                    <p className='truncate text-sm font-normal'>{item.subtitle ?? '—'}</p>
                  )}
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
