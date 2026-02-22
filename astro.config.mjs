// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import mdx from '@astrojs/mdx';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  markdown: {
    shikiConfig: {
      theme: 'one-dark-pro',
    }},

  devToolbar: {
    enabled: false
  },

  server: {
    host: true
  },

  integrations: [react(), mdx()],

  vite: {
    // @ts-expect-error
    plugins: [tailwindcss()]
  }
});