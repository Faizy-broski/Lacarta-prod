'use client'
import { createContext, useContext } from 'react'
import { useAuthStore } from '@/lib/auth/auth.store'
import { supabase } from '@/lib/supabase'

interface AuthContextValue {
  user: ReturnType<typeof useAuthStore.getState>['user']
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const user = useAuthStore((s) => s.user)
  const logout = useAuthStore((s) => s.logout)

  const signOut = async () => {
    await supabase.auth.signOut()
    logout()
  }

  return (
    <AuthContext.Provider value={{ user, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
