'use client'
import { cn } from '@/lib/utils'
import type { SubCategory } from '../types'

export function SubCategoryTagSelect({
  subCategories,
  values,
  onChange,
}: {
  subCategories: SubCategory[]
  values: string[]
  onChange: (v: string[]) => void
}) {
  if (!subCategories.length)
    return (
      <p className='text-xs text-muted-foreground italic'>
        Select a category to see available tags
      </p>
    )

  const toggle = (name: string) =>
    onChange(values.includes(name) ? values.filter((v) => v !== name) : [...values, name])

  return (
    <div className='space-y-2'>
      <div className='flex flex-wrap gap-2'>
        {subCategories.map((sc) => (
          <button
            key={sc.id}
            type='button'
            onClick={() => toggle(sc.name)}
            className={cn(
              'rounded-md border px-3 py-1 text-xs font-medium transition-colors',
              values.includes(sc.name)
                ? 'border-amber-400 bg-amber-100 text-amber-800'
                : 'border-border bg-background text-muted-foreground hover:border-amber-300 hover:text-amber-700'
            )}
          >
            {sc.name}
          </button>
        ))}
      </div>
      {values.length > 0 && (
        <p className='text-[11px] text-muted-foreground'>
          {values.length} tag{values.length > 1 ? 's' : ''} selected
        </p>
      )}
    </div>
  )
}
