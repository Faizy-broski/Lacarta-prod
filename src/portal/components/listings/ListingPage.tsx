'use client'

import React, { useState, useMemo, useCallback, useEffect } from 'react'
import { Card, CardContent, CardHeader } from '@public/components/ui/card'
import CategoryFilters from '@public/components/listings/CategoryFilters'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'

const ITEMS_PER_PAGE = 8

export default function ListingPage({
  categories = [],
  categoryName = '',
}: {
  categories?: any[]
  categoryName?: string
}) {
  const [currentPage, setCurrentPage] = useState(1)
  const [activeFilters, setActiveFilters] = useState<Record<string, string[]>>({})
  const [typeOptions, setTypeOptions] = useState<string[]>([])

  // Fetch type pills from listing_types table in DB
  useEffect(() => {
    if (!categoryName) return
    supabase
      .from('categories')
      .select('id')
      .ilike('name', categoryName)
      .eq('type', 'listing')
      .single()
      .then(({ data: cat }) => {
        if (!cat) return
        supabase
          .from('listing_types')
          .select('name')
          .eq('category', cat.id)
          .eq('status', 'active')
          .order('name')
          .then(({ data }) => {
            setTypeOptions((data ?? []).map((r: any) => r.name as string))
          })
      })
  }, [categoryName])

  const handleFilterChange = useCallback(
    (group: string, value: string, checked: boolean) => {
      setActiveFilters((prev) => {
        const current = prev[group] ?? []
        const next = checked
          ? [...current, value]
          : current.filter((v) => v !== value)
        return { ...prev, [group]: next }
      })
      setCurrentPage(1)
    },
    []
  )

  const handleClearAll = useCallback(() => {
    setActiveFilters({})
    setCurrentPage(1)
  }, [])

  const filteredCategories = useMemo(() => {
    const hasActive = Object.values(activeFilters).some((v) => v.length > 0)
    if (!hasActive) return categories

    return categories.filter((item) => {
      const tags: string[] = Array.isArray(item.types) ? item.types : []
      // AND between groups: every active group must have at least one match
      return Object.entries(activeFilters).every(([, values]) => {
        if (values.length === 0) return true
        return values.some((v) => tags.includes(v))
      })
    })
  }, [activeFilters, categories])

  const totalPages = Math.ceil(filteredCategories.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const currentItems = filteredCategories.slice(startIndex, startIndex + ITEMS_PER_PAGE)

  return (
    <section className='pb-16 mx-auto px-6 md:px-10'>
      <div className='w-full sm:container sm:mx-auto'>
        <CategoryFilters
          categoryName={categoryName}
          typeOptions={typeOptions}
          activeFilters={activeFilters}
          onFilterChange={handleFilterChange}
          onClearAll={handleClearAll}
        />

        {/* Grid */}
        <div className='grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6'>
          {currentItems.length > 0 ? (
            currentItems.map((cat) => (
              <Link key={cat.id} href={`${cat.href}`}>
                <Card className='border-0 bg-transparent shadow-none p-0'>
                  <CardHeader className='p-0'>
                    <img
                      src={cat.image}
                      alt={cat.title}
                      className='h-52 w-full object-cover rounded-xl'
                    />
                  </CardHeader>
                  <CardContent className='text-center p-0'>
                    <h3 className='text-lg font-extrabold text-black font-antigua uppercase'>
                      {cat.title}
                    </h3>
                  </CardContent>
                </Card>
              </Link>
            ))
          ) : (
            <p className='col-span-4 py-16 text-center text-gray-400 font-antigua'>
              No listings match the selected filters.
            </p>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className='flex justify-center items-center gap-3 mt-12 text-lg font-semibold'>
            {Array.from({ length: totalPages }, (_, i) => i + 1)
              .slice(
                Math.max(0, currentPage - 3),
                Math.min(totalPages, currentPage + 2)
              )
              .map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-2 transition font-antigua
                    ${currentPage === page ? 'text-[#d0a439]' : 'text-black hover:text-[#d0a439]'}`}
                >
                  {page}
                </button>
              ))}

            {currentPage + 2 < totalPages && (
              <span className='px-2 font-antigua'>...</span>
            )}

            {currentPage + 2 < totalPages && (
              <button
                onClick={() => setCurrentPage(totalPages)}
                className='px-2 hover:text-[#d0a439] font-antigua'
              >
                {totalPages}
              </button>
            )}

            {currentPage < totalPages && (
              <button
                onClick={() => setCurrentPage((p) => p + 1)}
                className='ml-2 hover:text-[#d0a439] font-antigua'
              >
                Next »
              </button>
            )}
          </div>
        )}
      </div>
    </section>
  )
}
