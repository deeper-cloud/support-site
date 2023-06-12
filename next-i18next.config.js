module.exports = {
  debug: process.env.NODE_ENV !== 'production',
  i18n: {
    defaultLocale: "en-US",
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
  },
  reloadOnPrerender: process.env.NODE_ENV !== 'production',
}