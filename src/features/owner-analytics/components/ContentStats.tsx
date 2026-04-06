'use client'
import { useEffect, useState } from 'react'
import { FileText, Clock, AlertCircle, Loader2 } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { getOwnerPlatformStats, type OwnerPlatformStats } from '@/lib/services/analytics.service'

export function ContentStats() {
  const [stats, setStats] = useState<OwnerPlatformStats | null>(null)

  useEffect(() => {
    getOwnerPlatformStats().then(setStats)
  }, [])

  const items = stats ? [
    { label: 'Published Articles', value: stats.publishedArticles, icon: FileText, color: 'text-[#22C55E]', bg: 'bg-[#22C55E]/10' },
    { label: 'Scheduled Articles', value: stats.scheduledArticles, icon: Clock, color: 'text-[#6366F1]', bg: 'bg-[#6366F1]/10' },
    { label: 'Pending Post Reviews', value: stats.pendingReviews, icon: AlertCircle, color: 'text-[#F59E0B]', bg: 'bg-[#F59E0B]/10' },
  ] : []

  return (
    <div className='grid gap-4 sm:grid-cols-3'>
      {stats === null
        ? [0, 1, 2].map((i) => (
            <Card key={i} className='rounded-xl border-none shadow-md'>
              <CardContent className='flex items-center justify-center py-10'>
                <Loader2 className='h-5 w-5 animate-spin text-muted-foreground' />
              </CardContent>
            </Card>
          ))
        : items.map((s) => {
            const Icon = s.icon
            return (
              <Card key={s.label} className='rounded-xl border-none shadow-md'>
                <CardContent className='flex items-center gap-4 pt-5'>
                  <div className={`rounded-lg p-3 ${s.bg}`}>
                    <Icon className={`h-5 w-5 ${s.color}`} />
                  </div>
                  <div>
                    <p className='text-xs text-muted-foreground'>{s.label}</p>
                    <p className={`font-georgia text-3xl font-bold tracking-tight ${s.color}`}>
                      {s.value.toLocaleString()}
                    </p>
                  </div>
                </CardContent>
              </Card>
            )
          })}
    </div>
  )
}
