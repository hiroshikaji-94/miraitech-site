import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // Serve MDX as pages when needed
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],

  images: {
    formats: ['image/avif', 'image/webp'],
    // Next 16 requires an explicit allowlist. 90 is used for case-study cover shots.
    qualities: [75, 90],
    remotePatterns: [
      // Add external image hosts here as needed
    ],
  },

  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
}

export default nextConfig
