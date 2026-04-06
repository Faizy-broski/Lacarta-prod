'use client'
import { useEffect, useState } from 'react'
import { Building2, Users, Mail, TrendingUp, Loader2 } from 'lucide-react'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { getOwnerPlatformStats, type OwnerPlatformStats } from '@/lib/services/analytics.service'

export function SubscriptionStats() {
  const [stats, setStats] = useState<OwnerPlatformStats | null>(null)

  useEffect(() => {
    getOwnerPlatformStats().then(setStats)
  }, [])

  if (!stats) {
    return (
      <div className='grid gap-4 sm:grid-cols-3'>
        {[0, 1, 2].map((i) => (
          <Card key={i} className='rounded-xl border-none shadow-md'>
            <CardContent className='flex items-center justify-center py-10'>
              <Loader2 className='h-5 w-5 animate-spin text-muted-foreground' />
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  const kpis = [
    {
      title: 'Total Business Subscriptions',
      value: stats.totalSubscriptions.toLocaleString(),
      new30d: `+${stats.subscriptions30dAgo}`,
      new1y: `+${stats.subscriptions1yAgo}`,
      icon: Building2,
      color: 'text-[#CF9921]',
      bg: 'bg-[#CF9921]/10',
    },
    {
      title: 'Total User Memberships',
      value: stats.totalMemberships.toLocaleString(),
      new30d: `+${stats.memberships30dAgo}`,
      new1y: `+${stats.memberships1yAgo}`,
      icon: Users,
      color: 'text-[#22C55E]',
      bg: 'bg-[#22C55E]/10',
    },
    {
      title: 'Newsletter Signups',
      value: stats.totalNewsletter.toLocaleString(),
      new30d: `+${stats.newsletter30dAgo}`,
      new1y: `+${stats.newsletter1yAgo}`,
      icon: Mail,
      color: 'text-[#6366F1]',
      bg: 'bg-[#6366F1]/10',
    },
  ]

  return (
    <div className='grid gap-4 sm:grid-cols-3'>
      {kpis.map((kpi) => {
        const Icon = kpi.icon
        return (
          <Card key={kpi.title} className='rounded-xl border-none shadow-md'>
            <CardHeader className='flex flex-row items-center justify-between pb-2'>
              <div className={`rounded-lg p-2 ${kpi.bg}`}>
                <Icon className={`h-5 w-5 ${kpi.color}`} />
              </div>
              <div className={`flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium ${kpi.bg} ${kpi.color}`}>
                <TrendingUp className='h-3 w-3' />
                {kpi.new30d} / 30d
              </div>
            </CardHeader>
            <CardContent className='pt-2'>
              <p className='mb-0 text-sm text-muted-foreground'>{kpi.title}</p>
              <div className='font-georgia mb-1 text-[34px] font-bold tracking-tight'>
                {kpi.value}
              </div>
              <div className='flex gap-4 text-[10px] text-muted-foreground'>
                <span>30d: <span className={kpi.color}>{kpi.new30d}</span></span>
                <span>1yr: <span className={kpi.color}>{kpi.new1y}</span></span>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
