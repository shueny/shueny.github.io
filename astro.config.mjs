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
      rollupOptions: {
        output: {
          manualChunks: (id) => {
            if (id.includes('node_modules')) {
              // Split React core from React DOM for better caching
              // React core is needed immediately, React DOM can be loaded slightly later
              if (id.includes('react/') && !id.includes('react-dom')) {
                return 'react-core';
              }
              if (id.includes('react-dom') || id.includes('scheduler')) {
                return 'react-dom';
              }
              // Split large UI libraries into separate chunks
              if (id.includes('@radix-ui')) {
                return 'radix-ui';
              }
              if (id.includes('framer-motion')) {
                return 'framer-motion';
              }
              if (id.includes('lucide-react')) {
                return 'lucide-icons';
              }
              // Let other dependencies split naturally based on usage
            }
          },
          entryFileNames: 'assets/[name].[hash].js',
          chunkFileNames: 'assets/[name].[hash].js',
          assetFileNames: 'assets/[name].[hash].[ext]',
        },
        // Enable aggressive tree-shaking to remove unused code
        treeshake: {
          moduleSideEffects: false, // Enable aggressive tree-shaking
          propertyReadSideEffects: false,
          tryCatchDeoptimization: false,
        },
      },
      cssCodeSplit: true,
      assetsInlineLimit: 4096,
      chunkSizeWarningLimit: 1000,
      // Vite uses esbuild for minification by default (faster than terser)
      // esbuild automatically removes console.log in production builds
      minify: 'esbuild',
    },
    optimizeDeps: {
      include: ['react', 'react-dom'],
      // Exclude heavy dependencies from pre-bundling if not needed immediately
      exclude: ['@google/generative-ai'],
      esbuildOptions: {
        treeShaking: true, // Enable tree-shaking for dependencies
      },
    },
  },
});
