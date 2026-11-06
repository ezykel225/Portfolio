'use client'
import { personal } from '@/lib/data'
import { GitHubIcon, MailIcon } from '@/components/icons'
import { DownloadIcon } from './icons'
import { navItems, type NavTarget } from './NavItems'
import { Monogram, AvailabilityDot } from './Identity'
import { LiveCounter } from './LiveCounter'
import { cn } from '@/lib/utils'

interface BarProps {
  active: NavTarget
  onSelect: (target: NavTarget) => void
}

/**
 * Below 1280px the rail's job is split in two: identity and the
 * direct contact routes stay at the top, and navigation moves to a
 * bar pinned to the bottom of the screen where a thumb can reach it.
 * This is a different layout for a different device, not the desktop
 * rail scaled down.
 */
export function TopBar() {
  return (
    <header className="wk-card wk-rise flex items-center gap-3 px-3.5 py-3 lg:hidden">
      <Monogram className="h-10 w-10 text-[13px]" />

      <div className="min-w-0 flex-1">
        <p className="wk-display truncate text-[14px] font-bold">{personal.name}</p>
        <p className="flex items-center gap-1.5 truncate text-[11.5px] text-[var(--muted)]">
          {personal.role}
          {personal.available ? (
            <>
              <AvailabilityDot />
              <span className="sr-only">{personal.seeking}</span>
            </>
          ) : null}
        </p>
        {/* Below 1024px there is no rail, so the counter lives here. */}
        <LiveCounter className="mt-0.5 text-[10.5px]" />
      </div>

      <div className="flex items-center gap-1.5">
        <a
          href={personal.github}
          target="_blank"
          rel="noreferrer noopener"
          aria-label="GitHub profile"
          className="wk-interactive hidden h-11 w-11 items-center justify-center sm:flex rounded-[var(--wk-radius-sm)] border border-[var(--wk-line)] text-[var(--muted)]"
        >
          <GitHubIcon className="h-[17px] w-[17px]" />
        </a>
        <a
          href={personal.resumeUrl}
          download
          aria-label="Download résumé (PDF)"
          className="wk-interactive hidden h-11 w-11 items-center justify-center sm:flex rounded-[var(--wk-radius-sm)] border border-[var(--wk-line)] text-[var(--muted)]"
        >
          <DownloadIcon className="h-[17px] w-[17px]" />
        </a>
        <a
          href={`mailto:${personal.email}`}
          aria-label={`Email ${personal.name}`}
          className="flex h-11 items-center gap-2 rounded-[var(--wk-radius-sm)] bg-[var(--purple)] px-3 text-[12.5px] font-semibold text-white transition-colors hover:bg-[#6D28D9]"
        >
          <MailIcon className="h-[15px] w-[15px]" />
          <span className="hidden sm:inline">Email</span>
        </a>
      </div>
    </header>
  )
}

export function PhoneBar({ active, onSelect }: BarProps) {
  const items = navItems.filter((item) => item.onPhoneBar)

  return (
    <nav
      aria-label="Workspace sections"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-[var(--wk-line)] bg-[var(--wk-card)]/95 backdrop-blur-sm lg:hidden"
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      <ul className="mx-auto flex max-w-2xl">
        {items.map(({ id, short, Icon, opensSheet }) => {
          const isActive = active === id
          return (
            <li key={id} className="flex-1">
              <button
                type="button"
                onClick={() => onSelect(id)}
                {...(opensSheet
                  ? { 'aria-haspopup': 'dialog' as const, 'aria-expanded': isActive }
                  : { 'aria-current': isActive ? ('true' as const) : undefined })}
                className={cn(
                  'flex min-h-[54px] w-full flex-col items-center justify-center gap-1 px-1 py-2 transition-colors',
                  isActive ? 'text-[var(--purple-l)]' : 'text-[var(--muted2)]'
                )}
              >
                <Icon className="h-[19px] w-[19px]" />
                <span className="font-mono text-[9.5px] tracking-wide">{short}</span>
              </button>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
