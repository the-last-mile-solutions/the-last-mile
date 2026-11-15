import { services } from '~/content/services'

/** Built from content/services.ts plus the fixed pages. Prerendered to a static file. */
export default defineEventHandler((event) => {
  const base = String(useRuntimeConfig().public.siteUrl).replace(/\/$/, '')
  const paths = ['/', '/services', ...services.map((s) => `/services/${s.slug}`), '/how-we-work', '/about', '/faq', '/contact']
  const body =
    '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
    paths.map((p) => `  <url><loc>${base}${p === '/' ? '/' : p}</loc></url>`).join('\n') +
    '\n</urlset>\n'
  setHeader(event, 'content-type', 'application/xml; charset=utf-8')
  return body
})
