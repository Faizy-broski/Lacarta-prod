'use client'
import { Plus, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'
import { cn } from '@/lib/utils'
import { DAYS } from '../types'
import type { WeeklyHours, WeeklySlot } from '../types'

export function WeeklyHoursEditor({
  hours,
  onChange,
}: {
  hours: WeeklyHours
  onChange: (v: WeeklyHours) => void
}) {
  const normalizedHours: WeeklyHours = DAYS.reduce((acc, day) => {
    acc[day] = hours[day] ?? { open: false, slots: [{ start: '', end: '' }] }
    return acc
  }, {} as WeeklyHours)

  const toggleDay = (day: string) =>
    onChange({ ...hours, [day]: { ...normalizedHours[day], open: !normalizedHours[day].open } })

  const updateSlot = (day: string, si: number, field: keyof WeeklySlot, val: string) => {
    const dayData = normalizedHours[day]
    const slots = dayData.slots.map((s, i) => i === si ? { ...s, [field]: val } : s)
    onChange({ ...hours, [day]: { ...dayData, slots } })
  }

  const addSlot = (day: string) => {
    const dayData = normalizedHours[day]
    if (dayData.slots.length >= 2) return
    onChange({ ...hours, [day]: { ...dayData, slots: [...dayData.slots, { start: '', end: '' }] } })
  }

  const removeSlot = (day: string, si: number) => {
    const dayData = normalizedHours[day]
    const slots = dayData.slots.filter((_, i) => i !== si)
    onChange({ ...hours, [day]: { ...dayData, slots } })
  }

  return (
    <div className='space-y-2'>
      {DAYS.map((day) => (
        <div key={day} className='rounded-md border p-3'>
          <div className='flex items-center justify-between'>
            <div className='flex items-center gap-3'>
              <Switch checked={normalizedHours[day].open} onCheckedChange={() => toggleDay(day)} />
              <span className='text-sm font-medium capitalize'>{day}</span>
            </div>
            <span className={cn('text-xs', normalizedHours[day].open ? 'text-green-600' : 'text-muted-foreground')}>
              {normalizedHours[day].open ? 'Open' : 'Closed'}
            </span>
          </div>
          {normalizedHours[day].open && (
            <div className='mt-3 space-y-2'>
              {normalizedHours[day].slots.map((slot, si) => (
                <div key={si} className='flex items-center gap-2'>
                  <Input type='time' value={slot.start}
                    onChange={(e) => updateSlot(day, si, 'start', e.target.value)} className='rounded-md' />
                  <span className='text-xs text-muted-foreground'>–</span>
                  <Input type='time' value={slot.end}
                    onChange={(e) => updateSlot(day, si, 'end', e.target.value)} className='rounded-md' />
                  {normalizedHours[day].slots.length > 1 && (
                    <Button type='button' variant='ghost' size='icon' className='h-8 w-8 shrink-0'
                      onClick={() => removeSlot(day, si)}>
                      <Trash2 className='h-3.5 w-3.5 text-muted-foreground' />
                    </Button>
                  )}
                </div>
              ))}
              {normalizedHours[day].slots.length < 2 && (
                <Button type='button' variant='ghost' size='sm' className='h-7 text-xs text-amber-600'
                  onClick={() => addSlot(day)}>
                  <Plus className='mr-1 h-3 w-3' /> Add time slot
                </Button>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
