'use client'
import { Checkbox } from '@/components/ui/checkbox'
import type { AttrOption } from '../types'

export function MultiSelectAttr({
  options,
  values,
  onChange,
  emptyMsg = 'Select a category first',
}: {
  options: AttrOption[]
  values: string[]
  onChange: (v: string[]) => void
  emptyMsg?: string
}) {
  if (!options.length)
    return <p className='text-xs text-muted-foreground italic'>{emptyMsg}</p>

  const toggle = (name: string) =>
    onChange(values.includes(name) ? values.filter((v) => v !== name) : [...values, name])

  return (
    <div className='grid grid-cols-2 gap-2 sm:grid-cols-3'>
      {options.map((opt) => (
        <label
          key={opt.id}
          className='flex cursor-pointer items-center gap-2 rounded-md border px-3 py-2 text-sm transition-colors hover:bg-muted/40 has-checked:border-amber-400 has-checked:bg-amber-50'
        >
          <Checkbox
            checked={values.includes(opt.name)}
            onCheckedChange={() => toggle(opt.name)}
            className='shrink-0'
          />
          <span className='leading-tight'>{opt.name}</span>
        </label>
      ))}
    </div>
  )
}
