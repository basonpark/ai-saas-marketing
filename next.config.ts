import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    reactStrictMode: false,
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'wordpress-1402576-5209493.cloudwaysapps.com',
                pathname: '/**'
            }
        ]
    }
};

export default nextConfig;
