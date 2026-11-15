/**
 * Unique title, description, canonical, Open Graph and Twitter tags for a page.
 * Optional JSON-LD is rendered as a script tag in the server output.
 */
interface PageSeo {
  title: string
  description: string
  path: string
  jsonLd?: Record<string, unknown> | Record<string, unknown>[]
}

export function usePageSeo({ title, description, path, jsonLd }: PageSeo) {
  const { public: pub } = useRuntimeConfig()
  const base = String(pub.siteUrl).replace(/\/$/, '')
  const url = base + (path === '/' ? '/' : path.replace(/\/$/, ''))
  const fullTitle = path === '/' ? `The Last Mile | ${title}` : `${title} | The Last Mile`
  const ogImage = `${base}/og.png`

  useHead({
    title: fullTitle,
    link: [{ rel: 'canonical', href: url }],
    script: jsonLd
      ? [{ type: 'application/ld+json', innerHTML: JSON.stringify(jsonLd), key: 'ld' }]
      : [],
  })
  useSeoMeta({
    description,
    ogType: 'website',
    ogSiteName: 'The Last Mile',
    ogTitle: fullTitle,
    ogDescription: description,
    ogUrl: url,
    ogImage,
    twitterCard: 'summary_large_image',
    twitterTitle: fullTitle,
    twitterDescription: description,
    twitterImage: ogImage,
  })
  return { url, base }
}
