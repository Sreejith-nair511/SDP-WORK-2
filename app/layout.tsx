import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { ThemeProvider } from '@/components/theme-provider'
import './globals.css'

const geist = Geist({ subsets: ["latin"], variable: '--font-sans' });
const geistMono = Geist_Mono({ subsets: ["latin"], variable: '--font-mono' });

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

export const metadata: Metadata = {
  title: 'Design Patterns Explorer',
  description: 'Learn and explore 23 design patterns with interactive visualizations and code examples. Made by Sreejith and Tejaswini',
  generator: 'Design Patterns Explorer',
  icons: {
    icon: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><rect width="32" height="32" rx="6" fill="%23000"/><g fill="%23fff"><rect x="6" y="6" width="8" height="8" rx="1"/><rect x="18" y="6" width="8" height="8" rx="1"/><rect x="6" y="18" width="8" height="8" rx="1"/><rect x="18" y="18" width="8" height="8" rx="1"/></g><g stroke="%23fff" stroke-width="1.5" fill="none"><line x1="10" y1="14" x2="10" y2="16"/><line x1="22" y1="14" x2="22" y2="16"/><line x1="14" y1="10" x2="16" y2="10"/><line x1="14" y1="22" x2="16" y2="22"/></g></svg>',
    apple: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 180 180"><rect width="180" height="180" rx="40" fill="%236366f1"/><g fill="%23fff"><rect x="45" y="45" width="30" height="30" rx="4"/><rect x="105" y="45" width="30" height="30" rx="4"/><rect x="45" y="105" width="30" height="30" rx="4"/><rect x="105" y="105" width="30" height="30" rx="4"/></g></svg>',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${geist.variable} ${geistMono.variable}`}>
      <body className="font-sans antialiased bg-background text-foreground">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
