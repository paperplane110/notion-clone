import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Toaster } from 'sonner'

import { ModalProvider } from '@/components/providers/modal-provider'
import { ConvexClientProvider } from '@/components/providers/convex-provider'
import { ThemeProvider } from '@/components/providers/theme-provider'
import { EdgeStoreProvider } from '@/lib/edgestore'

import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Yotion',
  description: 'The connected workspace where better, faster work happends',
  icons: {
    icon: [
      {
        media: "(prefers-color-scheme: light)",
        url: "/icon.svg",
        href: "/icon.svg",
      },
      {
        media: "(prefers-color-scheme: dark)",
        url: "/icon.svg",
        href: "/icon.svg",
      }
    ]
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ConvexClientProvider>
          <EdgeStoreProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
              storageKey='yotion-theme'
            >
              <Toaster position='bottom-center'/>
              <ModalProvider />
              {children}
            </ThemeProvider>
          </EdgeStoreProvider>
        </ConvexClientProvider>
        </body>
    </html>
  )
}
