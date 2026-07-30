import type { Metadata } from 'next'
import Services from '@/components/Services'

export const metadata: Metadata = {
  title: 'Courses',
  description:
    'Browse XpertsEdge Technologies training programs — Web Development, Testing, Cloud & DevOps and more, with full curriculum, outcomes, and placement support.',
  alternates: { canonical: '/courses' },
  openGraph: {
    title: 'Courses | XpertsEdge Technologies',
    description:
      'Browse XpertsEdge Technologies training programs with full curriculum, outcomes, and placement support.',
    url: 'https://www.xpertsedgetech.com/courses',
  },
}

export default async function CoursesPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>
}) {
  const { category } = await searchParams
  return (
    <main className="min-h-screen bg-background text-foreground pt-16">
      <Services initialCategory={category} />
    </main>
  )
}
