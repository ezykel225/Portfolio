import { cn } from '@/lib/utils'

interface SectionLabelProps {
  children: string
  /**
   * Section labels double as the page's h2s — that's what gives each
   * section an accessible name and keeps the heading order h1 -> h2 -> h3.
   * Pass `as="div"` for the secondary labels inside a section that
   * shouldn't add a heading level.
   */
  as?: 'h2' | 'h3' | 'div'
  /** Two-digit index rendered before the label, e.g. "01". */
  index?: string
  id?: string
  className?: string
}

export function SectionLabel({ children, as: Tag = 'div', index, id, className }: SectionLabelProps) {
  return (
    <Tag
      id={id}
      className={cn(
        'mb-5 flex items-center gap-2 font-mono text-[10px] font-normal tracking-widest uppercase text-[var(--muted2)]',
        className,
      )}
    >
      {index && (
        <span aria-hidden="true" className="text-[var(--border)]">
          {index}
        </span>
      )}
      <span aria-hidden="true" className="text-[var(--purple-l)]">
        {'//'}
      </span>
      {children}
    </Tag>
  )
}
