'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowLeft, CheckCircle, Send, User, Mail, Phone, Building2, BookOpen } from 'lucide-react'

const courses = [
  'Java Full Stack',
  'MEAN Stack',
  'MERN Stack',
  'Manual Testing',
  'Java Selenium Automation Testing',
  'Playwright Automation Testing',
  'API Testing',
  'AWS Track',
  'Microsoft Azure',
  'DevOps',
  'DSA',
  'IT Consulting / Services',
  'Others',
]

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
}

export default function DemoPage() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    course: '',
    otherCourse: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setTimeout(() => {
      setSubmitting(false)
      setSubmitted(true)
    }, 1200)
  }

  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Nav bar back */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <Image src="/logo.png" alt="XpertsEdge Technologies" width={36} height={36} className="w-8 h-8 object-contain group-hover:scale-110 transition-transform" />
            <div className="leading-tight">
              <span className="font-bold text-sm">
                <span className="text-foreground">Xperts</span>
                <span className="text-primary">Edge</span>
              </span>
            </div>
          </Link>
          <div className="flex items-center gap-4">
            <Link
              href="/#courses"
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              <ArrowLeft size={16} /> Back to Courses
            </Link>
            <Link
              href="/"
              className="hidden sm:block text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              Home
            </Link>
          </div>
        </div>
      </div>

      <div className="pt-28 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs font-semibold tracking-wider uppercase mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              Free Demo Session
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground text-balance mb-4">
              Register for a{' '}
              <span className="brand-gradient-text">Free Demo</span>
            </h1>
            <p className="text-muted-foreground leading-relaxed max-w-xl mx-auto text-pretty">
              Experience our training quality first-hand. Fill in your details and our team will
              schedule a personalized demo session for you.
            </p>
          </motion.div>

          {/* Benefits */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.6, delay: 0.1 }}
            className="grid sm:grid-cols-3 gap-4 mb-10"
          >
            {[
              { icon: <BookOpen size={18} />, title: 'Live Session', desc: 'Interactive demo by expert trainers' },
              { icon: <User size={18} />, title: 'Personalized', desc: 'Tailored to your background & goals' },
              { icon: <CheckCircle size={18} />, title: 'No Commitment', desc: 'Explore before you enroll' },
            ].map((b) => (
              <div key={b.title} className="surface-card rounded-2xl p-4 flex gap-3 items-start border border-primary/10">
                <div className="w-8 h-8 rounded-lg brand-gradient flex items-center justify-center text-background flex-shrink-0">
                  {b.icon}
                </div>
                <div>
                  <p className="font-semibold text-sm text-foreground">{b.title}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{b.desc}</p>
                </div>
              </div>
            ))}
          </motion.div>

          {/* Registration Form */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.6, delay: 0.2 }}
            className="surface-card rounded-2xl p-6 md:p-10 border border-primary/15"
          >
            {submitted ? (
              <motion.div
                initial={{ scale: 0.85, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="flex flex-col items-center justify-center gap-5 py-16 text-center"
              >
                <div className="w-16 h-16 rounded-full brand-gradient flex items-center justify-center glow-green">
                  <CheckCircle size={32} className="text-background" />
                </div>
                <h2 className="text-2xl font-bold text-foreground">You&apos;re Registered!</h2>
                <p className="text-muted-foreground max-w-sm leading-relaxed">
                  Thank you for registering. Our team will reach out to you within 24 hours to
                  schedule your free demo session.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 mt-2">
                  <Link
                    href="/#courses"
                    className="px-6 py-3 rounded-full font-semibold brand-gradient text-background text-sm glow-green text-center"
                  >
                    Back to Courses
                  </Link>
                  <Link
                    href="/"
                    className="px-6 py-3 rounded-full font-semibold border border-primary/40 text-primary text-sm text-center hover:bg-primary/10 transition-all"
                  >
                    Back to Home
                  </Link>
                </div>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <h2 className="text-xl font-bold text-foreground mb-1">Your Details</h2>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="name" className="text-xs text-muted-foreground font-medium uppercase tracking-wide">
                      Full Name <span className="text-primary">*</span>
                    </label>
                    <div className="relative">
                      <User size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                      <input
                        id="name" name="name" type="text" required
                        value={form.name} onChange={handleChange}
                        placeholder="Your full name"
                        className="w-full bg-background border border-border rounded-xl pl-9 pr-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30 transition-all"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="phone" className="text-xs text-muted-foreground font-medium uppercase tracking-wide">
                      Phone <span className="text-primary">*</span>
                    </label>
                    <div className="relative">
                      <Phone size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                      <input
                        id="phone" name="phone" type="tel" required
                        value={form.phone} onChange={handleChange}
                        placeholder="+91 XXXXX XXXXX"
                        className="w-full bg-background border border-border rounded-xl pl-9 pr-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30 transition-all"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="email" className="text-xs text-muted-foreground font-medium uppercase tracking-wide">
                      Email <span className="text-primary">*</span>
                    </label>
                    <div className="relative">
                      <Mail size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                      <input
                        id="email" name="email" type="email" required
                        value={form.email} onChange={handleChange}
                        placeholder="you@email.com"
                        className="w-full bg-background border border-border rounded-xl pl-9 pr-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30 transition-all"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="company" className="text-xs text-muted-foreground font-medium uppercase tracking-wide">
                      Company / College
                    </label>
                    <div className="relative">
                      <Building2 size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                      <input
                        id="company" name="company" type="text"
                        value={form.company} onChange={handleChange}
                        placeholder="Your company or college"
                        className="w-full bg-background border border-border rounded-xl pl-9 pr-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30 transition-all"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="course" className="text-xs text-muted-foreground font-medium uppercase tracking-wide">
                    Course Interested In <span className="text-primary">*</span>
                  </label>
                  <select
                    id="course" name="course" required
                    value={form.course} onChange={handleChange}
                    className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm text-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30 transition-all appearance-none"
                  >
                    <option value="" disabled>Select a course</option>
                    {courses.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                {/* Shown only when "Others" is selected */}
                {form.course === 'Others' && (
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="otherCourse" className="text-xs text-muted-foreground font-medium uppercase tracking-wide">
                      Please Specify <span className="text-primary">*</span>
                    </label>
                    <input
                      id="otherCourse" name="otherCourse" type="text" required
                      value={form.otherCourse} onChange={handleChange}
                      placeholder="Which course / service are you looking for?"
                      autoFocus
                      className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30 transition-all"
                    />
                  </div>
                )}

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="message" className="text-xs text-muted-foreground font-medium uppercase tracking-wide">
                    Additional Message
                  </label>
                  <textarea
                    id="message" name="message" rows={3}
                    value={form.message} onChange={handleChange}
                    placeholder="Any specific topics or questions you'd like covered..."
                    className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30 transition-all resize-none"
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={submitting}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center justify-center gap-2 w-full py-3.5 rounded-xl font-semibold brand-gradient text-background glow-green transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {submitting ? (
                    <span className="flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-background/30 border-t-background rounded-full animate-spin" />
                      Registering...
                    </span>
                  ) : (
                    <>
                      Register for Free Demo <Send size={16} />
                    </>
                  )}
                </motion.button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </main>
  )
}
