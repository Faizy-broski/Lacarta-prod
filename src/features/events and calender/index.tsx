'use client'
import { useEffect, useState } from 'react'
import { useAuthStore } from '@/lib/auth/auth.store'
import { Tabs, TabsContent } from '@/components/ui/tabs'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { CalendarGrid, type CalendarEvent } from './components/CalendarGrid'
import DraftEvents from './components/DraftEvents'
import EventCategories from './components/EventCategories'
import FeaturedEvents from './components/FeaturedEvents'
import Insights from './components/Insights'
import UpcomingEvents from './components/UpcomingEvents'
import PendingEvents from './components/PendingEvents'
import TabsPage from './components/tabs.tsx'
import CreateEventDialog from './components/CreateEventDialog'
import { fetchEvents } from '@/lib/services/events.service'

export function Events() {
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [calendarEvents, setCalendarEvents] = useState<CalendarEvent[]>([])
  const user = useAuthStore((s) => s.user)

  useEffect(() => {
    fetchEvents({ status: 'published' }).then((events) => {
      setCalendarEvents(
        events.map((e) => ({
          id: e.id,
          title: e.title,
          date: e.event_date,
          time: e.start_time ?? undefined,
          category: e.category?.name,
        }))
      )
    })
  }, [])

  return (
    <>
      <Header />

      <Main>
        <div className='mb-2 flex items-start justify-between gap-4'>
          <div className='space-y-1'>
            <h1 className='font-antigua text-3xl font-bold tracking-tight'>
              Events & Calendar
            </h1>
            <p className='text-xs text-muted-foreground'>
              Manage cultural events and calendar visibility.
            </p>
          </div>
          <CreateEventDialog onCreated={() => {
            fetchEvents({ status: 'published' }).then((events) => {
              setCalendarEvents(
                events.map((e) => ({
                  id: e.id,
                  title: e.title,
                  date: e.event_date,
                  time: e.start_time ?? undefined,
                  category: e.category?.name,
                }))
              )
            })
          }} />
        </div>

        <Tabs
          orientation='vertical'
          defaultValue='overview'
          className='space-y-4'
        >
          <TabsContent value='overview' className='space-y-4'>
            <TabsPage />
          </TabsContent>
        </Tabs>

        <div className='space-y-8 p-2 sm:px-0 sm:py-6'>
          <CalendarGrid
            events={calendarEvents}
            currentMonth={currentMonth}
            onMonthChange={setCurrentMonth}
          />
          <UpcomingEvents />
          {(user?.role[0] === 'admin' ||
            user?.role[0] === 'owner' ||
            user?.role[0] === 'assistant') && (
            <>
              <div>
                <h2 className='mb-3 font-semibold text-base'>Pending Approval</h2>
                <PendingEvents />
              </div>
              <FeaturedEvents />
            </>
          )}
          <DraftEvents />
          <EventCategories />
          <Insights />
        </div>
      </Main>
    </>
  )
}