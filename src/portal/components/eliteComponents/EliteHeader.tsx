import { Badge } from "@public/components/ui/badge"
import { Button } from "@public/components/ui/button"
import whatsapp from '../../../public/assets/whatsapp.svg'
import { Star,Search,SlidersHorizontal,Share2,Heart,Crown } from "lucide-react"
import { eliteListing } from "@public/data/elite-data"


export function EliteHeader() {
  return (
    <div className="max-w-6xl mx-auto mb-2 space-y-3">
      {/* Header */}
      <section>
       <div className='bg-white container-fluid p-3 text-light relative'>
        <div className="inline absolute top-0 left-0">
                    <Share2 size={60} className="p-3 text-white font-bold bg-red-400 mb-2 rounded-full"/>
                    <Heart size={60} className="p-3 text-black font-bold bg-yellow-400 rounded-full"/>
                  </div>
        
                  <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2">
                    
                    <div>
                    <span className="bg-white text-black font-bold px-3 py-1 rounded shadow text-sm hidden md:block">
                     Need help? Chat with us
                     </span>
                     </div>
                     <div>
                     <a
          href="https://wa.me/573001234567"
          target="_blank"
          rel="noopener noreferrer"
          className="
            w-14 h-14
            flex items-center justify-center
            rounded-full shadow-lg
            bg-green-600 hover:scale-105 transition
          "
        >
          <img
            src={whatsapp}
            alt="WhatsApp"
            className="w-10 h-10"
          />
        </a>
        
                     </div>
                   </div>
        <div >
        <div className='container col-lg-8 col-md-8 col-12 mb-4 py-5 mb-md-0 m-auto text-center text-white'>
          <h1 className="text-4xl text-black font-serif font-semibold">
        Discover Our Elite Sponsors
      </h1>
         <div className="flex max-w-3xl mx-auto bg-white rounded overflow-hidden p-1">
                 <div className="relative w-full">
  <input
    type="text"
    placeholder="Where/What are you Looking for?"
    className="w-full border rounded-full py-2 pl-4 pr-10 bg-white text-black outline-none"
  />

  <SlidersHorizontal
    className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500 cursor-pointer"
  />
</div>
                  <Button className="text-white rounded-full w-[250px] my-auto rounded p-2 font-bold bg-[#d0a439] hover:bg-[#b88f30] transition-colors">
                    Search
                  </Button>
                </div>
        </div>
        </div>
      </div>
      </section>


      <Badge className="w-fit bg-gradient-to-r from-yellow-700 via-yellow-600 to-yellow-400 hover:bg-yellow-300 p-2 text-white font-bold"><Crown size={20} className="mr-2"/> Elite Sponsored</Badge>
      <div className="flex items-center justify-between">
      <div>
      <span className="text-sm flex text-muted-foreground">
        <p className="text-yellow-400 font-bold">{eliteListing.category}  </p> <pre> · {eliteListing.location}</pre>
      </span>
      </div>
      <div className="flex items-center gap-2 text-sm">
        <div className="flex text-yellow-500">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className="h-4 w-4 fill-current" />
          ))}
        </div>
        <span className="text-muted-foreground">
          {eliteListing.rating} ({eliteListing.reviews} reviews)
        </span>
      </div>
      </div>

      <h1 className="text-6xl text-yellow-500 font-serif font-semibold">
        {eliteListing.title}
      </h1>

       <p className="text-sm text-muted-foreground font-bold">
        Where Mediterranean Elegance Meets Pacific Serenity.
      </p>

      

      <div className="flex items-end gap-3">
        <p className="text-3xl font-bold text-black">{eliteListing.price}<span className="text-sm font-semibold text-muted-foreground">Cop / Yearly</span></p>
        <Badge variant="secondary" className="bg-green-50 text-green-400 font-bold">{eliteListing.discount}</Badge>
      </div>

     <div className="flex items-end gap-3">
        <p className="text-3xl font-bold text-black">{eliteListing.price}<span className="text-sm font-semibold text-muted-foreground">Cop / Monthly</span></p>
      </div>
    </div>
  )
}
