import React from "react";
import { Card, CardContent } from "@public/components/ui/card";
import { Star, Heart,ChevronRight,ChevronLeft } from "lucide-react";
import { Button } from "@public/components/ui/button";
import Link from "next/link";

export default function CarasoleCards({
  premiumListings = [],
}) {

  // Split listings into groups of 4
  const chunkSize = 4;
  const slides = [];
  for (let i = 0; i < premiumListings.length; i += chunkSize) {
    slides.push(premiumListings.slice(i, i + chunkSize));
  }

  return (
    <section className="w-full max-w-5xl  m-auto px-4 py-16">
      <div className="text-center">
       <h6 className="text-muted-foreground font-serif font-bold tracking-tight mb-6">EXPLORE</h6>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif text-black font-bold tracking-tight mb-6">
           Around This Place
          </h1>
          </div>

        <div
          id="listingCarousel"
          className="carousel slide relative"
          data-bs-ride="carousel"
        >
          <div className="carousel-inner">

            {slides.map((group, index) => (
              <div
                key={index}
                className={`carousel-item ${index === 0 ? "active" : ""}`}
              >
                <div className="grid gap-2  sm:grid-cols-2 lg:grid-cols-4">

                  {group.map((item) => (
                    <Link key={item.id} href={`${item.href}`}>
                      <Card className="border-none shadow-md relative overflow-hidden">

                        <img
                          src={item.image}
                          alt="thumbnail"
                          className="absolute top-5 left-3 h-12 w-16 object-cover border-4 border-white shadow"
                        />

                        <Button className="absolute top-3 right-3 h-8 w-8 rounded-full backdrop-blur-md border bg-transparent border-white p-0 flex items-center justify-center">
                          <Heart className="h-5 w-5 fill-white text-white" />
                        </Button>

                        <img
                          src={item.image}
                          alt={item.title}
                          className="h-48 w-full object-cover"
                        />

                        <CardContent className="p-2">
                          <h6 className="w-fit font-sm font-bold text-gray-600">
                            {item.category}
                          </h6>

                          <h3 className="text-lg text-black font-bold font-luxury">
                            {item.title}
                          </h3>

                          <p className="text-xs font-bold truncate text-gray-600">
                            {item.subtitle}
                          </p>

                          <div className="flex mt-3">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star
                                key={star}
                                className={`w-5 h-5 ${
                                  star <= Math.round(item.rating)
                                    ? "fill-[#E6B65C] text-[#E6B65C]"
                                    : "text-[#E6B65C]"
                                }`}
                              />
                            ))}
                          </div>

                          <Button
                            variant="outline"
                            size="sm"
                            className="p-0 border-0 bg-transparent text-[#22c35d] font-extrabold underline underline-offset-4 decoration-[#23c55e] hover:text-[#4bd87d]"
                          >
                            MENU
                          </Button>
                        </CardContent>

                      </Card>
                    </Link>
                  ))}

                </div>
              </div>
            ))}

          </div>

          {/* Left Button */}
          <button
            type="button"
            data-bs-target="#listingCarousel"
            data-bs-slide="prev"
            className="absolute top-1/2 -translate-y-1/2 -left-6 z-10
                       w-10 h-10 flex items-center justify-center
                       rounded-full bg-[#d0a439] text-white shadow-lg"
          >
            <ChevronLeft size={50} className="p-2"/>
          </button>

          {/* Right Button */}
          <button
            type="button"
            data-bs-target="#listingCarousel"
            data-bs-slide="next"
            className="absolute top-1/2 -translate-y-1/2 -right-6 z-10
                       w-10 h-10 flex items-center justify-center
                       rounded-full bg-[#d0a439] text-white shadow-lg"
          >
          <ChevronRight size={50} className="p-2"/>

          </button>

        </div>
    </section>
  );
}
