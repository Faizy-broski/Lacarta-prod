'use client'
import { Suspense } from 'react'
import RoleGuard from '@/lib/auth/role.guard'
import { ListingsPage } from '@/features/listings/index'

export default function Page() {
  return (
    <RoleGuard allowed={['owner', 'admin']}>
      <Suspense>
        <ListingsPage />
      </Suspense>
    </RoleGuard>
  )
}
