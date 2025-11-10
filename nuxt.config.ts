import { defineNuxtConfig } from "nuxt/config";
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const currentDir = dirname(fileURLToPath(import.meta.url));

export default defineNuxtConfig({
  modules: ['@nuxtjs/tailwindcss'],
  css: ['~/assets/css/tailwind.css'],
  compatibilityDate: '2024-04-03',
  app: {
    head: {
      title: 'Store Sniffer - Simple Spy Tool',
      meta: [
        {
          name: 'description',
          content:
            'Internal spy-style dashboard to inspect iOS apps: ratings, reviews, meta, pricing, and more.'
        },
        { property: 'og:title', content: 'StoreSniffer.xyz' },
        { property: 'og:description', content: 'Simple spy tool for App Store & Google Play.' },
        { property: 'og:image', content: 'https://storesniffer.xyz/og-image.png' },
        { property: 'og:image:width', content: '1200' },
        { property: 'og:image:height', content: '630' },
        { property: 'og:type', content: 'website' }
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/icon.svg' },
      ]
    },
    
  },
  alias: {
    // Thêm cái alias này vào
    '@libs': resolve(currentDir, './libs')
  },
})
