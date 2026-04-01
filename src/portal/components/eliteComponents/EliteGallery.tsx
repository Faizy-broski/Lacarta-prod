import { Image } from "@public/components/ui/image"
const img = '/assets/activitiesHero.png'


const featured = {
    tag: "COLLECTION",
}
const themes = [
  {
    orderClass:'1.7fr_2.3fr'
  },
  {
    orderClass:'2.3fr_1.7fr'
  },
]

export function EliteGallery() {
  return (
    <section className="max-w-6xl mx-auto">
   <div className=" grid grid-cols-1  lg:grid-cols-2 gap-2 lg:gap-2 lg:items-stretch">
      {/* LEFT – Big featured card */}
      <div className="relative rounded overflow-hidden shadow-2xl group aspect-[4/3] lg:aspect-auto lg:h-[520px]">
        <img
          src={img}
          alt={img}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </div>

      {/* RIGHT – Smaller themed cards – now fills full height */}
      <div className="grid gap-2 md:gap-2 lg:h-full">
        {themes.map((item, index) => (
          <div
            key={index}
            className={`grid grid-cols-2 overflow-hidden md:grid-cols-[${item.orderClass}] gap-2 group h-full`}
          >
            {/* Left image – stretch to fill */}
            <div className="relative rounded overflow-hidden shadow-md transition-all duration-300 group-hover:shadow-xl">
              <img
                src={img || "https://images.pexels.com/photos/11729105/pexels-photo-11729105.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"}
                alt={`'Theme'`}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>

            {/* Right image – stretch to fill */}
            <div className="relative rounded overflow-hidden shadow-md transition-all duration-300 group-hover:shadow-xl">
              <img
                src={img || "https://media.architecturaldigest.com/photos/62a240a9591c098967e89725/16:9/w_2560,c_limit/1641_The%20Grid_KCAP_(c)Ossip_09_LR.jpg"}
                alt={`'Theme'`}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
    </section>
      )
}
