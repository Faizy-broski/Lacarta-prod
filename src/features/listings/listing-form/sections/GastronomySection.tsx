'use client'
import { ExternalLink, Globe, Trash2, UtensilsCrossed } from 'lucide-react'
import { LockedSection } from '@/components/locked-section'
import { Separator } from '@/components/ui/separator'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { SectionCard, FormField, AddButton } from '../ui/primitives'
import { MenuEditor } from '../editors/MenuEditor'
import { useListingFormCtx } from '../context'

export function GastronomySection() {
  const { form, set, isGastronomy, isActivities, hasFeature, id } = useListingFormCtx()

  if (!isGastronomy && !isActivities) return null

  return (
    <>
      {/* Menu — Gastronomy only */}
      {isGastronomy && (
        <LockedSection hasAccess={hasFeature('menu')} requiredTier='standard' feature='Menu' listingId={id}>
          <SectionCard
            icon={<UtensilsCrossed className='h-5 w-5' />}
            title='Menu'
            description='Menu items, PDF file and QR code'
          >
            <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
              <FormField label='Menu Button Title' hint='Label shown on the menu CTA button'>
                <Input placeholder='Menu' value={form.menu_button_title}
                  onChange={(e) => set('menu_button_title', e.target.value)} className='rounded-md' />
              </FormField>
              <FormField label='Menu QR Code URL' hint='URL embedded in the QR code'>
                <Input type='url' placeholder='https://…/menu' value={form.menu_qr_code}
                  onChange={(e) => set('menu_qr_code', e.target.value)} className='rounded-md' />
              </FormField>
            </div>
            <LockedSection hasAccess={hasFeature('menu_file')} requiredTier='standard' feature='Menu File' listingId={id}>
              <FormField label='Menu File URL' hint='Direct link to PDF menu file'>
                <Input type='url' placeholder='https://…/menu.pdf' value={form.menu_file_url}
                  onChange={(e) => set('menu_file_url', e.target.value)} className='rounded-md' />
              </FormField>
            </LockedSection>
            <Separator />
            <MenuEditor items={form.menu_items} onChange={(v) => set('menu_items', v)} />
          </SectionCard>
        </LockedSection>
      )}

      {/* Also Available On */}
      <LockedSection hasAccess={hasFeature('also_available_on')} requiredTier='premium' feature='Also Available On' listingId={id}>
        <SectionCard
          icon={<ExternalLink className='h-5 w-5' />}
          title='Also Available On'
          description={isGastronomy
            ? 'Delivery & ordering platforms (Rappi, Takeout, Gift Card, etc.)'
            : 'Booking platforms (GetYourGuide, Viator, Book Direct, etc.)'}
        >
          <div className='space-y-2'>
            {form.also_available_on.map((item, i) => (
              <div key={i} className='flex gap-2'>
                <Input placeholder='Platform name' value={item.name}
                  onChange={(e) => {
                    const updated = form.also_available_on.map((a, idx) => idx === i ? { ...a, name: e.target.value } : a)
                    set('also_available_on', updated)
                  }} className='w-40 shrink-0 rounded-md' />
                <Input type='url' placeholder='https://…' value={item.url}
                  onChange={(e) => {
                    const updated = form.also_available_on.map((a, idx) => idx === i ? { ...a, url: e.target.value } : a)
                    set('also_available_on', updated)
                  }} className='flex-1 rounded-md' />
                <Button type='button' variant='ghost' size='icon' className='h-9 w-9 shrink-0'
                  onClick={() => set('also_available_on', form.also_available_on.filter((_, idx) => idx !== i))}>
                  <Trash2 className='h-3.5 w-3.5 text-muted-foreground' />
                </Button>
              </div>
            ))}
            <AddButton onClick={() => set('also_available_on', [...form.also_available_on, { name: '', url: '' }])}>
              Add Platform
            </AddButton>
          </div>
        </SectionCard>
      </LockedSection>

      {/* Featured In — Gastronomy only */}
      {isGastronomy && (
        <LockedSection hasAccess={hasFeature('featured_in')} requiredTier='premium' feature='Featured In' listingId={id}>
          <SectionCard
            icon={<Globe className='h-5 w-5' />}
            title='Featured In'
            description='Press coverage, YouTube features, and media mentions'
          >
            <div className='space-y-2'>
              {form.featured_in.map((item, i) => (
                <div key={i} className='flex gap-2'>
                  <Input placeholder='Publication / channel name' value={item.name}
                    onChange={(e) => {
                      const updated = form.featured_in.map((a, idx) => idx === i ? { ...a, name: e.target.value } : a)
                      set('featured_in', updated)
                    }} className='w-48 shrink-0 rounded-md' />
                  <Input type='url' placeholder='https://…' value={item.url}
                    onChange={(e) => {
                      const updated = form.featured_in.map((a, idx) => idx === i ? { ...a, url: e.target.value } : a)
                      set('featured_in', updated)
                    }} className='flex-1 rounded-md' />
                  <Button type='button' variant='ghost' size='icon' className='h-9 w-9 shrink-0'
                    onClick={() => set('featured_in', form.featured_in.filter((_, idx) => idx !== i))}>
                    <Trash2 className='h-3.5 w-3.5 text-muted-foreground' />
                  </Button>
                </div>
              ))}
              <AddButton onClick={() => set('featured_in', [...form.featured_in, { name: '', url: '' }])}>
                Add Media Feature
              </AddButton>
            </div>
          </SectionCard>
        </LockedSection>
      )}
    </>
  )
}
