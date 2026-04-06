'use client'
import RoleGuard from '@/lib/auth/role.guard'
import { CategoryPage } from '@/features/Filters/index'

export default function Page() {
  return (
    <RoleGuard allowed={['owner', 'admin']}>
      <CategoryPage />
    </RoleGuard>
  )
}
