// src/components/dashboard/AnalyticsPanels.tsx
'use client'
import { useEffect, useState } from 'react'
import { Globe } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import {
  getDashboardPanelStats,
  type DashboardPanelStats,
  type PanelStatItem,
} from '@/lib/services/analytics.service'

function formatStat(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`
  return n.toLocaleString()
}

function StatBar({
  item,
  color,
}: {
  item: PanelStatItem
  color: string
}) {
  return (
    <div className='space-y-1.5'>
      <div className='flex items-center justify-between text-sm'>
        <span className='font-bold'>{item.label}</span>
        <span className='font-medium'>
          {formatStat(item.value)} ({item.percent}%)
        </span>
      </div>
      <Progress
        value={item.percent}
        className='h-2'
        indicatorClassName={color}
      />
    </div>
  )
}

function SkeletonBar() {
  return (
    <div className='space-y-1.5 animate-pulse'>
      <div className='flex justify-between'>
        <div className='h-4 w-32 rounded bg-gray-200' />
        <div className='h-4 w-20 rounded bg-gray-200' />
      </div>
      <div className='h-2 w-full rounded bg-gray-200' />
    </div>
  )
}

export function AnalyticsPanels() {
  const [data, setData] = useState<DashboardPanelStats | null>(null)

  useEffect(() => {
    getDashboardPanelStats().then(setData)
  }, [])

  return (
    <div className='grid gap-6 md:grid-cols-3'>
      {/* Inquiries Analytics */}
      <Card>
        <CardHeader className='pb-4'>
          <div className='flex items-center justify-between'>
            <CardTitle className='font-antigua text-base font-bold'>
              Inquiries vs Analytics
            </CardTitle>
            <span className='cursor-pointer text-xs text-red-600 hover:underline'>
              View All
            </span>
          </div>
          <p className='text-xs text-muted-foreground'>All time</p>
        </CardHeader>
        <CardContent className='space-y-4'>
          {data
            ? data.inquiries.map((item, i) => (
                <StatBar key={i} item={item} color='bg-[#d1aa46]' />
              ))
            : Array(4)
                .fill(0)
                .map((_, i) => <SkeletonBar key={i} />)}
        </CardContent>
      </Card>

      {/* Engagement */}
      <Card>
        <CardHeader className='pb-4'>
          <div className='flex items-center justify-between'>
            <CardTitle className='font-antigua text-base font-bold'>
              Engagement
            </CardTitle>
            <span className='cursor-pointer text-xs text-red-600 hover:underline'>
              View All
            </span>
          </div>
          <p className='text-xs text-muted-foreground'>All time</p>
        </CardHeader>
        <CardContent className='space-y-4'>
          {data
            ? data.engagement.map((item, i) => (
                <StatBar key={i} item={item} color='bg-[#1daa51]' />
              ))
            : Array(5)
                .fill(0)
                .map((_, i) => <SkeletonBar key={i} />)}
        </CardContent>
      </Card>

      {/* Audience Geography */}
      <Card>
        <CardHeader className='pb-4'>
          <div className='flex items-center justify-between'>
            <CardTitle className='font-antigua text-base font-bold'>
              Audience Geography
            </CardTitle>
            <Globe className='h-6 w-6 rounded-sm bg-[#F3F1ED] p-1 text-[#cf9921]' />
          </div>
          <p className='text-xs text-muted-foreground'>
            Where your readers come from
          </p>
        </CardHeader>
        <CardContent className='flex flex-col items-center justify-center gap-2 py-8 text-center text-sm text-muted-foreground'>
          <Globe className='h-8 w-8 opacity-30' />
          <p className='font-medium'>Geographic tracking coming soon</p>
          <p className='text-xs'>
            Country-level data will appear here once geo tracking is enabled.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

