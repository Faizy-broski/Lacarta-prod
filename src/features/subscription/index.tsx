'use client'
import { useAuthStore } from '@/lib/auth/auth.store'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import AccessControl from './components/AccessControl'
import FeaturesLibrary from './components/FeaturesLibrary'
import PlanGrid from './components/PlanGrid'
import TierPricingPanel from './components/TierPricingPanel'

export function Subscription() {
  const user = useAuthStore((s) => s.user)
  const role = user?.role?.[0]

  const isClient = role === 'client'
  const isAdminOrAbove = role === 'owner' || role === 'admin'

  return (
    <>
      <Header />

      <Main>
        {isClient && (
          <>
            <div className='mb-2 space-y-2'>
              <h1 className='font-antigua text-3xl font-bold tracking-tight'>
                Subscription
              </h1>
              <p className='mb-10 text-xs text-muted-foreground'>
                View and manage your subscription plan per listing.
              </p>
            </div>

            <PlanGrid
              clientId={user?.accountNo}
              clientEmail={user?.email}
            />
          </>
        )}

        {isAdminOrAbove && (
          <>
            <div className='mb-2 space-y-2'>
              <h1 className='font-antigua text-3xl font-bold tracking-tight'>
                Admin Management
              </h1>
              <p className='mb-10 text-xs text-muted-foreground'>
                Configure tiers, pricing rules, features and access control.
              </p>
            </div>
            <TierPricingPanel />
            <FeaturesLibrary />
            <AccessControl />
          </>
        )}
      </Main>
    </>
  )
}