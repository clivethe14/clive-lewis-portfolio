'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { links, nav, site } from '@/lib/site';

function isActive(pathname: string, href: string) {
  const path = pathname.replace(/\/+$/, '') || '/';
  return href === '/' ? path === '/' : path.startsWith(href);
}

export default function Nav() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-ink-border/80 bg-ink/80 backdrop-blur supports-[backdrop-filter]:bg-ink/60">
      <nav
        aria-label="Main"
        className="mx-auto flex h-14 max-w-5xl items-center justify-between gap-4 px-5 sm:px-8"
      >
        <Link
          href="/"
          className="font-mono text-sm text-fg transition-colors hover:text-accent"
        >
          <span className="text-accent">$</span> {site.name.toLowerCase().replace(' ', '-')}
        </Link>

        <ul className="flex items-center gap-4 text-sm sm:gap-6">
          {nav.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={isActive(pathname, item.href) ? 'page' : undefined}
                className={`transition-colors hover:text-accent ${
                  isActive(pathname, item.href) ? 'text-accent' : 'text-fg-muted'
                }`}
              >
                {item.label}
              </Link>
            </li>
          ))}
          <li>
            <a
              href={links.resume}
              className="rounded border border-ink-border px-2.5 py-1 text-fg-muted transition-colors hover:border-accent/60 hover:text-accent"
            >
              Resume
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
