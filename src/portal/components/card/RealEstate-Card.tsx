import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@public/components/ui/card";
import { Star, Heart, MapPin, BedDouble, Bath } from "lucide-react";
import { Button } from "@public/components/ui/button";
import Link from "next/link";

export default function EstateCard({ details = [], columns }) {
  const ITEMS_PER_PAGE = 9;
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(details.length / ITEMS_PER_PAGE);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentItems = details.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <section className="w-full  pb-12 md:pb-16 lg:pb-20 bg-background">
      <div className="container px-4 md:px-6 mx-auto">
        <h2 className="mb-8 text-2xl md:text-4xl text-black font-bold font-antigua">
          Featured Properties
        </h2>

        {/* CARDS */}
        <div className={columns}>
          {currentItems.map((item) => (
            <Link key={item.id} href={item.href}>
              <Card className="shadow-lg relative overflow-hidden bg-white/90">
                <Button className="absolute right-2 top-2 h-10 w-10 rounded-full bg-[#fed358] p-0 flex items-center justify-center">
                  <Heart className="h-5 w-5 text-black" />
                </Button>
                <CardHeader className="p-0 aspect-1/1">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-full w-full object-cover"
                  />
                </CardHeader>

                <CardContent className="space-y-1 p-3">
                  <h3 className="text-lg text-black font-semibold truncate">
                    {item.title}
                  </h3>
                  <h5 className="text-sm text-black/60 font-semibold">
                    {item.subtitle}
                  </h5>
                  <p className="text-xs flex gap-2 text-black/60">
                    <MapPin className="w-4 h-4" />
                    {item.location}
                  </p>
                  <p className="text-xs flex gap-2 text-black/60">
                    <BedDouble className="w-4 h-4" /> Number of Bedrooms:{" "}
                    {item.noOfBed}
                  </p>
                  <p className="text-xs flex gap-2 text-black/60">
                    <Bath className="w-4 h-4" /> Number of Bathrooms:{" "}
                    {item.noOfBath}
                  </p>
                  {/* </CardHeader> */}

                  {/* <CardContent> */}
                  <h5 className="text-black/70 font-medium">
                    Starting at ${item.price}/month
                  </h5>

                  <div className="flex md:gap-10 sm:gap-5 gap-5 items-center my-2">
                    {/* {[...Array(5)].map((_, i) => (
                      <Star key={i} className="text-black" />
                    ))} */}
                    <span className="flex gap-1 sm:gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`w-5 h-5 ${
                            star <= Math.round(item.rating)
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-yellow-400"
                          }`}
                        />
                      ))}
                    </span>
                    <span className="textmd text-red font-antigua">
                      {item.rating}/5
                    </span>
                  </div>
                  {/* <div className="flex mt-3">
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
                                          </div> */}
                </CardContent>
                <CardFooter className="p-3">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full rounded-[4px] border-muted-foreground/50 bg-muted-foreground/10  text-yellow-500 hover:text-gold  underline"
                  >
                    SEE THIS PROJECT
                  </Button>
                </CardFooter>
                {/* </CardHeader> */}
              </Card>
            </Link>
          ))}
        </div>

        {/* PAGINATION */}
        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-3 mt-12 text-lg font-semibold">
            {/* Page Numbers */}
            {Array.from({ length: totalPages }, (_, i) => i + 1)
              .slice(
                Math.max(0, currentPage - 3),
                Math.min(totalPages, currentPage + 2),
              )
              .map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-2 transition font-antigua
            ${
              currentPage === page
                ? "text-[#d0a439]" // gold active
                : "text-black hover:text-[#d0a439]"
            }`}
                >
                  {page}
                </button>
              ))}

            {/* dots */}
            {currentPage + 2 < totalPages && (
              <span className="px-2 font-antigua">...</span>
            )}

            {/* last page */}
            {currentPage + 2 < totalPages && (
              <button
                onClick={() => setCurrentPage(totalPages)}
                className="px-2 hover:text-[#d0a439] font-antigua"
              >
                {totalPages}
              </button>
            )}

            {/* Next */}
            {currentPage < totalPages && (
              <button
                onClick={() => setCurrentPage((p) => p + 1)}
                className="ml-2 hover:text-[#d0a439] font-antigua"
              >
                Next »
              </button>
            )}
          </div>
        )}
        {/* <div className="flex justify-center items-center gap-2 mt-10">
          <Button
            className="text-black bg-white font-bold"
            variant="outline"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => p - 1)}
          >
            Prev
          </Button>

          {[...Array(totalPages)].map((_, index) => (
            <Button
              key={index}
              onClick={() => setCurrentPage(index + 1)}
              className={`${
                currentPage === index + 1
                  ? "bg-white text-black"
                  : "bg-black text-white"
              }`}
            >
              {index + 1}
            </Button>
          ))}

          <Button
            className="text-black bg-white font-bold"
            variant="outline"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => p + 1)}
          >
            Next
          </Button>
        </div> */}
      </div>
    </section>
  );
}
