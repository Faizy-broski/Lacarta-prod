'use client'
import { useState } from 'react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
// import { IconFacebook, IconGithub } from '@/assets/brand-icons'
import { useAuthStore } from '@/stores/auth-store'
import { signUp } from '@/lib/auth/auth.service'
import { sleep, cn } from '@/lib/utils'
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

const formSchema = z
  .object({
    full_name: z.string().min(2, 'Please enter your name'),

    email: z
      .string()
      .min(1, 'Please enter your email')
      .refine((v) => emailRegex.test(v.trim()), 'Invalid email address'),
    password: z
      .string()
      .min(1, 'Please enter your password')
      .min(7, 'Password must be at least 7 characters long'),
    confirmPassword: z.string().min(1, 'Please confirm your password'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match.",
    path: ['confirmPassword'],
  })

export function SignUpForm({
  className,
  ...props
}: React.HTMLAttributes<HTMLFormElement>) {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { auth } = useAuthStore()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      full_name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  })

  async function onSubmit(data: z.infer<typeof formSchema>) {
    setIsLoading(true)

    const user_role = 'subscriber'

    try {
      const redirect = await signUp(data.email.trim(), data.password, data.full_name, user_role)

      if (redirect) {
        router.push(redirect)
      } else {
        setIsLoading(false)
      }
    } catch {
      setIsLoading(false)
    }

    // toast.promise(sleep(2000), {
    //   loading: 'Signing in...',
    //   success: () => {
    //     setIsLoading(false)

    //     // Mock successful authentication with expiry computed at success time
    //     const mockUser = {
    //       accountNo: 'ACC001',
    //       email: data.email,
    //       role: ['user'],
    //       exp: Date.now() + 24 * 60 * 60 * 1000, // 24 hours from now
    //     }

    //     // Set user and access token
    //     auth.setUser(mockUser)
    //     auth.setAccessToken('mock-access-token')

    //     // Redirect to the stored location or default to dashboard
    //     const targetPath = '/'
    //     navigate(targetPath, { replace: true })

    //     return `Welcome back, ${data.email}!`
    //   },
    //   error: 'Error',
    // })
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
          name='full_name'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='text-xs font-medium uppercase tracking-wider text-muted-foreground'>
                Full Name
              </FormLabel>
              <FormControl>
                <Input
                  placeholder='John Doe'
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
        <div className='grid gap-4 sm:grid-cols-2'>
          <FormField
            control={form.control}
            name='password'
            render={({ field }) => (
              <FormItem>
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
          <FormField
            control={form.control}
            name='confirmPassword'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='text-xs font-medium uppercase tracking-wider text-muted-foreground'>
                  Confirm Password
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
        </div>
        <Button
          className='mt-3 h-11 rounded-lg bg-gradient-to-r from-gold to-gold-light font-semibold text-black shadow-md transition-all hover:shadow-lg hover:brightness-110'
          disabled={isLoading}
        >
          {isLoading ? (
            <span className='flex items-center gap-2'>
              <span className='h-4 w-4 animate-spin rounded-full border-2 border-black/20 border-t-black' />
              Creating account...
            </span>
          ) : (
            'Create account'
          )}
        </Button>
      </form>
    </Form>
  )
}
