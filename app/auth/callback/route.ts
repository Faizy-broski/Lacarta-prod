import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

/**
 * Supabase PKCE auth callback.
 *
 * Supabase appends ?code=<code> to the redirectTo URL when PKCE is enabled
 * (the default in @supabase/ssr). This route exchanges that one-time code
 * for a session, stores it in cookies, then redirects the user to wherever
 * they were supposed to go (e.g. /invite-accept).
 *
 * Invite flow:
 *   email link  →  /auth/callback?code=xxx&next=/invite-accept
 *                  (exchanges code, sets session cookie)
 *               →  /invite-accept  (session is ready, show password form)
 */
export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  // `next` lets the invite API control where we land after the exchange.
  const next = searchParams.get('next') ?? '/dashboard'

  if (code) {
    const cookieStore = await cookies()

    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return cookieStore.getAll()
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          },
        },
      }
    )

    const { error } = await supabase.auth.exchangeCodeForSession(code)

    if (!error) {
      return NextResponse.redirect(`${origin}${next}`)
    }

    // Exchange failed — token expired or reused
    const params = new URLSearchParams({ reason: error.message })
    return NextResponse.redirect(`${origin}/invite-accept?error=${encodeURIComponent(error.message)}`)
  }

  // No code present — someone hit this URL directly
  return NextResponse.redirect(`${origin}/sign-in`)
}
