import { cn } from '@/lib/utils'

type Variant = 'primary' | 'ghost' | 'outline'

const base =
  'inline-flex items-center justify-center gap-2 rounded-lg px-5 text-[13px] font-semibold font-dm transition-colors ' +
  // min-h-11 = 44px, the minimum comfortable touch target on mobile.
  'min-h-11 py-2.5 cursor-pointer'

const variants: Record<Variant, string> = {
  primary: 'bg-[var(--purple)] text-white hover:bg-[#6D28D9]',
  ghost: 'bg-transparent text-[var(--purple-l)] border border-[var(--purple)] hover:bg-[rgba(124,58,237,0.14)]',
  outline:
    'bg-[var(--surface)] text-[var(--muted)] border border-[var(--border)] hover:border-[var(--purple-l)] hover:text-[var(--purple-l)]',
}

type CommonProps = { variant?: Variant; className?: string; children: React.ReactNode }

type LinkProps = CommonProps & React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }
type NativeProps = CommonProps & React.ButtonHTMLAttributes<HTMLButtonElement> & { href?: never }

/**
 * Renders an <a> when given `href`, a <button> otherwise — so a CTA that
 * navigates is a link and a CTA that acts is a button, which is what
 * keyboard and screen-reader users expect.
 */
export function Button({ variant = 'primary', className, children, ...rest }: LinkProps | NativeProps) {
  const classes = cn(base, variants[variant], className)

  if ('href' in rest && rest.href !== undefined) {
    return (
      <a {...(rest as React.AnchorHTMLAttributes<HTMLAnchorElement>)} className={classes}>
        {children}
      </a>
    )
  }

  return (
    <button
      {...(rest as React.ButtonHTMLAttributes<HTMLButtonElement>)}
      className={cn(classes, 'disabled:cursor-not-allowed disabled:opacity-60')}
    >
      {children}
    </button>
  )
}
