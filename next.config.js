/** @type {import('next').NextConfig} */

module.exports = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'placehold.co',
            port: '',
            pathname: '/**',
          },
        ],
    },
}
