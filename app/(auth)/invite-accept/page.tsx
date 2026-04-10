'use client'

import { useEffect, useRef, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

/**
 * Invite-accept page — supports two Supabase invite flows:
 *
 * 1. PKCE (default in @supabase/ssr): the /auth/callback route exchanges the
 *    one-time code and sets a session cookie before redirecting here. We just
 *    call getSession() and it works immediately.
 *
 * 2. Implicit (legacy): Supabase appends #access_token=... to the URL. The
 *    browser client auto-processes the hash and fires onAuthStateChange with
 *    SIGNED_IN. We listen for that event with a generous timeout.
 */
export default function InviteAcceptPage() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [sessionReady, setSessionReady] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    // Surface errors forwarded from /auth/callback (e.g. expired token)
    const callbackError = searchParams.get('error')
    if (callbackError) {
      setError(
        callbackError.toLowerCase().includes('expired') ||
          callbackError.toLowerCase().includes('invalid')
          ? 'This invite link has expired or was already used. Please ask the administrator to send a new invite.'
          : callbackError
      )
      setLoading(false)
      return
    }

    let subscription: ReturnType<typeof supabase.auth.onAuthStateChange>['data']['subscription'] | null = null

    async function bootstrap() {
      // Flow 1 — PKCE: session already set by /auth/callback
      const { data: { session } } = await supabase.auth.getSession()
      if (session) {
        setSessionReady(true)
        setLoading(false)
        return
      }

      // Flow 2 — Implicit: wait for the browser client to process the hash
      timeoutRef.current = setTimeout(() => {
        setError(
          'Could not load the invite session. The link may have expired or already been used. ' +
            'Please ask the administrator to send a new invite.'
        )
        setLoading(false)
      }, 12_000)

      const { data } = supabase.auth.onAuthStateChange((event, session) => {
        if ((event === 'SIGNED_IN' || event === 'USER_UPDATED') && session) {
          clearTimeout(timeoutRef.current!)
          setSessionReady(true)
          setLoading(false)
        }
      })
      subscription = data.subscription
    }

    bootstrap()

    return () => {
      clearTimeout(timeoutRef.current!)
      subscription?.unsubscribe()
    }
  }, [searchParams])

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError(null)
    setSuccess(null)

    if (password.length < 8) {
      setError('Password must be at least 8 characters.')
      return
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.')
      return
    }

    setSubmitting(true)
    const { error } = await supabase.auth.updateUser({ password })
    setSubmitting(false)

    if (error) {
      setError(error.message)
      return
    }

    setSuccess('Password set! Redirecting to your dashboard…')
    setTimeout(() => router.replace('/dashboard'), 1500)
  }

  return (
    <div className='mx-auto max-w-lg px-4 py-20'>
      <div className='rounded-3xl border border-gray-200 bg-white p-8 shadow-sm'>
        <h1 className='mb-2 text-2xl font-semibold'>Welcome to La Carta</h1>
        <p className='mb-6 text-sm text-gray-600'>
          Finish setting your account password to complete your first-time login.
        </p>

        {loading ? (
          <div className='flex items-center gap-2 text-sm text-gray-500'>
            <svg className='h-4 w-4 animate-spin' viewBox='0 0 24 24' fill='none'>
              <circle className='opacity-25' cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4' />
              <path className='opacity-75' fill='currentColor' d='M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z' />
            </svg>
            Loading invite session…
          </div>
        ) : error ? (
          <div className='space-y-4'>
            <div className='rounded-md border border-red-200 bg-red-50 p-4 text-sm text-red-800'>
              {error}
            </div>
            <Button variant='outline' className='w-full' onClick={() => router.push('/sign-in')}>
              Back to sign in
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className='space-y-4'>
            <div>
              <Label htmlFor='invite-password'>New password</Label>
              <Input
                id='invite-password'
                type='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder='At least 8 characters'
                autoComplete='new-password'
              />
            </div>
            <div>
              <Label htmlFor='invite-confirm'>Confirm password</Label>
              <Input
                id='invite-confirm'
                type='password'
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder='Repeat your password'
                autoComplete='new-password'
              />
            </div>
            <Button type='submit' disabled={!sessionReady || submitting} className='w-full'>
              {submitting ? 'Saving…' : 'Set password and continue'}
            </Button>
            {success && <p className='text-sm text-green-700'>{success}</p>}
          </form>
        )}
      </div>
    </div>
  )
}

