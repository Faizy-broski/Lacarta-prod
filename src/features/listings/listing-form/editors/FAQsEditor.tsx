'use client'
import { Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { AddButton } from '../ui/primitives'
import type { FAQ } from '../types'

export function FAQsEditor({ faqs, onChange }: { faqs: FAQ[]; onChange: (v: FAQ[]) => void }) {
  const add = () => onChange([...faqs, { question: '', answer: '' }])
  const update = (i: number, field: keyof FAQ, val: string) =>
    onChange(faqs.map((f, idx) => (idx === i ? { ...f, [field]: val } : f)))
  const remove = (i: number) => onChange(faqs.filter((_, idx) => idx !== i))

  return (
    <div className='space-y-3'>
      {faqs.map((faq, i) => (
        <div key={i} className='space-y-3 rounded-md border bg-muted/30 p-4'>
          <div className='flex items-center justify-between'>
            <span className='text-xs font-medium text-muted-foreground'>FAQ #{i + 1}</span>
            <Button type='button' variant='ghost' size='icon' className='h-7 w-7' onClick={() => remove(i)}>
              <Trash2 className='h-3.5 w-3.5 text-muted-foreground' />
            </Button>
          </div>
          <Input
            placeholder='Question'
            value={faq.question}
            onChange={(e) => update(i, 'question', e.target.value)}
            className='rounded-md'
          />
          <Textarea
            placeholder='Answer'
            rows={2}
            value={faq.answer}
            onChange={(e) => update(i, 'answer', e.target.value)}
            className='resize-none rounded-md'
          />
        </div>
      ))}
      <AddButton onClick={add}>Add FAQ</AddButton>
    </div>
  )
}
