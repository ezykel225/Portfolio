import type { Metadata } from 'next'
import { Syne, DM_Sans, Fira_Code } from 'next/font/google'
import './globals.css'

// Exposed as --font-*-src and aliased into Tailwind's font tokens in
// globals.css, so next/font and Tailwind don't fight over the same names.
const syne = Syne({ subsets: ['latin'], variable: '--font-syne-src', weight: ['400', '500', '600', '700', '800'], display: 'swap' })
const dmSans = DM_Sans({ subsets: ['latin'], variable: '--font-dm-src', weight: ['300', '400', '500'], display: 'swap' })
const firaCode = Fira_Code({ subsets: ['latin'], variable: '--font-mono-src', weight: ['300', '400', '500'], display: 'swap' })

const title = 'Ezequel Bautista — Junior Web Developer'
const description =
  'Junior web developer in Dumaguete, Philippines, seeking a first developer role. I build full-stack web apps with React, TypeScript and Supabase, and mobile apps with Expo and React Native. 4th year BSIT student, graduating 2027.'

/**
 * Absolute base for the OG/Twitter image URLs. Vercel injects the real
 * production domain at build time; NEXT_PUBLIC_SITE_URL overrides it if
 * the site moves to a custom domain. The literal is only the last resort
 * — update it (or set the env var) once the final domain is settled.
 */
const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : 'https://ezequel.dev')

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  keywords: [
    'Junior Web Developer',
    'React',
    'TypeScript',
    'Next.js',
    'Supabase',
    'React Native',
    'Expo',
    'BSIT',
    'Dumaguete',
    'Philippines',
  ],
  authors: [{ name: 'Ezequel Bautista' }],
  openGraph: {
    title,
    description,
    siteName: 'Ezequel Bautista — Portfolio',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Ezequel Bautista — Junior Web Developer' }],
    type: 'website',
    locale: 'en_PH',
  },
  twitter: { card: 'summary_large_image', title, description, images: ['/og-image.png'] },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${syne.variable} ${dmSans.variable} ${firaCode.variable}`}>
      <body className="antialiased">{children}</body>
    </html>
  )
}
