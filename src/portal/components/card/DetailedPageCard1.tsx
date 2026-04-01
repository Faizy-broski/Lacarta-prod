import React from "react";
import { Card, CardContent, CardHeader } from "@public/components/ui/card";
import { Star, Heart, Check } from 'lucide-react'
import { Badge } from "@public/components/ui/badge";
import { Button } from "@public/components/ui/button";

export default function DetailedCard({ details = [], heading, columns }) {
  return (
    <section className="w-full px-5 py-16">
      <h2 className="mb-8 text-2xl md:text-4xl text-black font-bold">{heading}</h2>


      <div className={`${columns}`}>
        {details.map((item) => (
          <Card key={item.id} className="shadow relative overflow-hidden">


            <Button
              className=" absolute top-3 left-3
    h-10 w-10
    rounded-full
    bg-black
    border border-white
    p-0
    flex items-center justify-center
    hover:bg-gray-500/30
    transition"
            >
              <Check className="h-5 w-5 font-bold fill-white text-white" />
            </Button>
            {/* Heart icon (right) */}
            <Button
              className="
    absolute top-3 right-3
    h-10 w-10
    rounded-full
    bg-[#e5c0a9]
    border border-white
    p-0
    flex items-center justify-center
    hover:bg-gray-500/30
    transition
  "
            >
              <Heart className="h-5 w-5 font-bold fill-white text-white" />
            </Button>
            <img
              src={item.image}
              alt={item.title}
              className="h-48 w-full object-cover"
            />
            <CardHeader className="space-y-1">
              <h3 className="text-lg text-black font-bold">{item.title}</h3>
              <p className="text-sm text-muted-foreground">
                {item.subtitle}
              </p>
              {item.feature.map((itm) => (
                <li className="text-sm mx-3 text-muted-foreground">
                  {itm}
                </li>
              ))}
            </CardHeader>
            <CardContent className="flex items-center justify-between">
              <h5 className="text-bold text-black font-bold">Starting at ${item.price}<span className="text-muted-foreground">/month</span></h5>
              <span className="text-sm text-black font-medium flex gap-2"><Star></Star>{item.rating}</span>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}