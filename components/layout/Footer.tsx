import { personal } from '@/lib/data'

export function Footer() {
  return (
    <footer
      style={{borderColor:'var(--border)',fontFamily:'var(--font-mono)'}}
      className="flex items-center justify-between px-7 py-4 border-t text-[10px]"
    >
      <span style={{color:'var(--muted2)'}}>
        © {new Date().getFullYear()} {personal.name} · {personal.locationShort} · Built with Next.js + Tailwind
      </span>
      <div className="flex items-center gap-4">
        {[
          { label: 'github',   href: personal.github },
          { label: 'linkedin', href: personal.linkedin },
          { label: 'email',    href: `mailto:${personal.email}` },
        ].map((l) => (
          <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer"
             style={{color:'var(--muted2)'}} className="hover:text-purple-400 transition-colors">
            {l.label}
          </a>
        ))}
      </div>
    </footer>
  )
}
