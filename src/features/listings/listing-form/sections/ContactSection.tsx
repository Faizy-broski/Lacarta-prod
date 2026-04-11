'use client'
import { Globe, Mail, Phone } from 'lucide-react'
import { LockedSection } from '@/components/locked-section'
import { SectionCard, FormField, IconInput } from '../ui/primitives'
import { useListingFormCtx } from '../context'

export function ContactSection() {
  const { form, set, errors, hasFeature, id } = useListingFormCtx()

  return (
    <LockedSection hasAccess={hasFeature('company_contact')} requiredTier='premium' feature='Contact Information' listingId={id}>
      <SectionCard
        icon={<Phone className='h-5 w-5' />}
        title='Contact Information'
        description='Company contact details shown on your listing page'
      >
        <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
          <FormField label='Email' error={errors.email}>
            <IconInput icon={Mail} type='email' placeholder='info@example.com' value={form.email}
              onChange={(e) => set('email', e.target.value)} />
          </FormField>
          <FormField label='Phone'>
            <IconInput icon={Phone} type='tel' placeholder='+57 300 000 0000' value={form.phone}
              onChange={(e) => set('phone', e.target.value)} />
          </FormField>
          <FormField label='Website' error={errors.website}>
            <IconInput icon={Globe} type='url' placeholder='https://example.com' value={form.website}
              onChange={(e) => set('website', e.target.value)}
              className={errors.website ? 'border-destructive' : ''} />
          </FormField>
          <FormField label='WhatsApp'>
            <IconInput icon={Phone} type='tel' placeholder='+57 300 000 0000' value={form.whatsapp}
              onChange={(e) => set('whatsapp', e.target.value)} />
          </FormField>
        </div>
      </SectionCard>
    </LockedSection>
  )
}
