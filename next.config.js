/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['lucide-react'],
  experimental: {
    agentUpgrade: 'security',
  },
};

module.exports = nextConfig;
