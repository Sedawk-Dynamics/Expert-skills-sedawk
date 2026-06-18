import type { Metadata } from 'next'
import { Inter, Space_Mono } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const spaceMono = Space_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-space-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'XpertsEdge Technologies — Building Success Beyond Boundaries',
  description:
    'XpertsEdge Technologies empowers businesses and professionals through quality engineering, software testing excellence, automation solutions, and practical technology training.',
  keywords: [
    'software testing training',
    'test automation',
    'IT training Chennai',
    'selenium training',
    'API testing',
    'DevOps training',
    'technology consulting',
  ],
  authors: [{ name: 'XpertsEdge Technologies' }],
  openGraph: {
    title: 'XpertsEdge Technologies',
    description: 'Building Success Beyond Boundaries',
    type: 'website',
    url: 'https://xpertsedgetech.com',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceMono.variable} bg-background`}>
      <body className="font-sans antialiased bg-background text-foreground">
        {children}
      </body>
    </html>
  )
}
