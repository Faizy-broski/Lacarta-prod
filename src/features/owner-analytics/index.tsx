import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { Separator } from '@/components/ui/separator'
import { AudienceGeography } from '@/features/analytics/components/AudienceGeography'
import { RecentActivity } from '@/features/analytics/components/RecentActivity'
import { TopArticles } from '@/features/analytics/components/TopArticles'
import { VisitorsChart } from '@/features/analytics/components/VisitorsChart'
import { ContentStats } from './components/ContentStats'
import { FormSubmissions } from './components/FormSubmissions'
import { PromoEventStats } from './components/PromoEventStats'
import { SubscriptionBreakdown } from './components/SubscriptionBreakdown'
import { SubscriptionStats } from './components/SubscriptionStats'

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <div className='mb-4 mt-8'>
      <p className='text-xs font-semibold uppercase tracking-widest text-muted-foreground'>
        {children}
      </p>
      <Separator className='mt-2' />
    </div>
  )
}

export function OwnerAnalyticsPage() {
  return (
    <>
      <Header />
      <Main>
        <div className='mb-6'>
          <h1 className='font-antigua text-3xl font-bold tracking-tight'>Owner Analytics</h1>
          <p className='mt-1 text-sm text-muted-foreground'>
            Platform-wide metrics — subscriptions, traffic, content, and engagement
          </p>
        </div>

        {/* ── Platform KPIs ── */}
        <SectionHeading>Platform KPIs</SectionHeading>
        <SubscriptionStats />

        {/* ── Subscription Breakdown ── */}
        <SectionHeading>Subscription Breakdown</SectionHeading>
        <SubscriptionBreakdown />

        {/* ── Site Traffic ── */}
        <SectionHeading>Site Traffic</SectionHeading>
        <VisitorsChart />

        {/* ── Content ── */}
        <SectionHeading>Content Overview</SectionHeading>
        <ContentStats />

        <div className='mt-4 grid gap-4 lg:grid-cols-3'>
          <TopArticles className='lg:col-span-2' />
          <AudienceGeography />
        </div>

        {/* ── Promos, Events & Engagement ── */}
        <SectionHeading>Promos, Events & Engagement</SectionHeading>
        <PromoEventStats />

        {/* ── Form Submissions & Comments ── */}
        <SectionHeading>Form Submissions & Comments</SectionHeading>
        <FormSubmissions />

        {/* ── Recent Activity ── */}
        <SectionHeading>Recent Activity</SectionHeading>
        <RecentActivity />
      </Main>
    </>
  )
}
