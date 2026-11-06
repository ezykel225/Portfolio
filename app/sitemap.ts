import type { MetadataRoute } from 'next'
import { siteUrl } from '@/lib/site'

/**
 * The portfolio is a single page — everything else opens in a drawer over
 * it rather than at its own URL — so the sitemap has one entry. It exists
 * so search engines have something definitive to crawl rather than
 * guessing from links.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
  ]
}
