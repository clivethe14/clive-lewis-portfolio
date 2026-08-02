import Link from 'next/link';
import type { ReactNode } from 'react';

export type Proof = {
  index: string;
  title: string;
  hook: string;
  body: ReactNode;
  href?: string;
  cta?: string;
};

export default function ProofCard({ proof }: { proof: Proof }) {
  return (
    <article className="card card-hover flex h-full flex-col">
      <p className="font-mono text-xs text-accent/80">{proof.index}</p>
      <h3 className="mt-3 text-lg font-semibold text-fg">{proof.title}</h3>
      <p className="mt-2 text-sm text-fg-muted">{proof.hook}</p>
      <div className="mt-4 text-sm leading-relaxed text-fg-muted">{proof.body}</div>
      {proof.href && proof.cta && (
        <Link
          href={proof.href}
          className="mt-5 inline-flex items-center gap-1.5 font-mono text-xs text-accent transition-opacity hover:opacity-75"
        >
          {proof.cta}
          <span aria-hidden="true">→</span>
        </Link>
      )}
    </article>
  );
}
