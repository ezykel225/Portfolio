import { ExperienceItem } from '@/lib/types'
import { formatDuration, formatRange, monthsBetween } from '@/lib/utils'

const dotColors: Record<string, string> = {
  purple: 'var(--purple)',
  green: 'var(--green)',
  amber: 'var(--amber)',
  blue: 'var(--blue)',
  gray: 'var(--muted2)',
}

interface TimelineItemProps {
  item: ExperienceItem
  isLast?: boolean
}

export function TimelineItem({ item, isLast = false }: TimelineItemProps) {
  const dotColor = dotColors[item.color] || 'var(--muted2)'
  const isCurrent = item.end === null
  // Both derived from `start` / `end` — never hand-written.
  const dateRange = formatRange(item.start, item.end)
  const duration = item.durationNote ?? formatDuration(monthsBetween(item.start, item.end))

  return (
    <li className="flex gap-4 pb-5">
      {/* Left: dot + line */}
      <div className="flex flex-col items-center" aria-hidden="true">
        <div
          className="mt-1 h-2.5 w-2.5 flex-shrink-0 rounded-full"
          style={{ background: dotColor, border: '2px solid var(--bg)' }}
        />
        {!isLast && <div className="mt-1 w-px flex-1" style={{ background: 'var(--border)', minHeight: 16 }} />}
      </div>

      {/* Right: content */}
      <div className="pb-1">
        <h3 className="font-syne text-[13.5px] leading-tight font-bold">{item.role}</h3>
        <div className="mt-0.5 text-[12px] text-[var(--purple-l)]">{item.company}</div>

        <div className="mt-1.5 flex flex-wrap items-center gap-2 font-mono">
          <span className="text-[10px] text-[var(--muted2)]">{dateRange}</span>
          {isCurrent ? (
            <span
              className="rounded px-1.5 py-0.5 text-[9.5px]"
              style={{
                background: 'rgba(34,197,94,.1)',
                color: 'var(--green)',
                border: '0.5px solid rgba(34,197,94,.25)',
              }}
            >
              <span aria-hidden="true">● </span>current · {duration}
            </span>
          ) : (
            <span
              className="rounded px-1.5 py-0.5 text-[9.5px]"
              style={{
                background: 'rgba(126,126,138,.12)',
                color: 'var(--muted)',
                border: '0.5px solid rgba(126,126,138,.22)',
              }}
            >
              {duration}
            </span>
          )}
          <span className="text-[10px] text-[var(--muted2)]">{item.location}</span>
        </div>

        {item.desc && <p className="mt-2 text-[12px] leading-relaxed text-[var(--muted)]">{item.desc}</p>}

        {item.bullets.length > 0 && (
          <ul className="mt-2 flex flex-col gap-1">
            {item.bullets.map((b) => (
              <li key={b} className="flex gap-2 text-[11.5px] leading-relaxed text-[var(--muted)]">
                <span aria-hidden="true" className="mt-[3px] text-[9px] text-[var(--purple-l)]">
                  ▸
                </span>
                {b}
              </li>
            ))}
          </ul>
        )}

        {item.skills.length > 0 && (
          <ul className="mt-2.5 flex flex-wrap gap-1">
            {item.skills.map((s) => (
              <li
                key={s}
                className="rounded border-[0.5px] border-[var(--border)] bg-[var(--surface2)] px-2 py-0.5 font-mono text-[9.5px] text-[var(--muted)]"
              >
                {s}
              </li>
            ))}
          </ul>
        )}
      </div>
    </li>
  )
}
