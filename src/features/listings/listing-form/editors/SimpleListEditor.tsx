'use client'
import { Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { AddButton, FormField } from '../ui/primitives'
import type { WhatsIncludedSection, ImportantInfoSection } from '../types'

export function SimpleListEditor({
  section,
  onChange,
  titlePlaceholder,
  itemPlaceholder,
}: {
  section: WhatsIncludedSection | ImportantInfoSection
  onChange: (v: WhatsIncludedSection | ImportantInfoSection) => void
  titlePlaceholder: string
  itemPlaceholder: string
}) {
  const addItem = () => onChange({ ...section, items: [...section.items, ''] })
  const updateItem = (i: number, val: string) =>
    onChange({ ...section, items: section.items.map((it, idx) => (idx === i ? val : it)) })
  const removeItem = (i: number) =>
    onChange({ ...section, items: section.items.filter((_, idx) => idx !== i) })

  return (
    <div className='space-y-3'>
      <FormField label='Section Title'>
        <Input
          placeholder={titlePlaceholder}
          value={section.title}
          onChange={(e) => onChange({ ...section, title: e.target.value })}
          className='rounded-md'
        />
      </FormField>
      <div className='space-y-2'>
        {section.items.map((item, i) => (
          <div key={i} className='flex items-center gap-2'>
            <span className='flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gold/20 text-xs font-bold text-gold'>
              {i + 1}
            </span>
            <Input
              placeholder={itemPlaceholder}
              value={item}
              onChange={(e) => updateItem(i, e.target.value)}
              className='flex-1 rounded-md'
            />
            <Button type='button' variant='ghost' size='icon' className='h-8 w-8 shrink-0' onClick={() => removeItem(i)}>
              <Trash2 className='h-3.5 w-3.5 text-muted-foreground' />
            </Button>
          </div>
        ))}
        <AddButton onClick={addItem}>Add Item</AddButton>
      </div>
    </div>
  )
}
