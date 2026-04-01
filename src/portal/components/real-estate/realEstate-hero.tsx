import React from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import { Button } from "@public/components/ui/button";
const bgImage = "/assets/real-estate/Rectangle 1000001778.png";

export default function EstateHero() {
  return (
    <div
      className="px-2 md:px-16 rounded-lg my-3 relative bg-cover bg-center py-12 md:py-24"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="mx-auto px-0 md:px-4 text-center text-white space-y-3 md:spcae-y-6">
        <h1 className="text-3xl md:text-5xl font-antigua leading-tight md:mt-2 mt-0 ">
          Real Estate In Cartagena
        </h1>
        {/* <div className="md:w-[64%] w-full mx-auto px-0"> */}
        <div className="lg:w-[64%] md:w-full sm:w-full w-full mx-auto px-0">
          <p className="my-4 text-sm mx-auto font-semibold">
            All of our places to stay mentioned have been accommodations that
            our team at La Carta has personally stayed at. Our team has a
            grading curriculum tailored for western tourists, from the
            backpackers to luxury travellers our grades will help you find what
            you need for your vacation in Cartagena.
          </p>
          <div className="md:flex max-w-2xl gap-3 mx-auto overflow-hidden p-1">
            <div className="relative flex-grow">
              <SlidersHorizontal className="hidden md:block absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
              <input
                className="w-full px-4 py-2 text-black border rounded-full placeholder:text-xs placeholder:text-base"
                type="email"
                placeholder={`Where/What you are looking for?  `}
              />
            </div>
            <Button className="text-lg font-normal text-white my-auto rounded-full px-6 py-5 mt-2 md:mt-0 bg-gradient-to-b from-gold to-gold-light hover:bg-gold transition-colors">
              Seacrh <Search />
            </Button>
          </div>
          <Button className="w-full md:w-fit text-md text-white mt-5 font-antigua rounded-full px-16 py-6 bg-gradient-to-b from-gold to-gold-light hover:bg-gold transition-colors">
            List Your Home
          </Button>
        </div>
      </div>
    </div>
  );
}
