'use client'
import { useEffect, useState } from 'react'
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell,
  PieChart, Pie, Legend,
} from 'recharts'
import { Loader2 } from 'lucide-react'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select'
import {
  getSubscriptionsByCategory,
  getSubscriptionsByTier,
  type SubsByCategory,
} from '@/lib/services/analytics.service'

const GOLD = '#CF9921'

export function SubscriptionBreakdown() {
  const [byCategory, setByCategory] = useState<SubsByCategory[]>([])
  const [byTier, setByTier] = useState<{ name: string; value: number; fill: string }[]>([])
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([getSubscriptionsByCategory(), getSubscriptionsByTier()])
      .then(([cats, tiers]) => {
        setByCategory(cats)
        setByTier(tiers)
        setLoading(false)
      })
  }, [])

  // Build sub-category data from category filter
  // Since we don't have a separate subcategory breakdown query, we show category data when filtered
  const subcatData = categoryFilter === 'all'
    ? byCategory
    : byCategory.filter((c) => c.name === categoryFilter)

  if (loading) {
    return (
      <div className='grid gap-4 lg:grid-cols-3'>
        {[0, 1, 2].map((i) => (
          <Card key={i} className='rounded-xl bg-[#F9FAFB] shadow-sm'>
            <CardContent className='flex items-center justify-center py-16'>
              <Loader2 className='h-5 w-5 animate-spin text-muted-foreground' />
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  return (
    <div className='grid gap-4 lg:grid-cols-3'>
      {/* By Category */}
      <Card className='rounded-xl bg-[#F9FAFB] shadow-sm'>
        <CardHeader className='pb-2'>
          <h3 className='font-antigua text-base font-semibold'>Subscriptions by Category</h3>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width='100%' height={220}>
            <BarChart data={byCategory} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
              <XAxis dataKey='name' tick={{ fontSize: 10 }} />
              <YAxis tick={{ fontSize: 10 }} />
              <Tooltip />
              <Bar dataKey='count' radius={[4, 4, 0, 0]}>
                {byCategory.map((_, i) => (
                  <Cell key={i} fill={i % 2 === 0 ? GOLD : '#E9C46A'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* By Sub-category (filtered) */}
      <Card className='rounded-xl bg-[#F9FAFB] shadow-sm'>
        <CardHeader className='flex flex-row items-center justify-between pb-2'>
          <h3 className='font-antigua text-base font-semibold'>By Category Filter</h3>
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className='h-7 w-32 text-xs'>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='all'>All</SelectItem>
              {byCategory.map((c) => (
                <SelectItem key={c.name} value={c.name}>{c.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardHeader>
        <CardContent>
          <div className='space-y-3'>
            {subcatData.length === 0 ? (
              <p className='py-8 text-center text-sm text-muted-foreground'>No data</p>
            ) : subcatData.map((item) => {
              const max = Math.max(...subcatData.map((d) => d.count), 1)
              return (
                <div key={item.name} className='space-y-1'>
                  <div className='flex justify-between text-xs'>
                    <span className='text-gray-700'>{item.name}</span>
                    <span className='font-semibold text-gray-900'>{item.count}</span>
                  </div>
                  <div className='h-1.5 w-full rounded-full bg-gray-200'>
                    <div className='h-1.5 rounded-full bg-[#CF9921]' style={{ width: `${(item.count / max) * 100}%` }} />
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* By Tier */}
      <Card className='rounded-xl bg-[#F9FAFB] shadow-sm'>
        <CardHeader className='pb-2'>
          <h3 className='font-antigua text-base font-semibold'>Subscriptions by Tier</h3>
        </CardHeader>
        <CardContent className='flex items-center justify-center'>
          {byTier.length === 0 ? (
            <p className='py-8 text-sm text-muted-foreground'>No subscription data yet</p>
          ) : (
            <ResponsiveContainer width='100%' height={220}>
              <PieChart>
                <Pie data={byTier} cx='50%' cy='50%' innerRadius={55} outerRadius={85} dataKey='value' paddingAngle={3}>
                  {byTier.map((entry, i) => (
                    <Cell key={i} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip formatter={(v) => [`${v} listings`, '']} />
                <Legend iconType='circle' iconSize={8} formatter={(value) => <span className='text-xs'>{value}</span>} />
              </PieChart>
            </ResponsiveContainer>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
