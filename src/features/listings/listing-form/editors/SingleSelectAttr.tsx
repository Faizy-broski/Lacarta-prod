'use client'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import type { AttrOption } from '../types'

export function SingleSelectAttr({
  options,
  value,
  onChange,
  emptyMsg = 'Select a category first',
}: {
  options: AttrOption[]
  value?: string
  onChange: (v: string) => void
  emptyMsg?: string
}) {
  if (!options.length)
    return <p className='text-xs text-muted-foreground italic'>{emptyMsg}</p>

  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className='w-full'>
        <SelectValue placeholder='Select attribute' />
      </SelectTrigger>
      <SelectContent>
        {options.map((opt) => (
          <SelectItem key={opt.id} value={opt.name}>
            {opt.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
