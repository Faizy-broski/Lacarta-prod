import { z } from 'zod'

const userStatusSchema = z.union([
  z.literal('active'),
  z.literal('inactive'),
  z.literal('invited'),
  z.literal('suspended'),
])
export type UserStatus = z.infer<typeof userStatusSchema>

const userRoleSchema = z.union([
  z.literal('owner'),
  z.literal('admin'),
  z.literal('assistant'),
  z.literal('editor'),
  z.literal('client'),
  z.literal('subscriber'),
])
export type UserRole = z.infer<typeof userRoleSchema>

const userSchema = z.object({
  id: z.string(),
  full_name: z.string().nullable(),
  email: z.string().nullable(),
  role: userRoleSchema,
  bio: z.string().nullable(),
  profile_photo_url: z.string().nullable(),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date(),
})
export type User = z.infer<typeof userSchema>

export const userListSchema = z.array(userSchema)
