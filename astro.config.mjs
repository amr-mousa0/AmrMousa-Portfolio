// @ts-check
import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://amr-mousa0.github.io',
  base: (process.env.GITHUB_ACTIONS && !process.env.VERCEL) ? '/AmrMousa-Portofolio/' : '/',
  adapter: vercel(),

  i18n: {
    defaultLocale: "en",
    locales: ["en", "ar"],
    routing: {
      prefixDefaultLocale: false
    }
  },

  image: {
    domains: ['raw.githubusercontent.com', 'avatars.githubusercontent.com', 'github.com']
  },

  integrations: [],

  vite: {
    // @ts-expect-error - Vite plugin types may clash between Astro and Tailwind Vite plugin
    plugins: [tailwindcss()],
    css: {
      transformer: 'lightningcss'
    },
    build: {
      cssMinify: 'lightningcss'
    }
  }
});
