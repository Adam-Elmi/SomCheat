// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';


import mdx from '@astrojs/mdx';

// https://astro.build/config
export default defineConfig({
  markdown: {
    shikiConfig: {
      theme: 'one-dark-pro',
    }},
  devToolbar: {
    enabled: false
  },

  vite: {
    plugins: [tailwindcss()]
  },

  server: {
    host: true
  },

  integrations: [react(), mdx()]
});