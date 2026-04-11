'use client'
import { Sparkles, Trash2 } from 'lucide-react'
import { Separator } from '@/components/ui/separator'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { LockedSection } from '@/components/locked-section'
import { getCategoryGroup, getRequiredTier } from '@/lib/constants/plan-features'
import { SectionCard, FormField, AddButton } from '../ui/primitives'
import { SubCategoryTagSelect } from '../editors/SubCategoryTagSelect'
import { MultiSelectAttr } from '../editors/MultiSelectAttr'
import { useListingFormCtx } from '../context'

export function CategorizationSection() {
  const {
    form, set, errors,
    listingTypes, attributesByType,
    isHotel, isRealEstate,
    categoryGroup,
    hasFeature, id,
  } = useListingFormCtx()

  return (
    <SectionCard
      icon={<Sparkles className='h-5 w-5' />}
      title='Amenities & Features'
      description='Type tags and attributes loaded from the selected category'
    >
      <FormField
        label='Type'
        required={listingTypes.length > 0}
        error={errors.category_tags}
        hint='Select the types that apply to this listing — these appear as filter pills on the public website'
      >
        <SubCategoryTagSelect
          subCategories={listingTypes}
          values={form.category_tags}
          onChange={(v) => set('category_tags', v)}
        />
      </FormField>

      <LockedSection
        hasAccess={hasFeature(isRealEstate ? 're_feature_tags' : 'services_amenities')}
        requiredTier={getRequiredTier(categoryGroup, isRealEstate ? 're_feature_tags' : 'services_amenities') ?? 'standard'}
        feature='Services & Amenities'
        listingId={id}
      >
        <>
          {attributesByType.key_feature.length > 0 && (
            <>
              <Separator />
              <FormField label='Feature Title' hint='Section heading for key features'>
                <Input placeholder='Feature Title' value={form.feature_title}
                  onChange={(e) => set('feature_title', e.target.value)} className='rounded-md' />
              </FormField>
              <FormField label='Key Features'>
                <MultiSelectAttr options={attributesByType.key_feature} values={form.key_features}
                  onChange={(v) => set('key_features', v)} />
              </FormField>
            </>
          )}
          {attributesByType.service.length > 0 && (
            <>
              <Separator />
              <FormField label='Service Title' hint='Section heading for services'>
                <Input placeholder='Service Title' value={form.service_title}
                  onChange={(e) => set('service_title', e.target.value)} className='rounded-md' />
              </FormField>
              <FormField label='Services'>
                <MultiSelectAttr options={attributesByType.service} values={form.services}
                  onChange={(v) => set('services', v)} />
              </FormField>
            </>
          )}
          {attributesByType.amenity.length > 0 && (
            <>
              <Separator />
              <FormField label='Amenities Title' hint='Section heading for amenities'>
                <Input placeholder='Amenities Title' value={form.amenities_title}
                  onChange={(e) => set('amenities_title', e.target.value)} className='rounded-md' />
              </FormField>
              <FormField label='Amenities'>
                <MultiSelectAttr options={attributesByType.amenity} values={form.amenities}
                  onChange={(v) => set('amenities', v)} />
              </FormField>
            </>
          )}
          {attributesByType.atmosphere.length > 0 && (
            <>
              <Separator />
              <FormField label='Atmosphere'>
                <MultiSelectAttr options={attributesByType.atmosphere} values={form.atmosphere}
                  onChange={(v) => set('atmosphere', v)} />
              </FormField>
            </>
          )}
        </>
      </LockedSection>

      {isHotel && (
        <>
          <Separator />
          <FormField label='Title' hint='Section heading for room types'>
            <Input placeholder='e.g. Room Types' value={form.room_types_title}
              onChange={(e) => set('room_types_title', e.target.value)} className='rounded-md' />
          </FormField>
          <p className='text-xs font-semibold tracking-wide text-muted-foreground uppercase'>Types</p>
          <div className='space-y-2'>
            {form.room_types.map((rt, i) => (
              <div key={i} className='flex gap-2'>
                <Input placeholder='Room Type' value={rt.room_type}
                  onChange={(e) => {
                    const updated = form.room_types.map((r, idx) => idx === i ? { ...r, room_type: e.target.value } : r)
                    set('room_types', updated)
                  }} className='flex-1 rounded-md' />
                <Input placeholder='Room Type Option' value={rt.option}
                  onChange={(e) => {
                    const updated = form.room_types.map((r, idx) => idx === i ? { ...r, option: e.target.value } : r)
                    set('room_types', updated)
                  }} className='flex-1 rounded-md' />
                <Button type='button' variant='ghost' size='icon' className='h-9 w-9 shrink-0'
                  onClick={() => set('room_types', form.room_types.filter((_, idx) => idx !== i))}>
                  <Trash2 className='h-3.5 w-3.5 text-muted-foreground' />
                </Button>
              </div>
            ))}
            <AddButton onClick={() => set('room_types', [...form.room_types, { room_type: '', option: '' }])}>
              Add Room Type
            </AddButton>
          </div>
        </>
      )}
    </SectionCard>
  )
}
