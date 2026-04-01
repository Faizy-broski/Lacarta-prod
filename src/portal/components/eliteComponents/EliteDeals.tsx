import { Card, CardContent } from "@public/components/ui/card"
import { Badge } from "@public/components/ui/badge"
import { Button } from "@public/components/ui/button"
import {Tag,Calendar,ArrowRight} from 'lucide-react'

const deals = [
  {
    title: "Extended Stay Package",
    description:
      "Book 5 nights, get the 6th night complimentary. Includes daily breakfast.",
    save: "SAVE 20%",
    expires: "Valid until March 31",
  },
  {
    title: "Romantic Escape",
    description:
      "Private beachfront dinner, couples massage, and champagne on arrival.",
    save: "SAVE 30%",
    expires: "Valid until February 14",
  },
]

export function EliteDeals() {
  return (
    <section className="max-w-6xl mx-auto px-4 space-y-4">
      
      <div className="flex gap-2 items-center">
        <div>
        <Tag size={30} className="text-yellow-500"/>
        </div>
        <div>
      <h2 className="text-3xl text-black font-serif font-semibold">
          Deals & Promotions
        </h2>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {deals.map((deal, index) => (
          <Card key={index} className="p-0 bg-[#fbf7ec] border border-[#f1e4c6] overfow-hidden relative">
            <div className="absolute -top-1 -right-0">
            <Badge className="rounded text-white font-bold bg-gradient-to-r from-yellow-700 via-yellow-600 to-yellow-400 px-2">{deal.save}</Badge>
            </div>
            <CardContent className="px-2 py-3 space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-black">{deal.title}</h4>
              </div>

              <p className="text-sm text-muted-foreground">
                {deal.description}
              </p>

              <div className="flex items-center justify-between">
                <span className="text-xs flex items-center gap-2 font-semibold text-muted-foreground">
                  <Calendar size={18} className="text-muted-foreground"/>
                  <p>{deal.expires}</p>
                </span>
                <Button className="border-0 shadow-none text-yellow-500 bg-[#fbf7ec] font-bold hover:brightness-100 " size="sm" variant="outline">
                  Claim Offer <ArrowRight size={30}/>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
