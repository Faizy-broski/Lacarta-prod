import { supabase } from '@/lib/supabase'

export async function subscribeNewsletter(email: string) {
  const { data, error } = await supabase
    .from('newsletter_signups')
    .insert({ email })
    .select()
    .single()

  if (error) throw error
  return data
}

export async function getNewsletterCount() {
  const { count, error } = await supabase
    .from('newsletter_signups')
    .select('*', { count: 'exact', head: true })
    .is('unsubscribed_at', null)

  if (error) return 0
  return count ?? 0
}

export async function fetchNewsletterSignups(limit = 50) {
  const { data, error } = await supabase
    .from('newsletter_signups')
    .select('*')
    .is('unsubscribed_at', null)
    .order('subscribed_at', { ascending: false })
    .limit(limit)

  if (error) { console.error('[newsletter.service]', error.message); return [] }
  return data
}
