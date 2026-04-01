'use client'
import '@public/index.css'
import '@public/Custom-Css/Homepage.css'
import { TooltipProvider } from '@public/components/ui/tooltip'
import { Toaster } from '@public/components/ui/toaster'
import { Toaster as Sonner } from '@public/components/ui/sonner'
import Layout from '@public/components/layout/Layout'

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <Layout>{children}</Layout>
    </TooltipProvider>
  )
}
