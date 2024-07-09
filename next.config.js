/** @type {import('next').NextConfig} */

//const withBundleAnalyzer = require('@next/bundle-analyzer')({
//    enabled: true,
//})

const nextConfig = {
    pageExtensions: ['js', 'jsx', 'ts', 'tsx'],
    output: "standalone",
    experimental: {
        serverComponentsExternalPackages: ["@node-rs/argon2"]
    },
}

// module.exports = withBundleAnalyzer(nextConfig);
module.exports = nextConfig;