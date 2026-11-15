import { services } from './content/services'

/** Set NUXT_APP_BASE_URL when the site is served from a subpath, such as GitHub Pages. */
const baseURL = process.env.NUXT_APP_BASE_URL || '/'
const siteUrl = (process.env.NUXT_PUBLIC_SITE_URL || 'https://example.com').replace(/\/$/, '')

export default defineNuxtConfig({
  compatibilityDate: '2025-01-01',
  devtools: { enabled: false },
  ssr: true,
  modules: ['@nuxtjs/tailwindcss'],
  css: ['~/assets/css/main.css'],
  tailwindcss: { cssPath: false, viewer: false },
  runtimeConfig: {
    public: {
      siteUrl,
      formEndpoint: process.env.NUXT_PUBLIC_FORM_ENDPOINT || '',
    },
  },
  app: {
    baseURL,
    head: {
      htmlAttrs: { lang: 'en' },
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1, viewport-fit=cover',
      meta: [
        { name: 'theme-color', content: '#0b0d10' },
        { name: 'color-scheme', content: 'dark' },
      ],
      link: [{ rel: 'icon', type: 'image/svg+xml', href: `${baseURL}favicon.svg` }],
    },
  },
  experimental: { payloadExtraction: true },
  features: { inlineStyles: true },
  nitro: {
    prerender: {
      crawlLinks: true,
      routes: ['/', '/sitemap.xml', '/robots.txt', ...services.map((s) => `/services/${s.slug}`)],
    },
  },
  typescript: { strict: true },
})
