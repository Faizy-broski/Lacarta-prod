'use client'
import { useEffect, useState } from 'react'
import {
  BarChart2,
  MousePointerClick,
  Heart,
  Globe,
  Map,
  Share2,
  ExternalLink,
  Phone,
  Loader2,
} from 'lucide-react'
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { getListingEventCounts } from '@/lib/services/analytics.service'

type AnalyticsData = Awaited<ReturnType<typeof getListingEventCounts>>

function StatRow({
  icon,
  label,
  value,
  color,
}: {
  icon: React.ReactNode
  label: string
  value: number
  color: string
}) {
  return (
    <div className='flex items-center justify-between rounded-lg border bg-card px-3 py-2.5'>
      <div className='flex items-center gap-2.5'>
        <div className={`rounded-md p-1.5 ${color}`}>{icon}</div>
        <span className='text-sm text-gray-700'>{label}</span>
      </div>
      <span className='font-semibold text-gray-900'>{value.toLocaleString()}</span>
    </div>
  )
}

const INQUIRY_COLORS = ['#CF9921', '#22C55E', '#6366F1', '#F59E0B', '#EC4899']

export function ListingAnalytics({
  listingId,
  listingTitle,
}: {
  listingId: string
  listingTitle: string
}) {
  const [open, setOpen] = useState(false)
  const [data, setData] = useState<AnalyticsData | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!open || data) return
    setLoading(true)
    getListingEventCounts(listingId, 30).then((d) => {
      setData(d)
      setLoading(false)
    })
  }, [open, listingId, data])

  const inquiryPieData = data
    ? [
        { name: 'Link Clicks', value: data.clicks },
        { name: 'Directions', value: data.directions_clicks },
        { name: 'Phone', value: data.phone_clicks },
        { name: 'Email', value: data.email_clicks },
        { name: 'WhatsApp', value: data.whatsapp_clicks },
      ]
    : []

  const totalInquiries = data
    ? data.phone_clicks + data.email_clicks + data.whatsapp_clicks + data.directions_clicks + data.clicks
    : 0

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          size='sm'
          variant='ghost'
          className='h-7 gap-1.5 px-3 text-xs text-[#CF9921] hover:bg-[#CF9921]/10'
        >
          <BarChart2 className='h-3.5 w-3.5' />
          Analytics
        </Button>
      </SheetTrigger>

      <SheetContent side='right' className='w-full max-w-md overflow-y-auto'>
        <SheetHeader className='mb-4'>
          <SheetTitle className='font-antigua text-lg leading-snug'>
            {listingTitle}
          </SheetTitle>
          <p className='text-xs text-muted-foreground'>Last 30 days · listing performance</p>
        </SheetHeader>

        {loading ? (
          <div className='flex items-center justify-center py-20'>
            <Loader2 className='h-6 w-6 animate-spin text-muted-foreground' />
          </div>
        ) : !data ? (
          <div className='py-20 text-center text-sm text-muted-foreground'>
            No analytics data yet.
          </div>
        ) : (
          <>
            {/* Top KPIs */}
            <div className='mb-4 grid grid-cols-3 gap-3'>
              {[
                { label: 'Impressions', value: data.impressions, icon: <BarChart2 className='h-4 w-4' />, color: 'bg-[#CF9921]/10 text-[#CF9921]' },
                { label: 'Traffic Clicks', value: data.clicks, icon: <MousePointerClick className='h-4 w-4' />, color: 'bg-[#6366F1]/10 text-[#6366F1]' },
                { label: 'Heart Saves', value: data.heart_saves, icon: <Heart className='h-4 w-4' />, color: 'bg-[#EC4899]/10 text-[#EC4899]' },
              ].map((kpi) => (
                <Card key={kpi.label} className='rounded-xl border-none shadow-sm'>
                  <CardContent className='flex flex-col items-center justify-center pt-4 pb-3 text-center gap-1'>
                    <div className={`rounded-lg p-2 ${kpi.color}`}>{kpi.icon}</div>
                    <p className='font-georgia text-xl font-bold tracking-tight'>
                      {kpi.value.toLocaleString()}
                    </p>
                    <p className='text-[10px] text-muted-foreground'>{kpi.label}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Inquiries donut */}
            <Card className='mb-4 rounded-xl bg-muted/30 shadow-sm'>
              <CardContent className='pt-4'>
                <div className='mb-1 flex items-center justify-between'>
                  <p className='text-sm font-semibold'>Total Inquiries</p>
                  <span className='font-georgia text-lg font-bold text-[#CF9921]'>
                    {totalInquiries.toLocaleString()}
                  </span>
                </div>
                <ResponsiveContainer width='100%' height={180}>
                  <PieChart>
                    <Pie
                      data={inquiryPieData}
                      cx='50%'
                      cy='50%'
                      innerRadius={45}
                      outerRadius={70}
                      dataKey='value'
                      paddingAngle={3}
                    >
                      {inquiryPieData.map((_, i) => (
                        <Cell key={i} fill={INQUIRY_COLORS[i % INQUIRY_COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(v) => [Number(v).toLocaleString(), '']} />
                    <Legend iconType='circle' iconSize={7} formatter={(v) => <span className='text-xs'>{v}</span>} />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Link Metrics */}
            <div className='space-y-2'>
              <p className='mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground'>
                Link Performance
              </p>
              <StatRow icon={<Globe className='h-3.5 w-3.5' />} label='Website Link Clicks' value={data.website_clicks} color='bg-[#22C55E]/10 text-[#22C55E]' />
              <StatRow icon={<Map className='h-3.5 w-3.5' />} label='Maps Clicks' value={data.maps_clicks} color='bg-[#6366F1]/10 text-[#6366F1]' />
              <StatRow icon={<Share2 className='h-3.5 w-3.5' />} label='Social Media Clicks' value={data.social_clicks} color='bg-[#F59E0B]/10 text-[#F59E0B]' />
              <StatRow icon={<ExternalLink className='h-3.5 w-3.5' />} label='Third-party Link Clicks' value={data.third_party_clicks} color='bg-[#CF9921]/10 text-[#CF9921]' />
              <StatRow icon={<Phone className='h-3.5 w-3.5' />} label='Phone Number Clicks' value={data.phone_clicks} color='bg-[#EC4899]/10 text-[#EC4899]' />
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  )
}
