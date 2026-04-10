'use client'
export const dynamic = 'force-dynamic'
import { Suspense } from 'react'
import { SignIn } from '@/features/auth/sign-in/index'

export default function SignInPage() {
  return (
    <Suspense>
      <SignIn />
    </Suspense>
  )
}