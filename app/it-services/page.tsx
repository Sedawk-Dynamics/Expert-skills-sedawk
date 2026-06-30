'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  ArrowLeft, ArrowRight, Users, Lightbulb, Award, Briefcase, PlayCircle,
} from 'lucide-react'

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
}

const itCards = [
  {
    title: 'Corporate Training Programs',
    icon: <Users size={24} />,
    gradient: 'from-emerald-500 via-green-500 to-teal-500',
    desc: 'Customized training solutions designed for teams, organizations, and professional upskilling needs.',
    items: ['Team Upskilling', 'Custom Curriculum', 'Onsite / Online', 'Skill Assessment'],
  },
  {
    title: 'Technology Consulting',
    icon: <Lightbulb size={24} />,
    gradient: 'from-blue-500 via-indigo-500 to-violet-500',
    desc: 'Guidance and structured learning programs to help individuals and businesses stay future-ready.',
    items: ['IT Strategy', 'Process Guidance', 'Tech Roadmaps', 'Future-Ready Planning'],
  },
  {
    title: 'Placement Readiness',
    icon: <Award size={24} />,
    gradient: 'from-fuchsia-500 via-pink-500 to-orange-500',
    desc: 'Support for resume preparation, technical mentoring, and building interview confidence.',
    items: ['Resume Building', 'Mock Interviews', 'Technical Mentoring', 'Interview Confidence'],
  },
  {
    title: 'Real-Time Project Training',
    icon: <Briefcase size={24} />,
    gradient: 'from-violet-500 via-purple-500 to-fuchsia-500',
    desc: 'Project-based learning with mock interviews, practical exercises, and career guidance.',
    items: ['Live Projects', 'Practical Exercises', 'Mock Interviews', 'Career Guidance'],
  },
]

export default function ITServicesPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Top bar */}
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
          <Link href="/" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
            <ArrowLeft size={16} /> Back to Home
          </Link>
        </div>
      </div>

      <div className="pt-28 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.6 }}
            className="text-center mb-14"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs font-semibold tracking-wider uppercase mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              IT Services
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground text-balance mb-4">
              Enterprise &amp;{' '}
              <span className="brand-gradient-text">Corporate Solutions</span>
            </h1>
            <p className="text-muted-foreground leading-relaxed max-w-2xl mx-auto text-pretty">
              Tailored technology consulting, corporate training, and placement-focused programs to help
              teams and organizations stay future-ready.
            </p>
          </motion.div>

          {/* Four cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
            {itCards.map((card, i) => (
              <motion.div
                key={card.title}
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                transition={{ duration: 0.5, delay: 0.1 + i * 0.1 }}
                whileHover={{ y: -6 }}
                className="group relative surface-card rounded-2xl p-6 pt-7 flex flex-col gap-4 overflow-hidden border border-primary/10 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-150"
              >
                <span className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${card.gradient}`} aria-hidden="true" />

                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${card.gradient} flex items-center justify-center text-white shadow-lg`}>
                  {card.icon}
                </div>

                <div>
                  <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">{card.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mt-1.5">{card.desc}</p>
                </div>

                <ul className="flex flex-col gap-2 mt-1">
                  {card.items.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>

                <Link
                  href="/contact"
                  className="mt-auto inline-flex items-center justify-center gap-2 w-full py-2.5 rounded-full text-sm font-semibold brand-gradient text-background glow-green transition-all duration-150 hover:scale-[1.02]"
                >
                  Enquire Now <ArrowRight size={15} />
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Referral video */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.6, delay: 0.3 }}
            className="max-w-4xl mx-auto"
          >
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-3 mb-3">
                <span className="h-px w-8 bg-primary" />
                <span className="text-primary text-xs font-semibold tracking-widest uppercase flex items-center gap-1.5">
                  <PlayCircle size={14} /> Overview Video
                </span>
                <span className="h-px w-8 bg-primary" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-foreground text-balance">
                How <span className="brand-gradient-text">XpertsEdge</span> Partners With Teams
              </h2>
              <p className="mt-3 text-sm text-muted-foreground max-w-xl mx-auto">
                See how we deliver corporate training, consulting, and placement support for organizations.
              </p>
            </div>

            <div className="relative rounded-2xl overflow-hidden brand-border bg-card aspect-video shadow-xl shadow-black/30">
              {/* Replace the src below with your actual IT services video (YouTube embed or hosted MP4). */}
              <iframe
                className="absolute inset-0 w-full h-full"
                src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                title="XpertsEdge Technologies IT services video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                loading="lazy"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  )
}
