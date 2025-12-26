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
    serverComponentsExternalPackages: ['prisma', 'sharp', 'cloudinary', 'bcryptjs'],
    outputFileTracingExcludes: {
      '**/*': [
        'node_modules/@prisma/engines/**/*',
        'node_modules/sharp/**/*',
        'node_modules/cloudinary/**/*',
        'node_modules/bcryptjs/**/*',
      ],
    },
    outputFileTracingRoot: undefined,
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

    // Aggressive exclusion of large dependencies
    config.externals = config.externals || [];

    // Exclude all large packages from bundles
    config.externals.push({
      'prisma': 'commonjs prisma',
      'sharp': 'commonjs sharp',
      'cloudinary': 'commonjs cloudinary',
      'bcryptjs': 'commonjs bcryptjs',
      'next-auth': 'commonjs next-auth',
      'razorpay': 'commonjs razorpay',
      'react-dropzone': 'commonjs react-dropzone',
    });

    // For server-side, exclude even more
    if (isServer) {
      config.externals.push({
        'utf-8-validate': 'commonjs utf-8-validate',
        'bufferutil': 'commonjs bufferutil',
        '@prisma/engines': 'commonjs @prisma/engines',
      });
    }

    return config;
  },
  // Reduce serverless function size
  generateBuildId: async () => {
    return 'build-' + Date.now();
  },
}

module.exports = nextConfig
