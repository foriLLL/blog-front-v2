/** @type {import('next').NextConfig} */
const path = require('path')
const withPlugins = require('next-compose-plugins')
const withAntdLess = require('next-plugin-antd-less')

const pluginAntdLess = withAntdLess({
  // @ts-ignore
  modifyVars: {
    '@primary-color': '#1E88E5',
    // '@primary-color': '#EE7F35',
    '@menu-dark-bg': '#1a1a1b',
    '@menu-dark-inline-submenu-bg': '#343434',
  },
})
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  eslint: {
    dirs: ['src'],
  },
}

module.exports = withPlugins([[pluginAntdLess]], nextConfig)
