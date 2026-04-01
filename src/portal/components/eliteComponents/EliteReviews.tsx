import { Card, CardContent } from "@public/components/ui/card"
import { Star } from "lucide-react"

const reviews = [
  {
    name: "Sarah Mitchell",
    initials: "SA",
    date: "January 2026",
    text:
      "Absolutely breathtaking! The attention to detail is impeccable. From the moment we arrived, the staff made us feel like royalty. The sunset views from our suite were unforgettable.",
  },
  {
    name: "James & Maria Chen",
    initials: "JA",
    date: "December 2025",
    text:
      "We celebrated our anniversary here and it exceeded all expectations. The private dinner on the beach was magical. Already planning our return visit!",
  },
  {
    name: "Robert van Berg",
    initials: "RO",
    date: "November 2025",
    text:
      "Outstanding golf course and spa facilities. The restaurant Marea is a culinary journey. Minor note: WiFi could be stronger in some areas.",
  },
  {
    name: "Elena Rossi",
    initials: "EL",
    date: "October 2025",
    text:
      "Pure paradise. The infinity pool overlooking the ocean is Instagram-worthy, but the real magic is in the genuine warmth of the staff.",
  },
]

export function EliteReviews() {
  return (
    <section className="max-w-6xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-10">
        <h2 className="text-3xl text-black font-serif font-semibold">
          Guest Reviews
        </h2>

        <div className="flex items-center gap-2 text-sm">
          <div className="flex items-center text-yellow-500">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="h-4 w-4 fill-current" />
            ))}
          </div>
          <span className="font-medium">4.9</span>
          <span className="text-muted-foreground">(247 reviews)</span>
        </div>
      </div>

      {/* Reviews Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {reviews.map((review, index) => (
          <Card
            key={index}
            className="bg-[#fbf7ec] border border-[#f1e4c6] rounded-2xl"
          >
            <CardContent className="p-6 space-y-4">
              {/* Top Row */}
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-4">
                  {/* Avatar */}
                  <div className="h-12 w-12 text-yellow-600 font-bold rounded-full bg-[#f3ecd9] flex items-center justify-center font-semibold text-sm">
                    {review.initials}
                  </div>

                  {/* Name + Date */}
                  <div>
                    <p className="font-bold text-black leading-tight">
                      {review.name}
                    </p>
                    <p className="text-sm font-semibold text-muted-foreground">
                      {review.date}
                    </p>
                  </div>
                </div>

                {/* Stars */}
                <div className="flex text-yellow-500">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                </div>
              </div>

              {/* Review Text */}
              <p className="text-sm text-black leading-relaxed">
                {review.text}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}