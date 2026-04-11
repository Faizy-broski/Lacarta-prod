'use client'
import { Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { AddButton } from '../ui/primitives'
import type { TravelTip } from '../types'

export function TravelTipsEditor({
  tips,
  onChange,
}: {
  tips: TravelTip[]
  onChange: (v: TravelTip[]) => void
}) {
  const add = () => onChange([...tips, { title: '', subtitle: '' }])
  const update = (i: number, field: keyof TravelTip, val: string) =>
    onChange(tips.map((t, idx) => (idx === i ? { ...t, [field]: val } : t)))
  const remove = (i: number) => onChange(tips.filter((_, idx) => idx !== i))

  return (
    <div className='space-y-3'>
      {tips.map((tip, i) => (
        <div key={i} className='flex items-start gap-3 rounded-md border bg-muted/30 p-3'>
          <div className='flex flex-1 gap-2'>
            <Input placeholder='Tip title' value={tip.title}
              onChange={(e) => update(i, 'title', e.target.value)} className='rounded-md' />
            <Input placeholder='Details' value={tip.subtitle}
              onChange={(e) => update(i, 'subtitle', e.target.value)} className='rounded-md' />
          </div>
          <Button type='button' variant='ghost' size='icon' className='mt-0.5 h-8 w-8 shrink-0' onClick={() => remove(i)}>
            <Trash2 className='h-3.5 w-3.5 text-muted-foreground' />
          </Button>
        </div>
      ))}
      <AddButton onClick={add}>Add Travel Tip</AddButton>
    </div>
  )
}
