/** @type {import('next').NextConfig} */
const path = require('path');
const withPlugins = require('next-compose-plugins');
const withAntdLess = require('next-plugin-antd-less');

const pluginAntdLess = withAntdLess({
  // @ts-ignore
  modifyVars: {
    '@primary-color': 'red',
    '@menu-dark-bg': '#ccc'
  }
});
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  }
}


module.exports = withPlugins([[pluginAntdLess]], nextConfig);
