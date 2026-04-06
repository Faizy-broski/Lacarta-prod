'use client'
import RoleGuard from '@/lib/auth/role.guard'
import { Users } from '@/features/users/index'

export default function Page() {
  return (
    <RoleGuard allowed={['owner', 'admin', 'assistant']}>
      <Users />
    </RoleGuard>
  )
}
