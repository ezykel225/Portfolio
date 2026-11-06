'use client'
import Image from 'next/image'
import type { Project } from '@/lib/types'
import { GitHubIcon } from '@/components/icons'
import { ArrowOutIcon } from './icons'

interface ProjectTileProps {
  project: Project
  onOpen: (id: string) => void
}

/**
 * A project tile.
 *
 * The card is one target: the title carries a stretched pseudo-element
 * so clicking anywhere opens the case study, while the repository and
 * live links sit above it on their own. That keeps the markup to a
 * single button and two links — no nested interactive elements, and
 * one tab stop per real destination.
 */
export function ProjectTile({ project, onOpen }: ProjectTileProps) {
  const cover = project.images[0]
  // A landscape tile has to crop a tall phone capture. Take it from the
  // middle rather than the top, where a phone screen is usually empty.
  const coverPosition = project.shotAspect === 'portrait' ? 'object-center' : 'object-top'

  return (
    <article className="wk-card wk-interactive group relative flex min-h-0 flex-col overflow-hidden">
      {/* Preview. Real screenshots from public/projects — nothing stock. */}
      {/* A fixed 16:10 crop on phones and tablets, where the tile is in
          a scrolling column; on the desktop board it grows instead to
          fill whatever height the projects row is given. */}
      <div className="relative h-[168px] shrink-0 overflow-hidden border-b border-[var(--wk-line)] bg-[var(--wk-card-raised)] sm:h-[190px] xl:h-auto xl:min-h-[110px] xl:flex-1">
        <Image
          src={cover}
          alt={`${project.title} — application screenshot`}
          fill
          sizes="(min-width: 1280px) 30vw, (min-width: 768px) 45vw, 92vw"
          className={`object-cover ${coverPosition} opacity-90 transition-[opacity,transform] duration-300 group-hover:scale-[1.02] group-hover:opacity-100 motion-reduce:transform-none motion-reduce:transition-none`}
        />
        <span className="wk-meta absolute top-2.5 left-2.5 rounded-full border border-[var(--wk-line)] bg-[var(--bg)]/85 px-2 py-1 text-[var(--muted)] backdrop-blur-sm">
          {project.type}
        </span>
        {/* How far the project actually got. Stated on the card so nobody
            has to open the case study to find out it is a demo. */}
        <span className="wk-meta absolute top-2.5 right-2.5 rounded-full border border-[var(--wk-line)] bg-[var(--bg)]/85 px-2 py-1 text-[var(--muted2)] backdrop-blur-sm">
          {project.status}
        </span>
      </div>

      <div className="flex flex-col gap-2.5 p-4">
        <div>
          <h3 className="wk-display text-[16px] leading-tight font-bold">
            <button
              type="button"
              onClick={() => onOpen(project.id)}
              aria-haspopup="dialog"
              className="text-left after:absolute after:inset-0 after:content-[''] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--purple-l)]"
            >
              {project.title}
            </button>
          </h3>
          <p className="mt-1 text-[12px] text-[var(--muted2)]">
            {project.subtitle} · {project.year}
          </p>
        </div>

        <ul className="flex flex-col gap-1">
          {project.highlights.slice(0, 2).map((highlight) => (
            <li key={highlight} className="flex gap-2 text-[12px] leading-snug text-[var(--muted)]">
              <span aria-hidden="true" className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-[var(--purple-l)]" />
              {highlight}
            </li>
          ))}
        </ul>

        <ul className="flex flex-wrap gap-1.5">
          {project.tags.slice(0, 4).map((tag) => (
            <li
              key={tag}
              className="rounded border border-[var(--wk-line)] px-1.5 py-0.5 font-mono text-[10px] text-[var(--muted2)]"
            >
              {tag}
            </li>
          ))}
        </ul>

        <div className="relative z-10 mt-auto flex items-center gap-2 pt-1">
          <span className="flex-1 font-mono text-[10.5px] tracking-wider text-[var(--muted2)] transition-colors group-hover:text-[var(--purple-l)]">
            CASE STUDY →
          </span>

          <a
            href={project.github}
            target="_blank"
            rel="noreferrer noopener"
            aria-label={`${project.title} source code on GitHub`}
            className="wk-interactive flex h-9 w-9 items-center justify-center rounded-[var(--wk-radius-sm)] border border-[var(--wk-line)] text-[var(--muted)] hover:text-[var(--purple-l)]"
          >
            <GitHubIcon className="h-4 w-4" />
          </a>

          <a
            href={project.live}
            target="_blank"
            rel="noreferrer noopener"
            aria-label={`${project.title} live demo`}
            className="wk-interactive flex h-9 w-9 items-center justify-center rounded-[var(--wk-radius-sm)] border border-[var(--wk-line)] text-[var(--muted)] hover:text-[var(--purple-l)]"
          >
            <ArrowOutIcon className="h-4 w-4" />
          </a>
        </div>
      </div>
    </article>
  )
}
