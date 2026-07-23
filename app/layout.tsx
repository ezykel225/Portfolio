import type { Metadata } from 'next'
import { Syne, DM_Sans, Fira_Code } from 'next/font/google'
import './globals.css'

const syne = Syne({ subsets: ['latin'], variable: '--font-syne', weight: ['400','500','600','700','800'] })
const dmSans = DM_Sans({ subsets: ['latin'], variable: '--font-dm', weight: ['300','400','500'] })
const firaCode = Fira_Code({ subsets: ['latin'], variable: '--font-mono', weight: ['300','400','500'] })

export const metadata: Metadata = {
  title: 'Ezequel Bautista — BSIT Student & IT Support',
  description: 'BSIT student at Asian College of Science and Technology, based in Dumaguete, Philippines. Experienced in IT support, data annotation, and building web/mobile projects with React and Expo.',
  keywords: ['IT Support', 'Data Annotation', 'React', 'React Native', 'BSIT', 'Dumaguete', 'Philippines'],
  authors: [{ name: 'Ezequel Bautista' }],
  openGraph: {
    title: 'Ezequel Bautista — BSIT Student & IT Support',
    description: 'BSIT student based in Dumaguete, Philippines. Experienced in IT support, data annotation, and building web/mobile projects.',
    siteName: 'Ezequel Bautista Portfolio',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${syne.variable} ${dmSans.variable} ${firaCode.variable}`}>
      <body className="bg-bg text-text antialiased">{children}</body>
    </html>
  )
}
