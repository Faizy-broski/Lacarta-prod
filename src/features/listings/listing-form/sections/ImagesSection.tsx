'use client'
import { ImageIcon } from 'lucide-react'
import { Separator } from '@/components/ui/separator'
import { LockedSection } from '@/components/locked-section'
import { SectionCard, FormField } from '../ui/primitives'
import { PhotoUploader } from '../ui/uploaders'
import { GalleryUploader } from '../ui/uploaders'
import { useListingFormCtx } from '../context'

export function ImagesSection() {
  const { form, set, errors, categorySlug, hasFeature, id } = useListingFormCtx()

  return (
    <SectionCard
      icon={<ImageIcon className='h-5 w-5' />}
      title='Image Gallery'
      description='Featured cover photo and additional gallery images'
    >
      <FormField
        label='Featured Image'
        required
        error={errors.cover_image}
        hint={!form.category_id ? 'Select a category first to enable upload' : 'Drag & drop or click — recommended 1200×800px'}
      >
        <PhotoUploader
          currentUrl={form.cover_image}
          onUploaded={(url) => set('cover_image', url)}
          categorySlug={categorySlug}
          disabled={!form.category_id}
          error={errors.cover_image}
        />
      </FormField>

      <LockedSection hasAccess={hasFeature('gallery')} requiredTier='standard' feature='Photo Gallery' listingId={id}>
        <div>
          <Separator />
          <FormField label='Photo Gallery' hint='Add more photos — drag & drop or click, multiple files supported'>
            <GalleryUploader
              images={form.images}
              onChange={(v) => set('images', v)}
              categorySlug={categorySlug}
              disabled={!form.category_id}
            />
          </FormField>
        </div>
      </LockedSection>
    </SectionCard>
  )
}
