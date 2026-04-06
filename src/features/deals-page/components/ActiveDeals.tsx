'use client'

import { useEffect, useState } from 'react'
import { Loader2 } from 'lucide-react'
import DealCard from "../components/DealCard"
import { fetchDeals, type Deal } from '@/lib/services/deals.service'

export default function ActiveDeals() {
  const [deals, setDeals] = useState<Deal[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchDeals({ status: 'active' }).then((data) => {
      setDeals(data)
      setLoading(false)
    })
  }, [])

  return (
    <div className="my-5">
      <h2 className="font-bold mb-4">
        Active Deals <span className="text-muted-foreground">({loading ? '…' : deals.length})</span>
      </h2>

      {loading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
        </div>
      ) : deals.length === 0 ? (
        <p className="text-sm text-muted-foreground py-8 text-center">No active deals yet.</p>
      ) : (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {deals.map((deal) => (
          <DealCard
            key={deal.id}
            image={deal.cover_image ?? deal.listing?.cover_image ?? ''}
            profile=""
            name={deal.listing?.title ?? '—'}
            title={deal.title}
            date={deal.starts_at && deal.expires_at
              ? `${new Date(deal.starts_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} – ${new Date(deal.expires_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`
              : '—'}
            tags={deal.discount_type === 'percent' ? `${deal.discount_value}% Off` : deal.discount_type}
          />
        ))}
      </div>
      )}
    </div>
  )
}