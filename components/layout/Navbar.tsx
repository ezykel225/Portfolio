'use client'
import { useEffect, useState } from 'react'
import { personal } from '@/lib/data'

const links = [
  { label: '~/about', href: '#about' },
  { label: '~/stack', href: '#stack' },
  { label: '~/projects', href: '#projects' },
  { label: '~/experience', href: '#experience' },
  { label: '~/contact', href: '#contact' },
]

export function Navbar() {
  const [open, setOpen] = useState(false)

  // Close on Esc so the menu is dismissable from the keyboard.
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <header
      className="sticky top-0 z-50 border-b border-[var(--border)] backdrop-blur-md"
      style={{ background: 'rgba(9,9,11,0.92)' }}
    >
      <nav aria-label="Main" className="flex items-center justify-between px-5 py-3 sm:px-7">
        <a
          href="#hero"
          className="font-syne text-lg font-extrabold tracking-tight text-[var(--purple-l)]"
        >
          ezequel.dev
        </a>

        {/* Desktop links */}
        <ul className="hidden items-center gap-5 md:flex lg:gap-6">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="inline-flex min-h-9 items-center font-mono text-[11px] text-[var(--muted)] transition-colors hover:text-[var(--purple-l)]"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          {personal.available && (
            <span className="hidden items-center gap-1.5 font-mono text-[11px] text-[var(--green)] sm:flex">
              <span aria-hidden="true" className="animate-pulse-dot h-1.5 w-1.5 rounded-full bg-[var(--green)]" />
              open_to_work
            </span>
          )}

          {/* Mobile toggle — the nav links were previously hidden below md
              with no way to reach them at all. */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            className="flex h-10 w-10 items-center justify-center rounded-md border border-[var(--border)] text-[var(--muted)] transition-colors hover:text-[var(--purple-l)] md:hidden"
          >
            <span className="sr-only">{open ? 'Close menu' : 'Open menu'}</span>
            <svg
              className="h-4 w-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              aria-hidden="true"
            >
              {open ? <path d="M18 6 6 18M6 6l12 12" /> : <path d="M3 6h18M3 12h18M3 18h18" />}
            </svg>
          </button>
        </div>
      </nav>

      {open && (
        <ul id="mobile-nav" className="flex flex-col border-t border-[var(--border)] px-5 py-2 md:hidden">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                onClick={() => setOpen(false)}
                className="block py-3 font-mono text-[13px] text-[var(--muted)] transition-colors hover:text-[var(--purple-l)]"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </header>
  )
}
