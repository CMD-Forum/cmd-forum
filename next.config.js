/** @type {import('next').NextConfig} */

const nextConfig = {
    pageExtensions: ['js', 'jsx', 'ts', 'tsx'],
    output: "standalone",
    experimental: {
        serverComponentsExternalPackages: ["@node-rs/argon2"]
    },
    async redirects() {
        return [
          // Redirect '/' to '/posts', works better here as the '/' page doesn't start rendering.
          {
            source: '/',
            destination: '/posts',
            permanent: true,
          },
          // Wildcard path matching
          //{
          //  source: '/blog/:slug',
          //  destination: '/news/:slug',
          //  permanent: true,
          //},
        ]
    },
}

module.exports = nextConfig;