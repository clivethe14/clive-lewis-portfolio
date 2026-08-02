import Link from 'next/link';
import TypedLine from '@/components/TypedLine';
import Reveal from '@/components/Reveal';
import SectionLabel from '@/components/SectionLabel';
import ProofCard, { type Proof } from '@/components/ProofCard';
import { skillGroups } from '@/lib/content';
import { links, site, SITE_URL } from '@/lib/site';

const proofs: Proof[] = [
  {
    index: '01',
    title: 'Published Researcher',
    hook: 'Elective coursework I took out of curiosity turned into a peer-reviewed paper.',
    body: (
      <>
        First-author paper at IEEE/ACM CHASE 2025 on knee osteoarthritis detection — a supervised
        deep learning pipeline over 160+ MRI scans, reaching 76% accuracy and an AUC of 0.78.
      </>
    ),
    href: '/about#research',
    cta: 'Read the research',
  },
  {
    index: '02',
    title: 'Production Impact',
    hook: 'A 4-person team reporting to the CTO, and real users on the other end.',
    body: (
      <>
        At Keymate.AI I owned a Chrome extension end to end for 1,500+ paying customers, shipped a
        Google Gemini integration for real-time summarization, and built the CI/CD pipeline behind
        it with Jest and Playwright.
      </>
    ),
    href: '/about',
    cta: 'See the experience',
  },
  {
    index: '03',
    title: 'Unconventional Path',
    hook: 'Mechanical engineering in Mumbai to machine learning in New York.',
    body: (
      <>
        A BE in Mechanical Engineering, then Software Engineering Team Lead at Cognizant owning 190+
        Java integration interfaces for enterprise clients including British Airways, then an MS in
        Computer Science — breadth, plus a track record of learning hard things quickly.
      </>
    ),
    href: '/about',
    cta: 'Read the full arc',
  },
];

const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: site.name,
  jobTitle: site.title,
  description: site.description,
  url: SITE_URL,
  email: `mailto:${links.email}`,
  alumniOf: [
    {
      '@type': 'CollegeOrUniversity',
      name: 'Pace University, Seidenberg School of Computer Science and Information Systems',
    },
    {
      '@type': 'CollegeOrUniversity',
      name: 'Mumbai University, Don Bosco Institute of Technology',
    },
  ],
  knowsAbout: ['Software Engineering', 'Machine Learning', 'Agentic AI Systems', 'Full-Stack Development'],
  sameAs: [links.linkedin, links.github],
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        // Static, author-controlled JSON — no user input reaches this string.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />

      <div className="mx-auto max-w-5xl px-5 sm:px-8">
        {/* Hero */}
        <section className="pb-16 pt-16 sm:pb-24 sm:pt-24" aria-labelledby="hero-heading">
          <SectionLabel>hello</SectionLabel>
          <h1
            id="hero-heading"
            className="mt-4 text-4xl font-bold tracking-tight text-fg sm:text-6xl"
          >
            {site.name}
          </h1>
          <p className="mt-3 text-xl text-fg-muted sm:text-2xl">{site.title}</p>

          <TypedLine
            text="Full-stack engineer shipping ML-powered products."
            className="mt-6 font-mono text-sm text-fg sm:text-base"
          />

          <p className="mt-8 max-w-prose text-base leading-relaxed text-fg-muted sm:text-lg">
            I hold an MS in Computer Science from Pace University (May 2025, GPA 3.86) and I&rsquo;m
            a published IEEE researcher. I&rsquo;ve shipped production features to 1,500+ paying
            customers and built agentic AI systems from scratch — task decomposition, tool use,
            retrieval, and the evaluation loops that keep them honest.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm">
            <Link
              href="/projects"
              className="rounded border border-accent/60 px-4 py-2 font-mono text-accent transition-colors hover:bg-accent/10"
            >
              View projects
            </Link>
            <a href={`mailto:${links.email}`} className="link-underline text-fg-muted">
              {links.email}
            </a>
          </div>
        </section>

        {/* Proof points */}
        <section className="border-t border-ink-border py-14" aria-labelledby="proof-heading">
          <SectionLabel>proof</SectionLabel>
          <h2 id="proof-heading" className="sr-only">
            Highlights
          </h2>
          <ul className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {proofs.map((proof, i) => (
              <Reveal as="li" key={proof.index} delay={i * 90}>
                <ProofCard proof={proof} />
              </Reveal>
            ))}
          </ul>
        </section>

        {/* Currently */}
        <Reveal>
          <section
            className="rounded-lg border border-accent/25 bg-accent-dim/40 px-6 py-5"
            aria-labelledby="currently-heading"
          >
            <h2 id="currently-heading" className="font-mono text-xs uppercase tracking-widest text-accent">
              Currently
            </h2>
            <p className="mt-2 text-sm text-fg-muted sm:text-base">
              Open to Full-Stack, ML/AI, and Mobile engineering roles in the NYC metro area.
            </p>
          </section>
        </Reveal>

        {/* Skills */}
        <section className="py-14" aria-labelledby="skills-heading">
          <SectionLabel>skills</SectionLabel>
          <h2 id="skills-heading" className="mt-4 text-2xl font-semibold tracking-tight">
            What I work with
          </h2>
          <dl className="mt-8 grid gap-x-10 gap-y-6 sm:grid-cols-2">
            {skillGroups.map((group, i) => (
              <Reveal key={group.label} delay={i * 70}>
                <dt className="font-mono text-xs uppercase tracking-widest text-accent/80">
                  {group.label}
                </dt>
                <dd className="mt-2 text-sm leading-relaxed text-fg-muted">
                  {group.items.join(' · ')}
                </dd>
              </Reveal>
            ))}
          </dl>
        </section>
      </div>
    </>
  );
}
