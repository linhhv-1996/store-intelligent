import { defineNuxtConfig } from "nuxt/config";

export default defineNuxtConfig({
  modules: ['@nuxtjs/tailwindcss'],
  css: ['~/assets/css/tailwind.css'],
  compatibilityDate: '2024-04-03',
  app: {
    head: {
      title: 'App Store Intelligence',
      meta: [
        {
          name: 'description',
          content:
            'Internal spy-style dashboard to inspect iOS apps: ratings, reviews, meta, pricing, and more.'
        }
      ]
    }
  }
})
