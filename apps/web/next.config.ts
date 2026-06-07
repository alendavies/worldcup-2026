import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    transpilePackages: [
        '@worldcup/core',
        '@worldcup/data',
        '@worldcup/api-client',
    ],
};

export default nextConfig;
