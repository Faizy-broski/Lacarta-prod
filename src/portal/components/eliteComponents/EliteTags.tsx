import { Badge } from "@public/components/ui/badge"

const tags = [
  "Beachfront",
  "Golf Course",
  "Spa",
  "Fine Dining",
  "Infinity Pool",
  "Ocean View",
  "Private Beach",
  "Pet Friendly",
  "Wedding Vanue",
  "Butter Service",
]

export function EliteTags() {
  return (
    <section className="max-w-6xl mx-auto px-4 space-y-3">
    
       <h2 className="text-3xl text-black font-serif font-semibold">
          Tags & Features
        </h2>

     <div className="grid grid-cols-2 lg:grid-cols-6 gap-2">
  {tags.map((tag) => (
    <Badge
      key={tag}
      variant="secondary"
      className="flex items-center rounded-full font-bold justify-center py-2 bg-[#fbf7ec] border-1 border-[#f1e4c6] text-center"
    >
      {tag}
    </Badge>
  ))}
</div>
    </section>
  )
}
