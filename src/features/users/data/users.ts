import { supabase } from '@/lib/supabase'
import { type User } from './schema'

export async function fetchUsers(): Promise<User[]> {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('[users] fetchUsers:', error.message)
    return []
  }
  return (data ?? []) as User[]
}
