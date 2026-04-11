'use client'
import { HelpCircle, Percent } from 'lucide-react'
import { LockedSection } from '@/components/locked-section'
import { getCategoryGroup, getRequiredTier } from '@/lib/constants/plan-features'
import { SectionCard } from '../ui/primitives'
import { FAQsEditor } from '../editors/FAQsEditor'
import { DealsEditor } from '../editors/DealsEditor'
import { useListingFormCtx } from '../context'

export function ContentSection() {
  const { form, set, isRealEstate, categoryGroup, hasFeature, id } = useListingFormCtx()

  return (
    <>
      <LockedSection hasAccess={hasFeature('faqs')} requiredTier='premium' feature='FAQs' listingId={id}>
        <SectionCard
          icon={<HelpCircle className='h-5 w-5' />}
          title='FAQs'
          description='Frequently asked questions about this listing'
        >
          <FAQsEditor faqs={form.faqs} onChange={(v) => set('faqs', v)} />
        </SectionCard>
      </LockedSection>

      <LockedSection
        hasAccess={hasFeature(isRealEstate ? 're_promotions' : 'deals_page')}
        requiredTier={getRequiredTier(categoryGroup, isRealEstate ? 're_promotions' : 'deals_page') ?? 'premium'}
        feature='Deals & Promotions'
        listingId={id}
      >
        <SectionCard
          icon={<Percent className='h-5 w-5' />}
          title='Deals & Promotions'
          description='Special offers and discount deals'
        >
          <DealsEditor deals={form.deals} onChange={(v) => set('deals', v)} />
        </SectionCard>
      </LockedSection>
    </>
  )
}
