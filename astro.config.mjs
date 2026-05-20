// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://amr-mousa0.github.io',
  base: process.env.VERCEL ? '/' : '/AmrMousa-Portofolio/',

  i18n: {
    defaultLocale: "en",
    locales: ["en", "ar"],
    routing: {
      prefixDefaultLocale: false
    }
  },

  integrations: [react()],

  vite: {
    plugins: [tailwindcss()]
  }
});