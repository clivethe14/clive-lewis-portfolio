/** @type {import('next').NextConfig} */
const nextConfig = {
  // Flat-file output in `out/` — served directly by Caddy, no Node runtime in prod.
  output: 'export',
  // Caddy serves `/about` from `/about/index.html`; trailing slashes keep relative
  // asset resolution identical between `next dev` and the exported site.
  trailingSlash: true,
  images: {
    // No Image Optimization server exists in a static export.
    unoptimized: true,
  },
  reactStrictMode: true,
};

export default nextConfig;
