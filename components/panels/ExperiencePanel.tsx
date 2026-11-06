import { experienceByRelevance, experienceRows, accentVar, type ExperienceRow } from '@/lib/workspace'
import { experienceThemes } from '@/lib/data'

const technical = experienceByRelevance.filter((row) => row.technical)
const other = experienceByRelevance.filter((row) => !row.technical)

/**
 * Compact card body.
 *
 * The two IT internships lead because they are the closest thing to
 * technical employment on the record, and the direction here is
 * development. The rest is not hidden — the count says how many roles
 * there are in total and the sheet lists every one of them.
 */
export function ExperienceGlance() {
  return (
    <div className="flex flex-col gap-2">
      <p className="font-mono text-[9.5px] tracking-wider text-[var(--muted2)] uppercase">
        {experienceRows.length} roles · {technical.length} IT internships
      </p>

      <ul className="flex flex-col gap-2">
        {technical.map((row) => (
          <li key={row.id} className="flex gap-2.5">
            <span
              aria-hidden="true"
              className="mt-[5px] h-1.5 w-1.5 shrink-0 rounded-full"
              style={{ background: accentVar[row.accent] }}
            />
            <div className="min-w-0">
              <p className="truncate text-[12.5px] leading-snug font-medium">{row.role}</p>
              <p className="truncate text-[11.5px] text-[var(--muted2)]">
                {row.company} · {row.duration}
              </p>
            </div>
          </li>
        ))}
      </ul>

      <p className="text-[11.5px] leading-snug text-[var(--muted2)]">
        Plus {other.length} in remote data annotation and customer service.
      </p>
    </div>
  )
}

function Row({ row, last }: { row: ExperienceRow; last: boolean }) {
  const accent = accentVar[row.accent]

  return (
    <li className="relative pl-5">
      <span
        aria-hidden="true"
        className="absolute top-[7px] left-0 h-2 w-2 rounded-full ring-4 ring-[var(--wk-card)]"
        style={{ background: accent }}
      />
      {/* The connector must not dangle off the end of a list. */}
      {last ? null : (
        <span aria-hidden="true" className="absolute top-[19px] bottom-[-28px] left-[3.5px] w-px bg-[var(--wk-line)]" />
      )}

      <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
        <h4 className="text-[13px] font-semibold">{row.role}</h4>
        {row.current ? (
          <span className="rounded-full border border-[color-mix(in_srgb,var(--green)_28%,var(--wk-line))] px-1.5 py-px font-mono text-[9.5px] tracking-wide text-[var(--green)]">
            CURRENT
          </span>
        ) : null}
      </div>

      <p className="mt-0.5 text-[12.5px] text-[var(--muted)]">{row.company}</p>
      <p className="mt-1 font-mono text-[10.5px] tracking-wide text-[var(--muted2)]">
        {row.range} · {row.duration} · {row.location}
      </p>

      <p className="mt-2 text-[12.5px] leading-relaxed text-[var(--muted)]">{row.desc}</p>

      {row.bullets.length > 0 ? (
        <ul className="mt-2 flex flex-col gap-1.5">
          {row.bullets.map((bullet) => (
            <li key={bullet} className="flex gap-2 text-[12.5px] leading-snug text-[var(--muted)]">
              <span aria-hidden="true" className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-[var(--muted2)]" />
              {bullet}
            </li>
          ))}
        </ul>
      ) : null}

      {/* Outcomes, kept visually distinct from the duties above them.
          Empty until written, and the block disappears with them. */}
      {row.results.length > 0 ? (
        <ul className="mt-2.5 flex flex-col gap-1.5">
          {row.results.map((result) => (
            <li
              key={result}
              className="flex gap-2 text-[12.5px] leading-snug font-medium text-[var(--text)]"
            >
              <span aria-hidden="true" className="mt-[6px] h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--green)]" />
              {result}
            </li>
          ))}
        </ul>
      ) : null}

      <ul className="mt-2.5 flex flex-wrap gap-1.5">
        {row.skills.map((skill) => (
          <li
            key={skill}
            className="rounded border border-[var(--wk-line)] px-1.5 py-0.5 font-mono text-[10px] text-[var(--muted2)]"
          >
            {skill}
          </li>
        ))}
      </ul>
    </li>
  )
}

export function ExperienceFull() {
  return (
    <div className="flex flex-col gap-7">
      <section>
        <h3 className="wk-meta mb-4 flex items-center gap-2">
          <span aria-hidden="true" className="h-2.5 w-[3px] rounded-full bg-[var(--blue)]" />
          Closest to development
        </h3>
        <ul className="flex flex-col gap-7">
          {technical.map((row, index) => (
            <Row key={row.id} row={row} last={index === technical.length - 1} />
          ))}
        </ul>
      </section>

      <section>
        <h3 className="wk-meta mb-4 flex items-center gap-2">
          <span aria-hidden="true" className="h-2.5 w-[3px] rounded-full bg-[var(--amber)]" />
          Everything else, in full
        </h3>
        <ul className="flex flex-col gap-7">
          {other.map((row, index) => (
            <Row key={row.id} row={row} last={index === other.length - 1} />
          ))}
        </ul>
      </section>

      <section>
        <h3 className="wk-meta mb-2.5 flex items-center gap-2">
          <span aria-hidden="true" className="h-2.5 w-[3px] rounded-full bg-[var(--purple-l)]" />
          Why the non-development work still counts
        </h3>
        <div className="grid gap-2 sm:grid-cols-2">
          {experienceThemes.map((theme) => (
            <div key={theme.title} className="rounded-[var(--wk-radius-sm)] border border-[var(--wk-line)] p-3.5">
              <p className="text-[12.5px] font-semibold">{theme.title}</p>
              <p className="mt-1 text-[12px] leading-relaxed text-[var(--muted)]">{theme.body}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
