'use client'
import { Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { AddButton } from '../ui/primitives'
import type { ReservationLink } from '../types'

export function ReservationLinksEditor({
  links,
  onChange,
}: {
  links: ReservationLink[]
  onChange: (v: ReservationLink[]) => void
}) {
  const add = () => links.length < 3 && onChange([...links, { platform: '', url: '' }])
  const update = (i: number, field: keyof ReservationLink, val: string) =>
    onChange(links.map((l, idx) => (idx === i ? { ...l, [field]: val } : l)))
  const remove = (i: number) => onChange(links.filter((_, idx) => idx !== i))

  return (
    <div className='space-y-3'>
      {links.map((link, i) => (
        <div key={i} className='space-y-3 rounded-md border bg-muted/30 p-4'>
          <div className='flex items-center justify-between'>
            <span className='text-xs font-medium text-muted-foreground'>Link #{i + 1}</span>
            <Button type='button' variant='ghost' size='icon' className='h-7 w-7' onClick={() => remove(i)}>
              <Trash2 className='h-3.5 w-3.5 text-muted-foreground' />
            </Button>
          </div>
          <div className='grid grid-cols-2 gap-3'>
            <Input placeholder='Platform (e.g. Booking.com)' value={link.platform}
              onChange={(e) => update(i, 'platform', e.target.value)} className='rounded-md' />
            <Input type='url' placeholder='https://booking.com/…' value={link.url}
              onChange={(e) => update(i, 'url', e.target.value)} className='rounded-md' />
          </div>
        </div>
      ))}
      {links.length < 3 ? (
        <AddButton onClick={add}>Add Reservation Link</AddButton>
      ) : (
        <p className='text-center text-xs text-muted-foreground'>Maximum 3 reservation links reached</p>
      )}
    </div>
  )
}
