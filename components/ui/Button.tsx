import { cn } from '@/lib/utils'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'ghost' | 'outline'
  href?: string
  children: React.ReactNode
}

export function Button({ variant = 'primary', href, children, className, ...props }: ButtonProps) {
  const base = 'inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-[12.5px] font-semibold transition-all cursor-pointer font-dm'

  const variants = {
    primary: 'bg-[var(--purple)] text-white hover:bg-purple-700',
    ghost:   'bg-transparent text-[var(--purple-l)] border border-[var(--purple)] hover:bg-purple-950/30',
    outline: 'bg-[var(--surface)] text-[var(--muted)] border border-[var(--border)] hover:border-[var(--purple-l)] hover:text-[var(--purple-l)]',
  }

  if (href) {
    return (
      <a href={href} className={cn(base, variants[variant], className)}>
        {children}
      </a>
    )
  }

  return (
    <button className={cn(base, variants[variant], className)} {...props}>
      {children}
    </button>
  )
}
