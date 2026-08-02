/**
 * Single source of truth for identity, links, and SEO constants.
 * Every fact here traces back to the master profile document.
 */

// TODO: replace with the production domain before deploying (used for canonical
// URLs, sitemap entries, and OpenGraph absolute URLs).
export const SITE_URL = 'https://clivelewis.dev';

export const site = {
  name: 'Clive Lewis',
  title: 'Software Engineer',
  url: SITE_URL,
  description:
    'Software engineer with an MS in Computer Science from Pace University. Published IEEE researcher, shipped production features to 1,500+ paying customers, builds agentic AI systems.',
} as const;

export const links = {
  email: 'clivelewis.dbit@gmail.com',
  linkedin: 'https://www.linkedin.com/in/clivevictorlewis/',
  github: 'https://github.com/clivethe14',
  resume: '/resume.pdf',
} as const;

export const nav = [
  { href: '/', label: 'Home' },
  { href: '/projects', label: 'Projects' },
  { href: '/about', label: 'About' },
] as const;
