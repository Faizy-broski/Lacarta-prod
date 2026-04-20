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

                {/* Category path badge */}
                <div className='absolute inset-x-0 bottom-0 p-6 md:p-10'>
                  <div className='mx-auto w-full max-w-4xl text-center'>
                    <div className='flex justify-center mb-4'>
                      <span className='inline-flex rounded-full bg-white px-4 py-2 text-[11px] uppercase tracking-[0.35em] text-black font-semibold shadow-md shadow-black/10'>
                        La Carta - Cartagena Culture & Tourism &gt; {categoryLabel}
                      </span>
                    </div>
                    <h2 className='font-antigua font-black text-white text-3xl md:text-5xl leading-tight mb-4'>
                      {listing.title}
                    </h2>
                    {listing.subtitle && (
                      <p className='mx-auto text-white/90 text-base md:text-lg max-w-3xl mb-6'>
                        {listing.subtitle}
                      </p>
                    )}
                    <div className='flex justify-center'>
                      <span className='inline-flex w-full md:w-auto max-w-xl items-center justify-center rounded-sm bg-[#d19b24] px-8 py-4 text-lg font-black text-white uppercase tracking-[0.14em] text-center shadow-[0_30px_60px_rgba(0,0,0,0.24)] hover:brightness-110 transition'>
                        {listing.feature_post_type === 'menu' ? 'VIEW MENU' : 'BOOK NOW'}
                      </span>
                    </div>
                  </div>
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
