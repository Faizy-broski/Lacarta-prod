import { notFound } from 'next/navigation'
import Link from 'next/link'
import {
  Mail,
  Twitter,
  Instagram,
  Linkedin,
  ArrowLeft,
  Clapperboard,
  Music2,
  Trophy,
  BookMarked,
  UtensilsCrossed,
} from 'lucide-react'
import { fetchTeamMemberBySlug } from '@/lib/services/team.service'

export const dynamic = 'force-dynamic'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params
  const member = await fetchTeamMemberBySlug(slug)
  if (!member) return {}
  return {
    title: `${member.name} | La Carta`,
    description: member.bio ?? undefined,
  }
}

export default async function TeamMemberPage({ params }: Props) {
  const { slug } = await params
  const member = await fetchTeamMemberBySlug(slug)
  if (!member) notFound()

  const favorites = [
    { label: 'Favorite Movie', value: member.favorite_movie, bg: '#E84444', Icon: Clapperboard },
    { label: 'Favorite Song',  value: member.favorite_song,  bg: '#D4A820', Icon: Music2 },
    { label: 'Favorite Club',  value: member.favorite_club,  bg: '#3CB96A', Icon: Trophy },
    { label: 'Favorite Book',  value: member.favorite_book,  bg: '#E84444', Icon: BookMarked },
    { label: 'Favorite Dish',  value: member.favorite_food,  bg: '#D4A820', Icon: UtensilsCrossed },
  ]

  const socials = [
    { href: member.twitter_url,   label: 'X',         Icon: Twitter,   activeClass: 'bg-[#1da1f2] text-white' },
    { href: member.linkedin_url,  label: 'LinkedIn',  Icon: Linkedin,  activeClass: 'bg-[#0077b5] text-white' },
    { href: member.instagram_url, label: 'Instagram', Icon: Instagram, activeClass: 'bg-gradient-to-br from-[#f58529] via-[#dd2a7b] to-[#8134af] text-white' },
    { href: member.email ? `mailto:${member.email}` : null, label: 'Email', Icon: Mail, activeClass: 'bg-[#333] text-white' },
  ]

  return (
    <div className='min-h-screen bg-white'>
      {/* Back link */}
      <div className='px-6 pt-6 sm:px-10 lg:px-14'>
        <Link
          href='/about-us'
          className='inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors'
        >
          <ArrowLeft className='h-4 w-4' />
          Back to Team
        </Link>
      </div>

      <div className='px-6 py-6 sm:px-10 lg:px-14'>

        {/* Photo + Favorites */}
        <div className='flex flex-col sm:flex-row items-start gap-8 lg:gap-10'>

          {/* Portrait photo */}
          <div className='w-full sm:w-[340px] lg:w-[400px] flex-shrink-0'>
            {member.photo_url ? (
              <img
                src={member.photo_url}
                alt={member.name}
                className='w-full aspect-[4/5] object-cover object-top'
              />
            ) : (
              <div className='flex w-full aspect-[4/5] items-center justify-center bg-muted text-7xl font-bold text-muted-foreground'>
                {member.name.charAt(0)}
              </div>
            )}
          </div>

          {/* Favorites column */}
          <div className='w-full sm:w-[300px] lg:w-[340px] flex-shrink-0 flex flex-col mt-4 sm:mt-0 gap-3'>
            {favorites.map(({ label, value, bg, Icon }, i) => (
              <div
                key={label}
                className='flex items-center gap-4 rounded-3xl px-6 py-6 shadow-sm'
                style={{ backgroundColor: bg }}
              >
                <Icon className='h-9 w-9 flex-shrink-0 text-black' strokeWidth={1.6} />
                <div>
                  <p className='font-antigua text-lg sm:text-xl font-black leading-tight text-black'>
                    {label}
                  </p>
                  {value ? (
                    <p className='mt-1 text-base sm:text-lg font-semibold text-black/90'>{value}</p>
                  ) : (
                    <p className='mt-1 text-sm text-black/70'>Not provided</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Name / Role / Socials */}
        <div className='mt-8 flex items-start justify-between gap-4'>
          <div>
            <h1 className='font-antigua text-4xl font-black leading-tight text-black sm:text-5xl'>
              {member.name}
            </h1>
            <p className='mt-1 text-base font-semibold text-muted-foreground'>{member.role}</p>
          </div>

          {/* Always show all 4 icons — colored buttons with disabled fallback */}
          <div className='flex flex-shrink-0 items-center gap-4 pt-2'>
            {socials.map(({ href, label, Icon, activeClass }) =>
              href ? (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith('mailto') ? undefined : '_blank'}
                  rel={href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
                  aria-label={label}
                  className={`inline-flex h-12 w-12 items-center justify-center rounded-full shadow-sm transition hover:opacity-90 ${activeClass}`}
                >
                  <Icon className='h-6 w-6' strokeWidth={1.8} />
                </a>
              ) : (
                <span
                  key={label}
                  className='inline-flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-400 shadow-sm cursor-not-allowed'
                  aria-label={`${label} unavailable`}
                >
                  <Icon className='h-6 w-6' strokeWidth={1.8} />
                </span>
              )
            )}
          </div>
        </div>

        {/* Divider */}
        <div className='my-6 h-px bg-border' />

        {/* Bio */}
        <div className='max-w-4xl space-y-4'>
          {member.bio && (
            <p className='text-base leading-relaxed text-foreground/80'>{member.bio}</p>
          )}
          {member.bio_extended && (
            <p className='text-base leading-relaxed text-foreground/80'>{member.bio_extended}</p>
          )}
          {!member.bio && !member.bio_extended && (
            <p className='italic text-muted-foreground'>No bio available yet.</p>
          )}
        </div>

      </div>
    </div>
  )
}

