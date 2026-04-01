import React from "react";
import { Card, CardContent, CardHeader } from "@public/components/ui/card";
import { Badge } from "@public/components/ui/badge";
import { Button } from "@public/components/ui/button";
import { useState, useMemo } from "react";
import CategoryFilters from "@public/components/listings/CategoryFilters";
import Link from "next/link";

const ITEMS_PER_PAGE = 8;
// const currentPage =1

export default function ListingPage({ categories = [] }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [activeFilter, setActiveFilter] = useState("All");

  const filteredCategories = useMemo(() => {
    if (activeFilter === "All") return categories;
    return categories.filter((item) => item.type === activeFilter);
  }, [activeFilter, categories]);

  const totalPages = Math.ceil(filteredCategories.length / ITEMS_PER_PAGE);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentItems = filteredCategories.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE,
  );

  return (
    <section className="pb-16 mx-auto px-6 md:px-10">
      <div className="w-full sm:container sm:mx-auto">
        <CategoryFilters
          activeFilter={activeFilter}
          setActiveFilter={(filter) => {
            setActiveFilter(filter);
            setCurrentPage(1);
          }}
          onClear={() => {
            setActiveFilter("All");
            setCurrentPage(1);
          }}
        />

        {/* Grid */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6">
          {currentItems.map((cat) => (
            <Link key={cat.id} href={`${cat.href}`}>
              <Card className="border-0 bg-transparent shadow-none p-0">
                <CardHeader className="p-0">
                  <img
                    src={cat.image}
                    alt={cat.title}
                    className="h-52 w-full object-cover rounded-xl"
                  />
                </CardHeader>

                <CardContent className="text-center p-0">
                  <h3 className="text-lg font-extrabold text-black font-antigua uppercase">
                    {cat.title}
                  </h3>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

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
      </div>
    </section>
  );
}
