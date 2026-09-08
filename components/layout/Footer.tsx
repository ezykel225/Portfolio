import { personal } from '@/lib/data'

const socials = [
  { label: 'github', href: personal.github },
  { label: 'linkedin', href: personal.linkedin },
  { label: 'email', href: `mailto:${personal.email}` },
]

export function Footer() {
  return (
    <footer className="flex flex-col gap-2 border-t border-[var(--border)] px-5 py-4 font-mono text-[10.5px] sm:flex-row sm:items-center sm:justify-between sm:px-7">
      <span className="text-[var(--muted2)]">
        © {new Date().getFullYear()} {personal.name} · {personal.locationShort} · Built with Next.js + Tailwind
      </span>
      <ul className="-mx-1 flex items-center gap-4">
        {socials.map((l) => (
          <li key={l.label}>
            <a
              href={l.href}
              {...(l.label === 'email' ? {} : { target: '_blank', rel: 'noopener noreferrer' })}
              className="inline-flex min-h-9 items-center px-1 text-[var(--muted2)] transition-colors hover:text-[var(--purple-l)]"
            >
              {l.label}
            </a>
          </li>
        ))}
      </ul>
    </footer>
  )
}
