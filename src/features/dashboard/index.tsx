'use client'
import { useEffect, useState } from 'react'
import {
  Eye,
  Users,
  FileText,
  Mail,
  Link as LinkIcon,
  Clock,
} from 'lucide-react'
import { useAuthStore } from '@/lib/auth/auth.store'
import {
  Card,
  CardContent,
  CardHeader,
} from '@/components/ui/card'
import {
  Tabs,
  TabsContent,
} from '@/components/ui/tabs'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { VisitorsEngagementChart } from './components/VisitorsEngagementChart'
import { Analytics } from './components/analytics'
import { AnalyticsPanels } from './components/analyticsPanels'
import { EventsAndDeals } from './components/eventsAndDeals'
import { getDashboardStats, type DashboardStats } from '@/lib/services/analytics.service'

function formatStat(n: number): string {
  if (n >= 1000000) return `${(n / 1000000).toFixed(1)}M`
  if (n >= 1000) return `${(n / 1000).toFixed(1)}K`
  return n.toLocaleString()
}

export function Dashboard() {
  const user = useAuthStore((state) => state.user)
  const [stats, setStats] = useState<DashboardStats | null>(null)

  useEffect(() => {
    getDashboardStats().then(setStats)
  }, [])

  return (
    <>
      {/* ===== Top Heading ===== */}
      <Header />

      {/* ===== Main ===== */}
      <Main>
        <div className='mb-6 h-20 space-y-1 pt-2'>
          <h1 className='font-antigua font-serif text-2xl font-semibold tracking-normal text-[#1a1c1e] dark:text-white'>
            Welcome back, <span className='text-[#c4a04d]'>{user?.name}</span>
          </h1>
          <p className='text-sm text-muted-foreground'>
            Here's what's happening with LaCarta.co today.
          </p>
        </div>
        <Tabs
          orientation='vertical'
          defaultValue='overview'
          className='space-y-4'
        >
          <TabsContent value='overview' className='space-y-4'>
            <div className='grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6'>
              <Card className='relative overflow-hidden border-none bg-gradient-to-r from-[#CF9921] to-[#D2BB6B] text-white shadow-md'>
                <CardHeader className='flex flex-row items-center justify-between pb-2'>
                  <div className='rounded-lg bg-white/20 p-2'>
                    <Eye className='h-5 w-5 text-white' />
                  </div>
                </CardHeader>
                <CardContent className='pt-2'>
                  <p className='mb-0 text-sm text-white/90'>Impressions</p>
                  <div className='font-georgia mb-2 text-[34px] font-bold tracking-tight'>
                    {stats ? formatStat(stats.totalImpressions) : '—'}
                  </div>
                  <p className='relative z-10 text-[10px] text-white/75'>
                    all time
                  </p>
                </CardContent>
              </Card>

              <Card className='relative overflow-hidden border-none bg-gradient-to-r from-[#22C55E] to-[#105F2D] text-white shadow-md'>
                <CardHeader className='flex flex-row items-center justify-between pb-2'>
                  <div className='rounded-lg bg-white/20 p-2'>
                    <Users className='h-5 w-5 text-white' />
                  </div>
                </CardHeader>
                <CardContent className='pt-2'>
                  <p className='mb-0 text-sm text-white/90'>Total Users</p>
                  <div className='font-georgia mb-2 text-[34px] font-bold tracking-tight'>
                    {stats ? formatStat(stats.totalUsers) : '—'}
                  </div>
                  <p className='relative z-10 text-[10px] text-white/75'>
                    registered
                  </p>
                </CardContent>
              </Card>

              <Card className='relative overflow-hidden border-none bg-gradient-to-r from-[#980001] to-[#D40D00] text-white shadow-md'>
                <CardHeader className='flex flex-row items-center justify-between pb-2'>
                  <div className='rounded-lg bg-white/20 p-2'>
                    <FileText className='h-5 w-5 text-white' />
                  </div>
                </CardHeader>
                <CardContent className='pt-2'>
                  <p className='mb-0 text-sm text-white/90'>Articles</p>
                  <div className='font-georgia mb-2 text-[34px] font-bold tracking-tight'>
                    {stats ? formatStat(stats.totalArticles) : '—'}
                  </div>
                  <p className='relative z-10 text-[10px] text-white/75'>
                    published
                  </p>
                </CardContent>
              </Card>

              <Card className='relative overflow-hidden border-none bg-gradient-to-r from-[#CF9921] to-[#D2BB6B] text-white shadow-md'>
                <CardHeader className='flex flex-row items-center justify-between pb-2'>
                  <div className='rounded-lg bg-white/20 p-2'>
                    <Mail className='h-5 w-5 text-white' />
                  </div>
                </CardHeader>
                <CardContent className='pt-2'>
                  <p className='mb-0 text-sm text-white/90'>Heart Saves</p>
                  <div className='font-georgia mb-2 text-[34px] font-bold tracking-tight'>
                    {stats ? formatStat(stats.totalFavorites) : '—'}
                  </div>
                  <p className='relative z-10 text-[10px] text-white/75'>
                    all time
                  </p>
                </CardContent>
              </Card>
              <Card className='relative overflow-hidden border-none bg-gradient-to-r from-[#22C55E] to-[#105F2D] text-white shadow-md'>
                <CardHeader className='flex flex-row items-center justify-between pb-2'>
                  <div className='rounded-lg bg-white/20 p-2'>
                    <LinkIcon className='h-5 w-5 text-white' />
                  </div>
                </CardHeader>
                <CardContent className='pt-2'>
                  <p className='mb-0 text-sm text-white/90'>Link Clicks</p>
                  <div className='font-georgia mb-2 text-[34px] font-bold tracking-tight'>
                    {stats ? formatStat(stats.totalClicks) : '—'}
                  </div>
                  <p className='relative z-10 text-[10px] text-white/75'>
                    all time
                  </p>
                </CardContent>
              </Card>
              <Card className='relative overflow-hidden border-none bg-gradient-to-r from-[#980001] to-[#D40D00] text-white shadow-md'>
                <CardHeader className='flex flex-row items-center justify-between pb-2'>
                  <div className='rounded-lg bg-white/20 p-2'>
                    <Clock className='h-5 w-5 text-white' />
                  </div>
                </CardHeader>
                <CardContent className='pt-2'>
                  <p className='mb-0 text-sm text-white/90'>Inquiries</p>
                  <div className='font-georgia mb-2 text-[34px] font-bold tracking-tight'>
                    {stats ? formatStat(stats.totalInquiries) : '—'}
                  </div>
                  <p className='relative z-10 text-[10px] text-white/75'>
                    awaiting approval
                  </p>
                </CardContent>
              </Card>
            </div>
            <div className='grid grid-cols-1 gap-4 lg:grid-cols-7'>
              <VisitorsEngagementChart />
            </div>
            <AnalyticsPanels />
            <EventsAndDeals />
          </TabsContent>
          <TabsContent value='analytics' className='space-y-4'>
            <Analytics />
          </TabsContent>
        </Tabs>
      </Main>
    </>
  )
}
