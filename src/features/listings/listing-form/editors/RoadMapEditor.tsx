'use client'
import { Plus, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { AddButton } from '../ui/primitives'
import type { RoadMapDay, RoadMapItem } from '../types'

export function RoadMapEditor({
  roadMap,
  onChange,
}: {
  roadMap: RoadMapDay[]
  onChange: (v: RoadMapDay[]) => void
}) {
  const addDay = () =>
    onChange([...roadMap, { day: roadMap.length + 1, title: '', items: [] }])

  const updateDay = (i: number, field: keyof Omit<RoadMapDay, 'items'>, val: string) =>
    onChange(roadMap.map((d, idx) => (idx === i ? { ...d, [field]: val } : d)))

  const removeDay = (i: number) =>
    onChange(roadMap.filter((_, idx) => idx !== i).map((d, idx) => ({ ...d, day: idx + 1 })))

  const addItem = (di: number) =>
    onChange(roadMap.map((d, i) => i === di ? { ...d, items: [...d.items, { time: '', activity: '' }] } : d))

  const updateItem = (di: number, ii: number, field: keyof RoadMapItem, val: string) =>
    onChange(roadMap.map((d, i) =>
      i === di ? { ...d, items: d.items.map((item, j) => j === ii ? { ...item, [field]: val } : item) } : d
    ))

  const removeItem = (di: number, ii: number) =>
    onChange(roadMap.map((d, i) => i === di ? { ...d, items: d.items.filter((_, j) => j !== ii) } : d))

  return (
    <div className='space-y-3'>
      {roadMap.map((day, di) => (
        <div key={di} className='overflow-hidden rounded-md border'>
          <div className='flex items-center justify-between bg-gold/10 px-4 py-2.5'>
            <div className='flex items-center gap-3'>
              <span className='flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-b from-gold to-gold-light text-xs font-bold text-white'>
                {day.day}
              </span>
              <Input
                className='h-auto w-44 border-none bg-transparent p-0 text-sm font-medium shadow-none focus-visible:ring-0'
                placeholder={`Day ${day.day} title`}
                value={day.title}
                onChange={(e) => updateDay(di, 'title', e.target.value)}
              />
            </div>
            <Button type='button' variant='ghost' size='icon' className='h-7 w-7' onClick={() => removeDay(di)}>
              <Trash2 className='h-3.5 w-3.5 text-muted-foreground' />
            </Button>
          </div>
          <div className='space-y-2 p-3'>
            {day.items.map((item, ii) => (
              <div key={ii} className='flex items-center gap-2'>
                <Input placeholder='Time' value={item.time}
                  onChange={(e) => updateItem(di, ii, 'time', e.target.value)} className='w-28 shrink-0 rounded-md' />
                <Input placeholder='Activity' value={item.activity}
                  onChange={(e) => updateItem(di, ii, 'activity', e.target.value)} className='flex-1 rounded-md' />
                <Button type='button' variant='ghost' size='icon' className='h-8 w-8 shrink-0'
                  onClick={() => removeItem(di, ii)}>
                  <Trash2 className='h-3.5 w-3.5 text-muted-foreground' />
                </Button>
              </div>
            ))}
            <Button type='button' variant='ghost' size='sm' className='h-7 text-xs text-gold'
              onClick={() => addItem(di)}>
              <Plus className='mr-1 h-3 w-3' /> Add activity
            </Button>
          </div>
        </div>
      ))}
      <AddButton onClick={addDay}>Add Day</AddButton>
    </div>
  )
}
