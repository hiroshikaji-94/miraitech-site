import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // Serve MDX as pages when needed
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],

  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      // Add external image hosts here as needed
    ],
  },

  experimental: {
    optimizePackageImports: ['lucide-react', 'framer-motion'],
  },
}

export default nextConfig
