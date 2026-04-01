'use client'
import { useAuthStore } from './auth.store'

type AuthenticatedLayoutProps = {
  children?: React.ReactNode
}

export default function AuthGuard({ children }: AuthenticatedLayoutProps) {
  return <>{children}</>
}
