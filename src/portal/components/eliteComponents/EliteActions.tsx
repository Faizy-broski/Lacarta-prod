// components/eliteComponents/EliteActions.tsx
import { Link,Phone,MessageCircleMore,MapPin,Facebook,Instagram, Mail, Clock4 } from "lucide-react"
import { CardContent, Card } from '@public/components/ui/card';
import { Button} from '@public/components/ui/button';

export function EliteActions() {
  return (
    <>
    <div className="lg:sticky">
    {/* Contact */}
                <div className="mb-4 bg-[#f8f5e9] rounded border-1 border-amber-300">
                     <div className="px-4 py-3 space-y-4">
                       <h3 className="font-bold text-black text-xl">
                         Contact & Hours
                       </h3>


                      <ul className="space-y-3">
                        <li className="flex gap-2 items-center"><span><MapPin size={30} className="text-yellow-700 p-1" /></span><span><p>Carretera a Punta de Mita Km 5.5, Bahía de Banderas, Nayarit 63734, Mexico</p></span></li>
                        <li className="flex gap-2 items-center"><span><Clock4 size={30} className="text-yellow-700 p-1" /></span><span><p>Check-in: 3:00 PM | Check-out:12:00 PM</p></span></li>
                        <li className="flex gap-2 items-center"><span><Phone size={30} className="text-yellow-700 p-1" /></span><span><p>+52 329 291 6000</p></span></li>
                        <li className="flex gap-2 items-center"><span><Mail size={30} className="text-yellow-700 p-1" /></span><span><p>reservations@casadorada.com</p></span></li>
                        <li className="flex gap-2 items-center"><span><Link size={30} className="text-yellow-700 p-1" /></span><span><p>www.casadorada.com</p></span></li>
                      </ul>
             
                       
               
                      
               
                       <Button className="w-full text-white font-bold  bg-gradient-to-r from-yellow-700 via-yellow-600 to-yellow-400 hover:bg-yellow-300">Book Now</Button>
                       <Button className="w-full font-bold text-yellow-600 bg-gray-50 border-1 border-yellow-700 hover:bg-yellow-200">View Menu</Button>
                       <Button className="w-full font-bold text-black bg-white border hover:bg-yellow-200"><Phone />Call Now</Button>
                     </div>
                   </div>

   <Card className="bg-[#f8f5e9] p-0 text-white relative border-1 border-amber-300 shadow-xl">
              <CardContent className="mt-2">

                <h2 className="text-2xl text-black font-serif font-semibold">
          Timings
        </h2>
                  <div>
                    <div className="p-3">
                      <p className="font-medium text-lg text-gray-500">Hour Check in</p>
                      <p className="font-bold text-lg  text-black">9:00 am</p>
                    </div>
                    <div className="p-3 ">
                      <p className="font-medium  text-lg text-gray-500">Hour Check out</p>
                      <p className="font-bold text-lg  text-black">9:00 pm</p>
                    </div>
                  </div>
                  </CardContent>
                  </Card>
                  </div>
    </>
  )
}
