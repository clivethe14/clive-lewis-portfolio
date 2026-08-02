/**
 * Generates the site's raster images at build time:
 *   public/og.png              1200x630 OpenGraph card
 *   public/apple-touch-icon.png  180x180 iOS home-screen icon
 *
 * Next's `opengraph-image` metadata route would work, but under `output: 'export'`
 * it emits an extension-less file referenced with a cache-busting query string.
 * Caddy then serves it as application/octet-stream and several crawlers
 * (LinkedIn, Slack) drop the preview. Writing a real .png into public/ keeps the
 * asset a plain static file with a correct Content-Type.
 *
 * The touch icon is rasterized from public/icon.svg so the SVG stays the single
 * source of truth for the mark — iOS is the one place that won't take an SVG.
 *
 * Uses `next/og` and `react`, both already direct dependencies — nothing extra.
 */
import { writeFile, mkdir, readFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createElement as h } from 'react';
// `next/og` has no ESM export map entry; the .js specifier resolves in plain Node.
import { ImageResponse } from 'next/og.js';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const OUT = resolve(root, 'public/og.png');
const ICON_OUT = resolve(root, 'public/apple-touch-icon.png');
const FAVICON_OUT = resolve(root, 'public/favicon.ico');
const ICON_SRC = resolve(root, 'public/icon.svg');

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

async function rasterize(element, size) {
  const response = new ImageResponse(element, size);
  return Buffer.from(await response.arrayBuffer());
}

async function emit(buffer, outPath) {
  await mkdir(dirname(outPath), { recursive: true });
  await writeFile(outPath, buffer);
  console.log(`generated public/${outPath.split(/[\\/]/).pop()} (${(buffer.length / 1024).toFixed(1)} KB)`);
}

async function render(element, size, outPath) {
  await emit(await rasterize(element, size), outPath);
}

/**
 * Wraps a PNG in an ICO container. The .ico format has allowed a raw PNG
 * payload since Windows Vista, so no encoder is needed — just a 6-byte
 * ICONDIR plus one 16-byte ICONDIRENTRY pointing at the PNG.
 */
function pngToIco(png, dimension) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // type: 1 = icon
  header.writeUInt16LE(1, 4); // one image in the file

  const entry = Buffer.alloc(16);
  entry.writeUInt8(dimension === 256 ? 0 : dimension, 0); // 0 means 256
  entry.writeUInt8(dimension === 256 ? 0 : dimension, 1);
  entry.writeUInt8(0, 2); // palette size
  entry.writeUInt8(0, 3); // reserved
  entry.writeUInt16LE(1, 4); // color planes
  entry.writeUInt16LE(32, 6); // bits per pixel
  entry.writeUInt32LE(png.length, 8);
  entry.writeUInt32LE(header.length + entry.length, 12); // payload offset

  return Buffer.concat([header, entry, png]);
}

await render(card, { width: 1200, height: 630 }, OUT);

// iOS ignores SVG favicons and crops transparent PNGs onto white, so the touch
// icon is drawn edge to edge on the site background.
const svg = await readFile(ICON_SRC, 'utf8');
const mark = (px) =>
  h(
    'div',
    {
      style: {
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#0b0e13',
      },
    },
    h('img', {
      width: px,
      height: px,
      src: `data:image/svg+xml;base64,${Buffer.from(svg).toString('base64')}`,
    }),
  );

await render(mark(180), { width: 180, height: 180 }, ICON_OUT);

// Browsers request /favicon.ico by path whether or not a <link> advertises it,
// so this exists to answer that request and to serve clients that ignore SVG.
const favicon32 = await rasterize(mark(32), { width: 32, height: 32 });
await emit(pngToIco(favicon32, 32), FAVICON_OUT);
