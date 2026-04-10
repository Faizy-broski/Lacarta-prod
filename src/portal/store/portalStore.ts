'use client'
/**
 * portalStore
 *
 * Lightweight store so listing detail pages can broadcast their ID/title
 * to portal-level UI (floating Share & Favorite buttons in Layout).
 */
import { create } from 'zustand'

interface PortalState {
  currentListingId: string | null
  currentListingTitle: string | null
  setCurrentListing: (id: string, title: string) => void
  clearCurrentListing: () => void
}

export const usePortalStore = create<PortalState>((set) => ({
  currentListingId: null,
  currentListingTitle: null,
  setCurrentListing: (id, title) => set({ currentListingId: id, currentListingTitle: title }),
  clearCurrentListing: () => set({ currentListingId: null, currentListingTitle: null }),
}))
