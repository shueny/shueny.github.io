# Personal Website & Blog - Astro Project

This is a personal portfolio and blog website developed with the Astro framework, fully statically generated and suitable for deployment on platforms like GitHub Pages.
🚀 Features
✅ Personal portfolio and work experience showcase
✅ Blog system with Markdown and MDX support
✅ Responsive design for desktop and mobile devices
✅ Dark/light mode toggle
✅ Dynamic navigation and parallax scrolling effects
✅ High-performance static site generation
✅ SEO-friendly with metadata and Open Graph tags
✅ GraphQL integration with static data fallback
✅ React component integration for interactive features

## 🚀 Project Structure

Inside of your Astro project, you'll see the following folders and files:

```text
├── public/           # Static assets (images, fonts, etc.)
├── src/
│   ├── components/   # UI components
│   │   ├── ui/       # General UI components
│   │   └── layout/   # Layout-related components
│   ├── config/       # Website configuration files
│   ├── layouts/      # Page layout templates
│   ├── lib/          # Utility functions and type definitions
│   │   ├── data/     # Static data fallbacks
│   │   ├── graphql/  # GraphQL client
│   │   └── types/    # TypeScript type definitions
│   ├── pages/        # Page routes
│   ├── icons/        # Icon components
│   └── styles/       # Global styles
├── astro.config.mjs  # Astro configuration
├── tailwind.config.js # Tailwind CSS configuration
├── package.json
└── tsconfig.json
```

Astro looks for `.astro` or `.md` files in the `src/pages/` directory. Each page is exposed as a route based on its file name.

There's nothing special about `src/components/`, but that's where we like to put any Astro/React/Vue/Svelte/Preact components.

The `src/content/` directory contains "collections" of related Markdown and MDX documents. Use `getCollection()` to retrieve posts from `src/content/blog/`, and type-check your frontmatter using an optional schema. See [Astro's Content Collections docs](https://docs.astro.build/en/guides/content-collections/) to learn more.

Any static assets, like images, can be placed in the `public/` directory.

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                    | Action                                             |
| :------------------------- | :------------------------------------------------- |
| `pnpm install`             | Install dependencies                               |
| `pnpm run dev`             | Start local dev server at `localhost:4321`         |
| `pnpm run build`           | Build production site to `./dist/`                 |
| `pnpm run preview`         | Preview production build locally before deployment |
| `pnpm run astro ...`       | Run Astro CLI commands                             |
| `pnpm run astro -- --help` | Get help using the Astro CLI                       |

## 👀 Want to learn more?

Check out [our documentation](https://docs.astro.build) or jump into our [Discord server](https://astro.build/chat).

## 🧠 Future Development Plans

[ ] Add search functionality
[ ] Integrate comment system
[ ] Multi-language support
[ ] Additional portfolio templates
