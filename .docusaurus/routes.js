import React from 'react';
import ComponentCreator from '@docusaurus/ComponentCreator';

export default [
  {
    path: '/zh-Hans/blog',
    component: ComponentCreator('/zh-Hans/blog', 'd39'),
    exact: true
  },
  {
    path: '/zh-Hans/blog/archive',
    component: ComponentCreator('/zh-Hans/blog/archive', 'a21'),
    exact: true
  },
  {
    path: '/zh-Hans/blog/first-blog-post',
    component: ComponentCreator('/zh-Hans/blog/first-blog-post', '177'),
    exact: true
  },
  {
    path: '/zh-Hans/blog/long-blog-post',
    component: ComponentCreator('/zh-Hans/blog/long-blog-post', '438'),
    exact: true
  },
  {
    path: '/zh-Hans/blog/mdx-blog-post',
    component: ComponentCreator('/zh-Hans/blog/mdx-blog-post', 'c79'),
    exact: true
  },
  {
    path: '/zh-Hans/blog/tags',
    component: ComponentCreator('/zh-Hans/blog/tags', 'd07'),
    exact: true
  },
  {
    path: '/zh-Hans/blog/tags/docusaurus',
    component: ComponentCreator('/zh-Hans/blog/tags/docusaurus', 'ae3'),
    exact: true
  },
  {
    path: '/zh-Hans/blog/tags/facebook',
    component: ComponentCreator('/zh-Hans/blog/tags/facebook', 'e2d'),
    exact: true
  },
  {
    path: '/zh-Hans/blog/tags/hello',
    component: ComponentCreator('/zh-Hans/blog/tags/hello', 'd94'),
    exact: true
  },
  {
    path: '/zh-Hans/blog/tags/hola',
    component: ComponentCreator('/zh-Hans/blog/tags/hola', 'bc8'),
    exact: true
  },
  {
    path: '/zh-Hans/blog/welcome',
    component: ComponentCreator('/zh-Hans/blog/welcome', 'f39'),
    exact: true
  },
  {
    path: '/zh-Hans/markdown-page',
    component: ComponentCreator('/zh-Hans/markdown-page', 'e1e'),
    exact: true
  },
  {
    path: '/zh-Hans/docs',
    component: ComponentCreator('/zh-Hans/docs', 'a7b'),
    routes: [
      {
        path: '/zh-Hans/docs/category/javascript',
        component: ComponentCreator('/zh-Hans/docs/category/javascript', 'db2'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/zh-Hans/docs/category/tutorial---basics',
        component: ComponentCreator('/zh-Hans/docs/category/tutorial---basics', 'b17'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/zh-Hans/docs/category/tutorial---extras',
        component: ComponentCreator('/zh-Hans/docs/category/tutorial---extras', '4d0'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/zh-Hans/docs/intro',
        component: ComponentCreator('/zh-Hans/docs/intro', '457'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/zh-Hans/docs/javascript/js-event-loop',
        component: ComponentCreator('/zh-Hans/docs/javascript/js-event-loop', '27f'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/zh-Hans/docs/tutorial-basics/congratulations',
        component: ComponentCreator('/zh-Hans/docs/tutorial-basics/congratulations', '34e'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/zh-Hans/docs/tutorial-basics/create-a-blog-post',
        component: ComponentCreator('/zh-Hans/docs/tutorial-basics/create-a-blog-post', '09c'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/zh-Hans/docs/tutorial-basics/create-a-document',
        component: ComponentCreator('/zh-Hans/docs/tutorial-basics/create-a-document', '16a'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/zh-Hans/docs/tutorial-basics/create-a-page',
        component: ComponentCreator('/zh-Hans/docs/tutorial-basics/create-a-page', '89c'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/zh-Hans/docs/tutorial-basics/deploy-your-site',
        component: ComponentCreator('/zh-Hans/docs/tutorial-basics/deploy-your-site', '493'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/zh-Hans/docs/tutorial-basics/markdown-features',
        component: ComponentCreator('/zh-Hans/docs/tutorial-basics/markdown-features', '51d'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/zh-Hans/docs/tutorial-extras/manage-docs-versions',
        component: ComponentCreator('/zh-Hans/docs/tutorial-extras/manage-docs-versions', 'd22'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/zh-Hans/docs/tutorial-extras/translate-your-site',
        component: ComponentCreator('/zh-Hans/docs/tutorial-extras/translate-your-site', 'dbb'),
        exact: true,
        sidebar: "tutorialSidebar"
      }
    ]
  },
  {
    path: '/zh-Hans/',
    component: ComponentCreator('/zh-Hans/', '196'),
    exact: true
  },
  {
    path: '*',
    component: ComponentCreator('*'),
  },
];
