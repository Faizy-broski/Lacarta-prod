'use client'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useAuthStore } from "./auth.store"

interface Props {
  allowed: string[]
  children: React.ReactNode
}

export default function RoleGuard({ allowed, children }: Props) {
  const router = useRouter()
  const user = useAuthStore((s) => s.user)

  useEffect(() => {
    if (!user || !allowed.includes(user.role[0])) {
      router.replace("/unauthorized")
    }
  }, [user, allowed, router])

  if (!user || !allowed.includes(user.role[0])) {
    return null
  }

  return <>{children}</>
}
