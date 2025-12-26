/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['res.cloudinary.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
    ],
  },
  experimental: {
    optimizePackageImports: ['framer-motion', 'react-icons'],
    serverComponentsExternalPackages: ['@prisma/client', 'prisma', 'sharp'],
  },
  webpack: (config, { isServer }) => {
    // Optimize bundle size
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
      };
    }

    // Reduce bundle size by excluding large dependencies from client bundle
    config.externals = config.externals || [];
    if (isServer) {
      config.externals.push({
        'utf-8-validate': 'commonjs utf-8-validate',
        'bufferutil': 'commonjs bufferutil',
        sharp: 'commonjs sharp',
        '@prisma/client': 'commonjs @prisma/client',
      });
    }

    // Exclude Prisma binary from bundle
    config.externals.push('prisma');

    return config;
  },
  // Reduce serverless function size
  generateBuildId: async () => {
    return 'build-' + Date.now();
  },
}

module.exports = nextConfig
