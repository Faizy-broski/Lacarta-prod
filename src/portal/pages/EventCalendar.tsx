'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Calendar, MapPin, Clock, Loader2 } from 'lucide-react'
import { fetchUpcomingEvents, type Event } from '@/lib/services/events.service'

// ─── Static editorial content ─────────────────────────────────────────────────
// The festivals section is curated editorial content about Cartagena's culture.

const festivals = [
  {
    num: '1',
    title: 'Independence Festival — November Festivities',
    dates: 'From November 11 to November 17',
    body: `Cartagena's Independence carries a deep historical and cultural significance, which is reflected in the heart of the events celebrated during the first days of November. These festivities commemorate Cartagena's Independence, which took place on November 11, 1811, following the emancipation route that began in 1810 with the expulsion of Spanish Governor Francisco de Montes.\n\nThe celebration culminates in the week of November 11, but it is important to note that the festivities' agenda starts in October with preludes in three neighborhoods, followed by several events across the city.`,
    history: "The November festivities commemorate Cartagena's Independence after a path of emancipation from Spain. It not only had a national impact, being the first population of the viceroyalty to seek self-government, but it also played a significant role in South America's struggle for independence from the Spanish in the 19th century.",
  },
  {
    num: '2',
    title: 'Cartagena International Music Festival',
    dates: 'From January 4 to January 12',
    body: 'The annual Music Festival is held each January in Cartagena, Colombia. Showcasing music and compositions from across Latin America, the Iberian Peninsula, and the Caribbean, it attracts world-class performers and thousands of visitors.',
    history: 'According to the Bank of the Republic, staging historical memory through poetic compositions, music, speeches, and civic processions facilitates a collective memory that evokes pride, identity, and celebration.',
  },
  {
    num: '3',
    title: 'Frito Festival',
    dates: 'From January 26 to February 4',
    body: "This festival traditionally takes place during the Candlemas celebrations, integrating religious, cultural, and gastronomic elements in honor of the Virgin of Candelaria. Its goal is to preserve the city's cultural heritage and consolidate its multi-ethnic and multicultural identity, as reflected in local cuisine.",
    history: 'Celebrated continuously for over 35 years, the Frito Festival is held during the Candlemas celebrations. The city\'s patron saint is the Black Virgin of Candelaria.',
  },
  {
    num: '4',
    title: 'Hay Festival de Cartagena de Indias',
    dates: 'From January 30 to February 2',
    body: 'Under a pleasant temperature, literature takes over Cartagena de Indias, paying tribute to the written word. Attendees enjoy novels and poetry, as well as plays, exhibitions, workshops, and conferences. It lasts for four days and begins every year during the last week of January.',
    history: 'The Hay Festival of Cartagena de Indias is one of the international versions of the Hay Festival of Literature and Arts, which began in Hay-on-Wye in Wales in 1988. In Cartagena, it has become one of the best festivals in the world, starting in 2006.',
  },
  {
    num: '5',
    title: 'Cartagena Film Festival (FICCI)',
    dates: 'From April 16 to April 21',
    body: 'The Cartagena Film Festival (FICCI) is a free cinematic event with a social mission that reflects the circumstances of the country and the world. It is the largest and most representative film festival in Latin America, featuring over 170 screenings and dozens of world premieres.',
    history: 'Founded in 1960, it is the oldest film festival in Latin America. Throughout its history, it has supported and promoted innovation and the renewal of dramaturgy and cinematography in Ibero-America and the world.',
  },
]

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatEventDate(dateStr: string): string {
  return new Date(dateStr + 'T00:00:00').toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
}

function buildGoogleCalendarUrl(ev: Event): string {
  const base = 'https://www.google.com/calendar/render?action=TEMPLATE'

  // Build start datetime - YYYYMMDDTHHMMSS (local, no Z so Google uses viewer's tz)
  const datePart = ev.event_date.replace(/-/g, '') // e.g. 20260410
  const startTime = ev.start_time ? ev.start_time.replace(':', '') + '00' : '000000'
  const endTime   = ev.end_time   ? ev.end_time.replace(':', '')   + '00' : null

  // If no end_time, default to start + 1 hour
  const endTimeFallback = (() => {
    if (endTime) return endTime
    const [h, m] = (ev.start_time ?? '00:00').split(':').map(Number)
    const endH = String((h + 1) % 24).padStart(2, '0')
    return `${endH}${String(m).padStart(2, '0')}00`
  })()

  const dates = `${datePart}T${startTime}/${datePart}T${endTimeFallback}`

  const params = new URLSearchParams({
    text: ev.title,
    dates,
    ...(ev.location   ? { location: ev.location }     : {}),
    ...(ev.description ? { details: ev.description }   : {}),
  })

  return `${base}&${params.toString()}`
}

function formatMonth(dateStr: string): string {
  return new Date(dateStr + 'T00:00:00').toLocaleDateString('en-US', { month: 'short' }).toUpperCase()
}

function formatDay(dateStr: string): string {
  return new Date(dateStr + 'T00:00:00').getDate().toString()
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function EventCalendar() {
  const [tableEvents, setTableEvents] = useState<Event[]>([])
  const [upcomingEvents, setUpcomingEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchUpcomingEvents(12).then((data) => {
      setTableEvents(data.slice(0, 4))
      setUpcomingEvents(data.slice(0, 6))
      setLoading(false)
    })
  }, [])

  return (
    <div className='min-h-screen bg-white'>

      {/* ── Teal banner ── */}
      <div className='w-full py-2 text-center text-sm font-bold' style={{ backgroundColor: '#3bbfad', color: '#fff' }}>
        Download our FREE Cartagena Travel Guide!
      </div>

      {/* ── Hero ── */}
      <div className='relative w-full overflow-hidden' style={{ minHeight: 340 }}>
        <img src='/lacarta_images/music-4.jpg' alt='Cartagena Events' className='absolute inset-0 h-full w-full object-cover' />
        <div className='absolute inset-0' style={{ backgroundColor: 'rgba(140,20,10,0.72)' }} />
        <div className='relative z-10 flex flex-col items-start gap-4 px-4 py-10 sm:flex-row sm:gap-6 md:px-16 md:py-16'>
          <Calendar size={48} strokeWidth={1.4} className='flex-shrink-0 sm:hidden' style={{ color: '#fff' }} />
          <Calendar size={72} strokeWidth={1.4} className='hidden flex-shrink-0 sm:block' style={{ color: '#fff', marginTop: 4 }} />
          <div>
            <h1
              className='font-antigua font-black uppercase'
              style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', color: '#fff', letterSpacing: '0.06em', lineHeight: 1.1 }}
            >
              Cartagena Event Calendar
            </h1>
            <p className='mt-2 text-lg font-semibold' style={{ color: '#fce4e0' }}>
              Integrate the top Events with your calendar.
            </p>
            <p className='mt-3 text-sm'>
              <span style={{ color: '#f8b8b0' }}><em>La Carta – Cartagena Culture &amp; Tourism</em></span>
              <span className='font-bold' style={{ color: '#fff' }}> › Cartagena Event Calendar</span>
            </p>
          </div>
        </div>
      </div>

      {/* ── Events table ── */}
      <section className='mx-auto max-w-[1400px] px-4 py-10 md:px-10'>

        {/* Table header – desktop */}
        <div
          className='mb-3 hidden items-center rounded-full px-4 py-3 text-base font-black md:grid'
          style={{ gridTemplateColumns: '80px 140px 1fr 240px 220px 180px', backgroundColor: '#f5c542', color: '#000' }}
        >
          <span>Image</span>
          <span>Category</span>
          <span>Event</span>
          <span>Date</span>
          <span>Venue</span>
          <span className='text-right'>Action</span>
        </div>

        {loading ? (
          <div className='flex justify-center py-12'>
            <Loader2 className='h-8 w-8 animate-spin text-gray-400' />
          </div>
        ) : tableEvents.length === 0 ? (
          <p className='py-12 text-center text-gray-500'>No upcoming events scheduled. Check back soon!</p>
        ) : (
          tableEvents.map((ev, i) => (
            <div key={ev.id}>
              {/* Mobile card */}
              <div
                className='mb-3 flex gap-3 rounded px-4 py-4 md:hidden'
                style={{ backgroundColor: i % 2 === 0 ? '#fff' : '#fafafa', border: '1px solid #eee' }}
              >
                {ev.cover_image ? (
                  <img src={ev.cover_image} alt={ev.title} className='h-20 w-20 flex-shrink-0 rounded object-cover' />
                ) : (
                  <div className='h-20 w-20 flex-shrink-0 rounded bg-gray-100' />
                )}
                <div className='min-w-0 flex-1'>
                  {ev.category?.name && (
                    <span className='mb-1 inline-block rounded px-2 py-0.5 text-xs font-black' style={{ backgroundColor: '#f5c542', color: '#000' }}>
                      {ev.category.name}
                    </span>
                  )}
                  <p className='mb-1 text-base font-semibold leading-tight' style={{ color: '#000' }}>{ev.title}</p>
                  <p className='mb-0.5 flex items-center gap-1 text-sm' style={{ color: '#555' }}>
                    <Clock size={12} /> {formatEventDate(ev.event_date)}{ev.start_time ? ` · ${ev.start_time}` : ''}
                  </p>
                  {ev.location && (
                    <p className='mb-2 flex items-center gap-1 text-sm' style={{ color: '#555' }}>
                      <MapPin size={12} /> {ev.location}
                    </p>
                  )}
                  <div className='flex flex-col gap-1.5'>
                    <button
                      className='rounded px-4 py-1.5 text-center text-sm font-black transition hover:brightness-110'
                      style={{ backgroundColor: '#3bbfad', color: '#000' }}
                    >
                      Book Now
                    </button>
                    <a
                      href={buildGoogleCalendarUrl(ev)}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='block rounded px-4 py-1.5 text-center text-sm font-black transition hover:bg-gray-700'
                      style={{ backgroundColor: '#111', color: '#fff' }}
                    >
                      Add to Calendar
                    </a>
                  </div>
                </div>
              </div>

              {/* Desktop row */}
              <div
                className='mb-2 hidden items-center rounded px-4 py-4 md:grid'
                style={{ gridTemplateColumns: '80px 140px 1fr 240px 220px 180px', backgroundColor: i % 2 === 0 ? '#fff' : '#fafafa', border: '1px solid #eee' }}
              >
                {ev.cover_image ? (
                  <img src={ev.cover_image} alt={ev.title} className='h-14 w-16 rounded object-cover' />
                ) : (
                  <div className='h-14 w-16 rounded bg-gray-100' />
                )}
                <span>
                  {ev.category?.name && (
                    <span className='rounded px-3 py-1 text-sm font-black' style={{ backgroundColor: '#f5c542', color: '#000' }}>
                      {ev.category.name}
                    </span>
                  )}
                </span>
                <span className='pr-4 text-base font-semibold' style={{ color: '#000' }}>{ev.title}</span>
                <span className='text-sm' style={{ color: '#000' }}>
                  {formatEventDate(ev.event_date)}{ev.start_time ? `, ${ev.start_time}` : ''}
                </span>
                <span className='text-sm' style={{ color: '#000' }}>{ev.location ?? '—'}</span>
                <div className='flex flex-col gap-1.5'>
                  <button
                    className='rounded px-4 py-1.5 text-center text-sm font-black transition hover:brightness-110'
                    style={{ backgroundColor: '#3bbfad', color: '#000' }}
                  >
                    Book Now
                  </button>
                  <a
                    href={buildGoogleCalendarUrl(ev)}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='block rounded px-4 py-1.5 text-center text-sm font-black transition hover:bg-gray-700'
                    style={{ backgroundColor: '#111', color: '#fff' }}
                  >
                    Add to Calendar
                  </a>
                </div>
              </div>
            </div>
          ))
        )}
      </section>

      {/* ── Gold divider ── */}
      <div style={{ height: 6, backgroundColor: '#f5c542' }} />

      {/* ── Upcoming Events grid ── */}
      <section className='mx-auto max-w-[1400px] px-4 py-14 md:px-10'>
        <h2
          className='font-antigua mb-10 text-center font-black uppercase'
          style={{ fontSize: 'clamp(2rem, 5vw, 3.2rem)', color: '#000', letterSpacing: '0.06em' }}
        >
          Upcoming Events in Cartagena
        </h2>

        {loading ? (
          <div className='flex justify-center py-8'>
            <Loader2 className='h-8 w-8 animate-spin text-gray-400' />
          </div>
        ) : upcomingEvents.length === 0 ? (
          <p className='text-center text-gray-500'>No upcoming events to display.</p>
        ) : (
          <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3'>
            {upcomingEvents.map((ev) => (
              <div
                key={ev.id}
                className='cursor-pointer overflow-hidden rounded-xl shadow-sm transition hover:shadow-md'
              >
                <div className='relative'>
                  {ev.cover_image ? (
                    <img src={ev.cover_image} alt={ev.title} className='w-full object-cover' style={{ height: 220 }} />
                  ) : (
                    <div className='w-full bg-gray-100' style={{ height: 220 }} />
                  )}
                </div>
                <div className='flex items-center gap-4 bg-white px-4 py-3'>
                  <div
                    className='flex flex-shrink-0 flex-col items-center justify-center rounded text-center text-white'
                    style={{ backgroundColor: '#3bbfad', width: 52, height: 52, padding: 4 }}
                  >
                    <span className='text-xs font-semibold leading-none'>{formatMonth(ev.event_date)}</span>
                    <span className='text-xl font-black leading-none'>{formatDay(ev.event_date)}</span>
                  </div>
                  <div>
                    <p className='text-base font-black' style={{ color: '#000' }}>{ev.title}</p>
                    {ev.location && (
                      <p className='mt-0.5 flex items-center gap-1 text-xs text-gray-500'>
                        <MapPin size={10} /> {ev.location}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* ── Gold divider ── */}
      <div style={{ height: 6, backgroundColor: '#f5c542' }} />

      {/* ── Editorial: Cartagena Festivals ── */}
      <section className='mx-auto max-w-[1400px] px-4 py-14 md:px-10'>
        <h2
          className='font-antigua mb-8 text-center font-black'
          style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.4rem)', color: '#000' }}
        >
          Cartagena Events and Festivals
        </h2>

        <div className='mb-12 space-y-4 text-base leading-relaxed' style={{ color: '#000' }}>
          <p>I come from Cartagena; vibrant, serene, historical, cultural, musical, magical, and realistic. I belong to this Caribbean part of my country, where the heat and salty air will seduce you alongside its sea and sunsets filled with beautiful colors. I invite you to stroll through its streets and colonial balconies, which will captivate you with their vibrant atmosphere and rhythmic music.</p>
          <p>Here, the devotion to parties, festivals, and celebrations will lure you into a carefree, romantic, and yet cultured environment, also business-minded and entrepreneurial.</p>
          <p>Below, I offer you a list of the vibrant events that Cartagena has prepared for locals and visitors.</p>
        </div>

        <hr style={{ borderColor: '#ddd', marginBottom: 32 }} />
        <h3 className='font-antigua mb-2 text-2xl font-black' style={{ color: '#000' }}>Key Events in Cartagena</h3>
        <p className='mb-8 text-base' style={{ color: '#000' }}>The Most Anticipated Events and Festivals:</p>

        <div className='space-y-10'>
          {festivals.map((f) => (
            <div key={f.num}>
              <p className='mb-1 text-base font-black' style={{ color: '#000' }}>
                {f.num}. {f.title}{' '}
                <em className='text-sm font-normal' style={{ color: '#555' }}>{f.dates}</em>
              </p>
              {f.body.split('\n\n').map((para, i) => (
                <p key={i} className='mb-3 text-base leading-relaxed' style={{ color: '#000' }}>{para}</p>
              ))}
              <p className='mb-1 text-sm font-black' style={{ color: '#000' }}>A bit of history</p>
              <p className='text-base leading-relaxed' style={{ color: '#000' }}>{f.history}</p>
            </div>
          ))}
        </div>

        {/* Useful Tips */}
        <hr style={{ borderColor: '#ddd', margin: '40px 0 24px' }} />
        <h3 className='font-antigua mb-4 text-2xl font-black' style={{ color: '#000' }}>Useful Tips</h3>
        <div className='space-y-3 text-base leading-relaxed' style={{ color: '#000' }}>
          <p>Cartagena is located on the northern coast of Colombia in the Caribbean, so its climate is semi-arid, warm, and dry, although the breeze makes it pleasant. There are two main seasons: the rainy season (May to November) and the dry season (December to April).</p>
          <p>The average temperature ranges between 30 and 32 degrees Celsius. Comfortable shoes, hats or caps, and plenty of water are always recommended. The streets in the historic center are paved with stone or brick, so walking shoes are advised.</p>
        </div>
      </section>

    </div>
  )
}
