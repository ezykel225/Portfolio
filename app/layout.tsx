import type { Metadata } from 'next'
import { Syne, DM_Sans, Fira_Code } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { personal, projects, education } from '@/lib/data'
import { siteUrl } from '@/lib/site'
import './globals.css'
import './workspace.css'

// Exposed as --font-*-src and aliased into Tailwind's font tokens in
// globals.css, so next/font and Tailwind don't fight over the names.
const syne = Syne({ subsets: ['latin'], variable: '--font-syne-src', weight: ['400', '500', '600', '700', '800'], display: 'swap' })
const dmSans = DM_Sans({ subsets: ['latin'], variable: '--font-dm-src', weight: ['300', '400', '500'], display: 'swap' })
const firaCode = Fira_Code({ subsets: ['latin'], variable: '--font-mono-src', weight: ['300', '400', '500'], display: 'swap' })

const title = `${personal.name} — ${personal.role}`
const description =
  `${personal.role} in ${personal.locationShort}, seeking a first developer role. ` +
  'I build full-stack web apps with React, TypeScript and Supabase, and mobile apps ' +
  'with Expo and React Native. 4th year BSIT student, graduating 2027.'

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
  authors: [{ name: personal.name }],
  openGraph: {
    title,
    description,
    siteName: `${personal.name} — Portfolio`,
    type: 'website',
    locale: 'en_PH',
  },
  twitter: { card: 'summary_large_image', title, description },
}

/**
 * Structured data, so a search for my name can show who I am rather than
 * just a page title. Every field comes from lib/data.ts — nothing here is
 * a second copy of a fact.
 */
const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: personal.name,
  jobTitle: personal.role,
  email: `mailto:${personal.email}`,
  url: siteUrl,
  description: personal.summary,
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Dumaguete',
    addressRegion: 'Central Visayas',
    addressCountry: 'PH',
  },
  alumniOf: { '@type': 'CollegeOrUniversity', name: education[0].school },
  sameAs: [personal.github, personal.linkedin],
  knowsAbout: ['React', 'TypeScript', 'Next.js', 'Supabase', 'React Native', 'Expo'],
  subjectOf: projects.map((project) => ({
    '@type': 'CreativeWork',
    name: project.title,
    description: project.subtitle,
    url: project.live,
  })),
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${syne.variable} ${dmSans.variable} ${firaCode.variable}`}>
      {/* Every style in workspace.css is scoped under .wk. */}
      <body className="wk antialiased">
        {children}
        <script
          type="application/ld+json"
          // Serialised, not interpolated text: the values come from our own
          // data file and JSON.stringify escapes them correctly.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
        <Analytics />
      </body>
    </html>
  )
}
