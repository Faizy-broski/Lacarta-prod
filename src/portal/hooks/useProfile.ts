'use client'
import { useAuthStore } from '@/lib/auth/auth.store'

export function useProfile() {
  const user = useAuthStore((s) => s.user)
  return {
    profile: user
      ? {
          id: user.accountNo,
          full_name: user.name,
          email: user.email,
          avatar_url: user.profile_photo_url,
        }
      : null,
  }
}
