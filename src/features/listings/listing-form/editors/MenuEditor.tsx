'use client'
import { DollarSign, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { AddButton } from '../ui/primitives'
import type { MenuItem } from '../types'

export function MenuEditor({
  items,
  onChange,
}: {
  items: MenuItem[]
  onChange: (v: MenuItem[]) => void
}) {
  const add = () => onChange([...items, { name: '', description: '', price: '' }])
  const update = (i: number, field: keyof MenuItem, val: string) =>
    onChange(items.map((item, idx) => (idx === i ? { ...item, [field]: val } : item)))
  const remove = (i: number) => onChange(items.filter((_, idx) => idx !== i))

  return (
    <div className='space-y-3'>
      {items.map((item, i) => (
        <div key={i} className='space-y-3 rounded-md border bg-muted/30 p-4'>
          <div className='flex items-center justify-between'>
            <span className='text-xs font-medium text-muted-foreground'>Item #{i + 1}</span>
            <Button type='button' variant='ghost' size='icon' className='h-7 w-7' onClick={() => remove(i)}>
              <Trash2 className='h-3.5 w-3.5 text-muted-foreground' />
            </Button>
          </div>
          <div className='grid grid-cols-2 gap-3'>
            <Input placeholder='Item name' value={item.name}
              onChange={(e) => update(i, 'name', e.target.value)} className='rounded-md' />
            <div className='relative'>
              <DollarSign className='absolute top-1/2 left-3 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground' />
              <Input type='number' min={0} placeholder='Price' value={item.price}
                onChange={(e) => update(i, 'price', e.target.value)} className='rounded-md pl-8' />
            </div>
          </div>
          <Textarea placeholder='Description' rows={2} value={item.description}
            onChange={(e) => update(i, 'description', e.target.value)} className='resize-none rounded-md' />
        </div>
      ))}
      <AddButton onClick={add}>Add Menu Item</AddButton>
    </div>
  )
}
