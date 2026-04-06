'use client'
import { useEffect, useState } from 'react'
import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer,
  CartesianGrid, Legend,
} from 'recharts'
import { Loader2 } from 'lucide-react'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { getDailyEngagementByCategory } from '@/lib/services/analytics.service'

const CATEGORY_LINES = [
  { key: 'hotels', color: '#C81E1E' },
  { key: 'beaches', color: '#0891B2' },
  { key: 'gastronomy', color: '#CA8A04' },
  { key: 'activities', color: '#16A34A' },
  { key: 'boating', color: '#7C3AED' },
  { key: 'real_estate', color: '#D97706' },
]

export function VisitorsChart() {
  const [data, setData] = useState<Record<string, any>[]>([])
  const [loading, setLoading] = useState(true)
  const [activeKeys, setActiveKeys] = useState<Set<string>>(new Set(CATEGORY_LINES.map((c) => c.key)))

  useEffect(() => {
    getDailyEngagementByCategory(7).then((d) => {
      setData(d)
      setLoading(false)
    })
  }, [])

  return (
    <Card className='my-10 rounded-xl bg-[#F9FAFB] shadow-sm'>
      <CardHeader className='pb-2'>
        <div className='flex items-start justify-between'>
          <div>
            <h3 className='text-lg font-semibold'>Engagement by Category</h3>
            <p className='text-sm text-muted-foreground'>Last 7 days — click events from listing analytics</p>
          </div>
        </div>
      </CardHeader>
      <CardContent className='relative h-[340px]'>
        {loading ? (
          <div className='flex h-full items-center justify-center'>
            <Loader2 className='h-6 w-6 animate-spin text-muted-foreground' />
          </div>
        ) : data.length === 0 ? (
          <div className='flex h-full items-center justify-center text-sm text-muted-foreground'>
            No engagement data yet. Events will appear once users interact with listings.
          </div>
        ) : (
          <ResponsiveContainer width='100%' height='100%'>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray='3 3' vertical={false} stroke='#E5E7EB' />
              <XAxis dataKey='day' tickLine={false} axisLine={false} tick={{ fill: '#6B7280', fontSize: 12 }} />
              <YAxis tickLine={false} axisLine={false} tick={{ fill: '#6B7280', fontSize: 12 }} />
              <Tooltip />
              <Legend
                verticalAlign='top'
                align='right'
                iconType='circle'
                wrapperStyle={{ paddingBottom: 20 }}
              />
              {CATEGORY_LINES.map((cat) => (
                <Line
                  key={cat.key}
                  type='monotone'
                  dataKey={cat.key}
                  name={cat.key.replace('_', ' ')}
                  stroke={cat.color}
                  strokeWidth={2}
                  dot={false}
                  hide={!activeKeys.has(cat.key)}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  )
}
