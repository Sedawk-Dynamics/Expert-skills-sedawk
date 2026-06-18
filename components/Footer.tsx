'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Mail, Phone, MapPin } from 'lucide-react'

const footerLinks = [
  {
    heading: 'Quick Links',
    links: [
      { label: 'Home', href: '#home', isAnchor: true },
      { label: 'About Us', href: '#about', isAnchor: true },
      { label: 'Services', href: '#services', isAnchor: true },
      { label: 'Why Choose Us', href: '#why-us', isAnchor: true },
      { label: 'Events & Gallery', href: '/events', isAnchor: false },
      { label: 'Careers', href: '/careers', isAnchor: false },
      { label: 'Contact', href: '/contact', isAnchor: false },
    ],
  },
  {
    heading: 'Programs',
    links: [
      { label: 'Java Full Stack', href: '#courses', isAnchor: true },
      { label: 'MERN / MEAN Stack', href: '#courses', isAnchor: true },
      { label: 'Manual Testing', href: '#courses', isAnchor: true },
      { label: 'Selenium Automation', href: '#courses', isAnchor: true },
      { label: 'Playwright Testing', href: '#courses', isAnchor: true },
      { label: 'AWS / Azure / DevOps', href: '#courses', isAnchor: true },
    ],
  },
]

const scrollTo = (href: string) => {
  document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
}

export default function Footer() {
  return (
    <footer className="bg-card border-t border-border">
      {/* CTA Banner */}
      <div className="border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="flex flex-col md:flex-row items-center justify-between gap-6"
          >
            <div>
              <h3 className="text-2xl font-bold text-foreground text-balance">
                Ready to{' '}
                <span className="brand-gradient-text">Build Success</span>{' '}
                Beyond Boundaries?
              </h3>
              <p className="text-muted-foreground mt-2 text-sm">
                Join hundreds of professionals who&apos;ve transformed their careers with XpertsEdge.
              </p>
            </div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
            >
              <Link
                href="/demo"
                className="flex-shrink-0 px-8 py-3 rounded-full font-semibold brand-gradient text-background glow-green text-sm inline-block"
              >
                Register for Demo
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <button onClick={() => scrollTo('#home')} className="flex items-center gap-3 mb-4 group" aria-label="Go to top">
              <Image src="/logo.png" alt="XpertsEdge Technologies" width={36} height={36} className="w-9 h-9 object-contain group-hover:scale-110 transition-transform" />
              <div className="leading-tight">
                <p className="font-bold text-base"><span className="brand-gradient-text">Xperts</span><span className="text-foreground">Edge</span></p>
                <p className="text-[10px] text-muted-foreground">Technologies</p>
              </div>
            </button>
            <p className="text-sm text-muted-foreground leading-relaxed mb-5">
              Building Success Beyond Boundaries — empowering professionals through quality technology
              training and consulting.
            </p>
            <div className="flex flex-col gap-2">
              <a href="tel:+918870783300" className="flex items-center gap-2 text-xs text-muted-foreground hover:text-primary transition-colors">
                <Phone size={13} /> +91 8870783300
              </a>
              <a href="mailto:info@xpertsedgetech.com" className="flex items-center gap-2 text-xs text-muted-foreground hover:text-primary transition-colors">
                <Mail size={13} /> info@xpertsedgetech.com
              </a>
              <span className="flex items-start gap-2 text-xs text-muted-foreground">
                <MapPin size={13} className="mt-0.5 flex-shrink-0" />
                No. 2110A, 13th Main Road,<br />Anna Nagar, Chennai - 600040
              </span>
            </div>
          </div>

          {/* Links */}
          {footerLinks.map((col) => (
            <div key={col.heading}>
              <h4 className="text-xs font-semibold text-foreground uppercase tracking-widest mb-4">{col.heading}</h4>
              <ul className="flex flex-col gap-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    {link.isAnchor ? (
                      <button
                        onClick={() => scrollTo(link.href)}
                        className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200"
                      >
                        {link.label}
                      </button>
                    ) : (
                      <Link
                        href={link.href}
                        className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200"
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact emails */}
          <div>
            <h4 className="text-xs font-semibold text-foreground uppercase tracking-widest mb-4">Contact Emails</h4>
            <ul className="flex flex-col gap-2.5">
              {[
                { label: 'General Enquiry', email: 'info@xpertsedgetech.com' },
                { label: 'Admin', email: 'admin@xpertsedgetech.com' },
                { label: 'HR', email: 'hr@xpertsedgetech.com' },
                { label: 'Prakash V', email: 'prakash@xpertsedgetech.com' },
              ].map((item) => (
                <li key={item.email}>
                  <p className="text-[11px] text-muted-foreground/60 mb-0.5">{item.label}</p>
                  <a href={`mailto:${item.email}`} className="text-xs text-muted-foreground hover:text-primary transition-colors duration-200 break-all">
                    {item.email}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} XpertsEdge Technologies Pvt. Ltd. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground">
            Anna Nagar, Chennai, Tamil Nadu, India
          </p>
        </div>
      </div>
    </footer>
  )
}
