import type { SidebarNavItem, SiteConfig } from '@/types';

export const siteConfig: SiteConfig = {
  name: 'Shueny',
  description: 'Shueny Wang | Senior Frontend Engineer · AI Solutions Builder',
  url: 'https://shueny.github.io/',
  ogImage: 'https://shueny.github.io/og-image.png',
  author: 'Shueny Wang',
  twitter: '@shueny',
  locale: 'zh_TW',
  links: {
    instagram: 'https://www.instagram.com/shueny_wang/',
    github: 'https://github.com/shueny',
    linkedin: 'https://www.linkedin.com/in/shueny-wang/',
  },
};

export const footerLinks: SidebarNavItem[] = [
  {
    title: 'Portfolio',
    href: '#',
  },
  {
    title: 'Blogger',
    href: '#',
    // items: [
    // 	{title: 'Security', href: '#'},
    // 	{title: 'Customization', href: '#'},
    // 	{title: 'Customers', href: '#'},
    // 	{title: 'Changelog', href: '#'},
    // ],
  },
  // {
  // 	title: 'Docs',
  // 	items: [
  // 		{title: 'Introduction', href: '#'},
  // 		{title: 'Installation', href: '#'},
  // 		{title: 'Components', href: '#'},
  // 		{title: 'Code Blocks', href: '#'},
  // 	],
  // },
];
