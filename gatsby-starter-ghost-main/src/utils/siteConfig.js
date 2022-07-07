module.exports = {
  siteUrl:
    process.env.NODE_ENV === `production`
      ? process.env.SITE_URL || `http://localhost:3005`
      : `http://localhost:3005`, // Site domain. Do not include a trailing slash!

  postsPerPage: 12, // Number of posts shown on paginated pages (changes this requires sometimes to delete the cache)
  title: `Shueny's blog`,
  description: `my tech or something else notes blog`,
  siteTitleMeta: `Shueny's blog`, // This allows an alternative site title for meta data for pages.
  siteDescriptionMeta: `A starter template to build amazing static websites with Ghost and Gatsby`, // This allows an alternative site description for meta data for pages.

  shareImageWidth: 1000, // Change to the width of your default share image
  shareImageHeight: 523, // Change to the height of your default share image

  shortTitle: `Shueny's blog`, // Used for App manifest e.g. Mobile Home Screen
  siteIcon: `favicon.png`, // Logo in /static dir used for SEO, RSS, and App manifest
  backgroundColor: `#e9e9e9`, // Used for Offline Manifest
  themeColor: `#15171A`, // Used for Offline Manifest
  coverImage: 'cover-image.jpg',
  logo: 'logo.png',
}
