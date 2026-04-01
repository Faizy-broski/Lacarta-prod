// components/PlayaScondidaAbout.tsx
import { Card, CardContent } from "@public/components/ui/card";
import {Clock,CalendarDays,Luggage,Phone,Link,Mail,Leaf,Facebook,Instagram,MessageCircleMore, Ship,Sunrise,Waves,UtensilsCrossed,Sailboat} from 'lucide-react'


export default function GystDetailedContent() {
  return (
    <section className="w-full max-w-5xl mx-auto py-12 md:py-16 lg:py-20 bg-gradient-to-b from-slate-50 to-white">
      <div className="container gap-5 px-4 md:grid grid-cols-[2.5fr_2.5fr] md:px-6 mx-auto max-w-7xl">
        {/* Main title + description */}
        <div className="md:max-w-4xl mx-auto mb-12 md:mb-16">
            <h6 className="text-muted-foreground font-serif font-bold tracking-tight mb-6">DISCOVER</h6>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif text-black font-bold tracking-tight mb-6">
            About Snorkeling
          </h1>
          
          <div className="prose prose-lg md:prose-xl max-w-none text-slate-700 leading-relaxed">
            <p className="mb-6">
               Nestled on the pristine shores of <span className="font-bold text-black">Isla Barú</span>, just a scenic boat ride from Cartagena's
               historic walls, Playa Scondida offers an unparalleled eco-luxury glamping experience. 
               Here, the Caribbean Sea whispers secrets of ancient mariners, while the jungle canopy
               shelters you in its emerald embrace. 
               Our philosophy is simple: authentic luxury that honors the land. Each bungalow is crafted from 
               locally-sourced materials, designed to blend seamlessly with the surrounding nature while providing
               every modern comfort you desire. Wake to the calls of tropical birds, dine on freshly- caught seafood
               by candlelight, and fall asleep to the rhythm of gentle waves. With private docks offering direct ocean 
               access, secluded beach coves, and immersive nature trails, Playa Scondida is more than accommodation—it's 
               a transformation. Here, time moves differently, allowing you to reconnect with what truly matters.
            </p>
          </div>

             {/* Key Features */}
            <Card className="rounded-xl border mt-5 relative border-amber-100 bg-[#f8f5e9]">
              <CardContent className="p-6 mt-55">
                <span className="mb-4 inline-block absolute -top-3 left-5 rounded-full bg-[#d0a944] px-3 py-1 text-xs font-bold text-white">
                  Key Features
                </span>

                <ul className="mt-4 space-y-4">
                  {[
                    {
                      title: "Eco-friendly Bungalows",
                      desc: "Sustainably built with local materials",
                      icon:<Leaf size={50} className="p-2 rounded bg-yellow-50 text-yellow-600"/>
                    },
                    {
                      title: "Accessible by Speedboat",
                      desc: "45 minutes from Cartagena",
                      icon:<Ship size={50} className="p-2 rounded bg-yellow-50 text-yellow-600"/>
                    },
                    {
                      title: "Ocean & Jungle Views",
                      desc: "Wake up to breathtaking scenery",
                      icon:<Waves size={50} className="p-2 rounded bg-yellow-50 text-yellow-600"/>
                    },
                    {
                      title: "Local Island Cuisine",
                      desc: "Fresh Caribbean flavors daily",
                      icon:<UtensilsCrossed size={50} className="p-2 rounded bg-yellow-50 text-yellow-600"/>
                    },
                    {
                      title: "On-site Activities",
                      desc: "Kayaking, snorkeling & more",
                      icon:<Sailboat size={50} className="p-2 rounded bg-yellow-50 text-yellow-600"/>
                    },
                    {
                      title: "Peaceful & Secluded",
                      desc: "Your private paradise awaits",
                      icon:<Sunrise size={50} className="p-2 rounded bg-yellow-50 text-yellow-600"/>
                    },
                  ].map((item, i) => (
                    <li key={i}>
                      <div className="flex gap-3">
                        <div>{item.icon}</div>
                        <div>
                      <p className="font-bold text-black">{item.title}</p>
                      <p className="text-sm text-gray-600">{item.desc}</p>
                      </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

        </div>

        <div>
          {/* Right sidebar - Information + Travel Tips */}
          <div className="space-y-8">
            {/* Information Card */}
            <Card className="bg-[#f8f5e9] text-white relative border-1 border-amber-300 shadow-xl">
              <CardContent className="px-5 py-2 lg:px-5 lg:py-2 ">
                <div className="inline-block absolute -top-4 mb-6 rounded-full bg-[#d0a944] px-2 py-1 text-white font-bold text-sm">Information</div>
                
                <div className="space-y-2 text-black">
                  <div>
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

                        <Card className="bg-[#f8f5e9] p-0 text-white relative border-1 border-amber-300 shadow-xl">
              <CardContent className="mt-2">
                <div className="inline-block absolute -top-4 mb-6 rounded-full bg-[#d0a944] px-2 py-1 text-white font-bold text-sm">Time</div>
                  <div className="grid grid-cols-2 gap-4  align-itms-start">
                    <div className="p-3">
                      <p className="font-medium text-lg text-center text-gray-500">Hour Begining</p>
                      <p className="font-bold text-lg text-center text-black">9:00 am</p>
                    </div>
                    <div className="p-3 ">
                      <p className="font-medium text-center text-lg text-gray-500">Hour Begining</p>
                      <p className="font-bold text-lg text-center text-black">9:00 pm</p>
                    </div>
                  </div>
                  </CardContent>
                  </Card>

            {/* Contact */}
            <Card className="bg-[#f8f5e9] text-white relative border-1 border-amber-300 shadow-xl">
              <CardContent className="mt-5">
                <div className="inline-block absolute -top-4 mb-6 rounded-full bg-[#d0a944] px-2 py-1 text-white font-bold text-sm">Social Media</div>
             <div className="grid grid-cols-3 gap-3">
              {[ { icon: Facebook,title:"Facebook" ,text: "reservas@playascondida.com" },
               { icon: Instagram,title:"Instagram" , text: "playascondida.com" },
                { icon: MessageCircleMore,title:"Whatsapp" , text: "+57 315 123 4567" },
                 { icon: Mail,title:"Email" ,text: "reservas@playascondida.com" },
               { icon: Link,title:"Website" , text: "playascondida.com" },
                { icon: Phone,title:"Phone" , text: "+57 315 123 4567" },
               ].map((item, i) => (
                 <Card
                   key={i}
                   className="rounded-xl border border-amber-100 bg-[#f8f5e9]"
                 >
                   <CardContent className="flex flex-col items-center gap-2 p-4 text-center text-xs font-medium">
                     <item.icon size={50} className=" bg-amber-60 rounded p-2 text-amber-600" />
                     <h3 className="text-lg text-gray-700 font-bold">{item.title}</h3>
                   </CardContent>
                 </Card>
               ))}
             </div> 
             </CardContent>
             </Card>

              {/* Booking */}
             <Card className="rounded-xl border border-amber-100 bg-[#f8f5e9] text-center">
               <CardContent className="p-3">
                 <p className="mb-4 text-lg font-bold text-black">
                   Also Available On
                 </p>
                 <button className="rounded-full bg-teal-700 px-6 py-2 text-sm font-medium text-white">
                   Viator
                 </button>
               </CardContent>
             </Card>

             {/* CTA */}
             <button className="w-full rounded-full font-bold text-3x1 bg-gradient-to-r from-[#d0a944] to-[#c39a36] py-3 text-sm font-semibold text-white">
               Book with La Carta
             </button>
             
             <div>
              <p className="text-center font-bold text-md text-gray-600">
             Why Book with Lacarta?
            </p>
            <p className="text-center text-md text-gray-500">
              Secure payments, verified listings, 24/7 support, and exclusive
              local experiences curated by Cartagena insiders.
            </p>
            </div>

            {/* Travel Tips */}
            <div className="space-y-6">
              <h3 className="text-2xl font-serif font-bold text-black">Travel Tips</h3>

              <div className="grid gap-3">
                <div className="align-items-center flex items-start gap-2 p-2 bg-[#f8f5e9] border-1 border-amber-300 rounded-xl shadow-sm ">
                  <div className="text-3xl"><Clock className="text-amber-600" size={20}></Clock></div>
                  <div>
                    <p className="font-bold text-slate-800">Speedboat Time</p>
                    <p className="text-slate-600 text-sm">45-60 minutes from Cartagena marina</p>
                  </div>
                </div>

                <div className="align-items-center flex items-start gap-2 p-2 bg-[#f8f5e9] border-1 border-amber-300 rounded-xl shadow-sm ">
                  <div className="text-3xl"><CalendarDays className="text-amber-600" ></CalendarDays></div>
                  <div>
                    <p className="font-bold text-slate-800">Best Season</p>
                    <p className="text-slate-600 text-sm">December to April (dry season)</p>
                  </div>
                </div>

                <div className="align-items-center flex items-start gap-2 p-2 bg-[#f8f5e9] border-1 border-amber-300 rounded-xl shadow-sm ">
                  <div className="text-3xl"><Luggage className="text-amber-600" ></Luggage></div>
                  <div>
                    <p className="font-bold text-slate-800">What to Bring</p>
                    <p className="text-slate-600 text-sm">Light clothing, reef-safe sunscreen, camera</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}



// components/PlayaScondidaAbout.tsx
// import { Card, CardContent } from "@public/components/ui/card"
// import {
//   Mail,
//   Link,
//   Phone,
//   Clock,
//   CalendarDays,
//   Luggage,
// } from "lucide-react"

// export default function PlayaScondidaAbout() {
//   return (
//     <section className="w-full bg-[#fbf8f2] py-14 lg:py-20">
//       <div className="container px-4 lg:px-6 mx-auto max-w-7xl px-4">
//         <div className="grid gap-10 md:grid-cols-[2.2fr_1.3fr]">
//           {/* LEFT COLUMN */}
//           <div>
//             {/* Heading */}
//             <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-gray-500">
//               Discover
//             </p>

//             <h2 className="mb-6 font-serif text-3xl font-bold text-black md:text-4xl">
//               About Tierra bomba
//             </h2>

//             {/* Description */}
//             <p className="mb-8 max-w-2xl text-sm leading-relaxed text-gray-600">
//               Nestled on the pristine shores of{" "}
//               <span className="font-semibold text-black">Isla Barú</span>, just a
//               scenic boat ride from Cartagena's historic walls, Playa Scondida
//               offers an unparalleled eco-luxury glamping experience. Here, the
//               Caribbean Sea whispers secrets of ancient mariners, while the
//               jungle canopy shelters you in its emerald embrace. Our philosophy
//               is simple: authentic luxury that honors the land. Each bungalow is
//               crafted from locally-sourced materials, designed to blend
//               seamlessly with the surrounding nature while providing every
//               modern comfort you desire.
//             </p>

//             {/* Key Features */}
//             <Card className="rounded-xl border border-amber-100 bg-[#f8f5e9]">
//               <CardContent className="p-6">
//                 <span className="mb-4 inline-block rounded-full bg-[#d0a944] px-3 py-1 text-xs font-semibold text-white">
//                   Key Features
//                 </span>

//                 <ul className="mt-4 space-y-4">
//                   {[
//                     {
//                       title: "Eco-friendly Bungalows",
//                       desc: "Sustainably built with local materials",
//                     },
//                     {
//                       title: "Accessible by Speedboat",
//                       desc: "45 minutes from Cartagena",
//                     },
//                     {
//                       title: "Ocean & Jungle Views",
//                       desc: "Wake up to breathtaking scenery",
//                     },
//                     {
//                       title: "Local Island Cuisine",
//                       desc: "Fresh Caribbean flavors daily",
//                     },
//                     {
//                       title: "On-site Activities",
//                       desc: "Kayaking, snorkeling & more",
//                     },
//                     {
//                       title: "Peaceful & Secluded",
//                       desc: "Your private paradise awaits",
//                     },
//                   ].map((item, i) => (
//                     <li key={i}>
//                       <p className="font-semibold text-black">{item.title}</p>
//                       <p className="text-sm text-gray-600">{item.desc}</p>
//                     </li>
//                   ))}
//                 </ul>
//               </CardContent>
//             </Card>
//           </div>

//           {/* RIGHT COLUMN */}
//           <div className="space-y-6">
//             {/* Information */}
//             <Card className="relative rounded-xl border border-amber-100 bg-[#f8f5e9]">
//               <CardContent className="p-6">
//                 <span className="absolute -top-3 rounded-full bg-[#d0a944] px-3 py-1 text-xs font-semibold text-white">
//                   Information
//                 </span>

//                 <div className="mt-4 space-y-4 text-sm">
//                   <div>
//                     <p className="font-medium text-gray-500">Address</p>
//                     <p className="font-semibold text-black">
//                       Isla Baru, Provincia de Cartagena, Bolívar, Colombia
//                     </p>
//                   </div>

//                   <div className="grid grid-cols-2 gap-4">
//                     <div>
//                       <p className="font-medium text-gray-500">Hour Begining</p>
//                       <p className="font-semibold text-black">9:00 am</p>
//                     </div>
//                     <div>
//                       <p className="font-medium text-gray-500">Hour Begining</p>
//                       <p className="font-semibold text-black">9:00 pm</p>
//                     </div>
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>

//             {/* Contact */}
//             <div className="grid grid-cols-3 gap-3">
//               {[
//                 { icon: Mail, text: "reservas@playascondida.com" },
//                 { icon: Link, text: "playascondida.com" },
//                 { icon: Phone, text: "+57 315 123 4567" },
//               ].map((item, i) => (
//                 <Card
//                   key={i}
//                   className="rounded-xl border border-amber-100 bg-[#f8f5e9]"
//                 >
//                   <CardContent className="flex flex-col items-center gap-2 p-4 text-center text-xs font-medium">
//                     <item.icon className="h-5 w-5 text-amber-600" />
//                     <span className="text-gray-700">{item.text}</span>
//                   </CardContent>
//                 </Card>
//               ))}
//             </div>

//             {/* Booking */}
//             <Card className="rounded-xl border border-amber-100 bg-[#f8f5e9] text-center">
//               <CardContent className="p-6">
//                 <p className="mb-4 font-semibold text-black">
//                   Also Available On
//                 </p>
//                 <button className="rounded-full bg-teal-700 px-6 py-2 text-sm font-medium text-white">
//                   Viator ↗
//                 </button>
//               </CardContent>
//             </Card>

//             {/* CTA */}
//             <button className="w-full rounded-full bg-gradient-to-r from-[#d0a944] to-[#c39a36] py-3 text-sm font-semibold text-white">
//               Book with La Carta
//             </button>

//             <p className="text-center text-xs text-gray-500">
//               Secure payments, verified listings, 24/7 support, and exclusive
//               local experiences curated by Cartagena insiders.
//             </p>

//             {/* Travel Tips */}
//             <div>
//               <h3 className="mb-4 font-serif text-xl font-bold text-black">
//                 Travel Tips
//               </h3>

//               <div className="space-y-3">
//                 {[
//                   {
//                     icon: Clock,
//                     title: "Speedboat Time",
//                     desc: "45–60 minutes from Cartagena marina",
//                   },
//                   {
//                     icon: CalendarDays,
//                     title: "Best Season",
//                     desc: "December to April (dry season)",
//                   },
//                   {
//                     icon: Luggage,
//                     title: "What to Bring",
//                     desc: "Light clothing, reef-safe sunscreen, camera",
//                   },
//                 ].map((tip, i) => (
//                   <div
//                     key={i}
//                     className="flex gap-3 rounded-xl border border-amber-100 bg-[#f8f5e9] p-4"
//                   >
//                     <tip.icon className="h-5 w-5 text-amber-600" />
//                     <div>
//                       <p className="font-semibold text-black">{tip.title}</p>
//                       <p className="text-xs text-gray-600">{tip.desc}</p>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   )
// }
