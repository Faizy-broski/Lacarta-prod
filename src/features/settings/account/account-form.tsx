'use client'
import { useEffect, useState } from 'react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { CaretSortIcon, CheckIcon } from '@radix-ui/react-icons'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2 } from 'lucide-react'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'
import { supabase } from '@/lib/supabase'
import { useAuthStore } from '@/lib/auth/auth.store'
import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { DatePicker } from '@/components/date-picker'

const languages = [
  { label: 'English', value: 'en' },
  { label: 'French', value: 'fr' },
  { label: 'German', value: 'de' },
  { label: 'Spanish', value: 'es' },
  { label: 'Portuguese', value: 'pt' },
  { label: 'Russian', value: 'ru' },
  { label: 'Japanese', value: 'ja' },
  { label: 'Korean', value: 'ko' },
  { label: 'Chinese', value: 'zh' },
] as const

const accountFormSchema = z.object({
  name: z
    .string()
    .min(1, 'Please enter your name.')
    .min(2, 'Name must be at least 2 characters.')
    .max(30, 'Name must not be longer than 30 characters.'),
  dob: z.date().optional(),
  language: z.string().optional(),
})

type AccountFormValues = z.infer<typeof accountFormSchema>

export function AccountForm() {
  const user = useAuthStore((s) => s.user)
  const [saving, setSaving] = useState(false)

  const form = useForm<AccountFormValues>({
    resolver: zodResolver(accountFormSchema),
    defaultValues: { name: '', language: 'en' },
  })

  // Pre-fill from Supabase
  useEffect(() => {
    if (!user?.accountNo) return
    supabase
      .from('users')
      .select('full_name, language, date_of_birth')
      .eq('id', user.accountNo)
      .single()
      .then(({ data }) => {
        if (!data) return
        form.reset({
          name: data.full_name ?? '',
          language: data.language ?? 'en',
          dob: data.date_of_birth ? new Date(data.date_of_birth) : undefined,
        })
      })
  }, [user?.accountNo, form])

  async function onSubmit(data: AccountFormValues) {
    if (!user?.accountNo) return
    setSaving(true)
    const { error } = await supabase
      .from('users')
      .update({
        full_name: data.name,
        language: data.language ?? null,
        date_of_birth: data.dob ? data.dob.toISOString().split('T')[0] : null,
      })
      .eq('id', user.accountNo)

    setSaving(false)
    if (error) {
      toast.error('Failed to save account settings.')
    } else {
      toast.success('Account settings saved.')
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
        <FormField
          control={form.control}
          name='name'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder='Your name' {...field} />
              </FormControl>
              <FormDescription>
                This is the name that will be displayed on your profile and in emails.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='dob'
          render={({ field }) => (
            <FormItem className='flex flex-col'>
              <FormLabel>Date of birth</FormLabel>
              <DatePicker selected={field.value} onSelect={field.onChange} />
              <FormDescription>
                Your date of birth is used to calculate your age.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='language'
          render={({ field }) => (
            <FormItem className='flex flex-col'>
              <FormLabel>Language</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant='outline'
                      role='combobox'
                      className={cn(
                        'w-[200px] justify-between',
                        !field.value && 'text-muted-foreground'
                      )}
                    >
                      {field.value
                        ? languages.find((l) => l.value === field.value)?.label
                        : 'Select language'}
                      <CaretSortIcon className='ms-2 h-4 w-4 shrink-0 opacity-50' />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className='w-[200px] p-0'>
                  <Command>
                    <CommandInput placeholder='Search language...' />
                    <CommandEmpty>No language found.</CommandEmpty>
                    <CommandGroup>
                      <CommandList>
                        {languages.map((language) => (
                          <CommandItem
                            value={language.label}
                            key={language.value}
                            onSelect={() => form.setValue('language', language.value)}
                          >
                            <CheckIcon
                              className={cn(
                                'size-4',
                                language.value === field.value ? 'opacity-100' : 'opacity-0'
                              )}
                            />
                            {language.label}
                          </CommandItem>
                        ))}
                      </CommandList>
                    </CommandGroup>
                  </Command>
                </PopoverContent>
              </Popover>
              <FormDescription>
                This is the language that will be used in the dashboard.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type='submit' disabled={saving}>
          {saving && <Loader2 className='mr-2 h-4 w-4 animate-spin' />}
          Update account
        </Button>
      </form>
    </Form>
  )
}
