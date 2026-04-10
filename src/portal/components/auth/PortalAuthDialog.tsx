'use client'

/**
 * PortalAuthDialog
 *
 * Sign In / Sign Up popup for public portal users (subscribers).
 * Uses useAuthStore + auth.service directly — no AuthProvider needed.
 *
 * Usage:
 *   <PortalAuthDialog trigger={<button>Login</button>} />
 *   or controlled:
 *   <PortalAuthDialog open={open} onOpenChange={setOpen} />
 */

import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@public/components/ui/dialog'
import { Button } from '@public/components/ui/button'
import { Input } from '@public/components/ui/input'
import { Label } from '@public/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@public/components/ui/tabs'
import { Loader2, X } from 'lucide-react'
import { signIn, signUp } from '@/lib/auth/auth.service'

interface PortalAuthDialogProps {
  trigger?: React.ReactNode
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

export default function PortalAuthDialog({
  trigger,
  open: controlledOpen,
  onOpenChange,
}: PortalAuthDialogProps) {
  const [internalOpen, setInternalOpen] = useState(false)
  const isOpen = controlledOpen ?? internalOpen
  const setOpen = onOpenChange ?? setInternalOpen

  const [tab, setTab] = useState<'signin' | 'signup'>('signin')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  // Sign In state
  const [siEmail, setSiEmail] = useState('')
  const [siPassword, setSiPassword] = useState('')

  // Sign Up state
  const [suName, setSuName] = useState('')
  const [suEmail, setSuEmail] = useState('')
  const [suPassword, setSuPassword] = useState('')
  const [suConfirm, setSuConfirm] = useState('')

  const reset = () => {
    setError('')
    setSuccess('')
    setSiEmail('')
    setSiPassword('')
    setSuName('')
    setSuEmail('')
    setSuPassword('')
    setSuConfirm('')
  }

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await signIn(siEmail, siPassword)
      setSuccess('Welcome back!')
      setTimeout(() => {
        setOpen(false)
        reset()
      }, 800)
    } catch (err: any) {
      setError(err?.message ?? 'Invalid email or password')
    } finally {
      setLoading(false)
    }
  }

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    if (suPassword !== suConfirm) {
      setError('Passwords do not match')
      return
    }
    if (suPassword.length < 6) {
      setError('Password must be at least 6 characters')
      return
    }
    setLoading(true)
    try {
      await signUp(suEmail, suPassword, suName, 'subscriber')
      setSuccess('Account created! Check your email to confirm.')
      setTimeout(() => {
        setOpen(false)
        reset()
      }, 2000)
    } catch (err: any) {
      setError(err?.message ?? 'Could not create account')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(v) => {
        setOpen(v)
        if (!v) reset()
      }}
    >
      {trigger && (
        <span onClick={() => setOpen(true)} className='cursor-pointer'>
          {trigger}
        </span>
      )}

      <DialogContent className='sm:max-w-md p-0 overflow-hidden rounded-2xl'>
        <div className='bg-gradient-to-b from-gold/10 to-white px-6 pt-6 pb-4'>
          <DialogHeader>
            <DialogTitle className='text-center text-xl font-extrabold font-antigua text-black'>
              {tab === 'signin' ? 'Welcome Back' : 'Join La Carta'}
            </DialogTitle>
            <p className='text-center text-xs text-gray-500 mt-1'>
              {tab === 'signin'
                ? 'Sign in to leave reviews and save favorites'
                : 'Create a free account to review and save your favorites'}
            </p>
          </DialogHeader>
        </div>

        <div className='px-6 pb-6'>
          <Tabs value={tab} onValueChange={(v) => { setTab(v as any); setError(''); setSuccess('') }}>
            <TabsList className='w-full mb-5 rounded-full bg-gray-100'>
              <TabsTrigger value='signin' className='flex-1 rounded-full font-antigua font-bold text-xs'>
                Sign In
              </TabsTrigger>
              <TabsTrigger value='signup' className='flex-1 rounded-full font-antigua font-bold text-xs'>
                Sign Up
              </TabsTrigger>
            </TabsList>

            {/* ── Sign In ── */}
            <TabsContent value='signin'>
              <form onSubmit={handleSignIn} className='space-y-4'>
                <div className='space-y-1.5'>
                  <Label className='text-xs font-bold'>Email</Label>
                  <Input
                    type='email'
                    placeholder='your@email.com'
                    value={siEmail}
                    onChange={(e) => setSiEmail(e.target.value)}
                    required
                    className='rounded-xl text-sm'
                  />
                </div>
                <div className='space-y-1.5'>
                  <Label className='text-xs font-bold'>Password</Label>
                  <Input
                    type='password'
                    placeholder='••••••••'
                    value={siPassword}
                    onChange={(e) => setSiPassword(e.target.value)}
                    required
                    className='rounded-xl text-sm'
                  />
                </div>

                {error && <p className='text-xs text-red-500 font-medium'>{error}</p>}
                {success && <p className='text-xs text-green-600 font-medium'>{success}</p>}

                <Button
                  type='submit'
                  disabled={loading}
                  className='w-full rounded-full bg-gradient-to-r from-gold to-gold-light font-bold font-antigua text-white hover:brightness-110'
                >
                  {loading ? <Loader2 size={16} className='animate-spin' /> : 'Sign In'}
                </Button>

                <p className='text-center text-xs text-gray-400'>
                  Don't have an account?{' '}
                  <button
                    type='button'
                    onClick={() => setTab('signup')}
                    className='text-gold font-bold hover:underline'
                  >
                    Sign up free
                  </button>
                </p>
              </form>
            </TabsContent>

            {/* ── Sign Up ── */}
            <TabsContent value='signup'>
              <form onSubmit={handleSignUp} className='space-y-4'>
                <div className='space-y-1.5'>
                  <Label className='text-xs font-bold'>Full Name</Label>
                  <Input
                    placeholder='Your name'
                    value={suName}
                    onChange={(e) => setSuName(e.target.value)}
                    required
                    className='rounded-xl text-sm'
                  />
                </div>
                <div className='space-y-1.5'>
                  <Label className='text-xs font-bold'>Email</Label>
                  <Input
                    type='email'
                    placeholder='your@email.com'
                    value={suEmail}
                    onChange={(e) => setSuEmail(e.target.value)}
                    required
                    className='rounded-xl text-sm'
                  />
                </div>
                <div className='space-y-1.5'>
                  <Label className='text-xs font-bold'>Password</Label>
                  <Input
                    type='password'
                    placeholder='Min 6 characters'
                    value={suPassword}
                    onChange={(e) => setSuPassword(e.target.value)}
                    required
                    className='rounded-xl text-sm'
                  />
                </div>
                <div className='space-y-1.5'>
                  <Label className='text-xs font-bold'>Confirm Password</Label>
                  <Input
                    type='password'
                    placeholder='••••••••'
                    value={suConfirm}
                    onChange={(e) => setSuConfirm(e.target.value)}
                    required
                    className='rounded-xl text-sm'
                  />
                </div>

                {error && <p className='text-xs text-red-500 font-medium'>{error}</p>}
                {success && <p className='text-xs text-green-600 font-medium'>{success}</p>}

                <Button
                  type='submit'
                  disabled={loading}
                  className='w-full rounded-full bg-gradient-to-r from-gold to-gold-light font-bold font-antigua text-white hover:brightness-110'
                >
                  {loading ? <Loader2 size={16} className='animate-spin' /> : 'Create Account'}
                </Button>

                <p className='text-center text-xs text-gray-400'>
                  Already have an account?{' '}
                  <button
                    type='button'
                    onClick={() => setTab('signin')}
                    className='text-gold font-bold hover:underline'
                  >
                    Sign in
                  </button>
                </p>
              </form>
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  )
}
