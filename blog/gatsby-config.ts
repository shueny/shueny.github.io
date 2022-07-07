import type {GatsbyConfig} from 'gatsby';

require('dotenv').config({
	path: `.env.${process.env.NODE_ENV}`,
});

const config: GatsbyConfig = {
	siteMetadata: {
		title: `blog`,
		siteUrl: `https://www.yourdomain.tld`,
	},
	// More easily incorporate content into your pages through automatic TypeScript type generation and better GraphQL IntelliSense.
	// If you use VSCode you can also use the GraphQL plugin
	// Learn more at: https://gatsby.dev/graphql-typegen
	graphqlTypegen: true,
	plugins: [
		'gatsby-plugin-netlify-cms',
		'gatsby-plugin-postcss',
		{
			resolve: `gatsby-source-notion-api`,
			options: {
				token: `secret_303hG3FD1iuLKt2tt996MqAKuOn2xawC4WM4vNNKkGm`,
				databaseId: `0d95330f07884f87a59ac25a47507b05`,
				propsToFrontmatter: true,
				lowerTitleLevel: true,
			},
		},
		// {
		// 	resolve: 'gatsby-source-notion',
		// 	options: {
		// 		databases: ['0d95330f07884f87a59ac25a47507b05'],
		// 		pages: ['secret_gncnoPL1JGQKaMMFeWX27SsUSFphrz3SbXd8udcHsuB'],
		// 	},
		// },
		// {
		// 	resolve: 'gatsby-plugin-google-analytics',
		// 	options: {
		// 		trackingId: '',
		// 	},
		// },
		'gatsby-plugin-image',
		'gatsby-transformer-sharp',
		'gatsby-transformer-sharp',
		'gatsby-plugin-react-helmet',
		'gatsby-plugin-sitemap',
		{
			resolve: 'gatsby-plugin-manifest',
			options: {
				icon: 'src/images/icon.png',
			},
		},
		'gatsby-plugin-mdx',
		{
			resolve: `gatsby-transformer-remark`,
			options: {
				// Footnotes mode (default: true)
				footnotes: true,
				// GitHub Flavored Markdown mode (default: true)
				gfm: true,
				// Plugins configs
				plugins: [],
			},
		},
		'gatsby-plugin-sharp',
		{
			resolve: 'gatsby-source-filesystem',
			options: {
				name: 'images',
				path: './src/images/',
			},
			__key: 'images',
		},
		{
			resolve: 'gatsby-source-filesystem',
			options: {
				name: 'pages',
				path: './src/pages/',
			},
			__key: 'pages',
		},
	],
};

export default config;
