'use client'

/**
 * ReviewSection
 *
 * Dynamic reviews for listing detail pages.
 * - Fetches real reviews from `listing_reviews` Supabase table
 * - Subscribers can submit a star rating + comment
 * - Non-logged-in users see a "Sign in to review" prompt
 *
 * Required Supabase table (run once in SQL editor):
 * ─────────────────────────────────────────────────
 * CREATE TABLE listing_reviews (
 *   id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
 *   listing_id  UUID NOT NULL REFERENCES listings(id) ON DELETE CASCADE,
 *   user_id     UUID NOT NULL,
 *   user_name   TEXT NOT NULL,
 *   rating      INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
 *   text        TEXT NOT NULL,
 *   created_at  TIMESTAMPTZ DEFAULT NOW()
 * );
 * ALTER TABLE listing_reviews ENABLE ROW LEVEL SECURITY;
 * CREATE POLICY "Anyone can read" ON listing_reviews FOR SELECT USING (true);
 * CREATE POLICY "Subscribers can insert" ON listing_reviews FOR INSERT
 *   WITH CHECK (auth.uid() = user_id);
 */

import { useEffect, useState } from 'react'
import { Star, Loader2, Send } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import { useAuthStore } from '@/lib/auth/auth.store'
import { Button } from '@public/components/ui/button'
import { Textarea } from '@public/components/ui/textarea'
import PortalAuthDialog from '@public/components/auth/PortalAuthDialog'

interface Review {
  id: string
  user_name: string
  rating: number
  text: string
  created_at: string
}

interface ReviewSectionProps {
  listingId: string
}

function StarRating({
  value,
  onChange,
  readonly = false,
  size = 20,
}: {
  value: number
  onChange?: (v: number) => void
  readonly?: boolean
  size?: number
}) {
  const [hovered, setHovered] = useState(0)
  return (
    <div className='flex gap-0.5'>
      {[1, 2, 3, 4, 5].map((n) => (
        <Star
          key={n}
          size={size}
          className={`transition-colors ${
            n <= (readonly ? value : hovered || value)
              ? 'fill-gold text-gold'
              : 'text-gold'
          } ${!readonly ? 'cursor-pointer' : ''}`}
          onMouseEnter={() => !readonly && setHovered(n)}
          onMouseLeave={() => !readonly && setHovered(0)}
          onClick={() => !readonly && onChange?.(n)}
        />
      ))}
    </div>
  )
}

export default function ReviewSection({ listingId }: ReviewSectionProps) {
  const user = useAuthStore((s) => s.user)
  const isSubscriber = user?.role?.includes('subscriber') ?? false

  const [reviews, setReviews] = useState<Review[]>([])
  const [loadingReviews, setLoadingReviews] = useState(true)
  const [authOpen, setAuthOpen] = useState(false)

  // Submit form state
  const [rating, setRating] = useState(0)
  const [text, setText] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')
  const [submitSuccess, setSubmitSuccess] = useState(false)

  useEffect(() => {
    if (!listingId) return
    setLoadingReviews(true)
    supabase
      .from('listing_reviews')
      .select('id, user_name, rating, text, created_at')
      .eq('listing_id', listingId)
      .order('created_at', { ascending: false })
      .then(({ data, error }) => {
        if (!error && data) setReviews(data as Review[])
        setLoadingReviews(false)
      })
  }, [listingId, submitSuccess])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (rating === 0) {
      setSubmitError('Please select a rating')
      return
    }
    if (!text.trim()) {
      setSubmitError('Please write a review')
      return
    }
    setSubmitError('')
    setSubmitting(true)
    const { error } = await supabase.from('listing_reviews').insert({
      listing_id: listingId,
      user_id: user!.accountNo,
      user_name: user!.name || user!.email,
      rating,
      text: text.trim(),
    })
    setSubmitting(false)
    if (error) {
      setSubmitError(error.message)
    } else {
      setSubmitSuccess((v) => !v as any) // toggle to re-fetch
      setRating(0)
      setText('')
    }
  }

  const avgRating =
    reviews.length > 0
      ? reviews.reduce((s, r) => s + r.rating, 0) / reviews.length
      : 0

  return (
    <div className='bg-[#fbf7ef] py-8 md:py-12 px-4 sm:px-6 md:px-10 lg:px-12'>
      <div className='mx-auto max-w-[950px]'>

        {/* Header */}
        <div className='flex items-center justify-between mb-6 md:mb-8'>
          <div>
            <p className='text-[10px] md:text-xs uppercase tracking-widest font-medium text-black/70 mb-1'>
              What guests say
            </p>
            <h2 className='text-xl sm:text-2xl md:text-3xl font-antigua font-extrabold text-black'>
              Reviews
            </h2>
            {reviews.length > 0 && (
              <div className='flex items-center gap-2 mt-1'>
                <StarRating value={Math.round(avgRating)} readonly size={14} />
                <span className='text-xs text-gray-500'>
                  {avgRating.toFixed(1)} · {reviews.length} review{reviews.length !== 1 ? 's' : ''}
                </span>
              </div>
            )}
          </div>

          {/* Auth-gated CTA — always render the dialog so it can be opened */}
          <PortalAuthDialog open={authOpen} onOpenChange={setAuthOpen} />
          {!user ? (
            <button
              onClick={() => setAuthOpen(true)}
              className='text-xs font-bold text-gold border border-gold rounded-full px-4 py-1.5 hover:bg-gold hover:text-white transition font-antigua'
            >
              ✎ Sign in to review
            </button>
          ) : !isSubscriber ? (
            <div className='text-right'>
              <p className='text-xs text-gray-500 font-antigua mb-1'>Want to leave a review?</p>
              <button
                onClick={() => setAuthOpen(true)}
                className='text-xs font-bold text-gold border border-gold rounded-full px-4 py-1.5 hover:bg-gold hover:text-white transition font-antigua'
              >
                Create a subscriber account
              </button>
            </div>
          ) : null}
        </div>

        {/* Submit form — subscribers only */}
        {user && !isSubscriber && (
          <div className='mb-8 bg-white rounded-2xl p-5 shadow border border-dashed border-gold/40 text-center'>
            <p className='text-sm text-gray-500 font-antigua'>
              You need a <span className='font-bold text-gold'>subscriber account</span> to leave reviews.{' '}
              <button onClick={() => setAuthOpen(true)} className='underline text-gold font-bold hover:text-gold/80'>
                Sign up free
              </button>
            </p>
          </div>
        )}
        {user && isSubscriber && (
          <form
            onSubmit={handleSubmit}
            className='mb-8 bg-white rounded-2xl p-5 shadow border border-gray-200'
          >
            <p className='text-sm font-extrabold text-black font-antigua mb-3'>
              Leave a Review
            </p>
            <div className='mb-3'>
              <StarRating value={rating} onChange={setRating} size={24} />
              {rating > 0 && (
                <span className='text-xs text-gray-400 mt-1 block'>
                  {['', 'Poor', 'Fair', 'Good', 'Very Good', 'Excellent'][rating]}
                </span>
              )}
            </div>
            <Textarea
              placeholder='Share your experience...'
              value={text}
              onChange={(e) => setText(e.target.value)}
              className='rounded-xl text-sm resize-none'
              rows={3}
            />
            {submitError && (
              <p className='text-xs text-red-500 font-medium mt-2'>{submitError}</p>
            )}
            <Button
              type='submit'
              disabled={submitting}
              className='mt-3 rounded-full bg-gradient-to-r from-gold to-gold-light font-bold font-antigua text-white text-sm hover:brightness-110'
            >
              {submitting ? (
                <Loader2 size={14} className='animate-spin' />
              ) : (
                <><Send size={14} /> Submit Review</>
              )}
            </Button>
          </form>
        )}

        {/* Review list */}
        {loadingReviews ? (
          <div className='flex justify-center py-8'>
            <Loader2 size={24} className='animate-spin text-gold' />
          </div>
        ) : reviews.length === 0 ? (
          <div className='text-center py-10 text-gray-400'>
            <p className='text-sm font-antigua'>No reviews yet. Be the first!</p>
          </div>
        ) : (
          <div className='space-y-5'>
            {reviews.map((r) => (
              <div
                key={r.id}
                className='bg-white rounded-2xl p-5 shadow border border-gray-200'
              >
                <div className='flex items-start justify-between mb-3'>
                  <div>
                    <h4 className='font-antigua text-base font-extrabold text-black'>
                      {r.user_name}
                    </h4>
                    <p className='text-[10px] text-gray-400 mt-0.5'>
                      {new Date(r.created_at).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </p>
                  </div>
                  <StarRating value={r.rating} readonly size={14} />
                </div>
                <p className='text-sm text-gray-700 leading-relaxed'>{r.text}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
