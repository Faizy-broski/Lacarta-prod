'use client'

import { useEffect, useState, useCallback } from 'react'
import Link from 'next/link'
import useEmblaCarousel from 'embla-carousel-react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import type { PortalListing } from '@/lib/listings.service'

interface FeaturedListingsCarouselProps {
  listings: PortalListing[]
  /** Optional fallback title. Defaults to "Featured" */
  categoryLabel?: string
}

export default function FeaturedListingsCarousel({
  listings,
  categoryLabel = 'Featured',
}: FeaturedListingsCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'start' })
  const [current, setCurrent] = useState(0)
  const [canPrev, setCanPrev] = useState(false)
  const [canNext, setCanNext] = useState(false)

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setCurrent(emblaApi.selectedScrollSnap())
    setCanPrev(emblaApi.canScrollPrev())
    setCanNext(emblaApi.canScrollNext())
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    emblaApi.on('select', onSelect)
    onSelect()
    const timer = setInterval(() => emblaApi.scrollNext(), 5500)
    return () => {
      clearInterval(timer)
      emblaApi.off('select', onSelect)
    }
  }, [emblaApi, onSelect])

  if (listings.length === 0) return null

  return (
    <div className='relative group/carousel'>
      {/* Slides */}
      <div ref={emblaRef} className='overflow-hidden'>
        <div className='flex'>
          {listings.map((listing) => (
            <div key={listing.id} className='relative min-w-0 flex-[0_0_100%]'>
              <Link href={listing.href} className='block relative h-[400px] md:h-[520px]'>
                {listing.image ? (
                  <img
                    src={listing.image}
                    alt={listing.title}
                    className='h-full w-full object-cover'
                  />
                ) : (
                  <div className='h-full w-full bg-gray-300' />
                )}

                {/* Gradient overlay */}
                <div
                  className='absolute inset-0'
                  style={{
                    background:
                      'linear-gradient(to top, rgba(0,0,0,0.85) 30%, rgba(0,0,0,0.15) 100%)',
                  }}
                />

                {/* Category badge */}
                <div className='absolute top-5 left-5'>
                  <span className='rounded-full bg-gold px-3 py-1 text-xs font-black text-black'>
                    {categoryLabel}
                  </span>
                </div>

                {/* Content */}
                <div className='absolute bottom-0 left-0 right-0 p-6 md:p-10'>
                  <h2 className='font-antigua font-black text-white text-xl md:text-3xl leading-snug mb-2 max-w-3xl line-clamp-2'>
                    {listing.title}
                  </h2>
                  {listing.subtitle && (
                    <p className='text-white/80 text-sm md:text-base max-w-2xl line-clamp-2 mb-4'>
                      {listing.subtitle}
                    </p>
                  )}
                  <span className='inline-block rounded-sm bg-gold px-5 py-2 text-sm font-black text-black hover:brightness-110 transition'>
                    {listing.feature_post_type === 'menu' ? 'VIEW MENU' : 'BOOK NOW'}
                  </span>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Prev / Next arrows */}
      {canPrev && (
        <button
          onClick={() => emblaApi?.scrollPrev()}
          aria-label='Previous'
          className='absolute left-3 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-black/50 text-white opacity-0 transition group-hover/carousel:opacity-100 hover:bg-black/70'
        >
          <ChevronLeft size={22} />
        </button>
      )}
      {canNext && (
        <button
          onClick={() => emblaApi?.scrollNext()}
          aria-label='Next'
          className='absolute right-3 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-black/50 text-white opacity-0 transition group-hover/carousel:opacity-100 hover:bg-black/70'
        >
          <ChevronRight size={22} />
        </button>
      )}

      {/* Dot indicators */}
      {listings.length > 1 && (
        <div className='absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2'>
          {listings.map((_, i) => (
            <button
              key={i}
              onClick={() => emblaApi?.scrollTo(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`h-2 rounded-full transition-all ${
                i === current ? 'w-6 bg-gold' : 'w-2 bg-white/60 hover:bg-white'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  )
}
