/**
 * Single source of truth for blog posts that exist in multiple languages.
 *
 * Used by:
 * - src/pages/blog/[...slug].astro — decides at build time whether to wrap a
 *   post in BlogLanguageSwitcher
 * - src/components/BlogLanguageSwitcher.tsx — resolves the redirect target
 *   when the visitor toggles the site language
 *
 * Both call sites used to keep their own copy of this map, which drifted and
 * broke language switching for the posts that were only in one of them. Add a
 * new translated post by adding one group below; every variant slug is derived
 * from it, so the two call sites can no longer disagree.
 */
export type PostVariants = { zh?: string; en?: string; de?: string };

export type MultilingualPostMap = Record<string, PostVariants>;

const POST_GROUPS: PostVariants[] = [
  {
    en: 'mobile-pagespeed-optimizations',
    zh: 'mobile-pagespeed-optimizations-zh',
  },
  {
    en: 'from-spa-to-astro-islands-en',
    zh: 'from-spa-to-astro-islands',
  },
  {
    en: 'local-chat',
    zh: 'local-chat-zh',
  },
  {
    en: 'astro-islands-lighthouse-optimization',
    zh: 'astro-islands-lighthouse-optimization-zh',
    de: 'astro-islands-lighthouse-optimization-de',
  },
  {
    en: 'lucky-duck-rewards-platform',
    zh: 'lucky-duck-rewards-platform-zh',
    de: 'lucky-duck-rewards-platform-de',
  },
  {
    en: 'daily-tomato-todo',
    zh: 'daily-tomato-todo-zh',
    de: 'daily-tomato-todo-de',
  },
  {
    en: 'seo-content-prioritization-ai-search',
    zh: 'seo-content-prioritization-ai-search-zh',
    de: 'seo-content-prioritization-ai-search-de',
  },
];

export const MULTILINGUAL_POSTS: MultilingualPostMap = Object.fromEntries(
  POST_GROUPS.flatMap((group) =>
    Object.values(group).map((slug) => [slug, group] as const)
  )
);
