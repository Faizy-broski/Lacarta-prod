'use client'

import { useEffect, useState } from 'react'
import { Loader2 } from 'lucide-react'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { Badge } from '@/components/ui/badge'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { UsersDialogs } from './components/users-dialogs'
import { UsersPrimaryButtons } from './components/users-primary-buttons'
import { UsersProvider } from './components/users-provider'
import { fetchUsers } from './data/users'
import { type User } from './data/schema'
import { roles } from './data/data'

const roleBadgeColors: Record<string, string> = {
  owner: 'bg-[#CF9921]/10 text-[#CF9921] border-[#CF9921]/30',
  admin: 'bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300',
  assistant: 'bg-purple-100 text-purple-700 border-purple-200 dark:bg-purple-900/30 dark:text-purple-300',
  editor: 'bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-300',
  client: 'bg-orange-100 text-orange-700 border-orange-200 dark:bg-orange-900/30 dark:text-orange-300',
  subscriber: 'bg-gray-100 text-gray-600 border-gray-200 dark:bg-gray-800 dark:text-gray-300',
}

export function Users() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchUsers().then((data) => {
      setUsers(data)
      setLoading(false)
    })
  }, [])

  return (
    <UsersProvider>
      <Header />

      <Main className='flex flex-1 flex-col gap-4 sm:gap-6'>
        <div className='flex flex-wrap items-end justify-between gap-2'>
          <div>
            <h2 className='text-2xl font-bold tracking-tight'>User List</h2>
            <p className='text-muted-foreground'>
              Manage your users and their roles here.
            </p>
          </div>
          <UsersPrimaryButtons />
        </div>

        {loading ? (
          <div className='flex items-center justify-center py-16'>
            <Loader2 className='h-6 w-6 animate-spin text-muted-foreground' />
          </div>
        ) : users.length === 0 ? (
          <div className='py-16 text-center text-muted-foreground'>
            No users found.
          </div>
        ) : (
          <div className='overflow-x-auto rounded-lg border'>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Joined</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className='flex items-center gap-3'>
                      {user.profile_photo_url ? (
                        <img
                          src={user.profile_photo_url}
                          alt=''
                          className='h-8 w-8 rounded-full object-cover'
                        />
                      ) : (
                        <div className='flex h-8 w-8 items-center justify-center rounded-full bg-muted text-xs font-medium'>
                          {(user.full_name ?? '?')[0]?.toUpperCase()}
                        </div>
                      )}
                      <span className='font-medium'>{user.full_name || '—'}</span>
                    </TableCell>
                    <TableCell className='text-muted-foreground'>
                      {user.email || '—'}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant='outline'
                        className={`text-[10px] ${roleBadgeColors[user.role] ?? ''}`}
                      >
                        {roles.find((r) => r.value === user.role)?.label ?? user.role}
                      </Badge>
                    </TableCell>
                    <TableCell className='text-muted-foreground'>
                      {new Date(user.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </Main>

      <UsersDialogs />
    </UsersProvider>
  )
}