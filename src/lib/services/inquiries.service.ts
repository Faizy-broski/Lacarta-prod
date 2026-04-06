import { supabase } from '@/lib/supabase'

// ─── Types ────────────────────────────────────────────────────────────────────

export interface Inquiry {
  id: string
  listing_id: string | null
  user_id: string | null
  name: string
  email: string
  phone: string | null
  message: string | null
  inquiry_type: 'booking' | 'contact' | 'quote'
  status: 'new' | 'read' | 'responded' | 'archived'
  created_at: string
  // Joined
  listing?: { title: string }
}

export type InquiryInsert = Pick<Inquiry, 'listing_id' | 'user_id' | 'name' | 'email' | 'phone' | 'message' | 'inquiry_type'>

// ─── Queries ──────────────────────────────────────────────────────────────────

export async function fetchInquiries(filters?: {
  status?: string
  listing_id?: string
  limit?: number
}) {
  let query = supabase
    .from('inquiries')
    .select('*, listing:listings!listing_id(title)')
    .order('created_at', { ascending: false })

  if (filters?.status) query = query.eq('status', filters.status)
  if (filters?.listing_id) query = query.eq('listing_id', filters.listing_id)
  if (filters?.limit) query = query.limit(filters.limit)

  const { data, error } = await query
  if (error) { console.error('[inquiries.service]', error.message); return [] }
  return data as Inquiry[]
}

export async function submitInquiry(inquiry: InquiryInsert) {
  const { data, error } = await supabase
    .from('inquiries')
    .insert(inquiry)
    .select()
    .single()

  if (error) throw error
  return data as Inquiry
}

export async function updateInquiryStatus(id: string, status: Inquiry['status']) {
  const { error } = await supabase.from('inquiries').update({ status }).eq('id', id)
  if (error) throw error
}

export async function getInquiryCount(status?: string) {
  let query = supabase.from('inquiries').select('*', { count: 'exact', head: true })
  if (status) query = query.eq('status', status)
  const { count, error } = await query
  if (error) return 0
  return count ?? 0
}
