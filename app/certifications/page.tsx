'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowLeft, X, TrendingUp, CheckCircle2, ArrowRight,
  FlaskConical, Cloud, Boxes, Database, ClipboardList, Layers,
} from 'lucide-react'

// ─── Certification course data (no duration shown on cards) ───────────────────
type Cert = {
  category: string
  title: string
  subtitle: string
  level: string
  outcome: string
  whoCanLearn: string[]
  highlights: string[]
}

const certs: Cert[] = [
  // ── ISTQB ──
  {
    category: 'ISTQB',
    title: 'Certified Tester Foundation Level (CTFL) v4.0',
    subtitle: 'Software Testing Fundamentals',
    level: 'Foundation',
    outcome: 'Strong base in manual testing, test process, test design, defect lifecycle, and QA interview preparation.',
    whoCanLearn: ['Fresh Graduates', 'Manual Testing Beginners', 'Non-IT to IT Career Switchers', 'Junior Testers'],
    highlights: ['Software testing basics', 'SDLC and STLC concepts', 'Test case design techniques', 'Defect reporting process', 'Interview-oriented preparation'],
  },
  {
    category: 'ISTQB',
    title: 'Certified Tester Foundation Level Agile Tester (CTFL-AT)',
    subtitle: 'Agile Testing Foundation',
    level: 'Foundation',
    outcome: 'Ability to understand Agile testing concepts and contribute effectively as a tester in Agile teams.',
    whoCanLearn: ['Manual Testers', 'Agile Beginners', 'Scrum Team Members', 'Junior QA Engineers', 'Automation Testing Beginners'],
    highlights: ['Agile testing mindset', 'Scrum testing workflow', 'User story validation', 'Acceptance criteria testing', 'Continuous feedback and quality'],
  },
  {
    category: 'ISTQB',
    title: 'Certified Tester Advanced Level Test Automation Engineering (CTAL-TAE)',
    subtitle: 'Automation Strategy, Frameworks and Engineering',
    level: 'Advanced',
    outcome: 'Ability to design, implement, maintain, and improve automation frameworks for real-time testing projects.',
    whoCanLearn: ['Automation Testers', 'Selenium Testers', 'Playwright Testers', 'API Automation Testers', 'QA Engineers moving into automation architecture'],
    highlights: ['Automation framework design', 'Test automation architecture', 'CI/CD automation integration', 'Automation maintainability', 'Tool selection approach'],
  },
  {
    category: 'ISTQB',
    title: 'Certified Tester Advanced Level Test Analyst (CTAL-TA)',
    subtitle: 'Advanced Test Analysis and Test Design',
    level: 'Advanced',
    outcome: 'Ability to perform structured test analysis, design strong test cases, and improve functional test coverage.',
    whoCanLearn: ['Manual Testers', 'Test Analysts', 'QA Engineers', 'Functional Testers', 'Test Leads'],
    highlights: ['Advanced test design techniques', 'Requirement-based testing', 'Functional test coverage', 'Risk-based testing', 'Defect analysis and reporting'],
  },
  {
    category: 'ISTQB',
    title: 'Certified Tester Performance Testing (CT-PT)',
    subtitle: 'Load, Stress, Scalability and Reliability Testing',
    level: 'Specialist',
    outcome: 'Ability to understand performance testing concepts, workload models, performance risks, and result analysis.',
    whoCanLearn: ['Performance Testing Beginners', 'Manual Testers moving to Performance', 'Automation Testers', 'QA Engineers', 'Test Leads'],
    highlights: ['Load testing basics', 'Stress and scalability testing', 'Workload modeling', 'Result interpretation', 'Performance defect reporting'],
  },
  {
    category: 'ISTQB',
    title: 'Certified Tester Security Tester (CT-SEC)',
    subtitle: 'Security Testing Concepts and Risk-Based Validation',
    level: 'Specialist',
    outcome: 'Ability to understand security testing scope, risk areas, vulnerabilities, and security validation techniques.',
    whoCanLearn: ['QA Engineers', 'Security Testing Beginners', 'Manual Testers', 'Automation Testers', 'Test Leads working with secure applications'],
    highlights: ['Security testing fundamentals', 'Vulnerability awareness', 'Risk-based security testing', 'Security requirements validation', 'Security defect reporting'],
  },

  // ── AWS ──
  {
    category: 'AWS',
    title: 'AWS Certified Cloud Practitioner',
    subtitle: 'AWS Cloud Basics and Cloud Fundamentals',
    level: 'Foundation',
    outcome: 'Strong understanding of AWS cloud concepts, services, security basics, pricing, and cloud career foundation.',
    whoCanLearn: ['Cloud Beginners', 'Fresh Graduates', 'Non-IT to IT Career Switchers', 'Testing Professionals', 'Support Engineers'],
    highlights: ['Cloud computing basics', 'AWS global infrastructure', 'EC2, S3 and IAM basics', 'Security and billing awareness', 'Certification-oriented preparation'],
  },
  {
    category: 'AWS',
    title: 'AWS Certified Solutions Architect - Associate',
    subtitle: 'Design Scalable and Secure AWS Architectures',
    level: 'Associate',
    outcome: 'Ability to design secure, scalable, reliable, and cost-optimized cloud architectures using AWS services.',
    whoCanLearn: ['AWS Beginners with Basic Knowledge', 'Cloud Engineers', 'DevOps Beginners', 'System Administrators', 'IT Professionals'],
    highlights: ['EC2 and load balancing', 'S3 and storage services', 'VPC networking', 'IAM security', 'High availability architecture'],
  },
  {
    category: 'AWS',
    title: 'AWS Certified Developer - Associate',
    subtitle: 'Build and Deploy Applications on AWS',
    level: 'Associate',
    outcome: 'Ability to develop, deploy, monitor, and secure applications using AWS developer services.',
    whoCanLearn: ['Java Developers', 'Full Stack Developers', 'Backend Developers', 'Cloud Developers', 'DevOps Learners'],
    highlights: ['AWS SDK basics', 'Lambda functions', 'API Gateway', 'DynamoDB', 'SQS and SNS integration'],
  },
  {
    category: 'AWS',
    title: 'AWS Certified CloudOps Engineer - Associate',
    subtitle: 'AWS Operations, Monitoring and Administration',
    level: 'Associate',
    outcome: 'Ability to manage AWS resources, monitor cloud systems, automate operations, and maintain cloud reliability.',
    whoCanLearn: ['System Administrators', 'Cloud Support Engineers', 'AWS Learners', 'DevOps Beginners', 'IT Support Professionals'],
    highlights: ['EC2 administration', 'CloudWatch monitoring', 'IAM access control', 'Backup and recovery', 'Operational troubleshooting'],
  },
  {
    category: 'AWS',
    title: 'AWS Certified DevOps Engineer - Professional',
    subtitle: 'AWS CI/CD, Automation and Cloud Operations',
    level: 'Professional',
    outcome: 'Ability to implement DevOps practices, CI/CD pipelines, automation, monitoring, and reliable delivery on AWS.',
    whoCanLearn: ['DevOps Engineers', 'Cloud Engineers', 'AWS Administrators', 'System Engineers', 'Senior IT Professionals'],
    highlights: ['CodePipeline and CodeBuild', 'Infrastructure automation', 'Monitoring and logging', 'Deployment strategies', 'Reliability and recovery'],
  },
  {
    category: 'AWS',
    title: 'AWS Certified Security - Specialty',
    subtitle: 'Cloud Security, IAM, Encryption and Compliance',
    level: 'Specialty',
    outcome: 'Ability to understand AWS security controls, identity management, encryption, monitoring, and compliance-focused cloud security.',
    whoCanLearn: ['Cloud Engineers', 'Security Beginners', 'DevOps Engineers', 'System Administrators', 'AWS Professionals'],
    highlights: ['IAM security', 'KMS encryption', 'CloudTrail auditing', 'GuardDuty basics', 'Network security'],
  },
  {
    category: 'AWS',
    title: 'AWS Certified AI Practitioner',
    subtitle: 'AI, Machine Learning and Generative AI Fundamentals',
    level: 'Foundation',
    outcome: 'Ability to understand AI, machine learning, generative AI concepts, and responsible AI usage on AWS.',
    whoCanLearn: ['AI Beginners', 'Cloud Learners', 'Testing Professionals', 'Developers', 'Students'],
    highlights: ['AI fundamentals', 'Machine learning concepts', 'Generative AI basics', 'Responsible AI awareness', 'AWS AI services overview'],
  },

  // ── DevOps & Kubernetes ──
  {
    category: 'DevOps & Kubernetes',
    title: 'Kubernetes and Cloud Native Associate (KCNA)',
    subtitle: 'Kubernetes and Cloud Native Fundamentals',
    level: 'Foundation',
    outcome: 'Strong understanding of Kubernetes basics, containers, cloud native concepts, and DevOps foundation.',
    whoCanLearn: ['DevOps Beginners', 'Cloud Learners', 'Docker Beginners', 'Fresh Graduates', 'System Admin Beginners'],
    highlights: ['Container basics', 'Kubernetes fundamentals', 'Cloud native concepts', 'Microservices awareness', 'DevOps foundation'],
  },
  {
    category: 'DevOps & Kubernetes',
    title: 'Certified Kubernetes Administrator (CKA)',
    subtitle: 'Kubernetes Cluster Administration',
    level: 'Professional',
    outcome: 'Ability to administer Kubernetes clusters, manage workloads, configure networking, storage, and troubleshoot cluster issues.',
    whoCanLearn: ['DevOps Engineers', 'Cloud Engineers', 'System Administrators', 'Kubernetes Learners', 'Docker Learners'],
    highlights: ['Cluster administration', 'Pods and deployments', 'Networking and services', 'Storage management', 'Troubleshooting'],
  },
  {
    category: 'DevOps & Kubernetes',
    title: 'Certified Kubernetes Application Developer (CKAD)',
    subtitle: 'Kubernetes Application Deployment',
    level: 'Professional',
    outcome: 'Ability to design, build, configure, and expose cloud native applications using Kubernetes.',
    whoCanLearn: ['Developers', 'DevOps Engineers', 'Cloud Engineers', 'Application Deployment Learners', 'Kubernetes Learners'],
    highlights: ['Application deployment', 'Pods and services', 'ConfigMaps and secrets', 'Resource configuration', 'Application troubleshooting'],
  },
  {
    category: 'DevOps & Kubernetes',
    title: 'Certified Kubernetes Security Specialist (CKS)',
    subtitle: 'Kubernetes Security and Cluster Protection',
    level: 'Specialist',
    outcome: 'Ability to secure Kubernetes clusters, workloads, network policies, and cloud native applications.',
    whoCanLearn: ['Kubernetes Administrators', 'DevOps Security Engineers', 'Cloud Security Learners', 'Senior DevOps Engineers', 'Security Testing Beginners'],
    highlights: ['Cluster security', 'Workload security', 'Network policies', 'Runtime security', 'Security best practices'],
  },

  // ── Data ──
  {
    category: 'Data',
    title: 'Microsoft Certified: Power BI Data Analyst Associate',
    subtitle: 'Dashboard and Business Intelligence Reporting',
    level: 'Associate',
    outcome: 'Ability to prepare, model, visualize, analyze data, and create business reports using Power BI.',
    whoCanLearn: ['Data Analytics Beginners', 'Excel Users', 'Business Analysts', 'Reporting Professionals', 'Students'],
    highlights: ['Power BI dashboards', 'Data modeling', 'DAX basics', 'Report creation', 'Business insights'],
  },
  {
    category: 'Data',
    title: 'Microsoft Certified: Azure Data Fundamentals',
    subtitle: 'Data Concepts and Azure Data Services',
    level: 'Fundamentals',
    outcome: 'Strong understanding of core data concepts, relational data, non-relational data, analytics, and Azure data services.',
    whoCanLearn: ['Data Beginners', 'Fresh Graduates', 'Cloud Beginners', 'Database Learners', 'Data Career Beginners'],
    highlights: ['Data fundamentals', 'Relational data', 'Non-relational data', 'Analytics basics', 'Azure data services'],
  },
  {
    category: 'Data',
    title: 'Microsoft Certified: Azure Data Engineer Associate',
    subtitle: 'Azure Data Engineering and Pipelines',
    level: 'Associate',
    outcome: 'Ability to design and implement data storage, data pipelines, data processing, and analytics solutions using Azure.',
    whoCanLearn: ['Data Engineers', 'Azure Learners', 'Data Analysts', 'Cloud Data Professionals', 'Analytics Engineers'],
    highlights: ['Data pipelines', 'Data storage', 'Data transformation', 'Azure Synapse basics', 'Data integration'],
  },
  {
    category: 'Data',
    title: 'Google Professional Data Engineer',
    subtitle: 'Google Cloud Data Engineering',
    level: 'Professional',
    outcome: 'Ability to design, build, secure, and manage data processing systems on Google Cloud.',
    whoCanLearn: ['Data Engineers', 'Google Cloud Learners', 'Cloud Data Professionals', 'Analytics Engineers', 'Data Pipeline Developers'],
    highlights: ['Data processing systems', 'Data pipelines', 'Analytics solutions', 'Data security', 'Machine learning-ready data'],
  },
  {
    category: 'Data',
    title: 'AWS Certified Data Engineer - Associate',
    subtitle: 'AWS Data Pipelines and Analytics Workloads',
    level: 'Associate',
    outcome: 'Ability to build data pipelines, manage data storage, transform data, and support analytics workloads on AWS.',
    whoCanLearn: ['AWS Learners', 'Data Engineers', 'Cloud Data Beginners', 'Analytics Professionals', 'Data Pipeline Learners'],
    highlights: ['Data pipelines', 'Data lake concepts', 'Data transformation', 'AWS analytics services', 'Data storage and processing'],
  },

  // ── Agile & Project Management ──
  {
    category: 'Agile & Project Management',
    title: 'Professional Scrum Master I (PSM I)',
    subtitle: 'Scrum Master and Agile Delivery Foundation',
    level: 'Scrum',
    outcome: 'Ability to understand Scrum framework, Scrum roles, events, artifacts, and Agile team facilitation.',
    whoCanLearn: ['Scrum Beginners', 'QA Leads', 'Project Coordinators', 'Agile Team Members', 'Team Leads'],
    highlights: ['Scrum framework', 'Scrum roles', 'Scrum events', 'Agile mindset', 'Team facilitation'],
  },
  {
    category: 'Agile & Project Management',
    title: 'Professional Scrum Product Owner I (PSPO I)',
    subtitle: 'Product Ownership and Value Delivery',
    level: 'Scrum',
    outcome: 'Ability to understand product ownership, backlog management, stakeholder collaboration, and value-based delivery.',
    whoCanLearn: ['Product Owner Beginners', 'Business Analysts', 'Scrum Team Members', 'Project Professionals', 'Product Managers'],
    highlights: ['Product backlog', 'Value delivery', 'Stakeholder collaboration', 'Product goal', 'Agile product management'],
  },
  {
    category: 'Agile & Project Management',
    title: 'PMI Agile Certified Practitioner (PMI-ACP)',
    subtitle: 'Agile Project Delivery and Practices',
    level: 'Agile',
    outcome: 'Ability to understand Agile principles, Scrum, Kanban, Lean, XP, team collaboration, and Agile project delivery.',
    whoCanLearn: ['Agile Practitioners', 'Project Managers', 'Scrum Team Members', 'Delivery Leads', 'Agile Coaches'],
    highlights: ['Agile principles', 'Scrum and Kanban', 'Lean and XP basics', 'Team collaboration', 'Agile delivery'],
  },
  {
    category: 'Agile & Project Management',
    title: 'Project Management Professional (PMP)',
    subtitle: 'Project Planning, Execution and Leadership',
    level: 'Project Management',
    outcome: 'Ability to understand project planning, execution, monitoring, leadership, risk management, and project delivery.',
    whoCanLearn: ['Project Managers', 'Team Leads', 'Delivery Managers', 'Senior Professionals', 'Program Coordinators'],
    highlights: ['Project planning', 'Execution and monitoring', 'Risk management', 'Stakeholder management', 'Leadership and delivery'],
  },
]

// ─── Category metadata ───────────────────────────────────────────────────────
const categoryMeta: Record<string, { icon: React.ReactNode; gradient: string }> = {
  'ISTQB': { icon: <FlaskConical size={20} />, gradient: 'from-blue-500 via-indigo-500 to-violet-500' },
  'AWS': { icon: <Cloud size={20} />, gradient: 'from-amber-500 via-orange-500 to-yellow-500' },
  'DevOps & Kubernetes': { icon: <Boxes size={20} />, gradient: 'from-cyan-500 via-sky-500 to-blue-500' },
  'Data': { icon: <Database size={20} />, gradient: 'from-emerald-500 via-green-500 to-teal-500' },
  'Agile & Project Management': { icon: <ClipboardList size={20} />, gradient: 'from-fuchsia-500 via-pink-500 to-rose-500' },
}

const categories = ['All', 'ISTQB', 'AWS', 'DevOps & Kubernetes', 'Data', 'Agile & Project Management']

const levelColor: Record<string, string> = {
  Foundation: 'text-primary bg-primary/10 border-primary/20',
  Fundamentals: 'text-primary bg-primary/10 border-primary/20',
  Associate: 'text-accent bg-accent/10 border-accent/20',
  Advanced: 'text-secondary bg-secondary/10 border-secondary/20',
  Professional: 'text-secondary bg-secondary/10 border-secondary/20',
  Specialist: 'text-muted-foreground bg-muted border-border',
  Specialty: 'text-muted-foreground bg-muted border-border',
  Scrum: 'text-accent bg-accent/10 border-accent/20',
  Agile: 'text-accent bg-accent/10 border-accent/20',
  'Project Management': 'text-secondary bg-secondary/10 border-secondary/20',
}

const meta = (c: string) => categoryMeta[c] ?? { icon: <Layers size={20} />, gradient: 'from-primary to-accent' }

// ─── Detail modal (no duration) ──────────────────────────────────────────────
function CertModal({ cert, onClose }: { cert: Cert; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [onClose])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`${cert.title} details`}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.92, y: 30 }}
        transition={{ duration: 0.25 }}
        onClick={(e) => e.stopPropagation()}
        className="surface-card rounded-2xl p-6 md:p-8 max-w-lg w-full border border-primary/25 relative max-h-[85vh] overflow-y-auto"
      >
        <button onClick={onClose} className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors" aria-label="Close">
          <X size={20} />
        </button>

        <div className="flex items-center gap-3 mb-5 pr-8">
          <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${meta(cert.category).gradient} flex items-center justify-center text-white flex-shrink-0`}>
            {meta(cert.category).icon}
          </div>
          <div>
            <h3 className="font-bold text-foreground text-base leading-snug">{cert.title}</h3>
            <p className="text-xs text-muted-foreground">{cert.subtitle}</p>
          </div>
        </div>

        <div className="flex items-center gap-2 mb-5">
          <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${levelColor[cert.level] ?? 'text-muted-foreground bg-muted border-border'}`}>
            {cert.level}
          </span>
          <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full border text-muted-foreground bg-muted border-border">
            {cert.category}
          </span>
        </div>

        <div className="surface-card rounded-xl p-3 flex gap-2 items-start mb-5">
          <TrendingUp size={14} className="text-accent mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-[10px] text-muted-foreground uppercase tracking-wide">Expected Outcome</p>
            <p className="text-sm font-medium text-foreground leading-relaxed">{cert.outcome}</p>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-4 mb-6">
          <div>
            <p className="text-xs font-semibold text-foreground uppercase tracking-wide mb-2">Who Can Learn</p>
            <ul className="flex flex-col gap-1">
              {cert.whoCanLearn.map((w) => (
                <li key={w} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <CheckCircle2 size={13} className="text-primary flex-shrink-0 mt-0.5" /> {w}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-xs font-semibold text-foreground uppercase tracking-wide mb-2">Key Highlights</p>
            <ul className="flex flex-col gap-1">
              {cert.highlights.map((h) => (
                <li key={h} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <CheckCircle2 size={13} className="text-accent flex-shrink-0 mt-0.5" /> {h}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex gap-3">
          <Link href="/demo" className="flex-1 py-3 rounded-xl font-semibold brand-gradient text-background text-sm text-center glow-green">
            Register for Demo
          </Link>
          <Link href="/contact" onClick={onClose} className="flex-1 py-3 rounded-xl font-semibold border border-primary/40 text-primary text-sm text-center hover:bg-primary/10 transition-all">
            Enquire Now
          </Link>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function CertificationsPage() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [selected, setSelected] = useState<Cert | null>(null)

  const filtered = activeCategory === 'All' ? certs : certs.filter((c) => c.category === activeCategory)

  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Top bar */}
      <div className="fixed top-0 left-0 right-0 z-40 bg-background/90 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <Image src="/logo.png" alt="XpertsEdge Technologies" width={36} height={36} className="w-8 h-8 object-contain group-hover:scale-110 transition-transform" />
            <span className="font-bold text-sm">
              <span className="text-foreground">Xperts</span>
              <span className="text-primary">Edge</span>
            </span>
          </Link>
          <Link href="/training-services" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
            <ArrowLeft size={16} /> Training Services
          </Link>
        </div>
      </div>

      <div className="pt-28 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-10"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs font-semibold tracking-wider uppercase mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              Certification Courses
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground text-balance mb-4">
              Industry-Recognized{' '}
              <span className="brand-gradient-text">Certifications</span>
            </h1>
            <p className="text-muted-foreground leading-relaxed max-w-2xl mx-auto text-pretty">
              Globally valued certification tracks with structured guidance and exam preparation across
              testing, cloud, DevOps, data, and project management.
            </p>
          </motion.div>

          {/* Category filter */}
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                  activeCategory === cat
                    ? 'brand-gradient text-background glow-green'
                    : 'border border-border text-muted-foreground hover:border-primary/40 hover:text-foreground'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            <AnimatePresence mode="popLayout">
              {filtered.map((cert, i) => (
                <motion.div
                  key={cert.title}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.35, delay: (i % 8) * 0.04 }}
                  whileHover={{ y: -5 }}
                  role="button"
                  tabIndex={0}
                  onClick={() => setSelected(cert)}
                  onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setSelected(cert) } }}
                  className="group relative surface-card rounded-2xl p-5 pt-6 flex flex-col gap-3 overflow-hidden cursor-pointer hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300"
                >
                  <span className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${meta(cert.category).gradient}`} aria-hidden="true" />

                  <div className="flex items-start justify-between gap-2">
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${meta(cert.category).gradient} flex items-center justify-center text-white flex-shrink-0`}>
                      {meta(cert.category).icon}
                    </div>
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${levelColor[cert.level] ?? 'text-muted-foreground bg-muted border-border'}`}>
                      {cert.level}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-semibold text-foreground text-sm leading-snug group-hover:text-primary transition-colors">
                      {cert.title}
                    </h3>
                    <p className="text-[11px] text-muted-foreground mt-0.5">{cert.subtitle}</p>
                  </div>

                  <div className="flex items-start gap-1.5 text-[11px] text-muted-foreground">
                    <TrendingUp size={12} className="text-accent flex-shrink-0 mt-0.5" />
                    <span className="line-clamp-2">{cert.outcome}</span>
                  </div>

                  <div className="flex items-center gap-1 text-primary text-xs font-medium mt-auto opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    View Details <ArrowRight size={13} />
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selected && <CertModal cert={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </main>
  )
}
