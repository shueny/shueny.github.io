/**
 * Single source of truth for blog posts that exist in multiple languages.
 *
 * Used by:
 * - src/pages/blog/[...slug].astro  — decides whether to wrap a post in
 *   BlogLanguageSwitcher at build time
 * - src/components/BlogLanguageSwitcher.tsx — resolves the redirect target
 *   when the visitor toggles the site language
 *
 * Every language variant of a post must appear as a key, each mapping to
 * the full set of variants, so the redirect works from any starting slug.
 */
export type MultilingualPostMap = Record<
  string,
  { zh?: string; en?: string; de?: string }
>;

const variants = (v: { zh?: string; en?: string; de?: string }) => v;

const POST_GROUPS: Array<{ zh?: string; en?: string; de?: string }> = [
  variants({
    en: 'mobile-pagespeed-optimizations',
    zh: 'mobile-pagespeed-optimizations-zh',
  }),
  variants({
    en: 'from-spa-to-astro-islands-en',
    zh: 'from-spa-to-astro-islands',
  }),
  variants({
    en: 'local-chat',
    zh: 'local-chat-zh',
  }),
  variants({
    en: 'astro-islands-lighthouse-optimization',
    zh: 'astro-islands-lighthouse-optimization-zh',
    de: 'astro-islands-lighthouse-optimization-de',
  }),
  variants({
    en: 'lucky-duck-rewards-platform',
    zh: 'lucky-duck-rewards-platform-zh',
    de: 'lucky-duck-rewards-platform-de',
  }),
  variants({
    en: 'daily-tomato-todo',
    zh: 'daily-tomato-todo-zh',
    de: 'daily-tomato-todo-de',
  }),
];

export const MULTILINGUAL_POSTS: MultilingualPostMap = Object.fromEntries(
  POST_GROUPS.flatMap((group) =>
    Object.values(group).map((slug) => [slug, group])
  )
);
