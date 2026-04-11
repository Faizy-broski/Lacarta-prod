'use client'
import { ExternalLink, MapPin } from 'lucide-react'
import { LockedSection } from '@/components/locked-section'
import { Input } from '@/components/ui/input'
import { SectionCard, FormField } from '../ui/primitives'
import { useListingFormCtx } from '../context'

export function LocationSection() {
  const { form, set, errors, googleMapsLink, mapSrc, hasFeature, id } = useListingFormCtx()

  return (
    <LockedSection hasAccess={hasFeature('address_map')} requiredTier='free' feature='Location & Map' listingId={id}>
      <SectionCard
        icon={<MapPin className='h-5 w-5' />}
        title='Location Details'
        description='Street address and GPS coordinates — map updates live as you type'
      >
        <div className='grid grid-cols-1 gap-6 sm:grid-cols-2'>
          <div className='space-y-4'>
            <FormField label='Address *' error={errors.address}>
              <Input
                placeholder='e.g. Calle del Cuartel #36-60, Getsemaní'
                value={form.address}
                onChange={(e) => set('address', e.target.value)}
                className={`rounded-md ${errors.address ? 'border-destructive' : ''}`}
              />
            </FormField>
            <FormField label='Address URL' hint='Direct link to the address (e.g. Google Maps short link)'>
              <Input type='url' placeholder='https://maps.app.goo.gl/…' value={form.address_url}
                onChange={(e) => set('address_url', e.target.value)} className='rounded-md' />
            </FormField>
            <div className='grid grid-cols-2 gap-3'>
              <FormField label='Latitude'>
                <Input type='number' step='any' placeholder='10.391049' value={form.latitude}
                  onChange={(e) => set('latitude', e.target.value)} className='rounded-md' />
              </FormField>
              <FormField label='Longitude'>
                <Input type='number' step='any' placeholder='-75.479426' value={form.longitude}
                  onChange={(e) => set('longitude', e.target.value)} className='rounded-md' />
              </FormField>
            </div>
            {googleMapsLink && (
              <a href={googleMapsLink} target='_blank' rel='noopener noreferrer'
                className='flex items-center gap-1.5 text-xs text-amber-600 hover:text-amber-700'>
                <ExternalLink className='h-3.5 w-3.5' /> Open in Google Maps
              </a>
            )}
          </div>
          <div className='flex flex-col gap-1.5'>
            <p className='text-sm font-medium'>Map Preview</p>
            <div className='flex-1 overflow-hidden rounded-md border' style={{ minHeight: 200 }}>
              {mapSrc ? (
                <iframe src={mapSrc} title='Location map preview' className='h-full w-full'
                  style={{ minHeight: 200, border: 0 }} />
              ) : (
                <div className='flex h-full min-h-[200px] items-center justify-center text-xs text-muted-foreground'>
                  Enter latitude & longitude to preview
                </div>
              )}
            </div>
          </div>
        </div>
      </SectionCard>
    </LockedSection>
  )
}
