/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  i18n: {
    /**
     * Provide the locales you want to support in your application
     */
    locales: ['en', 'zh-Hant'],
    /**
     * This is the default locale you want to be used when visiting
     * a non-locale prefixed path e.g. `/hello`
     */
    defaultLocale: 'en',
  },
}

module.exports = nextConfig
