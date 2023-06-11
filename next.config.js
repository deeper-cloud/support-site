const withMarkdoc = require('@markdoc/next.js');
const { i18n } = require('./next-i18next.config')
const withTM = require('next-transpile-modules')(['date-fns'])

module.exports = withTM({
  ...withMarkdoc({ mode: 'static' })({
    pageExtensions: ['ts', 'tsx', 'md', 'mdx'],
  }),
  i18n,
  output: 'standalone',
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "firebasestorage.googleapis.com"
      }
    ]
  }
});
