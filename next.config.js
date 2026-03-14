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
  images: {
    domains: ['img.foril.fun'],
  },
}
