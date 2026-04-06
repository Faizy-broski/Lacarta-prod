import Link from 'next/link'
import { UserAuthForm } from './components/user-auth-form'

export function SignIn() {
  return (
    <div className='space-y-6'>
      <div className='space-y-2'>
        <h1 className='font-antigua text-2xl font-semibold tracking-tight'>
          Welcome back
        </h1>
        <p className='text-sm text-muted-foreground'>
          Enter your credentials to access your account.
        </p>
      </div>

      <UserAuthForm />

      <p className='text-center text-sm text-muted-foreground'>
        Don&apos;t have an account?{' '}
        <Link
          href='/sign-up'
          className='font-medium text-gold underline-offset-4 hover:underline'
        >
          Sign up
        </Link>
      </p>
    </div>
  )
}