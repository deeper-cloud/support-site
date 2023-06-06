module.exports = {
  debug: false,
  i18n: {
    defaultLocale: "he-IL",
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
  reloadOnPrerender: process.env.NODE_ENV === 'development',
}