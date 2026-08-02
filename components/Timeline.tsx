import Reveal from '@/components/Reveal';
import type { Role } from '@/lib/content';

export default function Timeline({ roles }: { roles: Role[] }) {
  return (
    <ol className="relative mt-10 space-y-12 border-l border-ink-border pl-6 sm:pl-8">
      {roles.map((role, i) => (
        <Reveal as="li" key={role.company} delay={i * 80} className="relative">
          <span
            aria-hidden="true"
            className="absolute -left-[1.9rem] top-2 h-2.5 w-2.5 rounded-full border border-accent bg-ink sm:-left-[2.4rem]"
          />
          <p className="font-mono text-xs uppercase tracking-widest text-accent/80">
            {role.period}
          </p>
          <h3 className="mt-2 text-lg font-semibold text-fg">{role.title}</h3>
          <p className="mt-0.5 text-sm text-fg-muted">
            {role.company} · {role.location}
          </p>
          <div className="mt-4 max-w-prose space-y-3 text-sm leading-relaxed text-fg-muted sm:text-base">
            {role.body.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </Reveal>
      ))}
    </ol>
  );
}
