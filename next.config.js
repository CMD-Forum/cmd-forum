/** @type {import('next').NextConfig} */

const nextConfig = {
    pageExtensions: ['js', 'jsx', 'ts', 'tsx'],
    output: "standalone",
    experimental: {
        serverComponentsExternalPackages: ["@node-rs/argon2"]
    },
}

module.exports = nextConfig;