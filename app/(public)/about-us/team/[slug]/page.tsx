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
    { href: member.twitter_url,   label: 'X',         Icon: Twitter },
    { href: member.linkedin_url,  label: 'LinkedIn',  Icon: Linkedin },
    { href: member.instagram_url, label: 'Instagram', Icon: Instagram },
    { href: member.email ? `mailto:${member.email}` : null, label: 'Email', Icon: Mail },
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
        <div className='flex flex-col sm:flex-row items-start'>

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
          <div className='w-full sm:w-[300px] lg:w-[340px] flex-shrink-0 flex flex-col mt-4 sm:mt-0'>
            {favorites.map(({ label, value, bg, Icon }, i) => (
              <div
                key={label}
                className='flex items-center gap-3 px-5 py-5'
                style={{
                  backgroundColor: bg,
                  borderRadius:
                    i === 0
                      ? '8px 8px 0 0'
                      : i === favorites.length - 1
                      ? '0 0 8px 8px'
                      : '0',
                }}
              >
                <Icon className='h-8 w-8 flex-shrink-0 text-black' strokeWidth={1.6} />
                <div>
                  <p className='font-antigua text-base font-black leading-tight text-black'>
                    {label}
                  </p>
                  {value && (
                    <p className='mt-0.5 text-sm text-black/80'>{value}</p>
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
            <p className='mt-1 text-base text-muted-foreground'>{member.role}</p>
          </div>

          {/* Always show all 4 icons — dimmed when no URL */}
          <div className='flex flex-shrink-0 items-center gap-4 pt-2'>
            {socials.map(({ href, label, Icon }) =>
              href ? (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith('mailto') ? undefined : '_blank'}
                  rel={href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
                  aria-label={label}
                  className='text-black hover:opacity-60 transition-opacity'
                >
                  <Icon className='h-5 w-5' strokeWidth={1.8} />
                </a>
              ) : (
                <span key={label} className='text-black/20 cursor-default'>
                  <Icon className='h-5 w-5' strokeWidth={1.8} />
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

