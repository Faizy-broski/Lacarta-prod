'use client'

import { useEffect, useState } from 'react'
import { Calendar, CalendarDays, NotebookPen, Star, History, Loader2 } from 'lucide-react'
import { Card, CardContent, CardHeader, CardFooter } from '@/components/ui/card'
import { fetchEventStats, type EventStats } from '@/lib/services/events.service'
import { useAuthStore } from '@/lib/auth/auth.store'

const CONFIGS = [
  {
    key: 'upcoming' as keyof EventStats,
    title: 'Upcoming Events',
    icon: Calendar,
    iconColor: 'text-gold',
    bg: 'bg-gold/10',
    bar: 'bg-gold',
  },
  {
    key: 'thisWeek' as keyof EventStats,
    title: 'Events This Week',
    icon: CalendarDays,
    iconColor: 'text-green',
    bg: 'bg-green/10',
    bar: 'bg-green',
  },
  {
    key: 'featured' as keyof EventStats,
    title: 'Featured Events',
    icon: Star,
    iconColor: 'text-red',
    bg: 'bg-red/10',
    bar: 'bg-red',
  },
  {
    key: 'drafts' as keyof EventStats,
    title: 'Drafts & Pending',
    icon: NotebookPen,
    iconColor: 'text-gold',
    bg: 'bg-gold/10',
    bar: 'bg-gold',
  },
  {
    key: 'past' as keyof EventStats,
    title: 'Past Events',
    icon: History,
    iconColor: 'text-green',
    bg: 'bg-green/10',
    bar: 'bg-green',
  },
]

export default function TabsPage() {
  const [stats, setStats] = useState<EventStats | null>(null)
  const user = useAuthStore((s) => s.user)
  const isAdmin = ['admin', 'owner', 'assistant'].includes(user?.role?.[0] ?? '')

  useEffect(() => {
    // Admins see platform-wide stats; clients see only their own
    fetchEventStats(isAdmin ? undefined : user?.accountNo).then(setStats)
  }, [isAdmin, user?.accountNo])

  return (
    <div className='grid gap-4 sm:grid-cols-3 lg:grid-cols-5'>
      {CONFIGS.map(({ key, title, icon: Icon, iconColor, bg, bar }) => (
        <Card key={key}>
          <CardHeader className='flex flex-row items-center justify-between space-y-0'>
            <div className={`${bg} rounded-md p-2`}>
              <Icon className={`h-5 w-5 ${iconColor}`} />
            </div>
          </CardHeader>
          <CardContent>
            <div className='font-antigua mb-2 text-3xl font-extrabold'>
              {stats === null ? (
                <Loader2 className='h-5 w-5 animate-spin text-muted-foreground' />
              ) : (
                stats[key]
              )}
            </div>
            <h2 className='text-xs font-medium text-muted-foreground'>{title}</h2>
          </CardContent>
          <CardFooter>
            <div className={`h-[2px] w-10 ${bar}`} />
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
