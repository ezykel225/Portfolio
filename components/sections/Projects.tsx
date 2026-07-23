'use client'
import { useState } from 'react'
import Image from 'next/image'
import { projects, projectFilters } from '@/lib/data'
import { SectionLabel } from '@/components/ui/SectionLabel'
import type { Project } from '@/lib/types'

function ProjectCard({ project }: { project: Project }) {
  const [activeImg, setActiveImg] = useState(0)

  return (
    <div className="rounded-xl overflow-hidden transition-all hover:scale-[1.01]"
         style={{ background: 'var(--surface)', border: '0.5px solid var(--border)' }}
         onMouseEnter={e => (e.currentTarget.style.borderColor = 'var(--purple)')}
         onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--border)')}>

      {/* Screenshot — letterboxed on a branded gradient so both landscape
          (web) and portrait (mobile) screenshots look intentional. */}
      <div className={`relative h-44 flex items-center justify-center bg-gradient-to-br ${project.gradient}`}>
        {project.images.length > 0 ? (
          <Image
            src={project.images[activeImg]}
            alt={`${project.title} screenshot ${activeImg + 1}`}
            fill
            sizes="(max-width: 768px) 100vw, 400px"
            className="object-contain p-2"
          />
        ) : (
          <span className="text-3xl">{project.emoji}</span>
        )}
      </div>

      {/* Thumbnail strip — click to preview a different screen */}
      {project.images.length > 1 && (
        <div className="flex gap-1.5 px-3.5 pt-2.5 overflow-x-auto">
          {project.images.map((src, i) => (
            <button
              key={src}
              onClick={() => setActiveImg(i)}
              className="relative w-10 h-8 rounded-sm overflow-hidden flex-shrink-0 transition-all"
              style={{
                border: `1.5px solid ${i === activeImg ? 'var(--purple-l)' : 'var(--border)'}`,
                opacity: i === activeImg ? 1 : 0.6,
              }}
            >
              <Image src={src} alt="" fill sizes="40px" className="object-cover" />
            </button>
          ))}
        </div>
      )}

      {/* Body */}
      <div className="p-3.5">
        <h3 className="font-syne text-[13px] font-bold mb-1">{project.title}</h3>
        <p className="text-[11px] leading-relaxed mb-2.5" style={{ color: 'var(--muted)' }}>{project.desc}</p>
        <div className="flex flex-wrap gap-1 mb-3">
          {project.tags.map((tag) => (
            <span key={tag} className="text-[9.5px] px-1.5 py-0.5 rounded"
                  style={{ background: 'rgba(124,58,237,.12)', color: 'var(--purple-l)', fontFamily: 'var(--font-mono)' }}>
              {tag}
            </span>
          ))}
        </div>
        <div className="flex gap-4 pt-2.5" style={{ borderTop: '0.5px solid var(--border)' }}>
          <a href={project.live} target="_blank" rel="noopener noreferrer"
             className="text-[10px] transition-colors hover:text-purple-400"
             style={{ color: 'var(--muted)', fontFamily: 'var(--font-mono)' }}>↗ Live Demo</a>
          <a href={project.github} target="_blank" rel="noopener noreferrer"
             className="text-[10px] transition-colors hover:text-purple-400"
             style={{ color: 'var(--muted)', fontFamily: 'var(--font-mono)' }}>⎇ GitHub</a>
        </div>
      </div>
    </div>
  )
}

export function Projects() {
  const [active, setActive] = useState('all')
  const filtered = projects.filter((p) => p.category.includes(active))

  return (
    <section id="projects" className="px-7 py-7 border-b" style={{ borderColor: 'var(--border)' }}>
      <SectionLabel>featured_projects</SectionLabel>

      {/* Filter buttons */}
      <div className="flex flex-wrap gap-2 mb-5">
        {projectFilters.map((f) => (
          <button key={f} onClick={() => setActive(f)}
                  className="text-[10.5px] px-3 py-1 rounded transition-all cursor-pointer"
                  style={{
                    fontFamily: 'var(--font-mono)',
                    background: active === f ? 'var(--purple)' : 'transparent',
                    border: `0.5px solid ${active === f ? 'var(--purple)' : 'var(--border)'}`,
                    color: active === f ? '#fff' : 'var(--muted)',
                  }}>
            {f}
          </button>
        ))}
      </div>

      {/* Project grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
        {filtered.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  )
}
