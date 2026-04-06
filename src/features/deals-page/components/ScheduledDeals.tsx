'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Loader2 } from "lucide-react"
import { fetchDeals, type Deal } from '@/lib/services/deals.service'

export default function ScheduledDeals() {
  const [deals, setDeals] = useState<Deal[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchDeals({ status: 'scheduled' }).then((data) => {
      setDeals(data)
      setLoading(false)
    })
  }, [])

  return (
    <div className="my-5">
      <h2 className="font-bold mb-4">
        Scheduled Deals <span className="text-muted-foreground">({loading ? '…' : deals.length})</span>
      </h2>

      {loading ? (
        <div className="flex items-center justify-center py-8"><Loader2 className="h-5 w-5 animate-spin text-muted-foreground" /></div>
      ) : deals.length === 0 ? (
        <p className="text-sm text-muted-foreground py-8 text-center">No scheduled deals.</p>
      ) : (
      <div className="grid md:grid-cols-3 gap-4">
        {deals.map((deal) => (
            <Card key={deal.id} className="p-2">
              <CardContent className=" space-y-2">
                <div className="flex justify-between">
                <Badge className="bg-green-100 rounded-full text-green-700 p-2 font-bold">
                  Scheduled
                </Badge>
                <Badge className="font-bold bg-white">
                   <Switch></Switch>
                   <span className="text-yellow-600">Auto Publish</span>
                </Badge>
                </div>
                <h2 className="font-bold text-sm">{deal.title}</h2>
                <p className="text-sm font-semibold text-muted-foreground">{deal.listing?.title ?? '—'}</p>
                <div className="flex gap-2 items-center">
                <Calendar size={18} />
                <p className="text-sm font-semibold text-muted-foreground">
                   {deal.starts_at ? `Starts ${new Date(deal.starts_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}` : '—'}
                </p>
                </div>
                <hr></hr>
                <Button variant="outline" size="sm" className="w-full border border-yellow-600 font-bold text-yellow-600">
                  Edit Schedule
                </Button>
              </CardContent>
            </Card>
          ))}
      </div>
      )}
    </div>
  )
}