'use client'

import { Button } from '@public/components/ui/button'
import FilterPanel from '@public/components/listings/FilterPanel'

interface CategoryFiltersProps {
  categoryName: string
  typeOptions: string[]          // fed from DB via ListingPage
  activeFilters: Record<string, string[]>
  onFilterChange: (group: string, value: string, checked: boolean) => void
  onClearAll: () => void
}

export default function CategoryFilters({
  categoryName,
  typeOptions,
  activeFilters,
  onFilterChange,
  onClearAll,
}: CategoryFiltersProps) {
  const selectedTypes = activeFilters['Type'] ?? []
  const allTypeFiltersOff = selectedTypes.length === 0

  return (
    <div className='mb-2 sm:mt-0 mt-12 flex flex-wrap items-center justify-between gap-2'>
      {/* LEFT — quick Type pills (desktop) */}
      {typeOptions.length > 0 && (
        <div className='lg:flex lg:flex-wrap hidden gap-1'>
          {/* "All" pill */}
          <button
            onClick={() => {
              // deselect all types
              selectedTypes.forEach((t) => onFilterChange('Type', t, false))
            }}
            className={`inline-flex items-center justify-center whitespace-nowrap font-antigua rounded-full px-5 py-1 text-sm font-bold transition
              ${
                allTypeFiltersOff
                  ? 'bg-gradient-to-r from-gold to-gold-light text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
          >
            All
          </button>

          {typeOptions.map((type) => {
            const active = selectedTypes.includes(type)
            return (
              <button
                key={type}
                onClick={() => onFilterChange('Type', type, !active)}
                className={`inline-flex items-center justify-center whitespace-nowrap font-antigua rounded-full px-5 py-1 text-sm font-bold transition
                  ${
                    active
                      ? 'bg-gradient-to-r from-gold to-gold-light text-white'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
              >
                {type}
              </button>
            )
          })}
        </div>
      )}

      {/* Spacer when no type pills */}
      {typeOptions.length === 0 && <div />}

      {/* RIGHT — action buttons */}
      <div className='flex items-center gap-2'>
        <Button
          variant='destructive'
          onClick={onClearAll}
          className='rounded-full px-3 font-bold bg-gradient-to-r from-red to-red-light font-antigua'
        >
          Clear Filters
        </Button>

        <FilterPanel
          categoryName={categoryName}
          activeFilters={activeFilters}
          onChange={onFilterChange}
          onClearAll={onClearAll}
        />
      </div>
    </div>
  )
}
