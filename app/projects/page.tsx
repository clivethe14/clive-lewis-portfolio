import type { Metadata } from 'next';
import Reveal from '@/components/Reveal';
import SectionLabel from '@/components/SectionLabel';
import ProjectCard from '@/components/ProjectCard';
import { projects } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Projects',
  description:
    'Selected engineering work: a multi-agent AI health platform, published deep learning research on medical imaging, a full-stack generative web app, and a production Flutter mobile app.',
  alternates: { canonical: '/projects' },
  openGraph: {
    title: 'Projects — Clive Lewis',
    description:
      'Selected engineering work: a multi-agent AI health platform, published deep learning research, a full-stack generative web app, and a production Flutter mobile app.',
    url: '/projects',
  },
};

export default function ProjectsPage() {
  return (
    <div className="mx-auto max-w-5xl px-5 py-16 sm:px-8 sm:py-20">
      <SectionLabel>projects</SectionLabel>
      <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-5xl">Selected work</h1>
      <p className="mt-5 max-w-prose text-base leading-relaxed text-fg-muted sm:text-lg">
        Four projects that cover the range of what I build: agentic AI systems, applied deep
        learning, full-stack web, and production mobile. Each one is described as it actually was
        built, limitations included.
      </p>

      <ul className="mt-12 grid gap-6 lg:grid-cols-2">
        {projects.map((project, i) => (
          <Reveal
            as="li"
            key={project.slug}
            delay={i * 80}
            className={`h-full ${project.featured ? 'lg:col-span-2' : ''}`}
          >
            <ProjectCard project={project} />
          </Reveal>
        ))}
      </ul>
    </div>
  );
}
