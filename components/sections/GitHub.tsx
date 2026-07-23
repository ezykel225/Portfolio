import { SectionLabel } from '@/components/ui/SectionLabel'
import { personal } from '@/lib/data'

// Pulls your real GitHub username out of the profile link in lib/data.ts,
// e.g. "https://github.com/ezykel225" -> "ezykel225"
const githubUsername = personal.github.split('/').filter(Boolean).pop()

export function GitHub() {
  return (
    <section id="github" className="px-7 py-7 border-b" style={{ borderColor: 'var(--border)' }}>
      <div className="flex items-end justify-between mb-4">
        <SectionLabel>github_activity</SectionLabel>
        <span className="text-[10px]" style={{ fontFamily: 'var(--font-mono)', color: 'var(--muted2)' }}>
          contributions in the last year
        </span>
      </div>

      {/* ghchart.rshah.org renders a real, live contribution graph for any
          public GitHub username — no API token or backend needed. */}
      <div className="overflow-x-auto">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`https://ghchart.rshah.org/7C3AED/${githubUsername}`}
          alt={`${githubUsername}'s GitHub contribution graph`}
          className="min-w-[600px]"
        />
      </div>

      <a
        href={personal.github}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block mt-3 text-[10px] hover:text-[var(--purple-l)] transition-colors"
        style={{ fontFamily: 'var(--font-mono)', color: 'var(--muted2)' }}
      >
        view full profile →
      </a>
    </section>
  )
}
