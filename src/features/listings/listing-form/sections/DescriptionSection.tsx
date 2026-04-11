'use client'
import { FileText } from 'lucide-react'
import { RichTextEditor } from '@/components/ui/rich-text-editor'
import { LockedSection } from '@/components/locked-section'
import { getCategoryGroup, getRequiredTier } from '@/lib/constants/plan-features'
import { SectionCard } from '../ui/primitives'
import { useListingFormCtx } from '../context'

export function DescriptionSection() {
  const { form, set, isRealEstate, categoryGroup, hasFeature, id } = useListingFormCtx()

  return (
    <LockedSection
      hasAccess={hasFeature(isRealEstate ? 're_full_description' : 'about_description')}
      requiredTier={getRequiredTier(categoryGroup, isRealEstate ? 're_full_description' : 'about_description') ?? 'standard'}
      feature='Description & Story'
      listingId={id}
    >
      <SectionCard
        icon={<FileText className='h-5 w-5' />}
        title='Description & Story'
        description='Rich description — use the toolbar for bold, italic, lists and headings'
      >
        <RichTextEditor value={form.description} onChange={(v) => set('description', v)} />
      </SectionCard>
    </LockedSection>
  )
}
