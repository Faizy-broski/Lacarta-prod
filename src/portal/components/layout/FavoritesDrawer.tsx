'use client'
import React, { useEffect, useMemo, useState } from 'react'
import { X, Heart, Trash2, Globe } from 'lucide-react'
import Link from 'next/link'
import { fetchFavoritesWithDetails, removeFavorite, type FavoriteWithDetails } from '@/lib/services/favorites.service'
import { useAuthStore } from '@/lib/auth/auth.store'
import { toast } from 'sonner'

interface FavoritesDrawerProps {
  open: boolean
  onClose: () => void
}

// Map category name → detail route prefix and listing-page route
const CATEGORY_ROUTES: Record<string, { detail: string; listPage: string }> = {
  Hotels:       { detail: '/Detailed-Hotel',      listPage: '/hotels' },
  Beaches:      { detail: '/Detailed-Beach',      listPage: '/beaches' },
  Activities:   { detail: '/Detailed-Activity',   listPage: '/activities' },
  Boating:      { detail: '/Detailed-Boating',    listPage: '/boating' },
  Gastronomy:   { detail: '/Detailed-Gastronomy', listPage: '/gastronomy' },
  'Real Estate':{ detail: '/Detailed-RealEstate', listPage: '/real-estate' },
}

function getDetailUrl(fav: FavoriteWithDetails) {
  // Page favorites store the pathname directly as seo_slug
  if (fav.item_type === 'page') return fav.seo_slug ?? fav.item_id
  if (fav.item_type !== 'listing') return `/${fav.item_type}/${fav.seo_slug ?? fav.item_id}`
  const routes = fav.category_name ? CATEGORY_ROUTES[fav.category_name] : null
  const base = routes?.detail ?? '/listings'
  return `${base}/${fav.seo_slug ?? fav.item_id}`
}

function getListPageUrl(categoryName: string | null) {
  if (!categoryName) return '#'
  return CATEGORY_ROUTES[categoryName]?.listPage ?? '#'
}

export function FavoritesDrawer({ open, onClose }: FavoritesDrawerProps) {
  const user = useAuthStore((s) => s.user)
  const [favorites, setFavorites] = useState<FavoriteWithDetails[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!open || !user?.accountNo) return
    setLoading(true)
    fetchFavoritesWithDetails(user.accountNo)
      .then(setFavorites)
      .finally(() => setLoading(false))
  }, [open, user?.accountNo])

  // Group by category_name (or item_type for non-listings)
  const grouped = useMemo(() => {
    const map = new Map<string, FavoriteWithDetails[]>()
    for (const fav of favorites) {
      const key = fav.category_name ?? fav.item_type
      if (!map.has(key)) map.set(key, [])
      map.get(key)!.push(fav)
    }
    return map
  }, [favorites])

  const handleRemove = async (fav: FavoriteWithDetails) => {
    if (!user?.accountNo) return
    try {
      await removeFavorite(user.accountNo, fav.item_type, fav.item_id)
      setFavorites((prev) => prev.filter((f) => f.id !== fav.id))
      toast.success('Removed from favorites')
    } catch {
      toast.error('Could not remove favorite')
    }
  }

  if (!open) return null

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 z-[1000] bg-black/40"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer panel */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="My Favorites"
        className="fixed right-0 top-0 z-[1001] h-full w-80 sm:w-96 flex flex-col"
        style={{ backgroundColor: '#F5C518' }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b-2 border-black/20">
          <h2
            className="text-2xl font-extrabold text-black"
            style={{ fontFamily: 'Georgia, serif' }}
          >
            My Favorites
          </h2>
          <button
            onClick={onClose}
            className="text-black hover:opacity-70 transition p-1"
            aria-label="Close favorites"
          >
            <X className="w-6 h-6" strokeWidth={2.5} />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-5 py-4">
          {loading ? (
            <div className="flex items-center justify-center h-40">
              <span
                className="text-black font-bold italic"
                style={{ fontFamily: 'Georgia, serif' }}
              >
                Loading…
              </span>
            </div>
          ) : favorites.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-48 gap-3">
              <Heart className="w-10 h-10 text-black opacity-40" />
              <p
                className="text-black font-bold italic text-center"
                style={{ fontFamily: 'Georgia, serif' }}
              >
                No items in your wishlist yet
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {Array.from(grouped.entries()).map(([category, items]) => (
                <section key={category}>
                  {/* Category heading */}
                  <h3
                    className="text-xl font-extrabold text-black mb-3"
                    style={{ fontFamily: 'Georgia, serif' }}
                  >
                    {category}
                  </h3>

                  {/* Cards */}
                  <div className="space-y-2">
                    {items.map((fav) => (
                      <div
                        key={fav.id}
                        className="flex items-center gap-3 border-2 border-black rounded-lg overflow-hidden bg-[#F5C518]"
                      >
                        {/* Thumbnail */}
                        <div className="shrink-0 w-20 h-16 bg-black/10 overflow-hidden">
                          {fav.item_type === 'page' ? (
                            <div className="w-full h-full flex items-center justify-center bg-black/15">
                              <Globe className="w-7 h-7 text-black/50" />
                            </div>
                          ) : fav.cover_image ? (
                            <img
                              src={fav.cover_image}
                              alt={fav.title}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <Heart className="w-6 h-6 text-black/30" />
                            </div>
                          )}
                        </div>

                        {/* Title */}
                        <div className="flex-1 min-w-0 py-2">
                          <Link
                            href={getDetailUrl(fav)}
                            className="block text-sm font-bold text-black leading-snug hover:underline line-clamp-2"
                            style={{ fontFamily: 'Georgia, serif' }}
                            onClick={onClose}
                          >
                            {fav.title}
                          </Link>
                        </div>

                        {/* Remove */}
                        <button
                          onClick={() => handleRemove(fav)}
                          className="shrink-0 mr-3 text-black/50 hover:text-red-600 transition"
                          aria-label="Remove from favorites"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>

                  {/* View all — only for listing categories, not for pages */}
                  {category !== 'Pages' && (
                    <Link
                      href={getListPageUrl(items[0]?.category_name ?? null)}
                      className="block mt-2 text-base font-extrabold text-black hover:underline"
                      style={{ fontFamily: 'Georgia, serif' }}
                      onClick={onClose}
                    >
                      View all
                    </Link>
                  )}
                </section>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  )
}
