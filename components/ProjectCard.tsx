import type { Project } from '@/lib/content';

export default function ProjectCard({ project }: { project: Project }) {
  const featured = Boolean(project.featured);

  return (
    <article
      className={`card card-hover flex h-full flex-col ${
        featured ? 'border-accent/30 sm:p-8' : ''
      }`}
      aria-labelledby={`${project.slug}-title`}
    >
      <div className="flex flex-wrap items-center gap-3">
        <h2
          id={`${project.slug}-title`}
          className={`font-semibold tracking-tight text-fg ${featured ? 'text-2xl' : 'text-lg'}`}
        >
          {project.name}
        </h2>
        {project.badge && (
          <span className="rounded-full border border-accent/40 px-2.5 py-0.5 font-mono text-[11px] uppercase tracking-wider text-accent">
            {project.badge}
          </span>
        )}
      </div>

      <p className="mt-1.5 font-mono text-xs text-fg-faint">{project.period}</p>
      <p className="mt-3 text-sm leading-relaxed text-fg-muted sm:text-base">{project.summary}</p>

      <ul className="mt-5 space-y-2.5 text-sm leading-relaxed text-fg-muted">
        {project.bullets.map((bullet) => (
          <li key={bullet} className="flex gap-2.5">
            <span aria-hidden="true" className="mt-[0.45rem] h-1 w-1 shrink-0 rounded-full bg-accent/70" />
            <span>{bullet}</span>
          </li>
        ))}
      </ul>

      {project.aside && (
        <div className="mt-6 rounded-md border border-ink-border bg-ink/60 p-5">
          <h3 className="font-mono text-xs uppercase tracking-widest text-accent/80">
            {project.aside.heading}
          </h3>
          <ol className="mt-3 space-y-2 text-sm leading-relaxed text-fg-muted">
            {project.aside.items.map((item, i) => (
              <li key={item} className="flex gap-2.5">
                <span aria-hidden="true" className="font-mono text-xs text-fg-faint">
                  {i + 1}.
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ol>
        </div>
      )}

      <ul className="mt-6 flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <li
            key={tag}
            className="rounded border border-ink-border px-2 py-0.5 font-mono text-[11px] text-fg-faint"
          >
            {tag}
          </li>
        ))}
      </ul>

      {(project.link || project.note) && (
        <div className="mt-6 border-t border-ink-border pt-4">
          {project.link ? (
            <a
              href={project.link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 font-mono text-xs text-accent transition-opacity hover:opacity-75"
            >
              {project.link.label}
              <span className="sr-only"> for {project.name} (opens in a new tab)</span>
              <span aria-hidden="true">↗</span>
            </a>
          ) : (
            <p className="font-mono text-xs text-fg-faint">{project.note}</p>
          )}
        </div>
      )}
    </article>
  );
}
