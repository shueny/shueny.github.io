import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';

import icon from 'astro-icon';

// https://astro.build/config
export default defineConfig({
  site: 'https://shueny.github.io',
  base: '',
  integrations: [
    mdx({
      syntaxHighlight: 'shiki',
      shikiConfig: {
        theme: 'github-dark-dimmed',
      },
      gfm: true,
    }),
    icon(),
    sitemap(),
    react(),
    tailwind({
      applyBaseStyles: false,
    }),
  ],
  output: 'static',
  vite: {
    build: {
      // Optimize chunk splitting for better caching
      rollupOptions: {
        output: {
          // Manual chunk splitting for better cache performance
          manualChunks: (id) => {
            // Separate vendor chunks
            if (id.includes('node_modules')) {
              if (id.includes('react') || id.includes('react-dom')) {
                return 'react-vendor';
              }
              if (id.includes('lucide-react')) {
                return 'lucide-vendor';
              }
              return 'vendor';
            }
          },
        },
      },
      // Enable CSS code splitting
      cssCodeSplit: true,
      // Optimize asset inlining threshold (small assets will be inlined)
      assetsInlineLimit: 4096, // 4KB
    },
    // Optimize dependencies
    optimizeDeps: {
      include: ['react', 'react-dom'],
    },
  },
});
