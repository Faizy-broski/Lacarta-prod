'use client'
import { Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { Textarea } from '@/components/ui/textarea'
import { AddButton } from '../ui/primitives'
import { EMPTY_DEAL } from '../types'
import type { Deal, DealType } from '../types'

export function DealsEditor({ deals, onChange }: { deals: Deal[]; onChange: (v: Deal[]) => void }) {
  const add = () => onChange([...deals, { ...EMPTY_DEAL }])
  const update = <K extends keyof Deal>(i: number, field: K, val: Deal[K]) =>
    onChange(deals.map((d, idx) => (idx === i ? { ...d, [field]: val } : d)))
  const remove = (i: number) => onChange(deals.filter((_, idx) => idx !== i))

  return (
    <div className='space-y-4'>
      {deals.map((deal, i) => (
        <div key={i} className='space-y-4 rounded-md border bg-muted/30 p-4'>
          <div className='flex items-center justify-between'>
            <span className='text-xs font-medium text-muted-foreground'>Deal #{i + 1}</span>
            <Button type='button' variant='ghost' size='icon' className='h-7 w-7' onClick={() => remove(i)}>
              <Trash2 className='h-3.5 w-3.5 text-muted-foreground' />
            </Button>
          </div>

          <div className='grid grid-cols-1 gap-3 sm:grid-cols-2'>
            <Input placeholder='Title' value={deal.title} onChange={(e) => update(i, 'title', e.target.value)} className='rounded-md' />
            <Input placeholder='Subtitle' value={deal.subtitle} onChange={(e) => update(i, 'subtitle', e.target.value)} className='rounded-md' />
          </div>

          <div className='flex items-center gap-6'>
            <span className='text-xs text-muted-foreground'>Deal Type</span>
            {(['discount', 'package', 'promotion'] as DealType[]).map((t) => (
              <label key={t} className='flex cursor-pointer items-center gap-1.5 text-xs capitalize'>
                <input type='radio' name={`deal-type-${i}`} value={t} checked={deal.deal_type === t}
                  onChange={() => update(i, 'deal_type', t)} className='accent-[#CF9921]' />
                {t}
              </label>
            ))}
          </div>

          <Textarea placeholder='Deal description…' value={deal.description}
            onChange={(e) => update(i, 'description', e.target.value)} className='rounded-md' rows={3} />

          <div className='grid grid-cols-2 gap-3 sm:grid-cols-4'>
            <div>
              <Label className='mb-1 block text-xs'>Start Date</Label>
              <Input type='date' value={deal.start_date} onChange={(e) => update(i, 'start_date', e.target.value)} className='rounded-md' />
            </div>
            <div>
              <Label className='mb-1 block text-xs'>End Date</Label>
              <Input type='date' value={deal.end_date} onChange={(e) => update(i, 'end_date', e.target.value)} className='rounded-md' />
            </div>
            <Input placeholder='Discount (e.g. 20% or 50,000 COP)' value={deal.discount}
              onChange={(e) => update(i, 'discount', e.target.value)} className='rounded-md' />
            <Input placeholder='Coupon Code' value={deal.coupon_code}
              onChange={(e) => update(i, 'coupon_code', e.target.value)} className='rounded-md' />
          </div>

          <div className='grid grid-cols-1 gap-3 sm:grid-cols-2'>
            <div>
              <Label className='mb-1 block text-xs'>Deal Image URL</Label>
              <Input type='url' placeholder='https://…/deal-image.jpg' value={deal.image}
                onChange={(e) => update(i, 'image', e.target.value)} className='rounded-md' />
            </div>
            <div>
              <Label className='mb-1 block text-xs'>Button Link</Label>
              <Input type='url' placeholder='https://…/book' value={deal.button_link}
                onChange={(e) => update(i, 'button_link', e.target.value)} className='rounded-md' />
            </div>
          </div>

          <Separator />

          <div>
            <Label className='mb-2 block text-xs font-medium'>Offers</Label>
            <Input placeholder='Offers title' value={deal.offers_title}
              onChange={(e) => update(i, 'offers_title', e.target.value)} className='mb-2 rounded-md' />
            <Textarea placeholder='Offers description…' value={deal.offers_description}
              onChange={(e) => update(i, 'offers_description', e.target.value)} className='rounded-md' rows={3} />
          </div>

          <div>
            <Label className='mb-2 block text-xs font-medium'>Experience Included</Label>
            <Input placeholder='Experience title' value={deal.experience_title}
              onChange={(e) => update(i, 'experience_title', e.target.value)} className='mb-2 rounded-md' />
            <div className='space-y-2'>
              {(deal.experience_included ?? []).map((exp, ei) => (
                <div key={ei} className='flex gap-2'>
                  <Input placeholder='Image URL' value={exp.image}
                    onChange={(e) => {
                      const updated = (deal.experience_included ?? []).map((x, xi) => xi === ei ? { ...x, image: e.target.value } : x)
                      update(i, 'experience_included', updated)
                    }} className='flex-1 rounded-md' />
                  <Input placeholder='Title' value={exp.title}
                    onChange={(e) => {
                      const updated = (deal.experience_included ?? []).map((x, xi) => xi === ei ? { ...x, title: e.target.value } : x)
                      update(i, 'experience_included', updated)
                    }} className='flex-1 rounded-md' />
                  <Input type='url' placeholder='URL' value={exp.url}
                    onChange={(e) => {
                      const updated = (deal.experience_included ?? []).map((x, xi) => xi === ei ? { ...x, url: e.target.value } : x)
                      update(i, 'experience_included', updated)
                    }} className='flex-1 rounded-md' />
                  <Button type='button' variant='ghost' size='icon' className='h-9 w-9 shrink-0'
                    onClick={() => update(i, 'experience_included', (deal.experience_included ?? []).filter((_, xi) => xi !== ei))}>
                    <Trash2 className='h-3.5 w-3.5 text-muted-foreground' />
                  </Button>
                </div>
              ))}
              <AddButton onClick={() => update(i, 'experience_included', [...(deal.experience_included ?? []), { image: '', title: '', url: '' }])}>
                Add Experience Item
              </AddButton>
            </div>
          </div>
        </div>
      ))}
      <AddButton onClick={add}>Add Deal</AddButton>
    </div>
  )
}
