import {
  Leaf,
  Waves,
  Sailboat,
  UtensilsCrossed,
  Sun,
  Ship,
} from "lucide-react"

export default function KeyFeatures() {
  return (
    <section className="max-w-5xl m-auto py-16 bg-white">
      <div className="container mx-auto px-4">

        {/* Header */}
        <div className="text-center mb-14">
          <p className="text-xs uppercase tracking-widest font-bold text-muted-foreground mb-2">
            Experience
          </p>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-black">
            Key Features
          </h2>
        </div>

        {/* Features Grid */}
        {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((item, index) => (
            <div
              key={index}
              className="flex items-start gap-4 rounded-2xl bg-[#fbf7ef] p-6 shadow-sm border border-neutral-200"
            >
            
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-yellow-100 text-yellow-600 shrink-0">
                <item.icon className="h-6 w-6" />
              </div>

              
              <div>
                <h3 className="font-serif text-lg font-semibold text-black mb-1">
                  {item.title}
                </h3>
                <p className="text-sm text-neutral-600 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div> */}

      </div>
    </section>
  )
}

const
     features = [
  {
    title: "Eco-friendly Bungalows",
    description: "Sustainably built with local materials",
    icon: Leaf,
  },
  {
    title: "Ocean & Jungle Views",
    description: "Wake up to breathtaking scenery",
    icon: Waves,
  },
  {
    title: "On-site Activities",
    description: "Kayaking, snorkeling & more",
    icon: Sailboat,
  },
  {
    title: "Local Island Cuisine",
    description: "Fresh Caribbean flavors daily",
    icon: UtensilsCrossed,
  },
  {
    title: "Peaceful & Secluded",
    description: "Your private paradise awaits",
    icon: Sun,
  },
  {
    title: "Accessible by Speedboat",
    description: "45 minutes from Cartagena",
    icon: Ship,
  },
]