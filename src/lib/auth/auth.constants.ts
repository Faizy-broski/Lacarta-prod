import { UserRole } from "./auth.types"

export const AUTH_COOKIE = "app_auth"

export const ROLE_REDIRECT: Record<UserRole, string> = {
  owner: '/dashboard',
  admin: '/dashboard',
  assistant: '/dashboard/content',
  editor: '/dashboard/content',
  client: '/dashboard/my-listings',
  subscriber: '/profile',
}

export function getAuthErrorMessage(code: string): string {
  switch (code) {
    case 'invalid_credentials':
      return 'Invalid email or password. Please try again.'
    case 'email_not_confirmed':
      return 'Please verify your email before signing in.'
    case 'user_not_found':
      return 'No account found with this email.'
    case 'too_many_requests':
      return 'Too many attempts. Please try again later.'
    default:
      return 'Sign in failed. Please try again.'
  }
}