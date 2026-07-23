import { ExperienceItem } from '@/lib/types'

const dotColors: Record<string, string> = {
  purple: 'var(--purple)',
  green:  'var(--green)',
  amber:  'var(--amber)',
  blue:   'var(--blue)',
  gray:   'var(--muted2)',
}

interface TimelineItemProps {
  item: ExperienceItem
  isLast?: boolean
}

export function TimelineItem({ item, isLast = false }: TimelineItemProps) {
  const dotColor = dotColors[item.color] || 'var(--muted2)'

  return (
    <div className="flex gap-4 pb-5">
      {/* Left: dot + line */}
      <div className="flex flex-col items-center">
        <div
          className="w-2.5 h-2.5 rounded-full flex-shrink-0 mt-1"
          style={{ background: dotColor, border: '2px solid var(--bg)' }}
        />
        {!isLast && (
          <div className="w-px flex-1 mt-1" style={{ background: 'var(--border)', minHeight: 16 }} />
        )}
      </div>

      {/* Right: content */}
      <div className="pb-1">
        <div className="font-syne text-[13px] font-bold leading-tight">{item.role}</div>
        <div className="text-[12px] mt-0.5" style={{ color: 'var(--purple-l)' }}>{item.company}</div>
        <div className="flex items-center gap-2 mt-1" style={{ fontFamily: 'var(--font-mono)' }}>
          <span className="text-[10px]" style={{ color: 'var(--muted2)' }}>{item.date}</span>
          {item.current ? (
            <span className="text-[9px] px-1.5 py-0.5 rounded"
                  style={{ background: 'rgba(34,197,94,.1)', color: 'var(--green)', border: '0.5px solid rgba(34,197,94,.25)' }}>
              ● current
            </span>
          ) : (
            <span className="text-[9px] px-1.5 py-0.5 rounded"
                  style={{ background: 'rgba(113,113,122,.1)', color: 'var(--muted)', border: '0.5px solid rgba(113,113,122,.2)' }}>
              {item.duration}
            </span>
          )}
        </div>
        {item.desc && (
          <p className="text-[11.5px] mt-2 leading-relaxed" style={{ color: 'var(--muted)' }}>
            {item.desc}
          </p>
        )}
        {item.bullets.length > 0 && (
          <ul className="mt-2 flex flex-col gap-1">
            {item.bullets.map((b, i) => (
              <li key={i} className="flex gap-2 text-[11px] leading-relaxed" style={{ color: 'var(--muted)' }}>
                <span style={{ color: 'var(--purple-l)', fontSize: 9, marginTop: 3 }}>▸</span>
                {b}
              </li>
            ))}
          </ul>
        )}
        {item.skills.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-2.5">
            {item.skills.map((s) => (
              <span key={s} className="text-[9.5px] px-2 py-0.5 rounded"
                    style={{ background: 'var(--surface2)', border: '0.5px solid var(--border)', color: 'var(--muted)', fontFamily: 'var(--font-mono)' }}>
                {s}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
