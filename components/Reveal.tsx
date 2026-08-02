'use client';

import { useEffect, useRef, type ElementType, type ReactNode } from 'react';

type RevealProps = {
  children: ReactNode;
  /** Stagger within a group, in milliseconds. */
  delay?: number;
  as?: ElementType;
  className?: string;
};

/**
 * Fades and lifts its children into view once, on first intersection.
 *
 * The hidden state lives in CSS (`.reveal`), so markup is server-rendered as
 * normal content. `prefers-reduced-motion` neutralises the class in CSS, and a
 * <noscript> override in the root layout keeps the site readable without JS.
 */
export default function Reveal({
  children,
  delay = 0,
  as: Tag = 'div',
  className = '',
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reveal = () => {
      el.dataset.revealed = 'true';
    };

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced || typeof IntersectionObserver === 'undefined') {
      reveal();
      return;
    }

    // Anything already on screen at mount is revealed without waiting for an
    // observer callback. IntersectionObserver only runs during rendering steps,
    // so a document that never paints (background tab, some prerenderers) would
    // otherwise leave this content stuck at opacity 0.
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      el.style.transitionDelay = `${delay}ms`;
      reveal();
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          el.style.transitionDelay = `${delay}ms`;
          reveal();
          observer.disconnect();
        }
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.05 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <Tag ref={ref} className={`reveal ${className}`}>
      {children}
    </Tag>
  );
}
