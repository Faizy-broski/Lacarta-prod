import { createClient } from '@supabase/supabase-js'
import { NextRequest, NextResponse } from 'next/server'

// Public route — uses anon key (RLS should allow insert on client_applications)
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export async function POST(req: NextRequest) {
  const { full_name, email, phone, business_name, category, description, website } = await req.json()

  if (!full_name?.trim() || !email?.trim() || !business_name?.trim()) {
    return NextResponse.json({ error: 'full_name, email, and business_name are required.' }, { status: 400 })
  }

  // Prevent duplicate pending/approved applications from the same email
  const { data: existing } = await supabase
    .from('client_applications')
    .select('id, status')
    .eq('email', email.trim().toLowerCase())
    .in('status', ['pending', 'approved'])
    .maybeSingle()

  if (existing) {
    const msg = existing.status === 'approved'
      ? 'An account for this email already exists.'
      : 'An application from this email is already under review.'
    return NextResponse.json({ error: msg }, { status: 409 })
  }

  const { error } = await supabase.from('client_applications').insert({
    full_name: full_name.trim(),
    email: email.trim().toLowerCase(),
    phone: phone?.trim() || null,
    business_name: business_name.trim(),
    category: category || null,
    description: description?.trim() || null,
    website: website?.trim() || null,
  })

  if (error) return NextResponse.json({ error: error.message }, { status: 400 })
  return NextResponse.json({ ok: true })
}
