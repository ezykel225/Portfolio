'use client'
import { useState } from 'react'
import Image from 'next/image'
import { projects, projectFilters } from '@/lib/data'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { ProjectCaseStudy } from '@/components/sections/ProjectCaseStudy'
import { GitHubIcon } from '@/components/ui/icons'
import type { Project } from '@/lib/types'

function ProjectCard({ project, onOpenCaseStudy }: { project: Project; onOpenCaseStudy: () => void }) {
  const [activeImg, setActiveImg] = useState(0)

  return (
    <article className="group flex flex-col overflow-hidden rounded-xl border-[0.5px] border-[var(--border)] bg-[var(--surface)] transition-colors focus-within:border-[var(--purple)] hover:border-[var(--purple)]">
      {/* Screenshot — letterboxed on a branded gradient so both landscape
          (web) and portrait (mobile) screenshots look intentional. */}
      <div
        className={`relative flex h-52 items-center justify-center bg-gradient-to-br sm:h-60 ${project.gradient}`}
      >
        <Image
          src={project.images[activeImg]}
          alt={`${project.title} — screenshot ${activeImg + 1} of ${project.images.length}`}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 480px"
          className="object-contain p-2.5"
          priority={project.id === projects[0].id}
        />
        <span className="absolute top-2.5 left-2.5 rounded border-[0.5px] border-white/15 bg-black/55 px-2 py-0.5 font-mono text-[9.5px] tracking-wide text-white/85 backdrop-blur-sm">
          {project.type}
        </span>
      </div>

      {/* Thumbnail strip — click to preview a different screen */}
      {project.images.length > 1 && (
        <div className="flex gap-1.5 overflow-x-auto px-4 pt-3" role="group" aria-label={`${project.title} screenshots`}>
          {project.images.map((src, i) => (
            <button
              key={src}
              type="button"
              onClick={() => setActiveImg(i)}
              aria-label={`Show ${project.title} screenshot ${i + 1}`}
              aria-current={i === activeImg}
              className="relative h-9 w-12 flex-shrink-0 overflow-hidden rounded-sm transition-opacity"
              style={{
                border: `1.5px solid ${i === activeImg ? 'var(--purple-l)' : 'var(--border)'}`,
                opacity: i === activeImg ? 1 : 0.55,
              }}
            >
              <Image src={src} alt="" fill sizes="48px" className="object-cover" />
            </button>
          ))}
        </div>
      )}

      {/* Body */}
      <div className="flex flex-1 flex-col p-4">
        <h3 className="font-syne text-[15px] leading-tight font-bold">{project.title}</h3>
        <p className="mt-0.5 font-mono text-[10px] tracking-wide text-[var(--purple-l)]">{project.subtitle}</p>

        <p className="mt-2.5 text-[12.5px] leading-relaxed text-[var(--muted)]">{project.desc}</p>

        {/* The proof points, given more weight than the paragraph above */}
        <ul className="mt-3 flex flex-col gap-1.5">
          {project.highlights.map((h) => (
            <li key={h} className="flex gap-2 text-[12px] leading-snug text-[var(--text)]">
              <span aria-hidden="true" className="mt-[3px] text-[9px] text-[var(--green)]">
                ▸
              </span>
              {h}
            </li>
          ))}
        </ul>

        <div className="mt-3.5 flex flex-wrap gap-1">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded bg-[rgba(124,58,237,0.14)] px-1.5 py-0.5 font-mono text-[9.5px] text-[var(--purple-l)]"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Actions pinned to the bottom so cards of different heights line up */}
        <div className="mt-auto flex flex-wrap items-center gap-2 border-t border-[var(--border)] pt-3.5">
          <button
            type="button"
            onClick={onOpenCaseStudy}
            className="inline-flex min-h-9 items-center gap-1.5 rounded-md border border-[var(--purple)] bg-[rgba(124,58,237,0.14)] px-3 py-1.5 font-dm text-[12px] font-semibold text-[var(--purple-l)] transition-colors hover:bg-[rgba(124,58,237,0.26)]"
          >
            Read case study
            <span aria-hidden="true">→</span>
          </button>
          <a
            href={project.live}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-9 items-center gap-1.5 rounded-md px-2 py-1.5 font-mono text-[11px] text-[var(--muted)] transition-colors hover:text-[var(--purple-l)]"
          >
            <span aria-hidden="true">↗</span> Live demo
            <span className="sr-only">— {project.title} (opens in a new tab)</span>
          </a>
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-9 items-center gap-1.5 rounded-md px-2 py-1.5 font-mono text-[11px] text-[var(--muted)] transition-colors hover:text-[var(--purple-l)]"
          >
            <GitHubIcon className="h-3.5 w-3.5" /> Code
            <span className="sr-only">— {project.title} source on GitHub (opens in a new tab)</span>
          </a>
        </div>
      </div>
    </article>
  )
}

export function Projects() {
  const [active, setActive] = useState('all')
  const [openId, setOpenId] = useState<string | null>(null)
  const filtered = projects.filter((p) => p.category.includes(active))

  return (
    <section id="projects" aria-labelledby="projects-heading" className="border-b border-[var(--border)] px-5 py-9 sm:px-7 sm:py-11">
      <SectionLabel as="h2" id="projects-heading" index="03">
        featured_projects
      </SectionLabel>

      <p className="mb-5 max-w-xl text-[13px] leading-relaxed text-[var(--muted)]">
        Two applications I designed and built end to end. Each one has a live demo, public source, and a case study
        covering the problem, the build and the engineering decisions behind it.
      </p>

      {/* Filters */}
      <div className="mb-6 flex flex-wrap gap-2" role="group" aria-label="Filter projects by type">
        {projectFilters.map((f) => {
          const isActive = active === f
          return (
            <button
              key={f}
              type="button"
              onClick={() => setActive(f)}
              aria-pressed={isActive}
              className="min-h-9 cursor-pointer rounded px-3 py-1.5 font-mono text-[11px] transition-colors"
              style={{
                background: isActive ? 'var(--purple)' : 'transparent',
                border: `0.5px solid ${isActive ? 'var(--purple)' : 'var(--border)'}`,
                color: isActive ? '#fff' : 'var(--muted)',
              }}
            >
              {f}
            </button>
          )
        })}
      </div>

      {/* Two projects, so two columns — a third would leave a dead cell. */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {filtered.map((project) => (
          <ProjectCard key={project.id} project={project} onOpenCaseStudy={() => setOpenId(project.id)} />
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="font-mono text-[12px] text-[var(--muted2)]">{'// no projects in this category yet'}</p>
      )}

      {projects.map((project) => (
        <ProjectCaseStudy
          key={project.id}
          project={project}
          open={openId === project.id}
          onClose={() => setOpenId(null)}
        />
      ))}
    </section>
  )
}
