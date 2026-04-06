export const dynamic = 'force-dynamic'

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className='relative flex min-h-svh'>
      {/* ── Left panel: branding (hidden on mobile) ──────────────────────── */}
      <div className='hidden w-1/2 flex-col items-center justify-center bg-[#0a0f14] lg:flex'>
        {/* Decorative gold accent line */}
        <div className='absolute left-0 top-0 h-full w-[2px] bg-gradient-to-b from-transparent via-gold to-transparent' />

        <div className='relative flex flex-col items-center px-12 text-center'>
          <img
            src='/images/Logo.png'
            alt='La Carta'
            className='mb-8 h-28 w-auto drop-shadow-lg'
          />
          <h2 className='font-antigua text-3xl font-semibold tracking-tight text-white'>
            La Carta
          </h2>
          <p className='mt-3 max-w-sm text-sm leading-relaxed text-white/50'>
            Cartagena&apos;s premier tourism &amp; culture platform. Discover
            the best hotels, beaches, gastronomy, and experiences.
          </p>

          {/* Decorative dots */}
          <div className='mt-10 flex gap-2'>
            <span className='h-1.5 w-1.5 rounded-full bg-gold/60' />
            <span className='h-1.5 w-6 rounded-full bg-gold' />
            <span className='h-1.5 w-1.5 rounded-full bg-gold/60' />
          </div>
        </div>
      </div>

      {/* ── Right panel: auth form ───────────────────────────────────────── */}
      <div className='flex w-full flex-col items-center justify-center bg-background px-4 py-8 sm:px-8 lg:w-1/2'>
        {/* Mobile logo */}
        <div className='mb-6 flex items-center gap-3 lg:hidden'>
          <img
            src='/images/Logo.png'
            alt='La Carta'
            className='h-14 w-auto'
          />
          <span className='font-antigua text-xl font-semibold text-foreground'>
            La Carta
          </span>
        </div>

        <div className='w-full max-w-md'>{children}</div>

        <p className='mt-8 text-center text-xs text-muted-foreground/60'>
          &copy; {new Date().getFullYear()} La Carta. All rights reserved.
        </p>
      </div>
    </div>
  )
}
