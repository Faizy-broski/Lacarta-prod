'use client'
import { Lightbulb } from 'lucide-react'
import { LockedSection } from '@/components/locked-section'
import { SectionCard } from '../ui/primitives'
import { TravelTipsEditor } from '../editors/TravelTipsEditor'
import { useListingFormCtx } from '../context'

export function TravelTipsSection() {
  const { form, set, isActivities, isBeach, hasFeature, id } = useListingFormCtx()

  if (!isActivities && !isBeach) return null

  return (
    <LockedSection hasAccess={hasFeature('travel_tips')} requiredTier='standard' feature='Travel Tips & Booking Info' listingId={id}>
      <SectionCard
        icon={<Lightbulb className='h-5 w-5' />}
        title='Travel Tips & Booking Info'
        description='Helpful tips and information for visitors'
      >
        <TravelTipsEditor tips={form.travel_tips} onChange={(v) => set('travel_tips', v)} />
      </SectionCard>
    </LockedSection>
  )
}
