'use client'
import React, { useState, useRef, useEffect, useCallback } from 'react'
import { Share2, Link2, Mail, Twitter, Facebook } from 'lucide-react'
import { toast } from 'sonner'

// Pinterest SVG icon (not in lucide)
function PinterestIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z" />
    </svg>
  )
}

interface SharePopoverProps {
  title?: string
}

export function SharePopover({ title }: SharePopoverProps) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  // Close on outside click
  useEffect(() => {
    if (!open) return
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [open])

  const getUrl = () => (typeof window !== 'undefined' ? window.location.href : '')
  const getTitle = () => title ?? (typeof document !== 'undefined' ? document.title : '')

  const copyLink = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(getUrl())
      toast.success('Link copied!')
    } catch {
      toast.error('Could not copy link')
    }
    setOpen(false)
  }, [])

  const openPopup = (url: string) => {
    window.open(url, '_blank', 'width=600,height=450,noopener,noreferrer')
    setOpen(false)
  }

  const shareTwitter = () =>
    openPopup(`https://twitter.com/intent/tweet?url=${encodeURIComponent(getUrl())}&text=${encodeURIComponent(getTitle())}`)

  const shareFacebook = () =>
    openPopup(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(getUrl())}`)

  const sharePinterest = () =>
    openPopup(`https://pinterest.com/pin/create/button/?url=${encodeURIComponent(getUrl())}&description=${encodeURIComponent(getTitle())}`)

  const shareEmail = () => {
    window.location.href = `mailto:?subject=${encodeURIComponent(getTitle())}&body=${encodeURIComponent(getUrl())}`
    setOpen(false)
  }

  const ACTIONS = [
    {
      label: 'Copy link',
      icon: <Link2 className="w-5 h-5 text-white" strokeWidth={2.5} />,
      bg: 'bg-[#f15c5d]',
      onClick: copyLink,
    },
    {
      label: 'Email',
      icon: <Mail className="w-5 h-5 text-white fill-white" />,
      bg: 'bg-[#333]',
      onClick: shareEmail,
    },
    {
      label: 'Twitter / X',
      icon: <Twitter className="w-5 h-5 text-white fill-white" />,
      bg: 'bg-[#333]',
      onClick: shareTwitter,
    },
    {
      label: 'Facebook',
      icon: <Facebook className="w-5 h-5 text-white fill-white" />,
      bg: 'bg-[#333]',
      onClick: shareFacebook,
    },
    {
      label: 'Pinterest',
      icon: <PinterestIcon className="w-5 h-5 text-white" />,
      bg: 'bg-[#333]',
      onClick: sharePinterest,
    },
  ]

  return (
    <div ref={ref} className="relative flex flex-col items-center">
      {/* Main share trigger button */}
      <button
        onClick={() => setOpen((v) => !v)}
        title="Share this page"
        aria-expanded={open}
        className="bg-[#f15c5d] p-1.5 sm:p-2 lg:p-3 rounded-full hover:brightness-110 transition active:scale-95"
      >
        <Share2 className="w-4 h-4 sm:w-5 sm:h-5 lg:w-8 lg:h-8 text-white fill-white" />
      </button>

      {/* Horizontal pill — opens to the RIGHT of the trigger button */}
      {open && (
        <div
          className="absolute left-full top-1/2 -translate-y-1/2 ml-3 flex items-center gap-1.5 sm:gap-2 bg-white/10 backdrop-blur-md rounded-full px-2 py-1.5 shadow-xl"
          style={{ minWidth: 'max-content' }}
        >
          {ACTIONS.map(({ label, icon, bg, onClick }) => (
            <button
              key={label}
              onClick={onClick}
              title={label}
              className={`${bg} rounded-full p-2 sm:p-2.5 hover:brightness-125 transition active:scale-90 flex items-center justify-center`}
            >
              {icon}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
