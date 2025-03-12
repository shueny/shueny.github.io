import type { FedConfig } from '@/types';

export const fedConfig: FedConfig = {
  mainNav: [
    {
      title: 'Documentation',
      href: '/docs/getting-started/',
    },
    {
      title: 'Guides',
      href: '/guides',
    },
  ],
  sidebarNav: [
    {
      title: 'Getting Started',
      items: [
        {
          title: 'Introduction',
          href: '/docs/getting-started/',
        },
      ],
    },
    {
      title: 'Questions',
      href: '/docs/fed-system-design/questions',
      items: [
        {
          title: 'Poll Widget',
          href: '/docs/fed-system-design/poll-widget',
        },
        // {
        //   title: 'Components',
        //   href: '/docs/documentation/components',
        // },
        // {
        //   title: 'Configuration  Astro DB',
        //   href: '/docs/documentation/components',
        //   disabled: true,
        // },
        // {
        //   title: 'Search (Fuse.js)',
        //   href: '/docs/in-progress',
        //   disabled: true,
        // },
      ],
    },
    // {
    //   title: 'Pages',
    //   items: [
    //     {
    //       title: 'Landing',
    //       href: '/docs/in-progress',
    //       disabled: true,
    //     },
    //     {
    //       title: 'Changelog',
    //       href: '/docs/in-progress',
    //       disabled: true,
    //     },
    //     {
    //       title: 'Wait List',
    //       href: '/docs/in-progress',
    //       disabled: true,
    //     },
    //   ],
    // },
    // {
    //   title: 'Examples',
    //   items: [
    //     // {
    //     //   title: "Introduction",
    //     //   href: "/docs/in-progress",
    //     //   disabled: true,
    //     // },
    //     {
    //       title: 'Static Blog',
    //       href: '/docs/in-progress',
    //       disabled: true,
    //     },
    //     {
    //       title: 'Docs & Guides',
    //       href: '/docs/in-progress',
    //       disabled: true,
    //     },
    //     {
    //       title: 'Blog with Astro DB',
    //       href: '/docs/in-progress',
    //       disabled: true,
    //     },
    //     // {
    //     //   title: "Ecommerce",
    //     //   href: "/docs/in-progress",
    //     //   disabled: true,
    //     // },
    //     // {
    //     //   title: "Animes (GraphQL)",
    //     //   href: "/docs/in-progress",
    //     //   disabled: true,
    //     // },
    //     // {
    //     //   title: "Authentification (Lucia)",
    //     //   href: "/docs/in-progress",
    //     //   disabled: true,
    //     // },
    //   ],
    // },
  ],
};
