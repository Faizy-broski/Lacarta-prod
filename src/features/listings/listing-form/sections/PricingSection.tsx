'use client'
import { DollarSign, Trash2 } from 'lucide-react'
import { LockedSection } from '@/components/locked-section'
import { Separator } from '@/components/ui/separator'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { cn } from '@/lib/utils'
import { SectionCard, FormField, AddButton } from '../ui/primitives'
import { WeeklyHoursEditor } from '../editors/WeeklyHoursEditor'
import { RoadMapEditor } from '../editors/RoadMapEditor'
import { SimpleListEditor } from '../editors/SimpleListEditor'
import { PRICE_UNITS } from '../types'
import type { PriceTier } from '../types'
import { useListingFormCtx } from '../context'

export function PricingSection() {
  const {
    form, set, errors,
    isActivities, isBeach, isGastronomy, isHotel, isBoating,
    hasFeature, id,
  } = useListingFormCtx()

  return (
    <SectionCard
      icon={<DollarSign className='h-5 w-5' />}
      title='Pricing & Availability'
      description='Pricing, schedule and itinerary details'
    >
      <div className='grid grid-cols-1 gap-4 sm:grid-cols-3'>
        <FormField label='Start Price ($)' required error={errors.price_from}>
          <div className='relative'>
            <DollarSign className='absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground' />
            <Input type='number' placeholder='0' min={0} step={0.01} value={form.price_from}
              onChange={(e) => set('price_from', e.target.value)}
              className={cn('rounded-md pl-9', errors.price_from && 'border-destructive')} />
          </div>
        </FormField>
        <FormField label='End Price ($)'>
          <div className='relative'>
            <DollarSign className='absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground' />
            <Input type='number' placeholder='0' min={0} step={0.01} value={form.price_to}
              onChange={(e) => set('price_to', e.target.value)} className='rounded-md pl-9' />
          </div>
        </FormField>
        <FormField label='Price Unit'>
          <Select value={form.price_unit} onValueChange={(v) => set('price_unit', v)}>
            <SelectTrigger className='rounded-md'><SelectValue /></SelectTrigger>
            <SelectContent>
              {PRICE_UNITS.map((u) => (
                <SelectItem key={u} value={u} className='capitalize'>{u}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </FormField>
      </div>

      <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
        <FormField label='Price Tier' hint='Relative price level for display'>
          <div className='flex gap-3'>
            {(['$', '$$', '$$$', '$$$$'] as PriceTier[]).map((tier) => (
              <label key={tier} className='flex items-center gap-1.5 cursor-pointer'>
                <input type='radio' name='price_tier' value={tier}
                  checked={form.price_tier === tier} onChange={() => set('price_tier', tier)}
                  className='accent-amber-600' />
                <span className='text-sm font-medium'>{tier}</span>
              </label>
            ))}
          </div>
        </FormField>
      </div>

      {isActivities && (
        <>
          <Separator />
          <p className='text-xs font-semibold tracking-wide text-muted-foreground uppercase'>Activity Schedule</p>
          <div className='grid grid-cols-2 gap-4'>
            <FormField label='Start Time'>
              <Input type='time' value={form.start_time}
                onChange={(e) => set('start_time', e.target.value)} className='rounded-md' />
            </FormField>
            <FormField label='End Time'>
              <Input type='time' value={form.end_time}
                onChange={(e) => set('end_time', e.target.value)} className='rounded-md' />
            </FormField>
          </div>
        </>
      )}

      {isBeach && (
        <>
          <Separator />
          <p className='text-xs font-semibold tracking-wide text-muted-foreground uppercase'>Beach Schedule</p>
          <div className='grid grid-cols-2 gap-4'>
            <FormField label='Pickup Time'>
              <Input type='time' value={form.pickup_time}
                onChange={(e) => set('pickup_time', e.target.value)} className='rounded-md' />
            </FormField>
            <FormField label='Travel Duration'>
              <Input placeholder='e.g. 45 minutes' value={form.travel_duration}
                onChange={(e) => set('travel_duration', e.target.value)} className='rounded-md' />
            </FormField>
            <FormField label='Beach Start'>
              <Input type='time' value={form.beach_start}
                onChange={(e) => set('beach_start', e.target.value)} className='rounded-md' />
            </FormField>
            <FormField label='Beach End'>
              <Input type='time' value={form.beach_end}
                onChange={(e) => set('beach_end', e.target.value)} className='rounded-md' />
            </FormField>
          </div>
        </>
      )}

      {(isGastronomy || isHotel) && (
        <>
          <Separator />
          <p className='text-xs font-semibold tracking-wide text-muted-foreground uppercase'>Opening Hours</p>
          <LockedSection hasAccess={hasFeature('hours_status')} requiredTier='standard' feature='Hours Status' listingId={id}>
            <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
              <FormField label='Hours Status' hint='Quick display text, e.g. "Opens Today at 11:30 am"'>
                <Input placeholder='Opens Today at 11:30 am' value={form.hours_status}
                  onChange={(e) => set('hours_status', e.target.value)} className='rounded-md' />
              </FormField>
              <FormField label='Hours Note' hint='e.g. "Monday to Friday from 11:30 am to 9 pm"'>
                <Input placeholder='Monday to Friday from 11:30 am to 9 pm' value={form.hours_note}
                  onChange={(e) => set('hours_note', e.target.value)} className='rounded-md' />
              </FormField>
            </div>
          </LockedSection>
          <WeeklyHoursEditor hours={form.weekly_hours} onChange={(v) => set('weekly_hours', v)} />
        </>
      )}

      {isBoating && (
        <LockedSection hasAccess={hasFeature('boating_info')} requiredTier='standard' feature='Boating Info' listingId={id}>
          <>
            <Separator />
            <p className='text-xs font-semibold tracking-wide text-muted-foreground uppercase'>Boating Info</p>
            <div className='grid grid-cols-1 gap-4 sm:grid-cols-3'>
              <FormField label='Capacity / Type' hint='e.g. 45–90 min from marina'>
                <Input placeholder='8 people, 45–90 min from Cartagena marina'
                  value={form.boating_info.capacity_type}
                  onChange={(e) => set('boating_info', { ...form.boating_info, capacity_type: e.target.value })}
                  className='rounded-md' />
              </FormField>
              <FormField label='Season' hint='Best time to visit'>
                <Input placeholder='December to April (dry season)' value={form.boating_info.season}
                  onChange={(e) => set('boating_info', { ...form.boating_info, season: e.target.value })}
                  className='rounded-md' />
              </FormField>
              <FormField label='What to Bring'>
                <Input placeholder='Light clothing, reef-safe sunscreen, camera'
                  value={form.boating_info.what_to_bring}
                  onChange={(e) => set('boating_info', { ...form.boating_info, what_to_bring: e.target.value })}
                  className='rounded-md' />
              </FormField>
            </div>
          </>
        </LockedSection>
      )}

      {isBoating && (
        <>
          <Separator />
          <FormField label='Details Title' hint='Section heading for boat details'>
            <Input placeholder='Details Title' value={form.details_title}
              onChange={(e) => set('details_title', e.target.value)} className='rounded-md' />
          </FormField>
          <p className='text-xs font-semibold tracking-wide text-muted-foreground uppercase'>Details</p>
          <div className='space-y-2'>
            {form.boat_details.map((item, i) => (
              <div key={i} className='flex gap-2'>
                <Input placeholder='Content' value={item.content}
                  onChange={(e) => {
                    const updated = form.boat_details.map((d, idx) => idx === i ? { ...d, content: e.target.value } : d)
                    set('boat_details', updated)
                  }} className='flex-1 rounded-md' />
                <Button type='button' variant='ghost' size='icon' className='h-9 w-9 shrink-0'
                  onClick={() => set('boat_details', form.boat_details.filter((_, idx) => idx !== i))}>
                  <Trash2 className='h-3.5 w-3.5 text-muted-foreground' />
                </Button>
              </div>
            ))}
            <AddButton onClick={() => set('boat_details', [...form.boat_details, { content: '' }])}>
              Add Row
            </AddButton>
          </div>
        </>
      )}

      <Separator />
      <p className='text-xs font-semibold tracking-wide text-muted-foreground uppercase'>Road Map / Itinerary</p>
      <RoadMapEditor roadMap={form.road_map} onChange={(v) => set('road_map', v)} />

      <Separator />
      <p className='text-xs font-semibold tracking-wide text-muted-foreground uppercase'>What&apos;s Included</p>
      <SimpleListEditor
        section={form.whats_included} onChange={(v) => set('whats_included', v)}
        titlePlaceholder="What's included in this experience"
        itemPlaceholder='e.g. Transportation, Meals, Equipment'
      />

      <Separator />
      <p className='text-xs font-semibold tracking-wide text-muted-foreground uppercase'>Important Info</p>
      <SimpleListEditor
        section={form.important_info} onChange={(v) => set('important_info', v)}
        titlePlaceholder='Important information for visitors'
        itemPlaceholder='e.g. Bring sunscreen, Minimum age 12'
      />
    </SectionCard>
  )
}
