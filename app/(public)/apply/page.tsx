'use client'

import { useState } from 'react'
import { Loader2, CheckCircle2, Building2 } from 'lucide-react'

const CATEGORIES = [
  'Hotels',
  'Beaches',
  'Gastronomy',
  'Activities',
  'Boating',
  'Real Estate',
]

export default function ApplyPage() {
  const [form, setForm] = useState({
    full_name: '',
    email: '',
    phone: '',
    business_name: '',
    category: '',
    description: '',
    website: '',
  })
  const [agreed, setAgreed] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const set = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm((prev) => ({ ...prev, [key]: e.target.value }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!agreed) { setError('Please agree to the terms to continue.'); return }
    setError(null)
    setSubmitting(true)

    const res = await fetch('/api/client-applications', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })
    const json = await res.json()
    setSubmitting(false)

    if (!res.ok) {
      setError(json.error ?? 'Something went wrong. Please try again.')
    } else {
      setSubmitted(true)
    }
  }

  if (submitted) {
    return (
      <div className='mx-auto max-w-lg px-4 py-20 text-center'>
        <CheckCircle2 className='mx-auto mb-4 h-14 w-14 text-[#CF9921]' />
        <h1 className='font-antigua mb-3 text-2xl font-bold text-gray-900'>Application Submitted!</h1>
        <p className='text-gray-600'>
          Thank you for applying to list your business on La Carta. Our team will review your application
          and contact you within 48 hours with next steps.
        </p>
        <a
          href='/'
          className='mt-8 inline-block rounded-full bg-[#CF9921] px-8 py-3 font-semibold text-white hover:opacity-90'
        >
          Back to Home
        </a>
      </div>
    )
  }

  return (
    <div className='mx-auto max-w-2xl px-4 py-12 sm:px-6'>
      {/* Header */}
      <div className='mb-10 text-center'>
        <div className='mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#CF9921]/15'>
          <Building2 className='h-7 w-7 text-[#CF9921]' />
        </div>
        <h1 className='font-antigua mb-2 text-3xl font-bold text-gray-900'>List Your Business</h1>
        <p className='text-gray-500'>
          Join La Carta and reach thousands of visitors discovering Cartagena. Submit your application
          and our team will set up your business portal.
        </p>
      </div>

      <form onSubmit={handleSubmit} className='space-y-5'>
        {/* Row: Full Name + Email */}
        <div className='grid grid-cols-1 gap-5 sm:grid-cols-2'>
          <div>
            <label className='mb-1.5 block text-sm font-medium text-gray-700'>
              Full Name <span className='text-red-500'>*</span>
            </label>
            <input
              type='text'
              required
              placeholder='Maria García'
              value={form.full_name}
              onChange={set('full_name')}
              className='w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-[#CF9921] focus:ring-1 focus:ring-[#CF9921]'
            />
          </div>
          <div>
            <label className='mb-1.5 block text-sm font-medium text-gray-700'>
              Email <span className='text-red-500'>*</span>
            </label>
            <input
              type='email'
              required
              placeholder='maria@example.com'
              value={form.email}
              onChange={set('email')}
              className='w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-[#CF9921] focus:ring-1 focus:ring-[#CF9921]'
            />
          </div>
        </div>

        {/* Row: Phone + Business Name */}
        <div className='grid grid-cols-1 gap-5 sm:grid-cols-2'>
          <div>
            <label className='mb-1.5 block text-sm font-medium text-gray-700'>Phone</label>
            <input
              type='tel'
              placeholder='+57 300 000 0000'
              value={form.phone}
              onChange={set('phone')}
              className='w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-[#CF9921] focus:ring-1 focus:ring-[#CF9921]'
            />
          </div>
          <div>
            <label className='mb-1.5 block text-sm font-medium text-gray-700'>
              Business Name <span className='text-red-500'>*</span>
            </label>
            <input
              type='text'
              required
              placeholder='Hotel La Perla'
              value={form.business_name}
              onChange={set('business_name')}
              className='w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-[#CF9921] focus:ring-1 focus:ring-[#CF9921]'
            />
          </div>
        </div>

        {/* Category */}
        <div>
          <label className='mb-1.5 block text-sm font-medium text-gray-700'>Business Category</label>
          <select
            value={form.category}
            onChange={set('category')}
            className='w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-[#CF9921] focus:ring-1 focus:ring-[#CF9921]'
          >
            <option value=''>Select a category</option>
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        {/* Description */}
        <div>
          <label className='mb-1.5 block text-sm font-medium text-gray-700'>Tell us about your business</label>
          <textarea
            placeholder='Brief description of your business, services, and why you want to list on La Carta...'
            rows={4}
            value={form.description}
            onChange={set('description')}
            className='w-full resize-none rounded-lg border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-[#CF9921] focus:ring-1 focus:ring-[#CF9921]'
          />
        </div>

        {/* Website */}
        <div>
          <label className='mb-1.5 block text-sm font-medium text-gray-700'>Website (optional)</label>
          <input
            type='url'
            placeholder='https://yourbusiness.com'
            value={form.website}
            onChange={set('website')}
            className='w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-[#CF9921] focus:ring-1 focus:ring-[#CF9921]'
          />
        </div>

        {/* Terms */}
        <label className='flex items-start gap-3 text-sm text-gray-600'>
          <input
            type='checkbox'
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
            className='mt-0.5 h-4 w-4 accent-[#CF9921]'
          />
          <span>
            I agree to the{' '}
            <a href='/terms-conditions' className='text-[#CF9921] underline' target='_blank'>
              Terms &amp; Conditions
            </a>{' '}
            and understand that my application will be reviewed before access is granted.
          </span>
        </label>

        {error && (
          <p className='rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600'>{error}</p>
        )}

        <button
          type='submit'
          disabled={submitting}
          className='flex w-full items-center justify-center gap-2 rounded-full bg-[#CF9921] py-3.5 font-semibold text-white hover:opacity-90 disabled:opacity-60'
        >
          {submitting && <Loader2 className='h-4 w-4 animate-spin' />}
          Submit Application
        </button>
      </form>
    </div>
  )
}
