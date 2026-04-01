import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      { hostname: 'picsum.photos' },
      { hostname: 'twcbmcpkhpxvbqxyzldn.supabase.co' },
      { hostname: 'images.unsplash.com' },
    ],
  },
  // Allow importing SVG as URL strings (referenced via /public path)
  // TipTap and other libs ship ESM — transpile them for Next.js
  transpilePackages: ['@tiptap/react', '@tiptap/core', '@tiptap/pm'],
}

export default nextConfig
