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
      className="relative bg-cover bg-center py-24"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="absolute inset-0 bg-black/20"></div>

      <div className="relative z-10 container mx-auto px-4 text-center text-white space-y-10">
        <h5 className="text-md  text-white/90 font-antigua">{path}</h5>
        <h1 className="text-4xl font-antigua leading-tight mt-2">{title}</h1>
        <div className="md:w-[54%] w-full mx-auto">
          <p className="my-4 text-sm mx-auto font-semibold text-gray/90">
            {subtitle}
          </p>

{button  && (
  <Button className="py-6 rounded-sm w-full font-antigua bg-gradient-to-t from-gold-light to-gold  text-2xl text-white hover:brightness-110 transition">
    {buttonText}
  </Button>

)}
        </div>
      </div>
    </div>
  );
}
