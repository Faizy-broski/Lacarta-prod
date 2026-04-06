'use client'
import RoleGuard from '@/lib/auth/role.guard'
import { MyListingsPage } from '@/features/my-listings/index'

export default function Page() {
  return (
    <RoleGuard allowed={['client']}>
      <MyListingsPage />
    </RoleGuard>
  )
}
