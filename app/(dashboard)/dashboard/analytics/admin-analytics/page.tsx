'use client'
import RoleGuard from '@/lib/auth/role.guard'
import { AnalyticsPage } from '@/features/analytics/index'

export default function Page() {
  return (
    <RoleGuard allowed={['owner', 'assistant']}>
      <AnalyticsPage />
    </RoleGuard>
  )
}
