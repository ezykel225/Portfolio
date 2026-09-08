'use client'
import { useState } from 'react'
import Image from 'next/image'
import type { Project } from '@/lib/types'
import { Modal } from '@/components/ui/Modal'
import { GitHubIcon } from '@/components/ui/icons'

function Block({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <section className="border-t border-[var(--border)] px-5 py-6 sm:px-7">
      <h3 className="mb-4 font-mono text-[10px] tracking-widest uppercase text-[var(--muted2)]">
        <span aria-hidden="true" className="text-[var(--purple-l)]">
          {'// '}
        </span>
        {label}
      </h3>
      {children}
    </section>
  )
}

export function ProjectCaseStudy({
  project,
  open,
  onClose,
}: {
  project: Project
  open: boolean
  onClose: () => void
}) {
  const [activeImg, setActiveImg] = useState(0)
  const cs = project.caseStudy
  const titleId = `case-study-title-${project.id}`

  return (
    <Modal open={open} onClose={onClose} labelledBy={titleId}>
      <article className="w-full max-w-3xl border border-[var(--border)] bg-[var(--bg)] text-left shadow-2xl sm:rounded-xl">
        {/* Header — sticky so the close button is always reachable */}
        <header className="sticky top-0 z-10 flex items-start justify-between gap-4 border-b border-[var(--border)] bg-[var(--bg)]/95 px-5 py-4 backdrop-blur-md sm:rounded-t-xl sm:px-7">
          <div className="min-w-0">
            <p className="font-mono text-[10px] tracking-widest uppercase text-[var(--muted2)]">
              {project.type} · {project.year}
            </p>
            <h2 id={titleId} className="mt-1 font-syne text-lg font-extrabold tracking-tight sm:text-xl">
              {project.title}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close case study"
            className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg border border-[var(--border)] bg-[var(--surface)] text-[var(--muted)] transition-colors hover:border-[var(--purple-l)] hover:text-[var(--purple-l)]"
          >
            <span aria-hidden="true" className="text-base leading-none">
              ×
            </span>
          </button>
        </header>

        {/* Gallery */}
        <div className="px-5 pt-5 sm:px-7">
          <div
            className={`relative flex h-56 items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br sm:h-72 ${project.gradient}`}
          >
            <Image
              src={project.images[activeImg]}
              alt={`${project.title} — screenshot ${activeImg + 1} of ${project.images.length}`}
              fill
              sizes="(max-width: 768px) 100vw, 700px"
              className="object-contain p-3"
            />
          </div>
          {project.images.length > 1 && (
            <div className="mt-2.5 flex gap-2 overflow-x-auto pb-1" role="group" aria-label="Screenshots">
              {project.images.map((src, i) => (
                <button
                  key={src}
                  type="button"
                  onClick={() => setActiveImg(i)}
                  aria-label={`Show screenshot ${i + 1}`}
                  aria-current={i === activeImg}
                  className="relative h-11 w-14 flex-shrink-0 overflow-hidden rounded-sm transition-opacity"
                  style={{
                    border: `1.5px solid ${i === activeImg ? 'var(--purple-l)' : 'var(--border)'}`,
                    opacity: i === activeImg ? 1 : 0.55,
                  }}
                >
                  <Image src={src} alt="" fill sizes="56px" className="object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Scope — the measured facts, up top where they're skimmable */}
        <div className="grid grid-cols-2 gap-3 px-5 py-6 sm:grid-cols-4 sm:px-7">
          {cs.scope.map((s) => (
            <div key={s.label}>
              <div className="font-syne text-xl font-bold text-[var(--purple-l)]">{s.value}</div>
              <div className="font-mono text-[9.5px] text-[var(--muted2)]">{s.label}</div>
            </div>
          ))}
        </div>

        <Block label="the_problem">
          <p className="text-[13px] leading-[1.8] text-[var(--muted)]">{cs.problem}</p>
        </Block>

        <Block label="the_solution">
          <p className="text-[13px] leading-[1.8] text-[var(--muted)]">{cs.solution}</p>
        </Block>

        <Block label="core_features">
          <div className="grid gap-5 sm:grid-cols-2">
            {cs.features.map((group) => (
              <div key={group.group}>
                <h4 className="mb-2 font-syne text-[12.5px] font-bold">{group.group}</h4>
                <ul className="flex flex-col gap-1.5">
                  {group.items.map((item) => (
                    <li key={item} className="flex gap-2 text-[12px] leading-relaxed text-[var(--muted)]">
                      <span aria-hidden="true" className="mt-[3px] text-[9px] text-[var(--purple-l)]">
                        ▸
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Block>

        <Block label="how_it_was_built">
          <div className="flex flex-col gap-5">
            {cs.technical.map((section) => (
              <div key={section.key} className="border-l-2 border-[var(--border)] pl-4">
                <h4 className="font-syne text-[13px] font-bold">{section.title}</h4>
                <p className="mt-1.5 text-[12.5px] leading-[1.75] text-[var(--muted)]">{section.body}</p>
              </div>
            ))}
          </div>
        </Block>

        <Block label="my_role">
          <p className="text-[13px] leading-[1.8] text-[var(--muted)]">{cs.role}</p>
        </Block>

        <Block label="technologies">
          <div className="flex flex-col gap-3.5">
            {cs.stack.map((group) => (
              <div key={group.group}>
                <div className="mb-1.5 font-mono text-[10px] tracking-wide text-[var(--purple-l)]">{group.group}</div>
                <div className="flex flex-wrap gap-1.5">
                  {group.items.map((item) => (
                    <span
                      key={item}
                      className="rounded border-[0.5px] border-[var(--border)] bg-[var(--surface2)] px-2.5 py-1 font-mono text-[10.5px] text-[var(--muted)]"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Block>

        <div className="flex flex-col gap-3 border-t border-[var(--border)] px-5 py-6 sm:px-7">
          <div className="flex flex-wrap gap-2.5">
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center gap-2 rounded-lg bg-[var(--purple)] px-5 py-2.5 font-dm text-[13px] font-semibold text-white transition-colors hover:bg-[#6D28D9]"
            >
              <span aria-hidden="true">↗</span> View live demo
              <span className="sr-only">(opens in a new tab)</span>
            </a>
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-[var(--border)] bg-[var(--surface)] px-5 py-2.5 font-dm text-[13px] font-semibold text-[var(--muted)] transition-colors hover:border-[var(--purple-l)] hover:text-[var(--purple-l)]"
            >
              <GitHubIcon className="h-4 w-4" /> Source code
              <span className="sr-only">(opens in a new tab)</span>
            </a>
          </div>
          {cs.liveNote && <p className="font-mono text-[10.5px] leading-relaxed text-[var(--muted2)]">{cs.liveNote}</p>}
        </div>
      </article>
    </Modal>
  )
}
