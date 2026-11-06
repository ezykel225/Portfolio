import { stackGroups, stackTotal } from '@/lib/workspace'

const chip =
  'rounded border border-[var(--wk-line)] bg-[var(--wk-card-raised)] px-1.5 py-0.5 font-mono text-[10.5px] text-[var(--muted)]'

/**
 * Compact card body — grouped, and deliberately truncated. A wall of
 * every tool at once tells a reader nothing; three per group plus a
 * count tells them the shape of the stack in one glance.
 */
export function StackGlance() {
  return (
    <div className="flex flex-col gap-2.5">
      {stackGroups.map((group) => {
        const shown = group.items.slice(0, 3)
        const rest = group.count - shown.length
        return (
          <div key={group.category}>
            <p className="mb-1 font-mono text-[9.5px] tracking-wider text-[var(--muted2)] uppercase">
              {group.category}
            </p>
            <ul className="flex flex-wrap gap-1">
              {shown.map((item) => (
                <li key={item} className={chip}>
                  {item}
                </li>
              ))}
              {rest > 0 ? <li className={chip}>+{rest}</li> : null}
            </ul>
          </div>
        )
      })}
    </div>
  )
}

export function StackFull() {
  return (
    <div className="flex flex-col gap-6">
      <p className="text-[13px] leading-relaxed text-[var(--muted)]">
        {stackTotal} technologies across {stackGroups.length} groups. Everything listed here is used in one of the two
        two projects or in this site itself — nothing on the list is aspirational.
      </p>

      {stackGroups.map((group) => (
        <section key={group.category}>
          <h3 className="wk-meta mb-2.5 flex items-center gap-2">
            <span aria-hidden="true" className="h-2.5 w-[3px] rounded-full bg-[var(--blue)]" />
            {group.category}
            <span className="text-[var(--muted2)]">({group.count})</span>
          </h3>
          <ul className="flex flex-wrap gap-1.5">
            {group.items.map((item) => (
              <li
                key={item}
                className="rounded-[var(--wk-radius-sm)] border border-[var(--wk-line)] bg-[var(--wk-card-raised)] px-2.5 py-1.5 font-mono text-[11.5px] text-[var(--muted)]"
              >
                {item}
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  )
}
