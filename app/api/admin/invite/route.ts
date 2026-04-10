import { createClient } from '@supabase/supabase-js'
import { NextRequest, NextResponse } from 'next/server'

function adminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!url || !key || key === 'REPLACE_ME') {
    throw new Error('SUPABASE_SERVICE_ROLE_KEY is not configured. Please set it in your environment.')
  }
  return createClient(url, key, { auth: { autoRefreshToken: false, persistSession: false } })
}

// POST /api/admin/invite — send email invite
export async function POST(req: NextRequest) {
  const { email, role, desc } = await req.json()
  let supabase
  try {
    supabase = adminClient()
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }

  // The callback route exchanges the PKCE code for a session then redirects to
  // /invite-accept where the user sets their password.
  const appUrl = process.env.NEXT_PUBLIC_APP_URL
  const redirectTo = `${appUrl}/auth/callback?next=/invite-accept`

  const { data, error } = await supabase.auth.admin.inviteUserByEmail(email, {
    data: { role, invite_description: desc ?? '' },
    redirectTo,
  })

  if (error) {
    // Log the full error server-side so you can diagnose in terminal/logs
    console.error('[invite] Supabase error:', JSON.stringify({ message: error.message, status: (error as any).status, code: (error as any).code }))

    const isRateLimit =
      error.message.toLowerCase().includes('rate limit') ||
      error.message.toLowerCase().includes('too many') ||
      (error as any).status === 429

    if (isRateLimit) {
      return NextResponse.json(
        {
          error:
            'Email rate limit reached on the free Supabase tier. ' +
            'Please wait ~1 hour before sending another invite, or configure ' +
            'a custom SMTP provider in your Supabase project settings ' +
            '(Authentication → SMTP Settings). Resend and Brevo both offer ' +
            'generous free tiers.',
          code: 'EMAIL_RATE_LIMIT',
        },
        { status: 429 }
      )
    }

    return NextResponse.json({ error: error.message }, { status: 400 })
  }

  // Pre-set the role in public users row
  await supabase.from('users').update({ role }).eq('id', data.user.id)

  return NextResponse.json({ ok: true })
}
