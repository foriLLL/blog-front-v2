/** @type {import('next').NextConfig} */
const path = require('path')
module.exports = {
  reactStrictMode: true,
  swcMinify: false,
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  eslint: {
    dirs: ['src'],
  },
  async rewrites() {
    return [
      {
        source: '/static/:slug*',
        destination: '/api/static/:slug*',
      },
      {
        source: '/proxy/:slug*',
        destination: '/api/proxy/:slug*',
      },
    ]
  },
}
