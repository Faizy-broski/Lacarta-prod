// components/PlayaScondidaCard.tsx
import React, { useState } from "react";
import whatsapp from "../../../public/assets/whatsapp.svg";
import { Button } from "@public/components/ui/button";
import { Badge } from "@public/components/ui/badge";
import { Heart, Share2, Star } from "lucide-react";

const thumbnails = [
  "https://static.vecteezy.com/system/resources/previews/055/509/727/non_2x/luxurious-tree-house-overlooking-tropical-rainforest-in-bali-photo.jpg",
  "https://a0.muscache.com/im/pictures/miso/Hosting-632871632327570609/original/d43297f3-0041-4fb8-a9fd-f5ce479a7c25.jpeg",
  "https://a0.muscache.com/im/pictures/816242d3-a4e6-43cc-80a8-1cd3174f65c2.jpg",
  "https://a0.muscache.com/im/pictures/miso/Hosting-813029650994267143/original/4cfece71-e34e-41ec-b199-9f6c16551d31.jpeg",
];

export default function PlayaScondidaCard() {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleThumbnailClick = (index: number) => {
    setActiveIndex(index);
  };

  return (
    <div className="mx-auto w-full max-w-5xl bg-light overflow-hidden">
      <div className="flex flex-col lg:grid lg:grid-cols-[5fr_7fr]  h-auto lg:h-[460px]">
        {/* <div className="inline absolute top-0 left-0">
            <Share2 size={60} className="p-3 text-white font-bold bg-red-400 mb-2 rounded-full"/>
            <Heart size={60} className="p-3 text-black font-bold bg-yellow-400 rounded-full"/>
          </div> */}

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
              <img src={whatsapp} alt="WhatsApp" className="w-10 h-10" />
            </a>
          </div>
        </div>
        {/* LEFT - INFO */}
        <div className="p-6 lg:p-8 flex flex-col bg-gradient-to-br from-slate-50 to-white order-1 lg:order-none">
          <div className="mb-2">
            <h2 className="text-4xl md:text-5xl font-sans font-extrabold text-black tracking-tight">
              PLAYA Scondida
            </h2>
            <div className="my-3">
              <p className="text-sm text-muted-foreground">STARTING FROM</p>
              <p className="text-3xl md:text-4xl font-bold text-gray-900">
                $177 – $515
                <span className="text-lg font-normal text-gray-600">
                  /night
                </span>
              </p>
            </div>
          </div>

          <p className="mt-3 font-bold text-gray-700">
            Eco-Luxury Glamping Experience in Isla Barú
          </p>

          <div className="mt-auto space-y-4">
            <div className="flex items-center gap-1 my-3">
              {Array(5)
                .fill(0)
                .map((_, i) => (
                  <Star
                    key={i}
                    className="h-5 w-5 fill-yellow-500 text-yellow-500"
                  />
                ))}
              <span className="ml-2 text-sm font-medium text-gray-600">
                Highly rated • Trusted experience
              </span>
            </div>

            <div className="flex flex-wrap gap-0 mb-5">
              <Badge
                variant="secondary"
                className="bg-white border-0 font-semibold text-muted-foreground text-normal"
              >
                Accommodation
              </Badge>
              <Badge
                variant="secondary"
                className="bg-white border-0 font-semibold text-muted-foreground text-normal"
              >
                Glamping
              </Badge>
              <Badge
                variant="secondary"
                className="bg-white border-0 font-semibold text-muted-foreground text-normal"
              >
                Nature
              </Badge>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                className="flex-1 bg-gradient-to-r from-green-400 via-green-600 to-green-800 rounded-full text-white font-bold py-6"
                size="lg"
              >
                Book Now
              </Button>
              <Button
                variant="outline"
                className="flex-1  bg-yellow-400 text-black rounded-full py-6"
                size="lg"
              >
                <Heart className="mr-2 h-4 w-4" />
                Add to Favourites
              </Button>
            </div>
          </div>
        </div>

        {/* RIGHT - IMAGE GALLERY */}
        <div className="relative order-2 lg:order-none">
          <div className="absolute inset-0 grid grid-cols-[1fr_140px] gap-2 p-4 lg:p-5">
            {/* Main Image */}
            <div className="relative rounded-xl overflow-hidden shadow-inner">
              <img
                src={thumbnails[activeIndex]}
                alt="Playa Scondida featured view"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 hover:scale-[1.03]"
                loading="eager"
                decoding="async"
              />
            </div>

            {/* Thumbnails - clickable */}
            <div className="flex flex-col gap-2 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400/40 hover:scrollbar-thumb-gray-400/70">
              {thumbnails.map((src, index) => (
                <div
                  key={index}
                  onClick={() => handleThumbnailClick(index)}
                  className={`
                    relative w-full aspect-square rounded-lg overflow-hidden 
                    ring-1 ring-black/10 shadow-sm cursor-pointer
                    transition-all duration-300 hover:ring-2 hover:ring-primary/60
                    ${
                      index === activeIndex
                        ? "ring-2 ring-primary scale-[1.04] shadow-md"
                        : "opacity-85 hover:opacity-100"
                    }
                  `}
                >
                  <img
                    src={src}
                    alt={`Gallery thumbnail ${index + 1}`}
                    className="w-full h-full object-cover"
                    loading={index < 3 ? "eager" : "lazy"}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="flex md:justify-start justify-center">
        <Button
          className="w-[90%] md:w-[40%] bg-gradient-to-r 
             from-yellow-400 via-green-400 via-green-600 to-red-500 
             rounded-full text-white font-bold py-6 flex items-center text-lg  justify-center gap-2"
          size="lg"
        >
          Nos Promo <span className="text-xl">→</span>
        </Button>
      </div>
    </div>
  );
}
