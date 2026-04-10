'use client'
import { Suspense } from 'react'
import RoleGuard from '@/lib/auth/role.guard'
import { Subscription } from '@/features/subscription/index'

export default function Page() {
  return (
    <RoleGuard allowed={['owner', 'admin', 'client']}>
      <Suspense>
        <Subscription />
      </Suspense>
    </RoleGuard>
  )
}
