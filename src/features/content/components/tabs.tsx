'use client'

import { useEffect, useState } from 'react'
import { FileText, PencilLine, FolderClosed, Star, Wrench, Loader2 } from 'lucide-react'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { fetchContentStats, type ContentStats } from '@/lib/services/articles.service'

const SKELETON = '—'

interface StatItem {
  title: string
  icon: React.ReactNode
  quantity: string | number
  subtitle: string
  color: string
  bg: string
  trend?: string
}

function buildStats(data: ContentStats | null): StatItem[] {
  return [
    {
      title: 'Articles',
      icon: <FileText className='h-5 w-5 text-gold' />,
      quantity: data ? data.totalArticles : SKELETON,
      subtitle: 'Total articles',
      color: 'text-gold',
      bg: 'bg-gold/20',
      trend: data && data.articlesThisMonth > 0 ? `+${data.articlesThisMonth} this month` : undefined,
    },
    {
      title: 'Drafts',
      icon: <PencilLine className='h-5 w-5 text-green' />,
      quantity: data ? data.drafts : SKELETON,
      subtitle: 'Awaiting review',
      color: 'text-green',
      bg: 'bg-green/20',
    },
    {
      title: 'Categories',
      icon: <FolderClosed className='h-5 w-5 text-red' />,
      quantity: data ? data.categories : SKELETON,
      subtitle: 'Active categories',
      color: 'text-red',
      bg: 'bg-red/20',
    },
    {
      title: 'Featured',
      icon: <Star className='h-5 w-5 text-gold' />,
      quantity: data ? data.published : SKELETON,
      subtitle: 'Published stories',
      color: 'text-gold',
      bg: 'bg-gold/20',
    },
    {
      title: 'Travel Tools',
      icon: <Wrench className='h-5 w-5 text-green' />,
      quantity: data ? data.resources : SKELETON,
      subtitle: 'Guides & planners',
      color: 'text-green',
      bg: 'bg-green/20',
    },
  ]
}

export default function TabsPage() {
  const [stats, setStats] = useState<ContentStats | null>(null)

  useEffect(() => {
    fetchContentStats().then(setStats)
  }, [])

  const items = buildStats(stats)

  return (
    <div className='grid gap-4 sm:grid-cols-3 lg:grid-cols-5'>
      {items.map((item) => (
        <Card
          key={item.title}
          className='border-gray-150 border-[1.5px] bg-white p-4 shadow-xs'
        >
          <CardHeader className='space-y-0 px-0 pb-0'>
            <div className='flex items-center justify-between'>
              <div className={`${item.bg} w-fit rounded-lg p-2`}>
                {item.icon}
              </div>
              {item.trend && (
                <p className='text-xs text-green'>{item.trend}</p>
              )}
            </div>
          </CardHeader>
          <CardContent className='px-0 pt-3'>
            <div className='font-georgia mb-2 text-3xl font-extrabold'>
              {stats === null ? (
                <Loader2 className='h-5 w-5 animate-spin text-muted-foreground' />
              ) : (
                item.quantity
              )}
            </div>
            <p className='text-xs font-semibold text-muted-foreground'>
              {item.subtitle}
            </p>
            <h2 className={`text-md font-semibold ${item.color}`}>
              {item.title}
            </h2>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
