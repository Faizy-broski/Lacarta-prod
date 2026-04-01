import { Card, CardContent } from "@public/components/ui/card"

export function EliteContactCard() {
  return (
           <Card className="bg-[#f8f5e9] text-white border-1 border-amber-300 shadow-xl">
              <CardContent className="px-3 py-2 lg:px-5 lg:py-2 ">
                
                <div className="space-y-2 text-black">
                  <div>
                    <h2 className="text-2xl text-black font-serif font-semibold">
          Location
        </h2>
                    <p className="text-black font-normal my-2">Address</p>
                    <p className="text-xl font-bold font-['Inter']">Isla Barú, Provincia de Cartagena, Bolívar, Colombia</p>
                  </div>

                 <div className="mt-3 h-[230px] w-full overflow-hidden rounded-xl border">
     <iframe
          title="Map Preview"
          className="h-full w-full border-0"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          src="https://www.google.com/maps?q=Pakistan&output=embed"
  />
</div>
                </div>
              </CardContent>
            </Card>
  )
}
