'use client'
import { Hash, Tag } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Input } from '@/components/ui/input'
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select'
import { SectionCard, FormField } from '../ui/primitives'
import { SingleSelectAttr } from '../editors/SingleSelectAttr'
import { useListingFormCtx } from '../context'

export function BasicInfoSection() {
  const {
    form, set, errors,
    categories, subCategories,
    selectedCategory,
    attributesByType,
    fixedCategory, prefillCategoryId,
    isEdit,
  } = useListingFormCtx()

  return (
    <SectionCard
      icon={<Tag className='h-5 w-5' />}
      title='Basic Information'
      description='Core listing details — required fields are marked *'
    >
      <FormField label='Title' required error={errors.title}>
        <Input
          placeholder='e.g. Eco Aventura Snorkeling'
          value={form.title}
          onChange={(e) => set('title', e.target.value)}
          className={cn('rounded-md', errors.title && 'border-destructive')}
        />
      </FormField>

      <FormField label='Subtitle' required error={errors.subtitle}>
        <Input
          placeholder='Short catchy tagline'
          value={form.subtitle}
          onChange={(e) => set('subtitle', e.target.value)}
          className={cn('rounded-md', errors.subtitle && 'border-destructive')}
        />
      </FormField>

      <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
        {(fixedCategory || prefillCategoryId) ? (
          <FormField label='Category' required error={errors.category_id}>
            <div className={cn(
              'flex h-9 w-full items-center justify-between rounded-md border border-input bg-muted/50 px-3 py-2 text-sm cursor-not-allowed opacity-70'
            )}>
              <span className='capitalize'>
                {selectedCategory?.name ?? fixedCategory?.replace(/_/g, ' ') ?? '…'}
              </span>
              <svg className='h-4 w-4 text-muted-foreground shrink-0' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M19 9l-7 7-7-7' />
              </svg>
            </div>
          </FormField>
        ) : (
          <FormField label='Category' required error={errors.category_id}>
            <Select
              value={form.category_id}
              onValueChange={(v) => {
                set('category_id', v)
                set('sub_category_id', '')
                set('category_tags', [])
                set('key_features', [])
                set('services', [])
                set('amenities', [])
                set('neighborhoods', [])
                set('atmosphere', [])
              }}
            >
              <SelectTrigger className={cn('rounded-md w-full', errors.category_id && 'border-destructive')}>
                <SelectValue placeholder='Select category…' />
              </SelectTrigger>
              <SelectContent>
                {categories.map((c) => (
                  <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormField>
        )}

        <FormField label='Sub-Category' required={subCategories.length > 0} error={errors.sub_category_id}>
          <Select
            value={form.sub_category_id || ''}
            onValueChange={(v) => set('sub_category_id', v)}
            disabled={!form.category_id || subCategories.length === 0}
          >
            <SelectTrigger className={cn('rounded-md w-full', errors.sub_category_id && 'border-destructive')}>
              <SelectValue
                placeholder={
                  !form.category_id ? 'Select category first'
                  : subCategories.length === 0 ? 'No sub-categories'
                  : 'Select sub-category…'
                }
              />
            </SelectTrigger>
            <SelectContent>
              {subCategories.map((s) => (
                <SelectItem key={s.id} value={s.id}>{s.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </FormField>
      </div>

      <FormField
        label='SEO Slug'
        required
        error={errors.seo_slug}
        hint='Appears in the listing URL — lowercase, hyphens only'
      >
        <div className={cn(
          'flex items-center gap-2 rounded-md border bg-background px-3 focus-within:ring-2 focus-within:ring-ring',
          errors.seo_slug && 'border-destructive'
        )}>
          <Hash className='h-4 w-4 shrink-0 text-muted-foreground' />
          <input
            placeholder='my-listing-name'
            value={form.seo_slug}
            onChange={(e) =>
              set('seo_slug', e.target.value.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''))
            }
            className='flex h-9 w-full bg-transparent py-2 text-sm outline-none placeholder:text-muted-foreground'
          />
        </div>
      </FormField>

      <FormField
        label='Neighborhood'
        required
        error={errors.neighborhoods}
        hint='Select the primary neighborhood in Cartagena'
      >
        <SingleSelectAttr
          options={attributesByType.neighborhood}
          value={form.neighborhoods[0]}
          onChange={(v) => set('neighborhoods', [v])}
          emptyMsg='No neighborhoods found — select a category first'
        />
      </FormField>
    </SectionCard>
  )
}
