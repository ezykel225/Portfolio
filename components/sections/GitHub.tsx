import { SectionLabel } from '@/components/ui/SectionLabel'
import { personal } from '@/lib/data'

// Pulls the real GitHub username out of the profile link in lib/data.ts,
// e.g. "https://github.com/ezykel225" -> "ezykel225"
const githubUsername = personal.github.split('/').filter(Boolean).pop()

export function GitHub() {
  return (
    <section
      id="github"
      aria-labelledby="github-heading"
      className="border-b border-[var(--border)] px-5 py-9 sm:px-7 sm:py-11"
    >
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <SectionLabel as="h2" id="github-heading" index="05">
          github_activity
        </SectionLabel>
        <p className="mb-5 font-mono text-[10px] text-[var(--muted2)]">contributions in the last year</p>
      </div>

      {/* ghchart.rshah.org renders a real, live contribution graph for any
          public GitHub username — no API token or backend needed. It's a
          third-party image, so it gets a fixed box: if it fails to load the
          alt text shows and the layout doesn't shift. */}
      <div className="overflow-x-auto">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`https://ghchart.rshah.org/7C3AED/${githubUsername}`}
          alt={`GitHub contribution graph for ${githubUsername}`}
          width={663}
          height={104}
          loading="lazy"
          className="min-w-[600px] max-w-full"
        />
      </div>

      <a
        href={personal.github}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 inline-flex min-h-11 items-center font-mono text-[11px] text-[var(--muted)] transition-colors hover:text-[var(--purple-l)]"
      >
        view full profile <span aria-hidden="true">&nbsp;→</span>
        <span className="sr-only">on GitHub (opens in a new tab)</span>
      </a>
    </section>
  )
}
