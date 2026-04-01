import { Heart } from "lucide-react";
import { Badge } from "@public/components/ui/badge";
import { Button } from "../ui/button";

export default function AroundThisPlace({ places }) {
  return (
    <section className="w-full max-w-5xl m-auto py-12 md:py-16 lg:py-20 bg-gradient-to-b from-slate-50 to-white">
      <div className="container max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <p className="text-xs uppercase tracking-widest text-muted-foreground mb-2">
            Explore
          </p>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-black">
            Around This Place
          </h2>
        </div>

        {/* Cards */}
        <div className="grid gap-2 overflow-x-auto md:grid md:grid-cols-2 lg:grid-cols-4 md:overflow-visible scrollbar-hide">
          {places.map((item, index) => (
            <div
              key={index}
              className="relative min-w-[260px] h-[360px] rounded-2xl overflow-hidden group shadow-md"
            >
              {/* Image */}
              <img
                src={item.image}
                alt={item.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

              {/* Heart Button */}
              <Button className="absolute top-4 right-4 z-10 bg-yellow-400 rounded-full p-2">
                <Heart className="h-4 w-4 text-black" />
              </Button>

              {/* Content */}
              <div className="absolute bottom-4 left-4 right-4 text-white z-10">
                <h3 className="font-serif text-lg font-semibold leading-tight mb-2">
                  {item.title}
                </h3>

                <div className="flex flex-wrap gap-2">
                  {item.tags.map((tag, i) => (
                    <Badge
                      key={i}
                      variant="secondary"
                      className="bg-white/90 text-black text-xs font-medium"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
