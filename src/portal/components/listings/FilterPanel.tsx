'use client'

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@public/components/ui/sheet'
import { Checkbox } from '@public/components/ui/checkbox'
import { Button } from '@public/components/ui/button'
import { ListFilter, X } from 'lucide-react'
import { MODULE_FILTERS, type ModuleFilters } from '@public/data/filter-config'
import { ScrollArea } from '@public/components/ui/scroll-area'

interface FilterPanelProps {
  categoryName: string
  activeFilters: Record<string, string[]>
  onChange: (group: string, value: string, checked: boolean) => void
  onClearAll: () => void
}

export default function FilterPanel({
  categoryName,
  activeFilters,
  onChange,
  onClearAll,
}: FilterPanelProps) {
  const groups: ModuleFilters = MODULE_FILTERS[categoryName] ?? []

  const totalActive = Object.values(activeFilters).reduce(
    (sum, vals) => sum + vals.length,
    0
  )

  if (groups.length === 0) return null

  return (
    <Sheet>
      <SheetTrigger asChild>
        <button className='relative inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-green to-green-light px-4 py-1.5 text-sm font-bold text-white font-antigua hover:brightness-110 transition'>
          <ListFilter size={16} />
          Filters
          {totalActive > 0 && (
            <span className='absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-gold text-[10px] font-bold text-white'>
              {totalActive}
            </span>
          )}
        </button>
      </SheetTrigger>

      <SheetContent side='right' className='w-80 sm:w-96 p-0 flex flex-col'>
        <SheetHeader className='px-6 pt-6 pb-3 border-b'>
          <div className='flex items-center justify-between'>
            <SheetTitle className='font-antigua text-lg'>Filters</SheetTitle>
            {totalActive > 0 && (
              <button
                onClick={onClearAll}
                className='flex items-center gap-1 text-xs font-semibold text-red-500 hover:text-red-700 transition font-antigua'
              >
                <X size={13} /> Clear all
              </button>
            )}
          </div>
        </SheetHeader>

        <ScrollArea className='flex-1'>
          <div className='px-6 py-4 space-y-6'>
            {groups.map((group) => {
              const selected = activeFilters[group.label] ?? []
              return (
                <div key={group.label}>
                  <h4 className='mb-3 text-sm font-extrabold uppercase tracking-wide text-black font-antigua'>
                    {group.label}
                  </h4>
                  <div className='flex flex-wrap gap-2'>
                    {group.options.map((option) => {
                      const checked = selected.includes(option)
                      return (
                        <button
                          key={option}
                          onClick={() => onChange(group.label, option, !checked)}
                          className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold transition font-antigua
                            ${
                              checked
                                ? 'border-gold bg-gold/10 text-gold'
                                : 'border-gray-200 bg-white text-gray-600 hover:border-gray-400'
                            }`}
                        >
                          {checked && (
                            <span className='h-1.5 w-1.5 rounded-full bg-gold' />
                          )}
                          {option}
                        </button>
                      )
                    })}
                  </div>
                </div>
              )
            })}
          </div>
        </ScrollArea>

        {totalActive > 0 && (
          <div className='px-6 py-4 border-t'>
            <Button
              onClick={onClearAll}
              variant='destructive'
              className='w-full rounded-full font-bold font-antigua bg-gradient-to-r from-red to-red-light'
            >
              Clear All Filters ({totalActive})
            </Button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  )
}
