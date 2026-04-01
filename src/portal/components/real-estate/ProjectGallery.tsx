// components/project/ProjectGallery.tsx
import { ChevronLeft, ChevronRight } from "lucide-react"
const img = "/assets/Fish.png";

export default function ProjectGallery() {
  return (
    <div className="space-y-3">
      {/* Main Image */}
      <div className="relative overflow-hidden rounded-xl">
        <img
          src={img}
          alt="Project"
          className="w-full h-[240px] sm:h-[360px] md:h-[420px] object-cover"
        />

        {/* Arrows */}
        <button className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/90 p-2 rounded-full shadow">
          <ChevronLeft size={18} />
        </button>
        <button className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/90 p-2 rounded-full shadow">
          <ChevronRight size={18} />
        </button>

        {/* View all */}
        <span className="absolute bottom-3 right-3 text-xs bg-black/70 text-white px-3 py-1 rounded-full">
          View all
        </span>
      </div>

      {/* Thumbnails */}
      <div className="flex gap-2 overflow-x-auto">
        {[1,2,3,4].map((i) => (
          <img
            key={i}
            src={img}
            className="h-16 w-24 object-cover rounded-lg border"
          />
        ))}
      </div>
      <div>
        <h1 className="text-2xl font-bold text-black">Market habitats locatifs</h1>
        <p className="text-sm text-muted-foreground">
          Condos for rent
        </p>
        <p className="mt-2 font-semibold text-black">
          Starting at <span className="text-green-600">$1,653</span> per month
        </p>
        <ul>
            <li>Studio's, 1 to 3 Bedrooms</li>
            <li>Move-in-ready</li>
        </ul>
      </div>
    </div>
  )
}
