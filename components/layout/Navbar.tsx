'use client'
import Link from 'next/link'
import { personal } from '@/lib/data'

const links = [
  { label: '~/about',      href: '#about' },
  { label: '~/stack',      href: '#stack' },
  { label: '~/projects',   href: '#projects' },
  { label: '~/experience', href: '#experience' },
  { label: '~/contact',    href: '#contact' },
]

export function Navbar() {
  return (
    <nav
      style={{borderColor:'var(--border)',background:'rgba(9,9,11,0.92)'}}
      className="flex items-center justify-between px-7 py-3.5 border-b sticky top-0 z-50 backdrop-blur-md"
    >
      <span style={{color:'var(--purple-l)'}} className="font-syne font-extrabold text-lg tracking-tight">
        ezequel.dev
      </span>

      <div className="hidden md:flex items-center gap-6">
        {links.map((l) => (
          <a
            key={l.href}
            href={l.href}
            style={{color:'var(--muted)',fontFamily:'var(--font-mono)'}}
            className="text-[11px] hover:text-purple-400 transition-colors"
          >
            {l.label}
          </a>
        ))}
      </div>

      {personal.available && (
        <div style={{color:'var(--green)',fontFamily:'var(--font-mono)'}}
             className="flex items-center gap-1.5 text-[11px]">
          <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse-dot" />
          open_to_work
        </div>
      )}
    </nav>
  )
}
