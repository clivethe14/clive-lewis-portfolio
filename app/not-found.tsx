import Link from 'next/link';
import SectionLabel from '@/components/SectionLabel';

export default function NotFound() {
  return (
    <div className="mx-auto max-w-5xl px-5 py-24 sm:px-8 sm:py-32">
      <SectionLabel>404</SectionLabel>
      <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">Page not found</h1>
      <p className="mt-4 max-w-prose text-fg-muted">
        That route doesn&rsquo;t exist. The site only has three pages, so one of these will do it.
      </p>
      <Link
        href="/"
        className="mt-8 inline-block rounded border border-accent/60 px-4 py-2 font-mono text-sm text-accent transition-colors hover:bg-accent/10"
      >
        ← Back home
      </Link>
    </div>
  );
}
