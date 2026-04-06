import Link from 'next/link'
import { ShieldOff } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function UnauthorizedPage() {
  return (
    <div className='flex min-h-screen flex-col items-center justify-center gap-6 bg-background text-center px-4'>
      <div className='flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10'>
        <ShieldOff className='h-8 w-8 text-destructive' />
      </div>
      <div className='space-y-2'>
        <h1 className='text-2xl font-bold tracking-tight'>Access Denied</h1>
        <p className='text-sm text-muted-foreground max-w-sm'>
          You don&apos;t have permission to view this page. Contact your administrator if you believe this is a mistake.
        </p>
      </div>
      <Button asChild>
        <Link href='/dashboard'>Return to Dashboard</Link>
      </Button>
    </div>
  )
}
