'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import Contact from '@/components/Contact'

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Top bar */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <Image src="/logo.png" alt="XpertsEdge Technologies" width={36} height={36} className="w-8 h-8 object-contain group-hover:scale-110 transition-transform" />
            <div className="leading-tight">
              <span className="font-bold text-sm">
                <span className="brand-gradient-text">Xperts</span>
                <span className="text-foreground">Edge</span>
                <span className="text-foreground"> Technologies</span>
              </span>
            </div>
          </Link>
          <Link href="/" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
            <ArrowLeft size={16} /> Back to Home
          </Link>
        </div>
      </div>

      <div className="pt-16">
        <Contact />
      </div>
    </main>
  )
}
