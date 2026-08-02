import { links, site } from '@/lib/site';

const contacts = [
  { href: `mailto:${links.email}`, label: links.email },
  { href: links.linkedin, label: 'LinkedIn', external: true },
  { href: links.github, label: 'GitHub', external: true },
];

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-ink-border">
      <div className="mx-auto flex max-w-5xl flex-col gap-4 px-5 py-10 text-sm sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <p className="font-mono text-xs text-fg-faint">
          © {new Date().getFullYear()} {site.name}
        </p>
        <ul className="flex flex-wrap items-center gap-x-6 gap-y-2">
          {contacts.map((c) => (
            <li key={c.label}>
              <a
                href={c.href}
                className="link-underline text-fg-muted"
                {...(c.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              >
                {c.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
