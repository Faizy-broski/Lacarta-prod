import { Card, CardContent } from "@public/components/ui/card"
import { Badge } from "@public/components/ui/badge"
import {Calendar,Notebook} from 'lucide-react'

export function ElitePress() {
  return (
    <section className="max-w-6xl mx-auto px-4 ">
    <Card className="bg-[#fbf7ec] border border-[#f1e4c6]">
      <CardContent className="p-6 space-y-5">
        <div className="flex gap-2 items-center">
        <div>
        <Notebook size={30} className="text-yellow-500"/>
        </div>
        <div>
      <h2 className="text-3xl text-black font-serif font-semibold">
          FREE RELEASE
        </h2>
        </div>
      </div>

         <h2 className="text-3xl text-black font-serif font-bold">
          Casa Dorada Unveils New Oceanfront Wellness Pavilion
        </h2>

         <span className="text-xs flex items-center gap-2 font-semibold text-muted-foreground">
                  <Calendar size={18} className="text-muted-foreground"/>
                  <p>Jan 15, 2026</p>
                </span>

        <p className="text-sm text-gray-600">
          Casa Dorada Beach & Golf Resort is proud to announce the grand opening of our new
Oceanfront Wellness Pavilion, a 15,000 square foot sanctuary dedicated to holistic
health and rejuvenation.
        </p>

        <p className="text-sm text-gray-600">
          Designed by renowned architect Tadao Ando, the pavilion features floor-to-ceiling glass
walls that blur the boundary between interior spaces and the Pacific horizon. The
facility includes 12 treatment rooms, a hydrotherapy circuit, meditation gardens, and a
rooftop yoga deck.
        </p>

         <p className="text-sm text-gray-600">
          "This represents our commitment to offering guests not just luxury, but transformative
experiences," said General Manager Elena Vargas. "The Wellness Pavilion is where
ancient healing traditions meet modern science."
        </p>

         <p className="text-sm text-gray-600">
          The pavilion will offer exclusive treatments using locally-sourced botanical ingredients,
including signature therapies developed in partnership with indigenous Huichol healers.
        </p>
      </CardContent>
    </Card>
    </section>
  )
}
