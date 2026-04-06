'use client'
import { useEffect, useState } from 'react'
import { Users, ChevronDown, TrendingUp, Loader2 } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { supabase } from '@/lib/supabase'

interface AccountData {
  newUsers: number
  totalClients: number
  byCategory: { name: string; count: number }[]
}

async function fetchAccountData(): Promise<AccountData> {
  const d30 = new Date(); d30.setDate(d30.getDate() - 30)

  const [newUsers, clients, subsCats] = await Promise.all([
    supabase.from('users').select('*', { count: 'exact', head: true }).gte('created_at', d30.toISOString()),
    supabase.from('listing_subscriptions').select('*', { count: 'exact', head: true }).eq('status', 'active'),
    supabase
      .from('listing_subscriptions')
      .select('listing:listings!listing_id(category:categories!category_id(name))')
      .eq('status', 'active'),
  ])

  const counts: Record<string, number> = {}
  for (const row of (subsCats.data ?? []) as any[]) {
    const name = row.listing?.category?.name ?? 'Other'
    counts[name] = (counts[name] ?? 0) + 1
  }

  return {
    newUsers: newUsers.count ?? 0,
    totalClients: clients.count ?? 0,
    byCategory: Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([name, count]) => ({ name, count })),
  }
}

export function AccountStats() {
  const [data, setData] = useState<AccountData | null>(null)

  useEffect(() => {
    fetchAccountData().then(setData)
  }, [])

  if (!data) {
    return (
      <div className='space-y-6'>
        {[0, 1].map((i) => (
          <Card key={i} className='rounded-2xl bg-[#F9FAFB] px-4 shadow-sm'>
            <div className='flex items-center justify-center py-12'>
              <Loader2 className='h-5 w-5 animate-spin text-muted-foreground' />
            </div>
          </Card>
        ))}
      </div>
    )
  }

  return (
    <div className='space-y-6'>
      {/* New Accounts */}
      <Card className='rounded-2xl bg-[#F9FAFB] px-4 shadow-sm'>
        <div className='mb-2 flex items-center justify-between'>
          <h2 className='font-antigua text-xl font-semibold'>New Accounts</h2>
          <div className='flex items-center gap-1 text-sm text-muted-foreground'>
            Last 30 Days <ChevronDown className='h-4 w-4' />
          </div>
        </div>
        <div className='flex items-center gap-6'>
          <div className='flex h-16 w-16 items-center justify-center rounded-2xl bg-green-100'>
            <Users className='h-8 w-8 text-green-600' />
          </div>
          <div>
            <div className='flex items-center gap-3'>
              <span className='text-4xl font-semibold text-gray-900'>{data.newUsers.toLocaleString()}</span>
              <span className='flex items-center gap-1 font-medium text-green-600'>
                <TrendingUp className='h-3 w-3' /> new
              </span>
            </div>
            <p className='mt-1 text-sm text-muted-foreground'>new registered users</p>
          </div>
        </div>
        <div className='my-2 border-t' />
        <div className='pb-3 text-center text-xs text-muted-foreground'>
          All sign-up sources tracked via Supabase Auth
        </div>
      </Card>

      {/* Total Clients (active subscriptions by category) */}
      <Card className='rounded-2xl bg-[#F9FAFB] px-4 shadow-sm'>
        <div className='mb-2 flex items-center justify-between'>
          <h2 className='font-antigua text-xl font-semibold'>Active Subscriptions</h2>
          <div className='flex items-center gap-1 text-sm text-muted-foreground'>
            All time <ChevronDown className='h-4 w-4' />
          </div>
        </div>
        <div className='flex items-center gap-6'>
          <div className='flex h-16 w-16 items-center justify-center rounded-2xl bg-yellow-100'>
            <Users className='h-8 w-8 text-yellow-600' />
          </div>
          <div>
            <div className='flex items-center gap-3'>
              <span className='text-4xl font-semibold text-gray-900'>{data.totalClients.toLocaleString()}</span>
              <span className='flex items-center gap-1 font-medium text-yellow-600'>
                <TrendingUp className='h-3 w-3' /> active
              </span>
            </div>
            <p className='mt-1 text-sm text-muted-foreground'>paying client listings</p>
          </div>
        </div>
        <div className='my-2 border-t' />
        <div className={`grid pb-3 text-center`} style={{ gridTemplateColumns: `repeat(${Math.min(data.byCategory.length, 5)}, 1fr)` }}>
          {data.byCategory.map((c) => (
            <div key={c.name}>
              <p className='text-lg font-semibold'>{c.count}</p>
              <p className='truncate text-xs text-muted-foreground'>{c.name}</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
