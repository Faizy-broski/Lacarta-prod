'use client'
import { useState, useEffect } from 'react'
import { Badge } from '@/components/ui/badge'
import { Calendar } from '@/components/ui/calendar'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card'
import { getEventsForMonth, type CalendarEvent } from '@/lib/services/analytics.service'

function toLocalDate(dateStr: string): Date {
  const [y, m, d] = dateStr.split('-').map(Number)
  return new Date(y, m - 1, d)
}

export default function EventsScheduled() {
  const today = new Date()
  const [currentMonth, setCurrentMonth] = useState(new Date(today.getFullYear(), today.getMonth(), 1))
  const [events, setEvents] = useState<CalendarEvent[]>([])

  useEffect(() => {
    getEventsForMonth(currentMonth.getFullYear(), currentMonth.getMonth()).then(setEvents)
  }, [currentMonth])

  // Build modifiers: one Date[] per unique category slug
  const categoryMap: Record<string, { dates: Date[]; color: string; name: string }> = {}
  for (const e of events) {
    const key = (e.categoryName ?? 'other').toLowerCase().replace(/\s+/g, '_')
    if (!categoryMap[key]) categoryMap[key] = { dates: [], color: e.categoryColor, name: e.categoryName }
    categoryMap[key].dates.push(toLocalDate(e.eventDate))
  }

  // Deduplicate upcoming category names for the footer badges
  const upcomingCategories = Object.values(categoryMap)

  // Build Calendar modifiers and modifiersClassNames
  const dotColors = ['bg-yellow-500', 'bg-red-500', 'bg-green-500', 'bg-blue-500', 'bg-purple-500']
  const modifiers: Record<string, Date[]> = {}
  const modifiersClassNames: Record<string, string> = {}
  Object.keys(categoryMap).forEach((key, idx) => {
    modifiers[key] = categoryMap[key].dates
    modifiersClassNames[key] = `after:absolute after:bottom-1 after:left-1/2 after:h-1 after:w-1 after:-translate-x-1/2 after:rounded-full after:${dotColors[idx % dotColors.length]}`
  })

  const monthLabel = currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })

  return (
    <>
      <Card className='w-full overflow-hidden rounded-xl border bg-[#F9FAFB] shadow-sm'>
        <CardHeader className='px-6 pb-2'>
          <div className='flex flex-col items-start justify-between sm:flex-row'>
            <div>
              <CardTitle className='font-antigua text-xl font-semibold'>
                Events Scheduled
              </CardTitle>
              <p className='mt-1 text-sm text-muted-foreground'>{monthLabel}</p>
            </div>
            <div className='flex items-center gap-3 text-muted-foreground'>
              <button
                className='hover:text-black'
                onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1))}
              >
                ‹
              </button>
              <button
                className='hover:text-black'
                onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1))}
              >
                ›
              </button>
            </div>
          </div>
        </CardHeader>

        <CardContent className='relative px-3 sm:px-6'>
          <Calendar
            month={currentMonth}
            showOutsideDays={false}
            fixedWeeks
            modifiers={modifiers}
            modifiersClassNames={modifiersClassNames}
            className='w-full'
            classNames={{
              months: 'w-full',
              month: 'w-full',
              table: 'w-full border-collapse',
              head_row: 'grid grid-cols-7 mb-2 sm:mb-3',
              head_cell: 'text-center text-xs font-medium text-muted-foreground',
              row: 'grid grid-cols-7 mt-2 sm:mt-3',
              cell: 'relative flex items-center justify-center h-9 sm:h-11',
              day: `
                h-8 w-8 sm:h-10 sm:w-10
                flex items-center justify-center
                text-xs sm:text-sm
                font-normal text-gray-700
                rounded-full hover:bg-gray-200
              `,
              day_selected: `
                border-2 border-teal-500
                text-red-600
                bg-transparent
                rounded-lg sm:rounded-xl
              `,
              day_today: 'bg-transparent',
              caption: 'hidden',
            }}
          />
        </CardContent>

        <CardFooter className='border-t px-6'>
          <div className='space-y-3'>
            <h3 className='text-sm font-medium text-muted-foreground'>Upcoming</h3>
            {upcomingCategories.length === 0 ? (
              <p className='text-xs text-muted-foreground'>No events this month</p>
            ) : (
              <div className='mt-3 flex flex-wrap gap-2'>
                {upcomingCategories.map((cat) => (
                  <Badge
                    key={cat.name}
                    className={`rounded-full border-0 px-3 py-1 text-xs font-medium text-white ${cat.color}`}
                  >
                    {cat.name}
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </CardFooter>
      </Card>
    </>
  )
}