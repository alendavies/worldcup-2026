import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    transpilePackages: [
        '@worldcup/core',
        '@worldcup/data',
        '@worldcup/api-client',
    ],
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'flagcdn.com',
            },
        ],
    },
};

export default nextConfig;
