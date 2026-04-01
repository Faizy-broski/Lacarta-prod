// components/NeighborhoodsSection.tsx
import { useEffect, useState, useCallback } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@public/components/ui/carousel";
const img = "/assets/real-estate/Historic Center.png";
import { Card, CardContent, CardHeader } from "../ui/card";

const neighborhoods = [
  {
    name: "Historic Center",
    imageUrl: img,
  },
  {
    name: "Islas del Rosario",
    imageUrl: img,
  },
  {
    name: "Baru",
    imageUrl: img,
  },
  {
    name: "Getsemaní",
    imageUrl: img,
  },
  {
    name: "Getsemaní",
    imageUrl: img,
  },
];

export default function NeighborhoodsSection() {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) return;

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  const scrollTo = useCallback((index: number) => api?.scrollTo(index), [api]);

  return (
    <section className="pb-12 md:pb-16 lg:pb-20 bg-background">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="mb-8 md:mb-12 ">
          <h2 className="text-3xl md:text-4xl font-antigua font-bold mb-6 md:mb-10 text-black/65">
            Neighborhoods
          </h2>
        </div>

        <Carousel
          setApi={setApi}
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-2 md:-ml-4 overflow-visible py-2">
            {neighborhoods.map((neighborhood, index) => (
              <CarouselItem
                key={index}
                className="pl-2 md:pl-4 basis-full sm:basis-1/2 lg:basis-1/3 xl:basis-1/4 relative"
              >
                <div
                  className="group relative z-10 
                  rounded-[5px] overflow-hidden
                  transition-all duration-300"
                >
                  {/* Image */}
                  <div className="relative aspect-[3/3.5] w-full ">
                    <img
                      src={neighborhood.imageUrl}
                      alt={neighborhood.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      loading={index < 2 ? "eager" : "lazy"}
                    />
                  </div>

                  {/* Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />

                  {/* Text */}
                  <div className="absolute bottom-4 w-full text-center">
                    <h3 className="text-xl font-antigua font-semibold text-white drop-shadow-md">
                      {neighborhood.name}
                    </h3>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          {/* <CarouselContent className="-ml-2 md:-ml-4 overflow-visible ">
            //  <CarouselContent className="pl-3 md:pl-6 basis-full sm:basis-1/2 lg:basis-1/3 xl:basis-1/4 relative"> 
            {neighborhoods.map((neighborhood, index) => (
              <CarouselItem
                key={index}
                className="pl-2 md:pl-4 gap-6 basis-full sm:basis-1/2 lg:basis-1/3 xl:basis-1/4 overflow-visible relative "
              >
                <Card className=" relative z-10 rounded-xl  shadow-[0_8px_20px_rgba(0,0,0,0.12)] hover:shadow-[0_14px_30px_rgba(0,0,0,0.18)]  transition-all duration-300">
                  <div className="relative aspect-[3/3.5] rounded-xl w-full  bg-gray-200">
                    <img
                      src={neighborhood.imageUrl}
                      alt={neighborhood.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      loading={index < 2 ? "eager" : "lazy"}
                    />
                  </div>

                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

                  <div className="absolute bottom-4  w-full text-center">
                    <h3 className="text-xl font-antigua font-semibold text-white drop-shadow-md">
                      {neighborhood.name}
                    </h3>
                  </div>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent> */}

          {/* Previous / Next arrows - hidden on mobile */}
          <div className="hidden sm:block">
            <CarouselPrevious
              className="left-0 h-10 w-10 -translate-x-1/2 border-0 shadow-[0_6px_18px_rgba(0,0,0,0.15)]
           hover:shadow-[0_10px_25px_rgba(0,0,0,0.25)] bg-gradient-to-r from-gold to-gold-light hover:bg-gold-light"
            />
            <CarouselNext
              className="right-0 h-10 w-10 translate-x-1/2 border-0 shadow-[0_6px_18px_rgba(0,0,0,0.15)]
           hover:shadow-[0_10px_25px_rgba(0,0,0,0.25)] bg-gradient-to-r from-gold-light to-gold hover:bg-gold-light"
            />
          </div>

          {/* Dots pagination at bottom */}
          {count > 1 && (
            <div className="mt-5 flex justify-center gap-3">
              {Array.from({ length: count }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => scrollTo(index)}
                  className={`
                    h-1.5 w-1.5 rounded-full transition-all duration-300
                    ${
                      current === index + 1
                        ? "bg-black"
                        : "bg-gray-200 hover:bg-muted-foreground/70"
                    }
                  `}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          )}
        </Carousel>
      </div>
    </section>
  );
}
