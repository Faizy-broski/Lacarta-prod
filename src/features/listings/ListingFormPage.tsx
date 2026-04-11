'use client'
import { ArrowLeft, Loader2, Save } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ListingFormContext } from './listing-form/context'
import { useFormState } from './listing-form/useFormState'
import { BasicInfoSection } from './listing-form/sections/BasicInfoSection'
import { DescriptionSection } from './listing-form/sections/DescriptionSection'
import { ImagesSection } from './listing-form/sections/ImagesSection'
import { CategorizationSection } from './listing-form/sections/CategorizationSection'
import { SocialSection } from './listing-form/sections/SocialSection'
import { ContactSection } from './listing-form/sections/ContactSection'
import { LocationSection } from './listing-form/sections/LocationSection'
import { PricingSection } from './listing-form/sections/PricingSection'
import { TravelTipsSection } from './listing-form/sections/TravelTipsSection'
import { RealEstateSection } from './listing-form/sections/RealEstateSection'
import { ContentSection } from './listing-form/sections/ContentSection'
import { FeaturePostSection } from './listing-form/sections/FeaturePostSection'
import { GastronomySection } from './listing-form/sections/GastronomySection'
import { BookingSection } from './listing-form/sections/BookingSection'

// ─── ListingFormPage ──────────────────────────────────────────────────────────

export function ListingFormPage({ fixedCategory }: { fixedCategory?: string } = {}) {
  const state = useFormState(fixedCategory)
  const {
    loading, saving, errors,
    isEdit,
    handleSave,
    router,
  } = state

  if (loading) {
    return (
      <>
        <Header />
        <Main>
          <div className='flex h-96 items-center justify-center'>
            <Loader2 className='h-8 w-8 animate-spin text-amber-500' />
          </div>
        </Main>
      </>
    )
  }

  return (
    <ListingFormContext.Provider value={state}>
      <Header />
      <Main>
        {/* ── Sticky action bar ── */}
        <div className='sticky top-0 z-10 -mx-2 -mt-6 mb-6 bg-background/95 px-2 py-3 backdrop-blur supports-backdrop-filter:bg-background/60 sm:px-2'>
          <div className='flex flex-col items-center justify-between gap-2 sm:flex-row'>
            <div className='flex min-w-0 items-center gap-2 self-start'>
              <Button variant='ghost' size='icon' className='shrink-0 rounded-md' onClick={() => router.back()}>
                <ArrowLeft className='h-4 w-4' />
              </Button>
              <div className='min-w-0'>
                <h1 className='font-antigua truncate text-base font-bold sm:text-xl'>
                  {isEdit ? 'Edit Listing' : 'Create Listing'}
                </h1>
                <p className='hidden text-xs text-muted-foreground sm:block'>
                  {isEdit ? 'Update listing details' : 'Fill in all required fields (*)'}
                </p>
              </div>
            </div>
            <div className='flex shrink-0 items-center gap-2 self-end'>
              <Button variant='outline' size='sm' className='rounded-md' onClick={() => router.back()}>
                Cancel
              </Button>
              <Button
                size='sm'
                onClick={handleSave}
                disabled={saving}
                className='rounded-md bg-linear-to-r from-[#C9A84C] to-[#E8C96A] text-white hover:opacity-90'
              >
                {saving ? <Loader2 className='mr-1.5 h-3.5 w-3.5 animate-spin' /> : <Save className='mr-1.5 h-3.5 w-3.5' />}
                {saving ? 'Saving...' : isEdit ? 'Save Changes' : 'Create Listing'}
              </Button>
            </div>
          </div>
        </div>

        {/* ── Form sections ── */}
        <div className='mx-auto space-y-6'>
          {errors.user_id && (
            <div className='rounded-md border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive'>
              {errors.user_id}
            </div>
          )}

          <BasicInfoSection />
          <DescriptionSection />
          <ImagesSection />
          <RealEstateSection />
          <CategorizationSection />
          <SocialSection />
          <BookingSection />
          <ContactSection />
          <LocationSection />
          <PricingSection />
          <TravelTipsSection />
          <ContentSection />
          <FeaturePostSection />
          <GastronomySection />
        </div>
      </Main>
    </ListingFormContext.Provider>
  )
}

export default ListingFormPage
