'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/lib/auth/auth.store'
import { SubscriberProfilePage } from '@/features/subscriber-profile'

export default function Page() {
  const user = useAuthStore((s) => s.user)
  const router = useRouter()

  useEffect(() => {
    if (user === null) router.replace('/sign-in')
  }, [user, router])

  if (!user) return null
  return <SubscriberProfilePage />
}
