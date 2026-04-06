'use client'
import RoleGuard from '@/lib/auth/role.guard'
import { ListingsPage } from '@/features/listings/index'

export default function Page() {
  return (
    <RoleGuard allowed={['owner', 'admin']}>
      <ListingsPage />
    </RoleGuard>
  )
}
