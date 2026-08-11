import type { Metadata } from 'next';
import Reveal from '@/components/Reveal';
import SectionLabel from '@/components/SectionLabel';
import Timeline from '@/components/Timeline';
import { roles } from '@/lib/content';
import { links } from '@/lib/site';

export const metadata: Metadata = {
  title: 'About',
  description:
    'From mechanical engineering in Mumbai to enterprise Java at Cognizant to an MS in Computer Science at Pace — how Clive Lewis got to building ML-powered products, plus published and ongoing research.',
  alternates: { canonical: '/about' },
  openGraph: {
    title: 'About — Clive Lewis',
    description:
      'From mechanical engineering in Mumbai to enterprise Java at Cognizant to an MS in Computer Science at Pace — plus published and ongoing research.',
    url: '/about',
  },
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-5xl px-5 py-16 sm:px-8 sm:py-20">
      <SectionLabel>about</SectionLabel>
      <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-5xl">Clive Lewis</h1>

      {/* Intro */}
      <section className="mt-8 max-w-prose space-y-5 text-base leading-relaxed text-fg-muted sm:text-lg">
        <p>
          A coconut-harvesting robot doesn&rsquo;t sound like the beginning of a software career. But that was my undergraduate capstone as a mechanical engineering student in Mumbai. I wrote the Arduino C that made it move, and somewhere in that code I found the part of the project I couldn&rsquo;t put down. It wasn&rsquo;t the mechanics. It was the code. That was enough to pull me out of mechanical engineering and into software for good.
        </p>
        <p>
          My first real stop was enterprise work. As a Software Engineering Team Lead at Cognizant, I maintained a portfolio of Java integration interfaces for clients including British Airways, working under SWIFT banking compliance. The work was exacting, and it taught me a habit I still rely on. When a failure keeps recurring, the first fix you reach for is usually just a patch on the symptom, not the cause. Finding that cause means stepping back far enough to actually see it.
        </p>
        <p>
          It&rsquo;s the same instinct that brought me to New York for a Master&rsquo;s in Computer Science at Pace University, and it&rsquo;s why the classes that stayed with me longest were two Computer Vision electives nobody made me take.
        </p>
        <p>
          I learn by building. With Flutter, with agentic AI architecture, with the internals of a U-Net, I got further by putting my hands on the problem than by reading about it first. That&rsquo;s also how I use AI coding tools day to day: not to skip the thinking, but to move faster through implementation so my attention stays where it matters, on architecture, judgment, and whether the thing actually works. And through all of it, I try to stay precise about what I&rsquo;ve built versus what I haven&rsquo;t. A working prototype is not a production system, and saying so plainly is part of doing the work honestly.
        </p>
      </section>

      {/* Experience */}
      <section className="mt-20" aria-labelledby="experience-heading">
        <SectionLabel>experience</SectionLabel>
        <h2 id="experience-heading" className="mt-4 text-2xl font-semibold tracking-tight sm:text-3xl">
          Where I&rsquo;ve worked
        </h2>
        <Timeline roles={roles} />
      </section>

      {/* Research */}
      <section id="research" className="mt-20 scroll-mt-20" aria-labelledby="research-heading">
        <SectionLabel>research</SectionLabel>
        <h2 id="research-heading" className="mt-4 text-2xl font-semibold tracking-tight sm:text-3xl">
          Research
        </h2>

        <Reveal className="mt-8">
          <article className="card">
            <span className="rounded-full border border-accent/40 px-2.5 py-0.5 font-mono text-[11px] uppercase tracking-wider text-accent">
              Published
            </span>
            <h3 className="mt-4 text-lg font-semibold text-fg">
              Knee Osteoarthritis Detection Using Bone Distances
            </h3>
            <p className="mt-2 max-w-prose font-mono text-xs leading-relaxed text-fg-faint">
              Clive Lewis, Tarun Ramapuram, Juan Shan. IEEE/ACM Conference on Connected Health:
              Applications, Systems and Engineering Technologies (CHASE 2025). New York City, New
              York — June 2025.
            </p>
            <div className="mt-5 max-w-prose space-y-4 text-sm leading-relaxed text-fg-muted sm:text-base">
              <p>
                In plain terms: we measured the geometric distances between bones in knee MRI scans
                and trained a model to predict how severe a patient&rsquo;s osteoarthritis is from
                those measurements. A MATLAB–PyTorch supervised deep learning pipeline over 160+
                scans, reaching 76% accuracy and an AUC of 0.78.
              </p>
              <p>
                This one started as curiosity. I took Dr. Juan Shan&rsquo;s Computer Vision and
                Advanced Computer Vision electives because the subject interested me, not because
                they were required — the arc from classical image processing through to deep learning
                stayed with me. That interest turned into mentored research with Dr. Shan, and the
                research turned into a peer-reviewed publication.
              </p>
              <p className="text-fg-faint">
                To be precise about what this is: genuine applied deep learning on medical images
                driven by geometric measurement — model design, training, and evaluation. It is not
                object detection, tracking, or segmentation work, and I don&rsquo;t describe it that
                way.
              </p>
            </div>
          </article>
        </Reveal>

        <Reveal className="mt-6" delay={80}>
          <article className="card">
            <span className="rounded-full border border-ink-border px-2.5 py-0.5 font-mono text-[11px] uppercase tracking-wider text-fg-faint">
              Unpublished · ongoing
            </span>
            <h3 className="mt-4 text-lg font-semibold text-fg">SAM-Net</h3>
            <div className="mt-4 max-w-prose space-y-4 text-sm leading-relaxed text-fg-muted sm:text-base">
              <p>
                A two-stage approach to image segmentation. A U-Net produces an initial
                segmentation; a separate ML model then selects the most efficient points from it;
                those points go into SAM (Segment Anything Model) alongside the original image to
                produce a refined result.
              </p>
              <p>
                I got properly stuck on this one. I could see that U-Net worked, but I couldn&rsquo;t
                say why — what was actually happening inside the encoder-decoder. So I built
                visualizations of the intermediate flattened vector representations at each stage of
                the network, using AI tools to move quickly through implementation so my attention
                stayed on the concept. Once I could watch feature maps compress and expand through
                the network, the architecture stopped being an abstraction.
              </p>
              <p>
                My test for whether I actually understand something complex isn&rsquo;t whether I can
                describe it. It&rsquo;s whether I can predict what an intermediate step will show
                before I look.
              </p>
            </div>
          </article>
        </Reveal>
      </section>

      {/* Education */}
      <section className="mt-20" aria-labelledby="education-heading">
        <SectionLabel>education</SectionLabel>
        <h2 id="education-heading" className="mt-4 text-2xl font-semibold tracking-tight sm:text-3xl">
          Education
        </h2>

        <ul className="mt-8 grid gap-5 sm:grid-cols-2">
          <Reveal as="li">
            <div className="card h-full">
              <p className="font-mono text-xs uppercase tracking-widest text-accent/80">May 2025</p>
              <h3 className="mt-3 text-lg font-semibold text-fg">MS, Computer Science</h3>
              <p className="mt-1 text-sm text-fg-muted">
                Pace University, Seidenberg School of Computer Science and Information Systems — New
                York, NY
              </p>
              <p className="mt-3 font-mono text-xs text-fg-faint">GPA 3.86 / 4.0</p>
              <p className="mt-3 text-sm leading-relaxed text-fg-muted">
                Artificial Intelligence, Algorithms &amp; Data Structures, Parallel Computing and
                Distributed Systems, plus Computer Vision and Advanced Computer Vision as electives.
              </p>
            </div>
          </Reveal>

          <Reveal as="li" delay={80}>
            <div className="card h-full">
              <p className="font-mono text-xs uppercase tracking-widest text-accent/80">June 2021</p>
              <h3 className="mt-3 text-lg font-semibold text-fg">BE, Mechanical Engineering</h3>
              <p className="mt-1 text-sm text-fg-muted">
                Mumbai University, Don Bosco Institute of Technology — Mumbai, India
              </p>
              <p className="mt-3 text-sm leading-relaxed text-fg-muted">
                Capstone: a coconut-harvesting robot, programmed in Arduino C. It worked, it was my
                first real taste of writing code that moves something in the physical world, and I
                have not claimed to be an embedded engineer since.
              </p>
            </div>
          </Reveal>
        </ul>
      </section>

      {/* Contact */}
      <Reveal className="mt-20">
        <section
          className="rounded-lg border border-accent/25 bg-accent-dim/40 px-6 py-6"
          aria-labelledby="contact-heading"
        >
          <h2 id="contact-heading" className="font-mono text-xs uppercase tracking-widest text-accent">
            Get in touch
          </h2>
          <p className="mt-3 text-sm text-fg-muted sm:text-base">
            Open to Full-Stack, ML/AI, and Mobile engineering roles in the NYC metro area. The
            fastest way to reach me is{' '}
            <a href={`mailto:${links.email}`} className="link-underline text-accent">
              {links.email}
            </a>
            .
          </p>
        </section>
      </Reveal>
    </div>
  );
}
