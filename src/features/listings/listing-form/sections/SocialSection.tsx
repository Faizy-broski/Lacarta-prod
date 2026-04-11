'use client'
import { Globe, Share2, Trash2 } from 'lucide-react'
import { LockedSection } from '@/components/locked-section'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { SectionCard, FormField, AddButton, IconInput } from '../ui/primitives'
import { useListingFormCtx } from '../context'

export function SocialSection() {
  const { form, set, errors, hasFeature, id } = useListingFormCtx()

  return (
    <LockedSection hasAccess={hasFeature('social_handles')} requiredTier='premium' feature='Social Media Handles' listingId={id}>
      <SectionCard
        icon={<Share2 className='h-5 w-5' />}
        title='Social Media Handles'
        description='Your business Facebook, Instagram and other social links'
      >
        {errors.social && (
          <div className='rounded-md border border-destructive/30 bg-destructive/10 px-3 py-2 text-xs text-destructive'>
            {errors.social}
          </div>
        )}
        <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
          <FormField label='Facebook' required error={errors.facebook}>
            <IconInput icon={Globe} type='url' placeholder='https://facebook.com/…' value={form.facebook}
              onChange={(e) => set('facebook', e.target.value)}
              className={errors.facebook ? 'border-destructive' : ''} />
          </FormField>
          <FormField label='Instagram' required error={errors.instagram}>
            <IconInput icon={Globe} type='url' placeholder='https://instagram.com/…' value={form.instagram}
              onChange={(e) => set('instagram', e.target.value)}
              className={errors.instagram ? 'border-destructive' : ''} />
          </FormField>
        </div>
        <div className='space-y-2'>
          <label className='text-sm font-medium'>Additional Social Links</label>
          {form.extra_social_links.map((link, i) => (
            <div key={i} className='flex gap-2'>
              <Input placeholder='Platform' value={link.platform}
                onChange={(e) => {
                  const updated = form.extra_social_links.map((l, idx) => idx === i ? { ...l, platform: e.target.value } : l)
                  set('extra_social_links', updated)
                }} className='w-32 shrink-0 rounded-md' />
              <Input type='url' placeholder='https://…' value={link.url}
                onChange={(e) => {
                  const updated = form.extra_social_links.map((l, idx) => idx === i ? { ...l, url: e.target.value } : l)
                  set('extra_social_links', updated)
                }} className='flex-1 rounded-md' />
              <Button type='button' variant='ghost' size='icon' className='h-9 w-9 shrink-0'
                onClick={() => set('extra_social_links', form.extra_social_links.filter((_, idx) => idx !== i))}>
                <Trash2 className='h-3.5 w-3.5 text-muted-foreground' />
              </Button>
            </div>
          ))}
          <AddButton onClick={() => set('extra_social_links', [...form.extra_social_links, { platform: '', url: '' }])}>
            Add Social Link
          </AddButton>
        </div>
      </SectionCard>
    </LockedSection>
  )
}
