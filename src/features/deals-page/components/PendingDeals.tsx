'use client'

import { useEffect, useState } from 'react'
import { CheckCircle, XCircle, Loader2, Tag } from 'lucide-react'
import { toast } from 'sonner'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { fetchDeals, updateDeal, type Deal } from '@/lib/services/deals.service'

export default function PendingDeals() {
  const [deals, setDeals] = useState<Deal[]>([])
  const [loading, setLoading] = useState(true)
  const [acting, setActing] = useState<string | null>(null)

  useEffect(() => {
    fetchDeals({ status: 'pending' }).then((data) => {
      setDeals(data)
      setLoading(false)
    })
  }, [])

  const handle = async (id: string, action: 'active' | 'draft') => {
    setActing(id)
    try {
      await updateDeal(id, { status: action })
      setDeals((prev) => prev.filter((d) => d.id !== id))
      toast.success(action === 'active' ? 'Deal approved and activated.' : 'Deal rejected.')
    } catch {
      toast.error('Failed to update deal.')
    } finally {
      setActing(null)
    }
  }

  if (loading) {
    return (
      <div className='flex items-center justify-center py-10'>
        <Loader2 className='h-5 w-5 animate-spin text-muted-foreground' />
      </div>
    )
  }

  if (deals.length === 0) {
    return (
      <div className='py-10 text-center text-sm text-muted-foreground'>
        No pending deals awaiting approval.
      </div>
    )
  }

  return (
    <div className='space-y-3'>
      {deals.map((deal) => (
        <Card key={deal.id} className='border-yellow-200 bg-yellow-50/40'>
          <CardHeader className='pb-1'>
            <div className='flex items-start justify-between gap-3'>
              <div className='flex items-center gap-2'>
                <Tag className='h-4 w-4 shrink-0 text-yellow-600' />
                <div>
                  <p className='font-medium leading-tight'>{deal.title}</p>
                  <p className='text-xs text-muted-foreground'>
                    {deal.discount_value > 0 ? `${deal.discount_value}${deal.discount_type === 'percent' ? '%' : ''} off` : deal.discount_type}
                    {deal.listing ? ` · ${deal.listing.title}` : ''}
                    {deal.creator ? ` · by ${deal.creator.full_name}` : ''}
                  </p>
                </div>
              </div>
              <Badge variant='outline' className='shrink-0 border-yellow-300 bg-yellow-100 text-yellow-700 text-[10px]'>
                Pending Review
              </Badge>
            </div>
          </CardHeader>
          {deal.description && (
            <CardContent className='pb-2 pt-0'>
              <p className='text-xs text-muted-foreground line-clamp-2'>{deal.description}</p>
            </CardContent>
          )}
          <CardContent className='flex gap-2 pb-3 pt-1'>
            <Button
              size='sm'
              className='h-8 gap-1.5 bg-green-600 hover:bg-green-700 text-white'
              disabled={acting === deal.id}
              onClick={() => handle(deal.id, 'active')}
            >
              {acting === deal.id ? <Loader2 className='h-3.5 w-3.5 animate-spin' /> : <CheckCircle className='h-3.5 w-3.5' />}
              Approve
            </Button>
            <Button
              size='sm'
              variant='outline'
              className='h-8 gap-1.5 border-red-300 text-red-600 hover:bg-red-50'
              disabled={acting === deal.id}
              onClick={() => handle(deal.id, 'draft')}
            >
              <XCircle className='h-3.5 w-3.5' />
              Reject
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
