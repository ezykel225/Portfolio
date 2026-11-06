/**
 * The site's absolute base URL.
 *
 * Vercel injects the production domain at build time; NEXT_PUBLIC_SITE_URL
 * overrides it if the site moves to a custom domain. Kept here rather than
 * in the layout so the metadata, the sitemap and robots.txt all agree.
 */
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : 'http://localhost:3000')
