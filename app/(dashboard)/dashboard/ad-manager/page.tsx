'use client'
import RoleGuard from '@/lib/auth/role.guard'
import { AdManagerPage } from '@/features/ad-manager'

export default function Page() {
  return (
    <RoleGuard allowed={['owner', 'admin']}>
      <AdManagerPage />
    </RoleGuard>
  )
}
