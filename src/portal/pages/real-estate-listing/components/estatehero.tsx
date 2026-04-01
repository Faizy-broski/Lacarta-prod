import React from "react";
import { Button } from "@public/components/ui/button";
const bgImage = "/assets/activitiesHero.png";

export default function EstateHero() {
  return (
    <div
      className="relative bg-cover bg-center py-2 rounded-lg my-3 my-md-4 py-md-4"
    >
      <div className="mx-auto my-5 max-w-7xl px-4 text-center">
        <h2 className="text-3xl md:text-3xl mb-2 font-moonscape font-black leading-tight text-black mb-2 mt-2">
          Complete guide of all Gastronomy projects in Lacarta.
        </h2>
        <div className="flex max-w-2xl rounded-full gap-1 mx-auto overflow-hidden p-1">
          <input
            className="flex-grow p-2 text-black border rounded-full"
            type="email"
            placeholder="Where/What you are Looking For"
          />
          <Button className="text-white my-auto rounded-full px-6 py-2 font-bold bg-[#d0a439] hover:bg-[#b88f30] transition-colors">
            Seacrh
          </Button>
        </div>
      </div>
    </div>
  );
}
