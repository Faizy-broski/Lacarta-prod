import React from "react";
import { Button } from "@public/components/ui/button";

interface props {
  bgImage: string;
  title: string;
  subtitle: string;
  button?: boolean;
  buttonText?: string;
  path: string;
  cta?: string;
}

export default function Hero({
  bgImage,
  title,
  subtitle,
  path,
  cta,
  buttonText = "BOOK NOW",
  button = true
}: props) {
  return (
    <div
      className="relative bg-cover bg-center py-28 md:py-32"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="absolute inset-0 bg-black/35"></div>
      <div className="relative z-10 container mx-auto px-4 text-white pt-16 md:pt-24">
        <div className="absolute inset-x-0 top-6 flex justify-center px-4">
          <p className="inline-flex rounded-full bg-white px-4 py-2 text-[11px] uppercase tracking-[0.35em] text-black font-semibold shadow-md shadow-black/10">
            {path}
          </p>
        </div>

        <div className="text-center space-y-8 pt-14">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-antigua leading-tight tracking-tight">
            {title}
          </h1>
          <div className="md:w-2/3 w-full mx-auto">
            <p className="mx-auto text-base md:text-lg font-semibold text-white/90 leading-8">
              {subtitle}
            </p>
          </div>
        </div>

        {button && (
          <div className="mt-6 flex justify-center px-4">
            <Button className="w-full sm:w-auto py-4 px-14 rounded-sm font-antigua bg-[#d19b24] text-2xl text-white uppercase tracking-[0.14em] shadow-[0_30px_60px_rgba(0,0,0,0.24)] hover:brightness-110 transition">
              {buttonText}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
