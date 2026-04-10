'use client'
// src/components/dashboard/EventsAndDeals.tsx
import { useState, useEffect, useCallback } from 'react'
import { Check, X, Clock, FileText } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card'
import EventsScheduled from './calender-sec'
import {
  getPendingReviewItems,
  approvePendingItem,
  rejectPendingItem,
  type PendingReviewItem,
} from '@/lib/services/analytics.service'

export function EventsAndDeals() {
  const [items, setItems] = useState<PendingReviewItem[]>([])
  const [loading, setLoading] = useState(true)

  const load = useCallback(async () => {
    setLoading(true)
    const data = await getPendingReviewItems(5)
    setItems(data)
    setLoading(false)
  }, [])

  useEffect(() => { load() }, [load])

  const handleApprove = async (item: PendingReviewItem) => {
    setItems((prev) => prev.filter((i) => i.id !== item.id))
    await approvePendingItem(item.type, item.id)
  }

  const handleReject = async (item: PendingReviewItem) => {
    setItems((prev) => prev.filter((i) => i.id !== item.id))
    await rejectPendingItem(item.type, item.id)
  }

  return (
    <div className='grid gap-6 md:grid-cols-2'>
      {/* Events Scheduled - Calendar */}
      <EventsScheduled />

      {/* Pending Deals */}
      <Card className='flex flex-col rounded-xl border bg-white shadow-sm'>
        <CardHeader className='flex px-6 pb-4 justify-between items-center'>
          <div>
            <CardTitle className='font-antigua text-base font-semibold'>
              Pending Deals
            </CardTitle>
            <CardDescription>
              {loading ? 'Loading…' : `${items.length} item${items.length !== 1 ? 's' : ''} awaiting review`}
            </CardDescription>
          </div>
          <Badge
            variant='secondary'
            className='flex items-center gap-1 rounded-full bg-[#FDF2E2] px-2 py-1 text-xs font-medium text-[#CF9921]'
          >
            <Clock className='h-3 w-3' />
            {loading ? '…' : items.length}
          </Badge>
        </CardHeader>

        <CardContent className='flex flex-col gap-3 px-3'>
          {loading ? (
            Array(3).fill(0).map((_, i) => (
              <div key={i} className='animate-pulse flex gap-3 rounded-lg bg-[#F9FAFB] p-4'>
                <div className='h-8 w-8 rounded-lg bg-gray-200 shrink-0' />
                <div className='flex-1 space-y-2'>
                  <div className='h-4 w-3/4 rounded bg-gray-200' />
                  <div className='h-3 w-1/2 rounded bg-gray-200' />
                </div>
              </div>
            ))
          ) : items.length === 0 ? (
            <div className='py-8 text-center text-sm text-muted-foreground'>
              No items awaiting review
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.id}
                className='flex items-center justify-between flex-col sm:flex-row rounded-lg bg-[#F9FAFB] p-4'
              >
                <div className='flex items-start gap-3'>
                  <div className='flex p-2 items-center justify-center rounded-lg bg-[#FDF2E2]'>
                    <FileText className='h-4 w-4 text-[#CF9921]' />
                  </div>
                  <div>
                    <p className='font-georgia text-sm font-medium text-gray-900'>
                      {item.title}
                    </p>
                    <p className='text-xs text-muted-foreground'>{item.authorLabel}</p>
                  </div>
                </div>

                <div className='flex items-center gap-2'>
                  <Badge className={`rounded-full border-none px-3 py-1 text-xs ${item.statusClass}`}>
                    {item.status}
                  </Badge>
                  <Button
                    size='icon'
                    variant='ghost'
                    className='h-8 w-8 text-green-600 hover:text-green-700'
                    onClick={() => handleApprove(item)}
                  >
                    <Check className='h-4 w-4' />
                  </Button>
                  <Button
                    size='icon'
                    variant='ghost'
                    className='h-8 w-8 text-red-600 hover:text-red-700'
                    onClick={() => handleReject(item)}
                  >
                    <X className='h-4 w-4' />
                  </Button>
                </div>
              </div>
            ))
          )}

          {!loading && items.length > 0 && (
            <Button
              variant='link'
              className='mt-2 self-center px-0 text-sm font-medium text-[#22C55E]'
            >
              View All Pending Items
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  )
}