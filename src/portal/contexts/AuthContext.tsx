'use client'
import { createContext, useContext } from 'react'
import { useAuthStore } from '@/lib/auth/auth.store'
import { supabase } from '@/lib/supabase'
import { signIn as authSignIn, signUp as authSignUp } from '@/lib/auth/auth.service'

interface AuthContextValue {
  user: ReturnType<typeof useAuthStore.getState>['user']
  signOut: () => Promise<void>
  signIn: (email: string, password: string) => Promise<{ error: any }>
  signUp: (email: string, password: string, meta: { full_name: string; role: string }) => Promise<{ error: any }>
  resetPassword: (email: string) => Promise<{ error: any }>
}

const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const user = useAuthStore((s) => s.user)
  const logout = useAuthStore((s) => s.logout)

  const signOut = async () => {
    await supabase.auth.signOut()
    logout()
  }

  const signIn = async (email: string, password: string) => {
    try {
      await authSignIn(email, password)
      return { error: null }
    } catch (err) {
      return { error: err }
    }
  }

  const signUp = async (email: string, password: string, meta: { full_name: string; role: string }) => {
    try {
      await authSignUp(email, password, meta.full_name, meta.role || 'subscriber')
      return { error: null }
    } catch (err) {
      return { error: err }
    }
  }

  const resetPassword = async (email: string) => {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    })
    return { error }
  }

  return (
    <AuthContext.Provider value={{ user, signOut, signIn, signUp, resetPassword }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
