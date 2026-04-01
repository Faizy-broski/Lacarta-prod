import { Card } from "@public/components/ui/card"
import {
  Coffee,
  Sparkles,
  Plane,
  Bath,
  Waves,
  Car,
  Wifi,
  Umbrella,
  BedDouble,
  TreePalm,
  WavesIcon,
  Palmtree,
} from "lucide-react"

const services = [
  { icon: Coffee, label: "Breakfast included" },
  { icon: Sparkles, label: "Daily housekeeping" },
  { icon: Plane, label: "Airport / boat transfer assistance" },
]

const amenities = [
  { icon: Bath, label: "Spa" },
  { icon: Waves, label: "Swimming pool" },
  { icon: Car, label: "Parking" },
  { icon: Wifi, label: "Free Wi-Fi in common areas" },
  { icon: Umbrella, label: "Beach access" },
]

const sleepingOptions = [
  { icon: BedDouble, label: "Deluxe Double Room", sub: "1 King Bed" },
  { icon: TreePalm, label: "Garden View Bungalow", sub: "1 Queen Bed" },
  { icon: WavesIcon, label: "Sea View Bungalow", sub: "1 King Bed" },
  { icon: Palmtree, label: "Beachfront Bungalow", sub: "1 King Bed + Daybed" },
]

function Item({
  icon: Icon,
  label,
  sub,
}: {
  icon: any
  label: string
  sub?: string
}) {
  return (
    <div className="flex items-start gap-3">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-amber-100">
        <Icon className="h-5 w-5 text-amber-600" />
      </div>

      <div>
        <p className="font-medium text-gray-900">{label}</p>
        {sub && <p className="text-sm text-gray-500">{sub}</p>}
      </div>
    </div>
  )
}

export default function ServicesAmenities() {
  return (
    <section className="w-full max-w-5xl m-auto py-16 bg-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-12  text-center">
          <p className="mb-2 font-bold text-sm uppercase tracking-widest text-gray-500">
            What’s Included
          </p>
          <h2 className="text-3xl font-bold text-gray-900">
            Services & Amenities
          </h2>
        </div>

        {/* Grid */}
        <Card className="border-0 bg-white shadow-none">
          <div className="grid gap-10 md:grid-cols-3">
            {/* Services */}
            <div>
              <h3 className="mb-6 py-3 text-lg text-black font-bold border-bottom border-amber-500">Services</h3>
              <div className="space-y-4">
                {services.map((item, i) => (
                  <Item key={i} {...item} />
                ))}
              </div>
            </div>

            {/* Amenities */}
            <div>
              <h3 className="mb-6 py-3 text-lg text-black font-bold border-bottom border-amber-500">Amenities</h3>
              <div className="space-y-4 ">
                {amenities.map((item, i) => (
                  <Item key={i} {...item} />
                ))}
              </div>
            </div>

            {/* Sleeping Options */}
            <div>
              <h3 className="mb-6 py-3 text-lg text-black font-bold border-bottom border-amber-500">
                Sleeping Options
              </h3>
              <div className="space-y-4">
                {sleepingOptions.map((item, i) => (
                  <Item key={i} {...item} />
                ))}
              </div>
            </div>
          </div>
        </Card>
      </div>
    </section>
  )
}
