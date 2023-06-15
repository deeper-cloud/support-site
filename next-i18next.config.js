const path = require('path')

module.exports = {
  i18n: {
    locales: ["en-US", 'he-IL'],
    domains: [
      {
        domain: "support.deeper.cloud",
        defaultLocale: "en-US",
      },
      {
        domain: "il.support.deeper.cloud",
        defaultLocale: "he-IL",
      },
    ],
    defaultLocale: "en-US",
  },
  serializeConfig: false,
  localePath: path.resolve('./public/locales'),
  ns: "common",
  reloadOnPrerender: process.env.NODE_ENV !== 'production',
}