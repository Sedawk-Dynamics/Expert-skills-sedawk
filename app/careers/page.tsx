'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowLeft, MapPin, Clock, Briefcase, GraduationCap, ArrowRight } from 'lucide-react'

const openings = [
  {
    title: 'Software Testing Trainer',
    type: 'Full-time',
    location: 'Chennai, India',
    experience: '2–5 Years',
    skills: ['Manual Testing', 'Selenium', 'JIRA', 'Agile'],
    desc: 'Deliver engaging hands-on training sessions on software testing fundamentals and automation frameworks.',
  },
  {
    title: 'Full Stack Development Trainer',
    type: 'Full-time',
    location: 'Chennai, India',
    experience: '3+ Years',
    skills: ['React', 'Node.js', 'Java', 'Spring Boot'],
    desc: 'Train students on modern full-stack technologies with project-based learning and interview preparation.',
  },
  {
    title: 'Cloud & DevOps Trainer',
    type: 'Full-time',
    location: 'Chennai / Remote',
    experience: '3–6 Years',
    skills: ['AWS', 'Azure', 'Docker', 'Jenkins'],
    desc: 'Mentor learners on cloud architecture, DevOps pipelines, and industry-standard deployment practices.',
  },
  {
    title: 'Business Development Executive',
    type: 'Full-time',
    location: 'Chennai, India',
    experience: '1–3 Years',
    skills: ['Sales', 'EdTech', 'Communication', 'CRM'],
    desc: 'Drive student enrollment through outreach, counselling, and relationship management.',
  },
  {
    title: 'Content & Social Media Executive',
    type: 'Part-time / Full-time',
    location: 'Chennai / Remote',
    experience: '1–2 Years',
    skills: ['Content Writing', 'Canva', 'LinkedIn', 'Instagram'],
    desc: 'Create compelling content across platforms to grow the XpertsEdge brand and community.',
  },
]

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
}

export default function CareersPage() {
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
        <div className="max-w-5xl mx-auto">
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
              Join Our Team
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground text-balance mb-4">
              Build Your Career at{' '}
              <span className="brand-gradient-text">XpertsEdge</span>
            </h1>
            <p className="text-muted-foreground leading-relaxed max-w-2xl mx-auto text-pretty">
              We&apos;re a passionate team building the next generation of tech talent. If you love
              education, technology, and making a real impact — we&apos;d love to have you on board.
            </p>
          </motion.div>

          {/* Values */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.6, delay: 0.1 }}
            className="grid sm:grid-cols-3 gap-4 mb-14"
          >
            {[
              { icon: <GraduationCap size={18} />, title: 'Grow with Us', desc: 'Continuous learning and professional development' },
              { icon: <Briefcase size={18} />, title: 'Meaningful Work', desc: 'Directly impact hundreds of careers' },
              { icon: <MapPin size={18} />, title: 'Flexible Options', desc: 'On-site, hybrid, and remote opportunities' },
            ].map((v) => (
              <div key={v.title} className="surface-card rounded-2xl p-5 flex gap-3 items-start border border-primary/10">
                <div className="w-9 h-9 rounded-xl brand-gradient flex items-center justify-center text-background flex-shrink-0">{v.icon}</div>
                <div>
                  <p className="font-semibold text-sm text-foreground">{v.title}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{v.desc}</p>
                </div>
              </div>
            ))}
          </motion.div>

          {/* Openings */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="text-2xl font-bold text-foreground mb-6">
              Current <span className="brand-gradient-text">Openings</span>
            </h2>

            <div className="flex flex-col gap-4">
              {openings.map((job, i) => (
                <motion.div
                  key={job.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 + i * 0.08 }}
                  whileHover={{ y: -2 }}
                  className="surface-card rounded-2xl p-6 border border-primary/10 hover:border-primary/30 transition-all duration-300 group"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <h3 className="font-bold text-foreground text-base group-hover:text-primary transition-colors">{job.title}</h3>
                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full border text-primary bg-primary/10 border-primary/20">{job.type}</span>
                      </div>
                      <div className="flex flex-wrap gap-4 text-xs text-muted-foreground mb-3">
                        <span className="flex items-center gap-1"><MapPin size={12} /> {job.location}</span>
                        <span className="flex items-center gap-1"><Clock size={12} /> {job.experience}</span>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed mb-3">{job.desc}</p>
                      <div className="flex flex-wrap gap-1.5">
                        {job.skills.map((s) => (
                          <span key={s} className="text-[10px] px-2 py-0.5 rounded-full bg-muted border border-border text-muted-foreground">{s}</span>
                        ))}
                      </div>
                    </div>
                    <motion.a
                      href="mailto:hr@xpertsedgetech.com"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.97 }}
                      className="flex-shrink-0 inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold brand-gradient text-background glow-green"
                    >
                      Apply Now <ArrowRight size={14} />
                    </motion.a>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* General application */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-10 surface-card rounded-2xl p-8 text-center border border-primary/15"
          >
            <h3 className="text-xl font-bold text-foreground mb-2">
              Don&apos;t see a role that fits?
            </h3>
            <p className="text-muted-foreground text-sm mb-5">
              We&apos;re always on the lookout for talented individuals. Send us your profile and we&apos;ll reach out when the right opportunity comes up.
            </p>
            <motion.a
              href="mailto:hr@xpertsedgetech.com"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 px-7 py-3 rounded-full font-semibold border border-primary/40 text-primary hover:bg-primary/10 transition-all text-sm"
            >
              Send General Application
            </motion.a>
          </motion.div>
        </div>
      </div>
    </main>
  )
}
