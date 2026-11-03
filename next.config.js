/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['lucide-react'],
  images: {
    // Qualities used by image-gallery.tsx / image-marquee.tsx (plus the 75 default)
    qualities: [75, 80, 85, 90],
  },
  // Lets a phone on the LAN load dev JS/HMR (dev-only, no effect on production)
  allowedDevOrigins: ['192.168.1.186'],
  experimental: {
    agentUpgrade: 'security',
  },
};

module.exports = nextConfig;
