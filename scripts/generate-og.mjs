/**
 * Generates public/og.png at build time.
 *
 * Next's `opengraph-image` metadata route would work, but under `output: 'export'`
 * it emits an extension-less file referenced with a cache-busting query string.
 * Caddy then serves it as application/octet-stream and several crawlers
 * (LinkedIn, Slack) drop the preview. Writing a real .png into public/ keeps the
 * asset a plain static file with a correct Content-Type.
 *
 * Uses `next/og` and `react`, both already direct dependencies — nothing extra.
 */
import { writeFile, mkdir } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createElement as h } from 'react';
// `next/og` has no ESM export map entry; the .js specifier resolves in plain Node.
import { ImageResponse } from 'next/og.js';

const OUT = resolve(dirname(fileURLToPath(import.meta.url)), '../public/og.png');

const NAME = 'Clive Lewis';
const TITLE = 'Software Engineer';
const TAGLINE = 'Full-stack engineer shipping ML-powered products.';

const card = h(
  'div',
  {
    style: {
      width: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      padding: '80px',
      background: '#0b0e13',
      // Satori supports a narrow gradient grammar; a plain linear stop is safe.
      backgroundImage: 'linear-gradient(160deg, #101b1e 0%, #0b0e13 55%)',
    },
  },
  h(
    'div',
    { style: { display: 'flex', fontSize: 26, letterSpacing: 6, color: '#5eead4' } },
    `// ${TITLE.toUpperCase()}`,
  ),
  h(
    'div',
    {
      style: {
        display: 'flex',
        marginTop: 28,
        fontSize: 104,
        fontWeight: 700,
        color: '#e6e9ef',
        letterSpacing: -2,
      },
    },
    NAME,
  ),
  h('div', { style: { display: 'flex', marginTop: 28, fontSize: 34, color: '#9aa4b2' } }, TAGLINE),
  h('div', {
    style: { display: 'flex', marginTop: 56, height: 4, width: 220, background: '#2dd4bf' },
  }),
);

const response = new ImageResponse(card, { width: 1200, height: 630 });
const buffer = Buffer.from(await response.arrayBuffer());

await mkdir(dirname(OUT), { recursive: true });
await writeFile(OUT, buffer);

console.log(`generated public/og.png (${(buffer.length / 1024).toFixed(1)} KB)`);
