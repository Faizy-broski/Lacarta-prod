'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Star, Eye, Badge as BadgeIcon, Loader2 } from "lucide-react"
import { fetchDeals, type Deal } from '@/lib/services/deals.service'

export default function FeaturedDeals() {
  const [deals, setDeals] = useState<Deal[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchDeals({ status: 'active', limit: 4 }).then((data) => {
      setDeals(data)
      setLoading(false)
    })
  }, [])

  return (
    <div className="my-5">
      <h2 className="font-bold mb-4">
        Featured Deals
        <span className="text-xs text-muted-foreground ml-2">
          Homepage placement
        </span>
      </h2>

      {loading ? (
        <div className="flex items-center justify-center py-8"><Loader2 className="h-5 w-5 animate-spin text-muted-foreground" /></div>
      ) : deals.length === 0 ? (
        <p className="text-sm text-muted-foreground py-8 text-center">No featured deals.</p>
      ) : (
      <div className="grid md:grid-cols-2 gap-4">
        {deals.map((deal, idx) => (
          <Card key={deal.id} className="p-0">
            <CardContent className="flex items-center gap-4">
              <div className="w-30 h-30 relative">

              {deal.cover_image || deal.listing?.cover_image ? (
                <img
                  src={deal.cover_image ?? deal.listing?.cover_image ?? ''}
                  className="w-full h-full object-cover"
                  alt=""
                />
              ) : (
                <div className="w-full h-full bg-gray-800" />
              )}
              <BadgeIcon className="bg-yellow-500 text-white font-bold rounded-full p-1 absolute top-2 left-2">{idx + 1}</BadgeIcon>
              </div>

              <div className="flex-1 space-y-2">
                <div className="flex items-center gap-1 text-sm font-medium">
                  <Star size={14} className="text-yellow-500" />
                 <p className="text-xs text-yellow-500 font-bold"> Featured Deal</p>
                </div>
                <p className="text-medium font-bold">{deal.title}</p>
                <p className="text-sm text-muted-foreground">{deal.listing?.title ?? '—'}</p>
                <div className="flex justify-between">
                <span className="flex text-muted-foreground gap-3 items-center"><Eye size={13}/><p className="text-xs text-muted-foreground">Preview Placement</p></span>
               <div className="flex gap-2 items-center">
              <span className="text-xs font-semibold text-muted-foreground">Featured</span>
              <Switch defaultChecked />
              </div>
              </div>
              </div>

            </CardContent>
          </Card>
        ))}
      </div>
      )}
    </div>
  )
}
