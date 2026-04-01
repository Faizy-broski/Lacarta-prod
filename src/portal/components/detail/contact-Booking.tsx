import { Card } from "@public/components/ui/card"
import { Button } from "@public/components/ui/button"
import {
  Mail,
  Globe,
  Phone,
  ExternalLink,
  ShieldCheck,
} from "lucide-react"

const contactItems = [
  {
    icon: Mail,
    title: "Email",
    value: "reservas@playascondida.com",
  },
  {
    icon: Globe,
    title: "Website",
    value: "playascondida.com",
    dot: true,
  },
  {
    icon: Phone,
    title: "Phone",
    value: "+57 315 123 4567",
  },
]

export default function ContactBooking() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-12 text-center">
          <p className="mb-2 text-sm font-bold uppercase tracking-widest text-gray-500">
            Reserve
          </p>
          <h2 className="text-3xl font-bold text-gray-900">
            Contact & Booking
          </h2>
        </div>

        {/* Contact Cards */}
        <div className="grid gap-6 md:grid-cols-3">
          {contactItems.map((item, i) => (
            <Card
              key={i}
              className="rounded-xl border border-amber-100 bg-amber-50/60 p-6 text-center"
            >
              <div className="mx-auto mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-amber-100">
                <item.icon className="h-5 w-5 text-amber-600" />
              </div>

              <p className="text-sm text-gray-500">{item.title}</p>

              <div className="flex items-center justify-center gap-2">
                <p className="font-medium text-gray-900">{item.value}</p>
                {item.dot && (
                  <span className="h-2 w-2 rounded-full bg-red-500" />
                )}
              </div>
            </Card>
          ))}
        </div>

        {/* Also Available On */}
        <Card className="mt-8 rounded border border-amber-100 bg-amber-50/60 p-8 text-center">
          <p className="mb-6 font-bold text-gray-900">
            Also Available On
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <Button className="gap-2 rounded text-white bg-blue-900 px-6">
              Booking.com <ExternalLink className="h-4 w-4" />
            </Button>

            <Button className="gap-2 rounded text-white bg-blue-900 px-6">
              Expedia <ExternalLink className="h-4 w-4" />
            </Button>

            <Button className="gap-2 rounded text-white bg-blue-900 px-6">
              VRBO <ExternalLink className="h-4 w-4" />
            </Button>
          </div>
        </Card>

        {/* CTA */}
        <div className="mt-12 text-center">
          <Button className="rounded bg-amber-500 px-8 py-6 text-base text-white font-medium hover:bg-amber-300">
            Book with La Carta
          </Button>

          <div className="mt-4 flex items-center justify-center gap-2 text-sm text-gray-500">
            <ShieldCheck className="h-4 w-4 text-emerald-600" />
            <span>Why book with La Carta?</span>
          </div>

          <p className="mx-auto mt-3 max-w-xl text-xs text-gray-500">
            Secure payments, verified listings, 24/7 support, and exclusive
            local experiences curated by Cartagena insiders.
          </p>
        </div>
      </div>
    </section>
  )
}
