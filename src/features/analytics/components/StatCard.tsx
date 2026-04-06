'use client'
import { useEffect, useState } from 'react'
import { NotepadText, Clock4, Mail, Users, Eye, TrendingUp, Loader2 } from 'lucide-react'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { getDashboardStats, type DashboardStats } from '@/lib/services/analytics.service'

export default function TabsPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null)

  useEffect(() => {
    getDashboardStats().then(setStats)
  }, [])

  const cards = stats
    ? [
        {
          title: 'Total Impressions',
          icon: <Eye className='h-5 w-5 text-[#CF9921]' />,
          quantity: stats.totalImpressions.toLocaleString(),
          duration: 'Total tracked',
          color: 'bg-[#CF9921]/10 text-[#CF9921]',
        },
        {
          title: 'Total Users',
          icon: <Users className='h-5 w-5 text-[#22C55E]' />,
          quantity: stats.totalUsers.toLocaleString(),
          duration: 'Registered',
          color: 'bg-[#22C55E]/10 text-[#22C55E]',
        },
        {
          title: 'Published Articles',
          icon: <NotepadText className='h-5 w-5 text-[#D40D00]' />,
          quantity: stats.totalArticles.toLocaleString(),
          duration: 'Live on site',
          color: 'bg-[#D40D00]/10 text-[#D40D00]',
        },
        {
          title: 'Newsletter Signups',
          icon: <Mail className='h-5 w-5 text-[#CF9921]' />,
          quantity: stats.totalClicks.toLocaleString(),
          duration: 'Total link clicks',
          color: 'bg-[#D2BB6B]/10 text-[#CF9921]',
        },
        {
          title: 'Favorites Saved',
          icon: <Eye className='h-5 w-5 text-[#22C55E]' />,
          quantity: stats.totalFavorites.toLocaleString(),
          duration: 'By all users',
          color: 'bg-[#22C55E]/10 text-[#22C55E]',
        },
        {
          title: 'Pending Inquiries',
          icon: <Clock4 className='h-5 w-5 text-[#D40D00]' />,
          quantity: stats.totalInquiries.toLocaleString(),
          duration: 'Awaiting response',
          color: 'bg-[#D40D00]/10 text-[#D40D00]',
        },
      ]
    : []

  if (!stats) {
    return (
      <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-6'>
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <Card key={i} className='relative overflow-hidden border-none shadow-md'>
            <CardContent className='flex items-center justify-center py-10'>
              <Loader2 className='h-5 w-5 animate-spin text-muted-foreground' />
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  return (
    <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-6'>
      {cards.map((item) => (
        <Card key={item.title} className='relative overflow-hidden border-none shadow-md'>
          <CardHeader className='flex flex-row items-center justify-between pb-2'>
            <div className={`rounded-lg p-2 ${item.color}`}>{item.icon}</div>
            <div className={`flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium ${item.color}`}>
              <TrendingUp className='h-3 w-3' />
              live
            </div>
          </CardHeader>
          <CardContent className='pt-2'>
            <p className='mb-0 text-sm text-muted-foreground'>{item.title}</p>
            <div className='font-georgia mb-2 text-[34px] font-bold tracking-tight'>
              {item.quantity}
            </div>
            <p className='relative z-10 text-[10px] text-muted-foreground'>{item.duration}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
