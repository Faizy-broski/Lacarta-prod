'use client'
import { Clock, DollarSign, Globe, Hash, Trash2, Upload } from 'lucide-react'
import { LockedSection } from '@/components/locked-section'
import { Separator } from '@/components/ui/separator'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { SectionCard, FormField, AddButton } from '../ui/primitives'
import { useListingFormCtx } from '../context'
import type { REListingType, AvailabilityStatus } from '../types'

export function RealEstateSection() {
  const { form, set, isRealEstate, hasFeature, id } = useListingFormCtx()

  if (!isRealEstate) return null

  return (
    <>
      {/* Property Specs */}
      <SectionCard
        icon={<Hash className='h-5 w-5' />}
        title='Property Specifications'
        description='Listing type, strata, bedrooms, bathrooms, square footage and availability'
      >
        <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
          <FormField label='Listing Type' required>
            <Select value={form.re_listing_type} onValueChange={(v) => set('re_listing_type', v as REListingType)}>
              <SelectTrigger className='rounded-md'><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value='sale'>For Sale</SelectItem>
                <SelectItem value='rent'>For Rent</SelectItem>
                <SelectItem value='rent_or_sale'>For Rent or Sale</SelectItem>
              </SelectContent>
            </Select>
          </FormField>
          <FormField label='Availability'>
            <Select value={form.availability_status} onValueChange={(v) => set('availability_status', v as AvailabilityStatus)}>
              <SelectTrigger className='rounded-md'><SelectValue /></SelectTrigger>
              <SelectContent>
                {(['available', 'unavailable', 'coming_soon', 'sold', 'rented'] as const).map((s) => (
                  <SelectItem key={s} value={s} className='capitalize'>{s.replace('_', ' ')}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormField>
        </div>
        <Separator />
        <div className='grid grid-cols-2 gap-4 sm:grid-cols-4'>
          <FormField label='Bedrooms'>
            <Input type='number' min={0} placeholder='3' value={form.bedrooms}
              onChange={(e) => set('bedrooms', e.target.value)} className='rounded-md' />
          </FormField>
          <FormField label='Bathrooms'>
            <Input type='number' min={0} placeholder='2' value={form.bathrooms}
              onChange={(e) => set('bathrooms', e.target.value)} className='rounded-md' />
          </FormField>
          <FormField label='Sq. Ft.'>
            <Input type='number' min={0} placeholder='1200' value={form.sqft}
              onChange={(e) => set('sqft', e.target.value)} className='rounded-md' />
          </FormField>
          <FormField label='Strata (1–6)' hint='Colombian socioeconomic stratum'>
            <Input type='number' min={1} max={6} placeholder='3' value={form.strata}
              onChange={(e) => set('strata', e.target.value)} className='rounded-md' />
          </FormField>
        </div>
        <FormField label='Unit Specs' hint='e.g. Studio, 1–2 bathrooms'>
          <Input placeholder='Studio, 1–2 bathrooms' value={form.unit_specs}
            onChange={(e) => set('unit_specs', e.target.value)} className='rounded-md' />
        </FormField>
        <Separator />
        <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
          <FormField label='Price From ($)' hint='Asking price or minimum rent'>
            <div className='relative'>
              <DollarSign className='absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground' />
              <Input type='number' placeholder='0' min={0} step={0.01} value={form.price_from}
                onChange={(e) => set('price_from', e.target.value)} className='rounded-md pl-9' />
            </div>
          </FormField>
          <FormField label='Price To ($)' hint='Maximum price or leave blank'>
            <div className='relative'>
              <DollarSign className='absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground' />
              <Input type='number' placeholder='0' min={0} step={0.01} value={form.price_to}
                onChange={(e) => set('price_to', e.target.value)} className='rounded-md pl-9' />
            </div>
          </FormField>
        </div>
      </SectionCard>

      {/* Developer Info */}
      <LockedSection hasAccess={hasFeature('re_developer_info')} requiredTier='standard' feature='Developer Information' listingId={id}>
        <SectionCard
          icon={<Globe className='h-5 w-5' />}
          title='Developer Information'
          description='Real estate developer or agency behind this project'
        >
          <div className='grid grid-cols-1 gap-4 sm:grid-cols-3'>
            <FormField label='Developer / Agency Name'>
              <Input placeholder='Market Rental Habitats' value={form.developer_info.name}
                onChange={(e) => set('developer_info', { ...form.developer_info, name: e.target.value })}
                className='rounded-md' />
            </FormField>
            <FormField label='Contact'>
              <Input placeholder='+57 300 000 0000' value={form.developer_info.contact}
                onChange={(e) => set('developer_info', { ...form.developer_info, contact: e.target.value })}
                className='rounded-md' />
            </FormField>
            <FormField label='Website'>
              <Input type='url' placeholder='https://developer.com' value={form.developer_info.website}
                onChange={(e) => set('developer_info', { ...form.developer_info, website: e.target.value })}
                className='rounded-md' />
            </FormField>
          </div>
          <Separator />
          <FormField label='Developer Logo URL' hint='Image URL for the developer or agency logo'>
            <Input type='url' placeholder='https://…/logo.png' value={form.developer_info.logo}
              onChange={(e) => set('developer_info', { ...form.developer_info, logo: e.target.value })}
              className='rounded-md' />
          </FormField>
          <FormField label='Developer Description'>
            <Textarea placeholder='Brief description of the developer or agency…' value={form.developer_info.description}
              onChange={(e) => set('developer_info', { ...form.developer_info, description: e.target.value })}
              className='rounded-md' rows={3} />
          </FormField>
          <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
            <FormField label='Button Label' hint='e.g. View Properties, Contact Us'>
              <Input placeholder='View Properties' value={form.developer_info.button_label}
                onChange={(e) => set('developer_info', { ...form.developer_info, button_label: e.target.value })}
                className='rounded-md' />
            </FormField>
            <FormField label='Button URL'>
              <Input type='url' placeholder='https://…' value={form.developer_info.website}
                onChange={(e) => set('developer_info', { ...form.developer_info, website: e.target.value })}
                className='rounded-md' />
            </FormField>
          </div>
        </SectionCard>
      </LockedSection>

      {/* Appointments */}
      <LockedSection hasAccess={hasFeature('re_appointment')} requiredTier='standard' feature='Appointments' listingId={id}>
        <SectionCard
          icon={<Clock className='h-5 w-5' />}
          title='Appointments'
          description='Appointment booking call-to-action shown on the listing page'
        >
          <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
            <FormField label='Appointment Title'>
              <Input placeholder='Schedule a Viewing' value={form.appointment_info.title}
                onChange={(e) => set('appointment_info', { ...form.appointment_info, title: e.target.value })}
                className='rounded-md' />
            </FormField>
            <FormField label='Appointment Link' hint='Booking or calendar URL'>
              <Input type='url' placeholder='https://calendly.com/…' value={form.appointment_info.link}
                onChange={(e) => set('appointment_info', { ...form.appointment_info, link: e.target.value })}
                className='rounded-md' />
            </FormField>
          </div>
          <FormField label='Appointment Description'>
            <Textarea placeholder='Book a visit to see this property in person…' value={form.appointment_info.content}
              onChange={(e) => set('appointment_info', { ...form.appointment_info, content: e.target.value })}
              className='rounded-md' rows={3} />
          </FormField>
        </SectionCard>
      </LockedSection>

      {/* Website CTA */}
      <LockedSection hasAccess={hasFeature('re_website_cta')} requiredTier='standard' feature='Website / Portal' listingId={id}>
        <SectionCard
          icon={<Globe className='h-5 w-5' />}
          title='Website / Portal'
          description='External website or portal link shown on the listing page'
        >
          <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
            <FormField label='Website Title'>
              <Input placeholder='View on Our Website' value={form.website_cta.title}
                onChange={(e) => set('website_cta', { ...form.website_cta, title: e.target.value })}
                className='rounded-md' />
            </FormField>
            <FormField label='Website Link'>
              <Input type='url' placeholder='https://agency.com/listing/…' value={form.website_cta.link}
                onChange={(e) => set('website_cta', { ...form.website_cta, link: e.target.value })}
                className='rounded-md' />
            </FormField>
          </div>
          <FormField label='Website Description'>
            <Textarea placeholder='Find more details, photos and contact options on our website…' value={form.website_cta.content}
              onChange={(e) => set('website_cta', { ...form.website_cta, content: e.target.value })}
              className='rounded-md' rows={3} />
          </FormField>
        </SectionCard>
      </LockedSection>

      {/* Blueprint & Videos */}
      <LockedSection hasAccess={hasFeature('re_blueprint')} requiredTier='premium' feature='Blueprint & Videos' listingId={id}>
        <SectionCard
          icon={<Upload className='h-5 w-5' />}
          title='Blueprint & Videos'
          description='Upload floor plans and video tours for this property'
        >
          <FormField label='Blueprint URL' hint='Link to PDF floor plan or blueprint image'>
            <Input type='url' placeholder='https://…/blueprint.pdf' value={form.blueprint_url}
              onChange={(e) => set('blueprint_url', e.target.value)} className='rounded-md' />
          </FormField>
          <Separator />
          <div className='space-y-2'>
            <Label className='text-sm font-medium'>Video Tours</Label>
            {form.video_urls.map((v, i) => (
              <div key={i} className='flex gap-2'>
                <Input placeholder='Label' value={v.label}
                  onChange={(e) => {
                    const updated = form.video_urls.map((item, idx) => idx === i ? { ...item, label: e.target.value } : item)
                    set('video_urls', updated)
                  }} className='w-36 shrink-0 rounded-md' />
                <Input type='url' placeholder='https://youtube.com/…' value={v.url}
                  onChange={(e) => {
                    const updated = form.video_urls.map((item, idx) => idx === i ? { ...item, url: e.target.value } : item)
                    set('video_urls', updated)
                  }} className='flex-1 rounded-md' />
                <Button type='button' variant='ghost' size='icon' className='h-9 w-9 shrink-0'
                  onClick={() => set('video_urls', form.video_urls.filter((_, idx) => idx !== i))}>
                  <Trash2 className='h-3.5 w-3.5 text-muted-foreground' />
                </Button>
              </div>
            ))}
            <AddButton onClick={() => set('video_urls', [...form.video_urls, { url: '', label: '' }])}>
              Add Video
            </AddButton>
          </div>
        </SectionCard>
      </LockedSection>
    </>
  )
}
