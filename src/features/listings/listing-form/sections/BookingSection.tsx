'use client'
import { CheckSquare, FileText, Link as LinkIcon } from 'lucide-react'
import { LockedSection } from '@/components/locked-section'
import { Separator } from '@/components/ui/separator'
import { Input } from '@/components/ui/input'
import { SectionCard, FormField } from '../ui/primitives'
import { ReservationLinksEditor } from '../editors/ReservationLinksEditor'
import { useListingFormCtx } from '../context'

export function BookingSection() {
  const { form, set, isGastronomy, isHotel, isBeach, isBoating, hasFeature, id } = useListingFormCtx()

  return (
    <>
      {/* Third-Party Reservation Links */}
      <LockedSection hasAccess={hasFeature('third_party_links')} requiredTier='standard' feature='Reservation Links' listingId={id}>
        <SectionCard
          icon={<LinkIcon className='h-5 w-5' />}
          title='Third-Party Reservation Links'
          description='External booking platform links (Booking.com, Rappi, GetYourGuide, etc.)'
        >
          <FormField label='Check Availability Button Title' hint='Label for the booking CTA button, e.g. "Check Availability"'>
            <Input placeholder='Check Availability' value={form.availability_button_title}
              onChange={(e) => set('availability_button_title', e.target.value)} className='rounded-md' />
          </FormField>
          <Separator />
          <ReservationLinksEditor links={form.reservation_links} onChange={(v) => set('reservation_links', v)} />
        </SectionCard>
      </LockedSection>

      {/* Book With Us */}
      {(isGastronomy || isHotel || isBeach || isBoating) && (
        <LockedSection hasAccess={hasFeature('book_with_us')} requiredTier='premium' feature='Book With Us' listingId={id}>
          <SectionCard
            icon={<CheckSquare className='h-5 w-5' />}
            title='Book With Us'
            description='Direct booking CTA block shown on the listing page'
          >
            <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
              <FormField label='Section Title' hint='e.g. "BOOK WITH US"'>
                <Input placeholder='BOOK WITH US' value={form.book_with_us.title}
                  onChange={(e) => set('book_with_us', { ...form.book_with_us, title: e.target.value })}
                  className='rounded-md' />
              </FormField>
              <FormField label='Button Link URL' hint='Where the Book button points to'>
                <Input type='url' placeholder='https://…/reservations' value={form.book_with_us.button_link}
                  onChange={(e) => set('book_with_us', { ...form.book_with_us, button_link: e.target.value })}
                  className='rounded-md' />
              </FormField>
              <FormField label='"Why Book" Title' hint='e.g. "Why Book With La Carta?"'>
                <Input placeholder='Why Book With La Carta?' value={form.book_with_us.why_title}
                  onChange={(e) => set('book_with_us', { ...form.book_with_us, why_title: e.target.value })}
                  className='rounded-md' />
              </FormField>
              <FormField label='"Why Book" Link URL' hint='Link for the why-book section'>
                <Input type='url' placeholder='https://…/terms' value={form.book_with_us.why_link}
                  onChange={(e) => set('book_with_us', { ...form.book_with_us, why_link: e.target.value })}
                  className='rounded-md' />
              </FormField>
            </div>
          </SectionCard>
        </LockedSection>
      )}

      {/* RNT & Inventory */}
      {(isGastronomy || isHotel || isBeach || isBoating) && (
        <SectionCard
          icon={<FileText className='h-5 w-5' />}
          title='Registration & Inventory'
          description='Tourism registration number and capacity info'
        >
          <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
            <FormField label='RNT No.' hint='Registro Nacional de Turismo number'>
              <Input placeholder='RNT-123456' value={form.rnt_no}
                onChange={(e) => set('rnt_no', e.target.value)} className='rounded-md' />
            </FormField>
            <FormField label='Inventory / Capacity' hint='e.g. "120 seats", "3 floors"'>
              <Input placeholder='120 seats' value={form.inventory}
                onChange={(e) => set('inventory', e.target.value)} className='rounded-md' />
            </FormField>
          </div>
        </SectionCard>
      )}

      {/* Direct Reservation Links */}
      {(isHotel || isBeach || isBoating) && (
        <LockedSection hasAccess={hasFeature('direct_links')} requiredTier='premium' feature='Direct Reservation Links' listingId={id}>
          <SectionCard
            icon={<LinkIcon className='h-5 w-5' />}
            title='Direct Reservation Links'
            description="Your own booking links (direct reservations, not third-party platforms)"
          >
            <ReservationLinksEditor links={form.direct_links} onChange={(v) => set('direct_links', v)} />
          </SectionCard>
        </LockedSection>
      )}
    </>
  )
}
