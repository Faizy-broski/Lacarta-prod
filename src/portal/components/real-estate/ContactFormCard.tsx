// components/project/ContactFormCard.tsx
import { Button } from "@public/components/ui/button"
import { Input } from "@public/components/ui/input"

export default function ContactFormCard() {
  return (
    <div className="lg:sticky lg:top-24">
      <div className="bg-white border rounded-xl shadow-sm px-4 py-3 space-y-4">
        <h3 className="font-bold text-black text-xl">
          Interested in this project?
        </h3>
        <p className="font-semibold text-sm">
           Let us share your request with similar COLLECTION™ listings.
        </p>

        <Input placeholder="Name" />
        <Input placeholder="Email" />
        <Input placeholder="Phone Number" />

        <select className="w-full border rounded-md px-3 py-2 text-sm">
          <option>Apartment | Desired</option>
        </select>

        <textarea
          placeholder="Message"
          className="w-full border rounded-md px-3 py-2 text-sm min-h-[80px]"
        />

        <label className="flex items-center gap-2 text-xs">
          <input type="checkbox" />
          I agree to receive emails from La Carta
        </label>

        <Button className="w-full bg-green-600 hover:bg-green-700">
          Submit
        </Button>
      </div>
    </div>
  )
}
