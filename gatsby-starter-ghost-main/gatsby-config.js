/* eslint-disable semi */
/* eslint-disable no-unsafe-finally */
/* eslint-disable no-restricted-syntax */
const path = require(`path`)

const config = require(`./src/utils/siteConfig`)
const generateRSSFeed = require(`./src/utils/rss/generate-feed`)

require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
})

// let ghostConfig;

// try {
//     ghostConfig = require(`./.ghost`);
// } catch (e) {
//     ghostConfig = {
//         production: {
//             apiUrl: process.env.GHOST_API_URL,
//             contentApiKey: process.env.GHOST_CONTENT_API_KEY,
//         },
//     };
// } finally {
//     const { apiUrl, contentApiKey } =
//         process.env.NODE_ENV === `development`
//             ? ghostConfig.development
//             : ghostConfig.production;

//     if (!apiUrl || !contentApiKey || contentApiKey.match(/<key>/)) {
//         throw new Error(
//             `GHOST_API_URL and GHOST_CONTENT_API_KEY are required to build. Check the README.`
//         ); // eslint-disable-line
//     }
// }

// if (
//     process.env.NODE_ENV === `production` &&
//     config.siteUrl === `http://localhost:8000` &&
//     !process.env.SITEURL
// ) {
//     throw new Error(
//         `siteUrl can't be localhost and needs to be configured in siteConfig. Check the README.`
//     ); // eslint-disable-line
// }

/**
 * This is the place where you can tell Gatsby which plugins to use
 * and set them up the way you want.
 *
 * Further info 👉🏼 https://www.gatsbyjs.org/docs/gatsby-config/
 *
 */
module.exports = {
  siteMetadata: {
    siteUrl: process.env.SITEURL || config.siteUrl,
    ...config,
    siteMetadata: {
      title: config.siteTitleMeta,
      descriptopn: config.siteDescriptionMeta,
    },
  },
  trailingSlash: 'always',
  plugins: [
    /**
     *  Content Plugins
     */
    'gatsby-plugin-postcss',
    {
      resolve: `gatsby-source-notion-api`,
      options: {
        token: `secret_gncnoPL1JGQKaMMFeWX27SsUSFphrz3SbXd8udcHsuB`,
        databaseId: `0d95330f07884f87a59ac25a47507b05`,
        propsToFrontmatter: true,
        lowerTitleLevel: true,
      },
    },
    {
      resolve: `gatsby-source-notion-article`,
      options: {
        // Learn about environment variables: https://gatsby.dev/env-vars
        token: `secret_303hG3FD1iuLKt2tt996MqAKuOn2xawC4WM4vNNKkGm`, //process.env.NOTION_KEY required
        databaseId: `aa5e5d8e76f14b87a5133229fa6a9eba`, //process.env.NOTION_DATABASE_ID required
        params: {
          page_size: 3, // optional, default is 100
          filter: {}, // optional
          sort: {}, // optional
        },
      },
    },
    // Setup for optimised images.
    // See https://www.gatsbyjs.org/packages/gatsby-image/
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: path.join(__dirname, `src`, `images`),
        name: `images`,
      },
    },
    `gatsby-plugin-image`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    /**
     *  Utility Plugins
     */
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        // Footnotes mode (default: true)
        footnotes: true,
        // GitHub Flavored Markdown mode (default: true)
        gfm: true,
        // Plugins configs
        plugins: [
          `gatsby-remark-reading-time`,
          // ...
        ],
      },
    },
    // {
    //   resolve: `gatsby-plugin-feed`,
    //   options: {
    //     query: `
    //             {
    //                 allGhostSettings {
    //                     edges {
    //                         node {
    //                             title
    //                             description
    //                         }
    //                     }
    //                 }
    //             }
    //           `,
    //     feeds: [generateRSSFeed(config)],
    //   },
    // },
    // {
    //   resolve: `gatsby-plugin-advanced-sitemap`,
    //   options: {
    //     query: `
    //             {
    //                 allGhostPost {
    //                     edges {
    //                         node {
    //                             id
    //                             slug
    //                             updated_at
    //                             created_at
    //                             feature_image
    //                         }
    //                     }
    //                 }
    //                 allGhostPage {
    //                     edges {
    //                         node {
    //                             id
    //                             slug
    //                             updated_at
    //                             created_at
    //                             feature_image
    //                         }
    //                     }
    //                 }
    //                 allGhostTag {
    //                     edges {
    //                         node {
    //                             id
    //                             slug
    //                             feature_image
    //                         }
    //                     }
    //                 }
    //                 allGhostAuthor {
    //                     edges {
    //                         node {
    //                             id
    //                             slug
    //                             profile_image
    //                         }
    //                     }
    //                 }
    //             }`,
    //     mapping: {
    //       allGhostPost: {
    //         sitemap: `posts`,
    //       },
    //       allGhostTag: {
    //         sitemap: `tags`,
    //       },
    //       allGhostAuthor: {
    //         sitemap: `authors`,
    //       },
    //       allGhostPage: {
    //         sitemap: `pages`,
    //       },
    //     },
    //     exclude: [
    //       `/dev-404-page`,
    //       `/404`,
    //       `/404.html`,
    //       `/offline-plugin-app-shell-fallback`,
    //     ],
    //     createLinkInHead: true,
    //     addUncaughtPages: true,
    //   },
    // },
    `gatsby-plugin-catch-links`,
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-offline`,
  ],
}
