import { supabase } from '@/lib/supabase'

// ─── Types ────────────────────────────────────────────────────────────────────

export type AnalyticsEventType =
  | 'impression'
  | 'click'
  | 'heart_save'
  | 'phone_click'
  | 'email_click'
  | 'whatsapp_click'
  | 'website_click'
  | 'maps_click'
  | 'directions_click'
  | 'social_click'
  | 'third_party_click'

// ─── Track Events ─────────────────────────────────────────────────────────────

export async function trackEvent(
  listingId: string,
  eventType: AnalyticsEventType,
  userId?: string
) {
  const { error } = await supabase
    .from('listing_analytics')
    .insert({ listing_id: listingId, event_type: eventType, user_id: userId ?? null })

  if (error) console.error('[analytics.service] trackEvent:', error.message)
}

// ─── Aggregate Queries ────────────────────────────────────────────────────────

export async function getListingAnalytics(listingId: string, days = 30) {
  const since = new Date()
  since.setDate(since.getDate() - days)

  const { data, error } = await supabase
    .from('listing_analytics')
    .select('event_type, created_at')
    .eq('listing_id', listingId)
    .gte('created_at', since.toISOString())

  if (error) { console.error('[analytics.service]', error.message); return [] }
  return data
}

export async function getListingEventCounts(listingId: string, days = 30) {
  const events = await getListingAnalytics(listingId, days)
  const counts: Record<string, number> = {}

  for (const e of events) {
    counts[e.event_type] = (counts[e.event_type] ?? 0) + 1
  }

  return {
    impressions: counts['impression'] ?? 0,
    clicks: counts['click'] ?? 0,
    heart_saves: counts['heart_save'] ?? 0,
    phone_clicks: counts['phone_click'] ?? 0,
    email_clicks: counts['email_click'] ?? 0,
    whatsapp_clicks: counts['whatsapp_click'] ?? 0,
    website_clicks: counts['website_click'] ?? 0,
    maps_clicks: counts['maps_click'] ?? 0,
    directions_clicks: counts['directions_click'] ?? 0,
    social_clicks: counts['social_click'] ?? 0,
    third_party_clicks: counts['third_party_click'] ?? 0,
    total_inquiries:
      (counts['phone_click'] ?? 0) +
      (counts['email_click'] ?? 0) +
      (counts['whatsapp_click'] ?? 0),
  }
}

/** Aggregate counts across all listings (for owner dashboard) */
export async function getPlatformAnalytics(days = 30) {
  const since = new Date()
  since.setDate(since.getDate() - days)

  const { data, error } = await supabase
    .from('listing_analytics')
    .select('event_type')
    .gte('created_at', since.toISOString())

  if (error) { console.error('[analytics.service]', error.message); return null }

  const counts: Record<string, number> = {}
  for (const e of data) {
    counts[e.event_type] = (counts[e.event_type] ?? 0) + 1
  }

  return counts
}

/** Client-level: aggregate across all their listings */
export async function getClientAnalytics(clientId: string, days = 30) {
  const since = new Date()
  since.setDate(since.getDate() - days)

  // First get all listing IDs for this client
  const { data: listings } = await supabase
    .from('listings')
    .select('id')
    .eq('client_id', clientId)

  if (!listings?.length) return {}

  const listingIds = listings.map((l) => l.id)

  const { data, error } = await supabase
    .from('listing_analytics')
    .select('listing_id, event_type')
    .in('listing_id', listingIds)
    .gte('created_at', since.toISOString())

  if (error) { console.error('[analytics.service]', error.message); return {} }

  // Group by listing_id → event_type → count
  const byListing: Record<string, Record<string, number>> = {}
  for (const e of data) {
    if (!byListing[e.listing_id]) byListing[e.listing_id] = {}
    byListing[e.listing_id][e.event_type] = (byListing[e.listing_id][e.event_type] ?? 0) + 1
  }

  return byListing
}

// ─── Owner Platform Stats ─────────────────────────────────────────────────────

export interface OwnerPlatformStats {
  totalSubscriptions: number
  subscriptions30dAgo: number
  subscriptions1yAgo: number
  totalMemberships: number
  memberships30dAgo: number
  memberships1yAgo: number
  totalNewsletter: number
  newsletter30dAgo: number
  newsletter1yAgo: number
  publishedArticles: number
  scheduledArticles: number
  pendingReviews: number
  totalDeals: number
  totalEvents: number
  totalHeartSaves: number
  totalComments: number
  totalFormSubmissions: number
}

export async function getOwnerPlatformStats(): Promise<OwnerPlatformStats> {
  const now = new Date()
  const d30 = new Date(now); d30.setDate(d30.getDate() - 30)
  const d365 = new Date(now); d365.setDate(d365.getDate() - 365)

  const [
    subs,
    subs30,
    subs365,
    members,
    members30,
    members365,
    newsletter,
    newsletter30,
    newsletter365,
    publishedArticles,
    scheduledArticles,
    pendingReviews,
    activeDeals,
    events,
    heartSaves,
    comments,
    inquiries,
  ] = await Promise.all([
    supabase.from('listing_subscriptions').select('*', { count: 'exact', head: true }).eq('status', 'active'),
    supabase.from('listing_subscriptions').select('*', { count: 'exact', head: true }).eq('status', 'active').gte('created_at', d30.toISOString()),
    supabase.from('listing_subscriptions').select('*', { count: 'exact', head: true }).eq('status', 'active').gte('created_at', d365.toISOString()),
    supabase.from('users').select('*', { count: 'exact', head: true }),
    supabase.from('users').select('*', { count: 'exact', head: true }).gte('created_at', d30.toISOString()),
    supabase.from('users').select('*', { count: 'exact', head: true }).gte('created_at', d365.toISOString()),
    supabase.from('newsletter_signups').select('*', { count: 'exact', head: true }).is('unsubscribed_at', null),
    supabase.from('newsletter_signups').select('*', { count: 'exact', head: true }).gte('subscribed_at', d30.toISOString()),
    supabase.from('newsletter_signups').select('*', { count: 'exact', head: true }).gte('subscribed_at', d365.toISOString()),
    supabase.from('articles').select('*', { count: 'exact', head: true }).eq('status', 'published'),
    supabase.from('articles').select('*', { count: 'exact', head: true }).eq('status', 'scheduled'),
    supabase.from('articles').select('*', { count: 'exact', head: true }).eq('status', 'draft'),
    supabase.from('deals').select('*', { count: 'exact', head: true }).eq('status', 'active'),
    supabase.from('events').select('*', { count: 'exact', head: true }),
    supabase.from('listing_analytics').select('*', { count: 'exact', head: true }).eq('event_type', 'heart_save'),
    supabase.from('comments').select('*', { count: 'exact', head: true }),
    supabase.from('inquiries').select('*', { count: 'exact', head: true }),
  ])

  return {
    totalSubscriptions: subs.count ?? 0,
    subscriptions30dAgo: subs30.count ?? 0,
    subscriptions1yAgo: subs365.count ?? 0,
    totalMemberships: members.count ?? 0,
    memberships30dAgo: members30.count ?? 0,
    memberships1yAgo: members365.count ?? 0,
    totalNewsletter: newsletter.count ?? 0,
    newsletter30dAgo: newsletter30.count ?? 0,
    newsletter1yAgo: newsletter365.count ?? 0,
    publishedArticles: publishedArticles.count ?? 0,
    scheduledArticles: scheduledArticles.count ?? 0,
    pendingReviews: pendingReviews.count ?? 0,
    totalDeals: activeDeals.count ?? 0,
    totalEvents: events.count ?? 0,
    totalHeartSaves: heartSaves.count ?? 0,
    totalComments: comments.count ?? 0,
    totalFormSubmissions: inquiries.count ?? 0,
  }
}

export interface SubsByCategory { name: string; count: number }

export async function getSubscriptionsByCategory(): Promise<SubsByCategory[]> {
  const { data, error } = await supabase
    .from('listing_subscriptions')
    .select('listing:listings!listing_id(category:categories!category_id(name))')
    .eq('status', 'active')

  if (error) { console.error('[analytics.service] getSubscriptionsByCategory:', error.message); return [] }

  const counts: Record<string, number> = {}
  for (const row of data as any[]) {
    const name: string = row.listing?.category?.name ?? 'Unknown'
    counts[name] = (counts[name] ?? 0) + 1
  }
  return Object.entries(counts).map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count)
}

export async function getSubscriptionsByTier(): Promise<{ name: string; value: number; fill: string }[]> {
  const { data, error } = await supabase
    .from('listing_subscriptions')
    .select('tier:subscription_tiers!tier_id(name)')
    .eq('status', 'active')

  if (error) { console.error('[analytics.service] getSubscriptionsByTier:', error.message); return [] }

  const TIER_COLORS: Record<string, string> = {
    free: '#E5E7EB',
    standard: '#FDE68A',
    premium: '#CF9921',
    elite: '#92400E',
  }
  const counts: Record<string, number> = {}
  for (const row of data as any[]) {
    const name: string = (row.tier?.name ?? 'free').toLowerCase()
    counts[name] = (counts[name] ?? 0) + 1
  }
  return Object.entries(counts).map(([name, value]) => ({
    name: name.charAt(0).toUpperCase() + name.slice(1),
    value,
    fill: TIER_COLORS[name] ?? '#E5E7EB',
  }))
}

export async function getTopArticles(limit = 5) {
  const { data, error } = await supabase
    .from('articles')
    .select('id, title, views, category:categories!category_id(name)')
    .eq('status', 'published')
    .order('views', { ascending: false })
    .limit(limit)

  if (error) { console.error('[analytics.service] getTopArticles:', error.message); return [] }
  return (data ?? []) as { id: string; title: string; views: number; category: { name: string } | null }[]
}

export async function getTopHeartSaves(limit = 5) {
  const { data, error } = await supabase
    .from('listing_analytics')
    .select('listing_id')
    .eq('event_type', 'heart_save')

  if (error) { console.error('[analytics.service] getTopHeartSaves:', error.message); return [] }

  const counts: Record<string, number> = {}
  for (const row of data ?? []) counts[row.listing_id] = (counts[row.listing_id] ?? 0) + 1

  const topIds = Object.entries(counts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([id]) => id)

  if (!topIds.length) return []

  const { data: listings } = await supabase
    .from('listings')
    .select('id, title')
    .in('id', topIds)

  return (listings ?? []).map((l: any) => ({ name: l.title, saves: counts[l.id] ?? 0 }))
    .sort((a, b) => b.saves - a.saves)
}

export async function getRecentFormSubmissions(limit = 6) {
  const { data, error } = await supabase
    .from('inquiries')
    .select('id, name, status, created_at, listing:listings!listing_id(title, category:categories!category_id(name))')
    .order('created_at', { ascending: false })
    .limit(limit)

  if (error) { console.error('[analytics.service] getRecentFormSubmissions:', error.message); return [] }
  return (data ?? []) as any[]
}

export async function getCommentsByArticle(limit = 5) {
  const { data, error } = await supabase
    .from('comments')
    .select('article_id')

  if (error) { console.error('[analytics.service] getCommentsByArticle:', error.message); return [] }

  const counts: Record<string, number> = {}
  for (const row of data ?? []) counts[row.article_id] = (counts[row.article_id] ?? 0) + 1

  const topIds = Object.entries(counts).sort((a, b) => b[1] - a[1]).slice(0, limit).map(([id]) => id)
  if (!topIds.length) return []

  const { data: articles } = await supabase
    .from('articles')
    .select('id, title')
    .in('id', topIds)

  return (articles ?? []).map((a: any) => ({ post: a.title, count: counts[a.id] ?? 0 }))
    .sort((a, b) => b.count - a.count)
}

export async function getDailyEngagementByCategory(days = 7) {
  const since = new Date()
  since.setDate(since.getDate() - days)

  const { data, error } = await supabase
    .from('listing_analytics')
    .select('event_type, created_at, listing:listings!listing_id(category:categories!category_id(name))')
    .gte('created_at', since.toISOString())

  if (error) { console.error('[analytics.service] getDailyEngagementByCategory:', error.message); return [] }

  // Group by day × category
  const byDay: Record<string, Record<string, number>> = {}
  for (const row of data as any[]) {
    const day = new Date(row.created_at).toLocaleDateString('en-US', { weekday: 'short' })
    const cat = (row.listing?.category?.name ?? 'Other').toLowerCase().replace(/\s+/g, '_')
    if (!byDay[day]) byDay[day] = {}
    byDay[day][cat] = (byDay[day][cat] ?? 0) + 1
  }

  return Object.entries(byDay).map(([day, cats]) => ({ day, ...cats }))
}

// ─── Dashboard Overview Stats ─────────────────────────────────────────────────

export interface DashboardStats {
  totalUsers: number
  totalArticles: number
  totalFavorites: number
  totalInquiries: number
  totalImpressions: number
  totalClicks: number
}

export async function getDashboardStats(): Promise<DashboardStats> {
  const [users, articles, favorites, inquiries, impressions, clicks] =
    await Promise.all([
      supabase.from('users').select('*', { count: 'exact', head: true }),
      supabase.from('articles').select('*', { count: 'exact', head: true }).eq('status', 'published'),
      supabase.from('favorites').select('*', { count: 'exact', head: true }),
      supabase.from('inquiries').select('*', { count: 'exact', head: true }).eq('status', 'pending'),
      supabase.from('listing_analytics').select('*', { count: 'exact', head: true }).eq('event_type', 'impression'),
      supabase.from('listing_analytics').select('*', { count: 'exact', head: true }).eq('event_type', 'click'),
    ])

  return {
    totalUsers: users.count ?? 0,
    totalArticles: articles.count ?? 0,
    totalFavorites: favorites.count ?? 0,
    totalInquiries: inquiries.count ?? 0,
    totalImpressions: impressions.count ?? 0,
    totalClicks: clicks.count ?? 0,
  }
}
