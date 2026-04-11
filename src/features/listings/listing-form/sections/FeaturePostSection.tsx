'use client'
import { Star } from 'lucide-react'
import { SectionCard, FormField } from '../ui/primitives'
import { Input } from '@/components/ui/input'
import { useListingFormCtx } from '../context'
import type { FeaturePostType } from '../types'

export function FeaturePostSection() {
  const { form, set } = useListingFormCtx()

  return (
    <SectionCard
      icon={<Star className='h-5 w-5' />}
      title='Select Feature Post'
      description='Feature this listing with a logo and display type'
    >
      <div className='space-y-4'>
        <label className='flex items-center gap-2 cursor-pointer'>
          <input
            type='checkbox'
            checked={form.is_feature}
            onChange={(e) => set('is_feature', e.target.checked)}
            className='accent-amber-600 h-4 w-4'
          />
          <span className='text-sm font-medium'>Is Feature</span>
        </label>
        <FormField label='Logo' hint='Upload a logo/icon image for the featured card'>
          <Input type='url' placeholder='https://…/logo.png' value={form.feature_logo}
            onChange={(e) => set('feature_logo', e.target.value)} className='rounded-md' />
          {form.feature_logo && (
            <img src={form.feature_logo} alt='Feature Logo'
              className='mt-2 h-16 w-16 rounded-md border object-contain' />
          )}
        </FormField>
        <FormField label='Select Types' hint='Display mode for this featured post'>
          <div className='flex gap-4'>
            {(['reserve', 'menu'] as FeaturePostType[]).map((t) => (
              <label key={t} className='flex items-center gap-1.5 cursor-pointer'>
                <input type='radio' name='feature_post_type' value={t}
                  checked={form.feature_post_type === t}
                  onChange={() => set('feature_post_type', t)}
                  className='accent-amber-600' />
                <span className='text-sm font-medium capitalize'>{t}</span>
              </label>
            ))}
          </div>
        </FormField>
      </div>
    </SectionCard>
  )
}
