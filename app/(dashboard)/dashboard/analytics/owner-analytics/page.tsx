'use client'
import RoleGuard from '@/lib/auth/role.guard'
import { OwnerAnalyticsPage } from '@/features/owner-analytics/index'

export default function Page() {
  return (
    <RoleGuard allowed={['owner']}>
      <OwnerAnalyticsPage />
    </RoleGuard>
  )
}
