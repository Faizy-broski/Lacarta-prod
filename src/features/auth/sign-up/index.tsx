import Link from 'next/link'
import { SignUpForm } from './components/sign-up-form'

export function SignUp() {
  return (
    <div className='space-y-6'>
      <div className='space-y-2'>
        <h1 className='font-antigua text-2xl font-semibold tracking-tight'>
          Create an account
        </h1>
        <p className='text-sm text-muted-foreground'>
          Fill in your details to get started with La Carta.
        </p>
      </div>

      <SignUpForm />

      <p className='text-center text-sm text-muted-foreground'>
        Already have an account?{' '}
        <Link
          href='/sign-in'
          className='font-medium text-gold underline-offset-4 hover:underline'
        >
          Sign in
        </Link>
      </p>
    </div>
  )
}
