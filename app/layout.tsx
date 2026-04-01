import type { Metadata } from 'next'
import { ThemeProvider } from '@/context/theme-provider'
import { FontProvider } from '@/context/font-provider'
import { DirectionProvider } from '@/context/direction-provider'
import { Toaster } from 'sonner'
import '@/styles/index.css'

export const metadata: Metadata = {
  title: 'La Carta — Cartagena Culture & Tourism',
  description:
    'Discover the best hotels, activities, beaches, gastronomy and more in Cartagena, Colombia.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <FontProvider>
            <DirectionProvider>
              <Toaster richColors position='top-right' />
              {children}
            </DirectionProvider>
          </FontProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
