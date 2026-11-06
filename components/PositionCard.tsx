'use client'
import { personal } from '@/lib/data'
import { workspaceStats } from '@/lib/workspace'
import { MailIcon, GitHubIcon } from '@/components/icons'
import { DownloadIcon, ArrowOutIcon } from './icons'
import { AvailabilityChip } from './Identity'
import { track } from '@/lib/track'

/**
 * The positioning card — the first thing read on the board.
 *
 * It answers who and what in one heading and one sentence, then hands
 * over to the three actions and the four figures. Every figure is
 * computed in lib/workspace.ts from lib/data.ts; none is typed by hand.
 */
export function PositionCard() {
  return (
    <section className="wk-card wk-rise relative overflow-hidden px-4 py-5 sm:px-7 sm:py-6">
      {/* A single flat tint behind the top edge. Not a gradient wash —
          it exists to separate this card from the ones below it. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[var(--wk-tint-strong)]"
      />

      <div className="mb-4 flex flex-wrap items-center gap-2">
        <p className="wk-meta rounded-full border border-[var(--wk-line)] px-2.5 py-1">{personal.studentLine}</p>
        <AvailabilityChip />
      </div>

      <h1 className="mb-3">
        <span className="mb-2 block font-mono text-[11.5px] tracking-wider text-[var(--muted2)]">
          {personal.name} · {personal.role}
        </span>
        <span className="wk-display block text-[clamp(1.45rem,3.4vw,2.2rem)] leading-[1.08] font-extrabold text-balance">
          I build things that have to actually work.
        </span>
      </h1>

      <p className="max-w-2xl text-[13.5px] leading-relaxed text-[var(--muted)]">{personal.summary}</p>

      {/* Three actions on one row at every width — on a phone they
          become an equal grid rather than wrapping onto three lines. */}
      <div className="mt-5 grid grid-cols-3 gap-2 sm:flex sm:flex-wrap sm:items-center">
        <a
          href={`mailto:${personal.email}`}
          onClick={() => track({ name: 'contact_clicked', method: 'email' })}
          className="inline-flex min-h-11 items-center justify-center gap-2 rounded-[var(--wk-radius-sm)] bg-[var(--purple)] px-3 text-[13px] font-semibold text-white transition-colors hover:bg-[#6D28D9] sm:px-4"
        >
          <MailIcon className="h-4 w-4 shrink-0" />
          {/* One flex child, so the row gap does not open up mid-label. */}
          <span className="whitespace-nowrap">
            Email<span className="hidden sm:inline"> me</span>
          </span>
        </a>

        <a
          href={personal.resumeUrl}
          download
          onClick={() => track({ name: 'resume_downloaded', from: 'position_card' })}
          className="wk-interactive inline-flex min-h-11 items-center justify-center gap-2 rounded-[var(--wk-radius-sm)] border border-[var(--wk-line)] px-3 text-[13px] font-medium text-[var(--muted)] hover:text-[var(--text)] sm:px-4"
        >
          <DownloadIcon className="h-4 w-4 shrink-0" />
          Résumé
        </a>

        <a
          href={personal.github}
          target="_blank"
          rel="noreferrer noopener"
          onClick={() => track({ name: 'contact_clicked', method: 'github' })}
          className="wk-interactive inline-flex min-h-11 items-center justify-center gap-2 rounded-[var(--wk-radius-sm)] border border-[var(--wk-line)] px-3 text-[13px] font-medium text-[var(--muted)] hover:text-[var(--text)] sm:px-4"
        >
          <GitHubIcon className="h-4 w-4 shrink-0" />
          GitHub
          <ArrowOutIcon className="hidden h-3.5 w-3.5 opacity-60 sm:block" />
        </a>
      </div>

      {/* Four across as soon as the labels fit; two below that,
          because a clipped figure is worse than an extra row. */}
      <dl className="mt-5 grid grid-cols-2 gap-px overflow-hidden min-[400px]:grid-cols-4 rounded-[var(--wk-radius-sm)] border border-[var(--wk-line)] bg-[var(--wk-line)]">
        {workspaceStats.map((stat) => (
          <div key={stat.label} className="bg-[var(--wk-card)] px-2.5 py-2.5 sm:px-3">
            <dt className="sr-only">{stat.label}</dt>
            <dd>
              <span className="wk-display block text-[19px] leading-none font-bold text-[var(--purple-l)]">
                {stat.value}
              </span>
              <span className="mt-1.5 block font-mono text-[9.5px] leading-tight tracking-wide text-[var(--muted2)] sm:text-[10px]">
                {stat.label}
              </span>
            </dd>
          </div>
        ))}
      </dl>
    </section>
  )
}
