'use client'
import { personal, projects } from '@/lib/data'
import { GitHubIcon, LinkedInIcon, MailIcon, PinIcon } from '@/components/icons'
import { DownloadIcon } from './icons'
import { navItems, type NavTarget } from './NavItems'
import { Monogram } from './Identity'
import { LiveCounter } from './LiveCounter'
import { track } from '@/lib/track'
import { cn } from '@/lib/utils'

interface RailProps {
  active: NavTarget
  onSelect: (target: NavTarget) => void
  onOpenProject: (id: string) => void
  /** Case study currently open, so the rail can mark it. */
  openProjectId: string | null
}

const socials = [
  { href: personal.github, label: 'GitHub profile', Icon: GitHubIcon, method: 'github' },
  { href: personal.linkedin, label: 'LinkedIn profile', Icon: LinkedInIcon, method: 'linkedin' },
  { href: `mailto:${personal.email}`, label: `Email ${personal.name}`, Icon: MailIcon, method: 'email' },
] as const

/**
 * The persistent left rail — identity at the top, navigation in the
 * middle, the ways to reach me pinned to the bottom. Shown from
 * 1280px up; below that the same content is carried by TopBar and
 * the sheets it opens.
 */
export function Rail({ active, onSelect, onOpenProject, openProjectId }: RailProps) {
  return (
    <aside className="hidden h-full flex-col gap-3 lg:flex">
      {/* Identity */}
      <div className="wk-card wk-rise px-4 py-4">
        <div className="flex items-center gap-3">
          <Monogram className="h-11 w-11 text-[15px]" />
          <div className="min-w-0">
            <p className="wk-display truncate text-[15px] font-bold">{personal.name}</p>
            <p className="truncate text-[12px] text-[var(--muted)]">{personal.role}</p>
          </div>
        </div>

        <p className="mt-3.5 flex items-center gap-2 text-[11.5px] text-[var(--muted2)]">
          <PinIcon className="h-3.5 w-3.5 shrink-0" />
          <span className="truncate">{personal.locationShort}</span>
        </p>

        {/* Live numbers, ruled off from the identity above them: everything
            else in this card is fixed, this is the only part that moves. */}
        <LiveCounter className="mt-3 border-t border-[var(--wk-line)] pt-3" />
      </div>

      {/* Navigation */}
      <nav aria-label="Workspace sections" className="wk-card wk-rise wk-d1 flex-1 p-2">
        <ul className="flex flex-col gap-0.5">
          {navItems.map(({ id, label, Icon, opensSheet }) => {
            const isActive = active === id
            return (
              <li key={id}>
                <button
                  type="button"
                  onClick={() => onSelect(id)}
                  {...(opensSheet
                    ? { 'aria-haspopup': 'dialog' as const, 'aria-expanded': isActive }
                    : { 'aria-current': isActive ? ('true' as const) : undefined })}
                  className={cn(
                    'flex w-full items-center gap-2.5 rounded-[var(--wk-radius-sm)] px-3 py-2.5 text-[13px] transition-colors',
                    isActive
                      ? 'bg-[var(--wk-tint)] text-[var(--purple-l)]'
                      : 'text-[var(--muted)] hover:bg-[var(--wk-card-raised)] hover:text-[var(--text)]'
                  )}
                >
                  <Icon className="h-[17px] w-[17px] shrink-0" />
                  {label}
                </button>

                {/* The two case studies hang off the Projects entry, so
                    the strongest evidence is one click from the rail
                    rather than something to go hunting for. */}
                {id === 'projects' ? (
                  <ul className="mt-0.5 ml-[22px] flex flex-col gap-0.5 border-l border-[var(--wk-line)] pl-2.5">
                    {projects.map((project) => (
                      <li key={project.id}>
                        <button
                          type="button"
                          onClick={() => onOpenProject(project.id)}
                          aria-haspopup="dialog"
                          aria-expanded={openProjectId === project.id}
                          className={cn(
                            'flex min-h-9 w-full items-center rounded-[var(--wk-radius-sm)] px-2 py-1.5 text-left text-[12px] transition-colors',
                            openProjectId === project.id
                              ? 'bg-[var(--wk-tint)] text-[var(--purple-l)]'
                              : 'text-[var(--muted2)] hover:bg-[var(--wk-card-raised)] hover:text-[var(--text)]'
                          )}
                        >
                          <span className="truncate">{project.title}</span>
                        </button>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </li>
            )
          })}
        </ul>
      </nav>

      {/* Reach me */}
      <div className="wk-card wk-rise wk-d2 p-2">
        <div className="flex items-center gap-1.5">
          {socials.map(({ href, label, Icon, method }) => (
            <a
              key={label}
              href={href}
              aria-label={label}
              onClick={() => track({ name: 'contact_clicked', method })}
              {...(href.startsWith('http') ? { target: '_blank', rel: 'noreferrer noopener' } : {})}
              className="wk-interactive flex h-10 flex-1 items-center justify-center rounded-[var(--wk-radius-sm)] border border-[var(--wk-line)] text-[var(--muted)] hover:text-[var(--purple-l)]"
            >
              <Icon className="h-[17px] w-[17px]" />
            </a>
          ))}

          <a
            href={personal.resumeUrl}
            download
            onClick={() => track({ name: 'resume_downloaded', from: 'rail' })}
            aria-label="Download résumé (PDF)"
            className="wk-interactive flex h-10 flex-1 items-center justify-center rounded-[var(--wk-radius-sm)] border border-[var(--wk-line)] text-[var(--muted)] hover:text-[var(--purple-l)]"
          >
            <DownloadIcon className="h-[17px] w-[17px]" />
          </a>
        </div>
      </div>
    </aside>
  )
}
