'use client'
import { useState } from 'react'
import Image from 'next/image'
import type { Project } from '@/lib/types'
import { GitHubIcon } from '@/components/icons'
import { ArrowOutIcon } from './icons'
import { Sheet } from './Sheet'

interface ProjectSheetProps {
  project: Project
  onClose: () => void
}

const H = 'wk-meta mb-2.5 flex items-center gap-2'

function Heading({ children }: { children: React.ReactNode }) {
  return (
    <h3 className={H}>
      <span aria-hidden="true" className="h-2.5 w-[3px] rounded-full bg-[var(--purple-l)]" />
      {children}
    </h3>
  )
}

/** Screenshot viewer. Its own component so the selected index resets
 *  whenever a different project is opened (it is keyed by project id). */
function Gallery({ project }: { project: Project }) {
  const [index, setIndex] = useState(0)
  const portrait = project.shotAspect === 'portrait'

  return (
    <div>
      {/* Phone captures are shown whole on a letterboxed panel; a 16:10
          cover crop would throw away three quarters of the screen. */}
      <div
        className={`relative w-full overflow-hidden rounded-[var(--wk-radius-sm)] border border-[var(--wk-line)] bg-[var(--bg)] ${
          portrait ? 'aspect-[3/4] max-h-[62vh]' : 'aspect-[16/10]'
        }`}
      >
        <Image
          src={project.images[index]}
          alt={`${project.title} — screenshot ${index + 1} of ${project.images.length}`}
          fill
          sizes="(min-width: 640px) 640px, 100vw"
          className={portrait ? 'object-contain' : 'object-cover object-top'}
          priority={index === 0}
        />
      </div>

      {project.images.length > 1 ? (
        <ul className="mt-2 flex flex-wrap gap-2">
          {project.images.map((src, i) => (
            <li key={src}>
              <button
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`Show screenshot ${i + 1}`}
                aria-pressed={i === index}
                className={`relative overflow-hidden rounded border transition-colors ${
                  portrait ? 'h-16 w-10' : 'h-12 w-16'
                } ${
                  i === index
                    ? 'border-[var(--purple-l)]'
                    : 'border-[var(--wk-line)] opacity-60 hover:opacity-100'
                }`}
              >
                <Image src={src} alt="" fill sizes="64px" className="object-cover object-top" />
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  )
}

function Body({ project }: { project: Project }) {
  const study = project.caseStudy

  return (
    <div className="flex flex-col gap-7">
      <Gallery project={project} />

      {/* Scope. Measured facts about the codebase only. */}
      <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-[var(--wk-radius-sm)] border border-[var(--wk-line)] bg-[var(--wk-line)] sm:grid-cols-4">
        {study.scope.map((item) => (
          // A flex column so the figure can be read before its label
          // while the <dt> still precedes its <dd> in the markup.
          <div key={item.label} className="flex flex-col bg-[var(--wk-card)] px-3 py-2.5">
            <dt className="order-2 mt-1.5 font-mono text-[9.5px] tracking-wide text-[var(--muted2)]">
              {item.label.replace(/_/g, ' ')}
            </dt>
            <dd className="wk-display text-[17px] leading-none font-bold text-[var(--purple-l)]">{item.value}</dd>
          </div>
        ))}
      </dl>

      <section>
        <Heading>The problem</Heading>
        <p className="text-[13px] leading-relaxed text-[var(--muted)]">{study.problem}</p>
      </section>

      <section>
        <Heading>The solution</Heading>
        <p className="text-[13px] leading-relaxed text-[var(--muted)]">{study.solution}</p>
      </section>

      <section>
        <Heading>What it does</Heading>
        <div className="flex flex-col gap-3">
          {study.features.map((group) => (
            <div key={group.group} className="rounded-[var(--wk-radius-sm)] border border-[var(--wk-line)] p-3.5">
              <p className="mb-2 text-[12.5px] font-semibold text-[var(--text)]">{group.group}</p>
              <ul className="flex flex-col gap-1.5">
                {group.items.map((item) => (
                  <li key={item} className="flex gap-2 text-[12.5px] leading-snug text-[var(--muted)]">
                    <span aria-hidden="true" className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-[var(--muted2)]" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* The engineering detail is the longest part of the case study,
          so it collapses. <details> gives the disclosure behaviour and
          the keyboard handling without any JavaScript. */}
      <section>
        <Heading>How it was built</Heading>
        <div className="flex flex-col gap-1.5">
          {study.technical.map((item) => (
            <details
              key={item.key}
              className="group rounded-[var(--wk-radius-sm)] border border-[var(--wk-line)] open:bg-[var(--wk-card-raised)]"
            >
              <summary className="flex cursor-pointer list-none items-start gap-2.5 p-3.5 text-[12.5px] font-medium text-[var(--text)] marker:content-['']">
                <span
                  aria-hidden="true"
                  className="mt-[3px] shrink-0 font-mono text-[11px] text-[var(--purple-l)] transition-transform group-open:rotate-90 motion-reduce:transition-none"
                >
                  ▸
                </span>
                {item.title}
              </summary>
              <p className="px-3.5 pb-3.5 pl-9 text-[12.5px] leading-relaxed text-[var(--muted)]">{item.body}</p>
            </details>
          ))}
        </div>
      </section>

      <section>
        <Heading>My contribution</Heading>
        <p className="text-[13px] leading-relaxed text-[var(--muted)]">{study.role}</p>
      </section>

      <section>
        <Heading>Technologies</Heading>
        <div className="flex flex-col gap-3">
          {study.stack.map((group) => (
            <div key={group.group}>
              <p className="mb-1.5 font-mono text-[10.5px] tracking-wide text-[var(--muted2)]">{group.group}</p>
              <ul className="flex flex-wrap gap-1.5">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="rounded border border-[var(--wk-line)] bg-[var(--wk-card-raised)] px-2 py-1 font-mono text-[11px] text-[var(--muted)]"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section>
        <Heading>Links</Heading>
        <div className="flex flex-wrap gap-2">
          <a
            href={project.live}
            target="_blank"
            rel="noreferrer noopener"
            className="inline-flex min-h-11 items-center gap-2 rounded-[var(--wk-radius-sm)] bg-[var(--purple)] px-4 text-[13px] font-semibold text-white transition-colors hover:bg-[#6D28D9]"
          >
            Live demo
            <ArrowOutIcon className="h-4 w-4" />
          </a>
          <a
            href={project.github}
            target="_blank"
            rel="noreferrer noopener"
            className="wk-interactive inline-flex min-h-11 items-center gap-2 rounded-[var(--wk-radius-sm)] border border-[var(--wk-line)] px-4 text-[13px] font-medium text-[var(--muted)] hover:text-[var(--text)]"
          >
            <GitHubIcon className="h-4 w-4" />
            Source code
          </a>
        </div>
        {study.liveNote ? (
          <p className="mt-2.5 text-[11.5px] leading-relaxed text-[var(--muted2)]">{study.liveNote}</p>
        ) : null}
      </section>
    </div>
  )
}

export function ProjectSheet({ project, onClose }: ProjectSheetProps) {
  return (
    <Sheet
      open
      onClose={onClose}
      labelledBy="wk-project-sheet-title"
      title={project.title}
      eyebrow={`${project.type} · ${project.status} · ${project.year}`}
      widthClass="sm:max-w-2xl"
    >
      <Body key={project.id} project={project} />
    </Sheet>
  )
}
