// components/project/ProjectFeatures.tsx
import { Wind, Dumbbell, Car, Waves, TreePalm ,Zap,PawPrint,Bike,Mountain } from "lucide-react"

const features = [
  { icon: Wind, label: "Air conditioning" },
  { icon: Dumbbell, label: "Gym" },
  { icon: Car, label: "Parking" },
  { icon: Waves, label: "Indoor pool" },
  { icon: Bike, label: "Bike storage" },
  { icon: PawPrint, label: "Pet allowed" },
  { icon: TreePalm, label: "Outdoor space" },
  { icon: Mountain, label: "Roof terrace" },
]

export default function ProjectFeatures() {
  return (
    <section>
    <h2 className="text-lg font-bold text-black">Features</h2>
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 pt-4">
      {features.map(({ icon: Icon, label }) => (
        <div
          key={label}
          className="flex flex-col bg-gray-100 items-center text-center p-3 border rounded-lg"
        >
          <Icon size={20} className="mb-2 text-muted-foreground" />
          <span className="text-sm font-medium">{label}</span>
        </div>
      ))}
    </div>
    </section>
  )
}
