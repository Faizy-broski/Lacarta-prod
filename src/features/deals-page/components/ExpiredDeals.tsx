'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Copy, RefreshCw, Loader2 } from "lucide-react"
import { fetchDeals, type Deal } from '@/lib/services/deals.service'

export default function ExpiredDeals() {
  const [deals, setDeals] = useState<Deal[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchDeals({ status: 'expired' }).then((data) => {
      setDeals(data)
      setLoading(false)
    })
  }, [])

  return (
    <div className="my-5">
      <h2 className="font-bold mb-4">
        Expired Deals <span className="text-muted-foreground">({loading ? '…' : deals.length})</span>
      </h2>

      {loading ? (
        <div className="flex items-center justify-center py-8"><Loader2 className="h-5 w-5 animate-spin text-muted-foreground" /></div>
      ) : deals.length === 0 ? (
        <p className="text-sm text-muted-foreground py-8 text-center">No expired deals.</p>
      ) : (
      <div className="grid md:grid-cols-3 gap-4">
        {deals.map((deal) => (
            <Card key={deal.id}>
              <CardContent className="space-y-3">
                <Badge variant="destructive" className="bg-red-100 text-red-600 font-bold rounded-full px-3 py-1">Expired</Badge>
                <p className="font-semibold text-muted-foreground">{deal.title}</p>
                <p className="text-xs font-semibold text-muted-foreground">
                  {deal.expires_at ? `Ended ${new Date(deal.expires_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}` : '—'}
                </p>

                <div className="flex gap-2">
                  <Button size="sm" className="flex-1 bg-green-100 text-green-700 font bold">
                    <RefreshCw className="font-bold" size={38}/>
                    Renew
                  </Button>
                  <Button size="sm" variant="outline" className="flex">
                    <Copy size={38}/>
                    Duplicate
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
      </div>
      )}
    </div>
  )
}
