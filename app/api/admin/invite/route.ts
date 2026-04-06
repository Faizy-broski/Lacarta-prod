import { createClient } from '@supabase/supabase-js'
import { NextRequest, NextResponse } from 'next/server'

function adminClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { autoRefreshToken: false, persistSession: false } }
  )
}

// POST /api/admin/invite — send email invite
export async function POST(req: NextRequest) {
  const { email, role, desc } = await req.json()
  const supabase = adminClient()

  const { data, error } = await supabase.auth.admin.inviteUserByEmail(email, {
    data: { role, invite_description: desc ?? '' },
  })

  if (error) return NextResponse.json({ error: error.message }, { status: 400 })

  // Pre-set the role in public users row
  await supabase.from('users').update({ role }).eq('id', data.user.id)

  return NextResponse.json({ ok: true })
}
