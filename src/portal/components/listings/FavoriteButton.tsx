'use client'

/**
 * FavoriteButton
 *
 * Reusable heart button for listing cards.
 * - Logged-out users → opens auth dialog
 * - Logged-in users  → toggles favorite in DB
 */

import { useState, useEffect } from 'react'
import { Heart, Loader2 } from 'lucide-react'
import { useAuthStore } from '@/lib/auth/auth.store'
import { addFavorite, removeFavorite, isFavorited } from '@/lib/services/favorites.service'
import PortalAuthDialog from '@public/components/auth/PortalAuthDialog'
import { toast } from 'sonner'

interface FavoriteButtonProps {
  listingId: string
  className?: string
}

export default function FavoriteButton({ listingId, className = '' }: FavoriteButtonProps) {
  const user = useAuthStore((s) => s.user)
  const [favorited, setFavorited] = useState(false)
  const [loading, setLoading] = useState(false)
  const [authOpen, setAuthOpen] = useState(false)

  useEffect(() => {
    if (!user?.accountNo || !listingId) return
    isFavorited(user.accountNo, 'listing', listingId).then(setFavorited)
  }, [user?.accountNo, listingId])

  const handleClick = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    if (!user) {
      setAuthOpen(true)
      return
    }

    setLoading(true)
    try {
      if (favorited) {
        await removeFavorite(user.accountNo, 'listing', listingId)
        setFavorited(false)
        toast.success('Removed from favorites')
      } else {
        await addFavorite(user.accountNo, 'listing', listingId)
        setFavorited(true)
        toast.success('Saved to favorites!')
      }
    } catch {
      toast.error('Could not update favorites')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <PortalAuthDialog open={authOpen} onOpenChange={setAuthOpen} />
      <button
        onClick={handleClick}
        disabled={loading}
        title={favorited ? 'Remove from favorites' : 'Save to favorites'}
        className={`rounded-full p-2 shadow-lg transition active:scale-90 hover:scale-110 ${
          favorited
            ? 'bg-gold text-white'
            : 'bg-white/30 backdrop-blur text-white hover:bg-white/60'
        } ${className}`}
      >
        {loading ? (
          <Loader2 size={16} className='animate-spin' />
        ) : (
          <Heart
            size={16}
            className={favorited ? 'fill-white text-white' : 'fill-white'}
          />
        )}
      </button>
    </>
  )
}
