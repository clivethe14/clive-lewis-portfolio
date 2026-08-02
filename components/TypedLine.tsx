'use client';

import { useEffect, useLayoutEffect, useRef, useState } from 'react';

const useIsomorphicLayoutEffect = typeof window === 'undefined' ? useEffect : useLayoutEffect;

/**
 * Types `text` out once — never loops.
 *
 * The server renders the complete string so crawlers and no-JS visitors get the
 * real text. On the client a layout effect clears it before the first paint,
 * then types it back. Under `prefers-reduced-motion` nothing is cleared and the
 * line simply appears.
 */
export default function TypedLine({
  text,
  speed = 38,
  startDelay = 350,
  className = '',
}: {
  text: string;
  speed?: number;
  startDelay?: number;
  className?: string;
}) {
  const [shown, setShown] = useState(text);
  const [done, setDone] = useState(true);
  const animate = useRef(false);

  useIsomorphicLayoutEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    animate.current = true;
    setShown('');
    setDone(false);
  }, []);

  useEffect(() => {
    if (!animate.current) return;

    let index = 0;
    let timer: number;

    const tick = () => {
      index += 1;
      setShown(text.slice(0, index));
      if (index < text.length) {
        timer = window.setTimeout(tick, speed);
      } else {
        setDone(true);
      }
    };

    timer = window.setTimeout(tick, startDelay);
    return () => window.clearTimeout(timer);
  }, [text, speed, startDelay]);

  return (
    <p className={className}>
      <span className="text-accent" aria-hidden="true">
        &gt;{' '}
      </span>
      {/* Screen readers get the finished sentence, not a character-by-character stream. */}
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">{shown}</span>
      {!done && <span className="caret" aria-hidden="true">&nbsp;</span>}
    </p>
  );
}
