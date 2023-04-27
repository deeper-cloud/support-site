const withMarkdoc = require('@markdoc/next.js');

module.exports = withMarkdoc({ reactStrictMode: true })({
  pageExtensions: ['md', 'mdoc', 'js', 'jsx', 'ts', 'tsx']
});
