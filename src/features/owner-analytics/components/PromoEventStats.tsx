'use client'
import { useEffect, useState } from 'react'
import { Tag, Calendar, Heart, Users, Loader2 } from 'lucide-react'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import {
  getOwnerPlatformStats,
  getSubscriptionsByCategory,
  getTopHeartSaves,
  type OwnerPlatformStats,
  type SubsByCategory,
} from '@/lib/services/analytics.service'

export function PromoEventStats() {
  const [stats, setStats] = useState<OwnerPlatformStats | null>(null)
  const [topSaves, setTopSaves] = useState<{ name: string; saves: number }[]>([])
  const [byCategory, setByCategory] = useState<SubsByCategory[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([
      getOwnerPlatformStats(),
      getTopHeartSaves(5),
      getSubscriptionsByCategory(),
    ]).then(([s, saves, cats]) => {
      setStats(s)
      setTopSaves(saves)
      setByCategory(cats)
      setLoading(false)
    })
  }, [])

  const kpis = stats ? [
    { label: 'Total Events Created/Scheduled', value: stats.totalEvents.toLocaleString(), icon: Calendar, color: 'text-[#CF9921]', bg: 'bg-[#CF9921]/10' },
    { label: 'Users with Wishlist', value: stats.totalHeartSaves.toLocaleString(), icon: Users, color: 'text-[#6366F1]', bg: 'bg-[#6366F1]/10' },
  ] : []

  return (
    <div className='grid gap-4 lg:grid-cols-3'>
      <div className='space-y-4'>
        {loading
          ? [0, 1].map((i) => (
              <Card key={i} className='rounded-xl border-none shadow-md'>
                <CardContent className='flex items-center justify-center py-10'>
                  <Loader2 className='h-5 w-5 animate-spin text-muted-foreground' />
                </CardContent>
              </Card>
            ))
          : kpis.map((k) => {
              const Icon = k.icon
              return (
                <Card key={k.label} className='rounded-xl border-none shadow-md'>
                  <CardContent className='flex items-center gap-4 pt-5'>
                    <div className={`rounded-lg p-3 ${k.bg}`}>
                      <Icon className={`h-5 w-5 ${k.color}`} />
                    </div>
                    <div>
                      <p className='text-xs text-muted-foreground'>{k.label}</p>
                      <p className={`font-georgia text-3xl font-bold tracking-tight ${k.color}`}>
                        {k.value}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              )
            })}

        {/* Active Promos by Category */}
        {stats && (
          <Card className='rounded-xl border-none shadow-md'>
            <CardHeader className='pb-2'>
              <div className='flex items-center gap-2'>
                <div className='rounded-lg p-2 bg-[#D40D00]/10'>
                  <Tag className='h-4 w-4 text-[#D40D00]' />
                </div>
                <p className='text-sm font-medium'>Active Promos</p>
              </div>
            </CardHeader>
            <CardContent>
              <p className='font-georgia text-4xl font-bold tracking-tight text-[#D40D00]'>
                {stats.totalDeals.toLocaleString()}
              </p>
              <p className='mt-1 text-xs text-muted-foreground'>Across all categories</p>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Top Heart Saves */}
      <Card className='rounded-xl bg-[#F9FAFB] shadow-sm lg:col-span-2'>
        <CardHeader className='pb-2'>
          <h3 className='font-antigua text-base font-semibold'>Top Heart Saves</h3>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className='flex items-center justify-center py-12'>
              <Loader2 className='h-5 w-5 animate-spin text-muted-foreground' />
            </div>
          ) : topSaves.length === 0 ? (
            <p className='py-12 text-center text-sm text-muted-foreground'>No heart saves tracked yet.</p>
          ) : (
            <div className='space-y-4'>
              {topSaves.map((item, i) => {
                const max = topSaves[0]?.saves || 1
                return (
                  <div key={item.name} className='space-y-1'>
                    <div className='flex items-center justify-between text-sm'>
                      <div className='flex items-center gap-2'>
                        <span className='flex h-5 w-5 items-center justify-center rounded-full bg-[#CF9921]/20 text-xs font-bold text-[#CF9921]'>
                          {i + 1}
                        </span>
                        <span className='text-gray-800'>{item.name}</span>
                      </div>
                      <div className='flex items-center gap-1 text-xs font-semibold text-[#CF9921]'>
                        <Heart className='h-3.5 w-3.5' />
                        {item.saves.toLocaleString()}
                      </div>
                    </div>
                    <div className='h-1.5 w-full rounded-full bg-gray-200'>
                      <div className='h-1.5 rounded-full bg-[#CF9921]' style={{ width: `${(item.saves / max) * 100}%` }} />
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
