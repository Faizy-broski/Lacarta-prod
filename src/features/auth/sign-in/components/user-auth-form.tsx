'use client'
import { useState } from 'react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2, LogIn } from 'lucide-react'
import { signIn } from '@/lib/auth/auth.service'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { PasswordInput } from '@/components/password-input'

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const formSchema = z.object({
  email: z
    .string()
    .min(1, 'Please enter your email')
    .refine((v) => emailRegex.test(v.trim()), 'Invalid email address'),
  password: z
    .string()
    .min(1, 'Please enter your password')
    .min(7, 'Password must be at least 7 characters long'),
})

interface UserAuthFormProps extends React.HTMLAttributes<HTMLFormElement> {
  redirectTo?: string
}

export function UserAuthForm({
  className,
  redirectTo,
  ...props
}: UserAuthFormProps) {
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  async function onSubmit(data: z.infer<typeof formSchema>) {
    setIsLoading(true)

    try {
      const redirect = await signIn(data.email.trim(), data.password)

      if (redirect) {
        // Full navigation so Next.js middleware re-reads the Supabase session cookie
        window.location.href = redirectTo ?? redirect
      } else {
        setIsLoading(false)
      }
    } catch {
      setIsLoading(false)
    }

    // const { data: signInData, error: signInError } =
    //   await supabase.auth.signInWithPassword({
    //     email: data.email,
    //     password: data.password,
    //   })

    // if (signInError || !signInData.user) {
    //   const code = (signInError as any)?.code ?? ''
    //   toast.error(getAuthErrorMessage(code))
    //   setIsLoading(false)
    //   return
    // }

    // const { data: userData, error: userError } = await supabase
    //   .from('users')
    //   .select('role')
    //   .eq('id', signInData.user.id)
    //   .single()

    // if (userError || !userData) {
    //   toast.error('Could not fetch user role. Please contact support.')
    //   await supabase.auth.signOut()
    //   setIsLoading(false)
    //   return
    // }

    // const role = userData.role as UserRole
    // const redirectPath = ROLE_REDIRECT[role]

    // if (!redirectPath) {
    //   toast.error('Unknown role assigned. Please contact support.')
    //   await supabase.auth.signOut()
    //   setIsLoading(false)
    //   return
    // }

    // auth.setUser({
    //   accountNo: signInData.user.id,
    //   email: signInData.user.email ?? '',
    //   role: [role],
    //   exp: Date.now() + 24 * 60 * 60 * 1000,
    // })

    // auth.setSession(
    //   {
    //     accountNo: signInData.user.id,
    //     email: signInData.user.email ?? '',
    //     role: [role],
    //     exp: Date.now() + 24 * 60 * 60 * 1000,
    //   },
    //   signInData.session?.access_token ?? ''
    // )

    // auth.setAccessToken(signInData.session?.access_token ?? '')

    // toast.success(`Welcome back, ${signInData.user.email}!`)

    // setIsLoading(false)

    // navigate(redirectTo || redirectPath, { replace: true })
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn('grid gap-4', className)}
        {...props}
      >
        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='text-xs font-medium uppercase tracking-wider text-muted-foreground'>
                Email
              </FormLabel>
              <FormControl>
                <Input
                  placeholder='name@example.com'
                  className='h-11 rounded-lg border-border/50 bg-muted/30 transition-colors focus-within:bg-background'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='password'
          render={({ field }) => (
            <FormItem className='relative'>
              <FormLabel className='text-xs font-medium uppercase tracking-wider text-muted-foreground'>
                Password
              </FormLabel>
              <FormControl>
                <PasswordInput
                  placeholder='••••••••'
                  className='h-11 rounded-lg border-border/50 bg-muted/30 transition-colors focus-within:bg-background'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          className='mt-3 h-11 rounded-lg bg-gradient-to-r from-gold to-gold-light font-semibold text-black shadow-md transition-all hover:shadow-lg hover:brightness-110'
          disabled={isLoading}
        >
          {isLoading ? <Loader2 className='animate-spin' /> : <LogIn className='mr-1 h-4 w-4' />}
          Sign in
        </Button>
      </form>
    </Form>
  )
}
