import { personal } from '@/lib/data'
import { Button } from '@/components/ui/Button'
import { GitHubIcon } from '@/components/ui/icons'

const badges = [
  { label: 'React · TypeScript · Next.js', tone: 'purple' },
  { label: 'React Native · Expo', tone: 'blue' },
  { label: 'Supabase · Postgres', tone: 'green' },
  { label: 'Dumaguete, PH · open to remote', tone: 'amber' },
] as const

const badgeStyles: Record<string, React.CSSProperties> = {
  green: { color: 'var(--green)', border: '0.5px solid rgba(34,197,94,.25)', background: 'rgba(34,197,94,.07)' },
  purple: { color: 'var(--purple-l)', border: '0.5px solid rgba(167,139,250,.25)', background: 'rgba(167,139,250,.07)' },
  blue: { color: 'var(--blue)', border: '0.5px solid rgba(96,165,250,.25)', background: 'rgba(96,165,250,.07)' },
  amber: { color: 'var(--amber)', border: '0.5px solid rgba(251,191,36,.25)', background: 'rgba(251,191,36,.07)' },
}

export function Hero() {
  return (
    <section id="hero" className="border-b border-[var(--border)] px-5 pt-10 pb-11 sm:px-7 sm:pt-12">
      {/* Terminal block — the site's signature, and the fastest answer to
          "who is this and what do they do". */}
      <div
        className="mb-8 overflow-x-auto rounded-xl p-4 font-mono text-[11px] leading-7 sm:text-[11.5px]"
        style={{ background: 'var(--surface)', border: '0.5px solid var(--border)' }}
      >
        <div className="mb-3 flex items-center gap-1.5">
          <span aria-hidden="true" className="h-3 w-3 rounded-full bg-[#FF5F57]" />
          <span aria-hidden="true" className="h-3 w-3 rounded-full bg-[#FEBC2E]" />
          <span aria-hidden="true" className="h-3 w-3 rounded-full bg-[#28C840]" />
          <span className="ml-2 text-[10px] text-[var(--muted2)]">ezequel@portfolio ~ zsh</span>
        </div>
        {personal.terminalLines.map((line) => (
          <div key={line.prompt}>
            <div className="flex gap-2">
              <span aria-hidden="true" className="text-[var(--purple-l)]">
                ❯
              </span>
              <span className="text-[var(--text)]">{line.prompt}</span>
            </div>
            <div className="ml-4 text-[var(--green)]">{line.output}</div>
          </div>
        ))}
        <div className="mt-1 flex gap-2">
          <span aria-hidden="true" className="text-[var(--purple-l)]">
            ❯
          </span>
          <span
            aria-hidden="true"
            className="animate-blink inline-block h-3.5 w-2 align-middle"
            style={{ background: 'var(--purple-l)' }}
          />
        </div>
      </div>

      {/* Heading */}
      <h1 className="mb-3 font-syne text-[clamp(2rem,7vw,3.25rem)] leading-[1.05] font-extrabold tracking-[-0.03em]">
        Hi, I&apos;m <span className="text-[var(--purple-l)]">Ezequel</span>.
        <br />
        <span className="text-[var(--muted)]">I build for</span> the web.
      </h1>

      {/* Role line — the single clearest statement of what I'm for */}
      <p className="mb-4 flex flex-wrap items-center gap-x-2.5 gap-y-1.5 font-mono text-[12px] sm:text-[13px]">
        <span className="font-semibold text-[var(--text)]">{personal.role}</span>
        <span aria-hidden="true" className="text-[var(--border)]">
          /
        </span>
        <span className="text-[var(--green)]">{personal.seeking}</span>
        <span aria-hidden="true" className="text-[var(--border)]">
          /
        </span>
        <span className="text-[var(--muted)]">{personal.studentLine}</span>
      </p>

      <p className="mb-6 max-w-xl text-[14px] leading-[1.75] text-[var(--muted)]">{personal.summary}</p>

      {/* Badges */}
      <ul className="mb-7 flex flex-wrap gap-2 font-mono">
        {badges.map(({ label, tone }) => (
          <li key={label} className="rounded-md px-2.5 py-1 text-[10.5px]" style={badgeStyles[tone]}>
            {label}
          </li>
        ))}
      </ul>

      {/* CTAs — projects first, because the projects are the argument.
          Contact second, résumé third. */}
      <div className="flex flex-wrap gap-2.5">
        <Button variant="primary" href="#projects">
          View projects <span aria-hidden="true">→</span>
        </Button>
        <Button variant="ghost" href="#contact">
          Contact me
        </Button>
        <Button variant="outline" href={personal.resumeUrl} target="_blank" rel="noopener noreferrer">
          Résumé <span className="sr-only">(PDF, opens in a new tab)</span>
        </Button>
        <Button variant="outline" href={personal.github} target="_blank" rel="noopener noreferrer">
          <GitHubIcon className="h-3.5 w-3.5" />
          GitHub <span className="sr-only">profile (opens in a new tab)</span>
        </Button>
      </div>
    </section>
  )
}
