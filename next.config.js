const withPlugins = require('next-compose-plugins');
const withMarkdoc = require('@markdoc/next.js');
const { i18n } = require('./next-i18next.config')
const withTM = require('next-transpile-modules')(['date-fns'])

module.exports = withPlugins([
  withTM({
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
  }),
  withMarkdoc({ mode: 'server' })(
    { pageExtensions: ['md', 'ts', 'tsx'], i18n }
  ),
], {
  i18n,
})