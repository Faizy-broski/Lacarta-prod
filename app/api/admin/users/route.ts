import { createClient } from '@supabase/supabase-js'
import { NextRequest, NextResponse } from 'next/server'

function adminClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { autoRefreshToken: false, persistSession: false } }
  )
}

// POST /api/admin/users — create a new user
export async function POST(req: NextRequest) {
  const { email, password, full_name, role, phone } = await req.json()
  const supabase = adminClient()

  const { data: authData, error: authError } = await supabase.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
    user_metadata: { full_name, role },
  })
  if (authError) return NextResponse.json({ error: authError.message }, { status: 400 })

  // Update public users row with role + phone
  const { error: profileError } = await supabase
    .from('users')
    .update({ full_name, role, phone: phone ?? null })
    .eq('id', authData.user.id)

  if (profileError) {
    console.error('[admin/users POST] profile update:', profileError.message)
  }

  return NextResponse.json({ id: authData.user.id })
}

// PATCH /api/admin/users — update existing user profile
export async function PATCH(req: NextRequest) {
  const { id, full_name, role, phone } = await req.json()
  if (!id) return NextResponse.json({ error: 'id required' }, { status: 400 })

  const supabase = adminClient()
  const { error } = await supabase
    .from('users')
    .update({ full_name, role, phone: phone ?? null })
    .eq('id', id)

  if (error) return NextResponse.json({ error: error.message }, { status: 400 })
  return NextResponse.json({ ok: true })
}

// DELETE /api/admin/users?id=xxx — delete a user
export async function DELETE(req: NextRequest) {
  const id = req.nextUrl.searchParams.get('id')
  if (!id) return NextResponse.json({ error: 'id required' }, { status: 400 })

  const supabase = adminClient()
  const { error } = await supabase.auth.admin.deleteUser(id)
  if (error) return NextResponse.json({ error: error.message }, { status: 400 })
  return NextResponse.json({ ok: true })
}
