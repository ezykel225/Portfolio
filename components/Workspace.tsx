'use client'
import { useCallback, useRef, useState } from 'react'
import { projects } from '@/lib/data'
import { panelMeta, accentVar, type PanelId } from '@/lib/workspace'
import { track } from '@/lib/track'
import { Rail } from './Rail'
import { TopBar, PhoneBar } from './TopBar'
import { PositionCard } from './PositionCard'
import { ProjectTile } from './ProjectTile'
import { ProjectSheet } from './ProjectSheet'
import { Card } from './Card'
import { Sheet } from './Sheet'
import type { NavTarget } from './NavItems'
import { AboutGlance, AboutFull } from './panels/AboutPanel'
import { StackGlance, StackFull } from './panels/StackPanel'
import { ExperienceGlance, ExperienceFull } from './panels/ExperiencePanel'
import { ContactGlance, ContactFull } from './panels/ContactPanel'

const panelOrder: PanelId[] = ['about', 'stack', 'experience', 'contact']

const glance: Record<PanelId, () => React.ReactElement> = {
  about: AboutGlance,
  stack: StackGlance,
  experience: ExperienceGlance,
  contact: ContactGlance,
}

const full: Record<PanelId, () => React.ReactElement> = {
  about: AboutFull,
  stack: StackFull,
  experience: ExperienceFull,
  contact: ContactFull,
}

/**
 * The application shell.
 *
 * One board, four expandable cards and a project drawer. Navigation
 * never leaves the page: the rail and the phone bar open the same
 * sheets the cards open, so nothing here costs a page load.
 */
export function Workspace() {
  const [panel, setPanel] = useState<PanelId | null>(null)
  const [projectId, setProjectId] = useState<string | null>(null)
  const projectsRef = useRef<HTMLElement>(null)

  const project = projects.find((item) => item.id === projectId) ?? null

  const handleNav = useCallback((target: NavTarget) => {
    if (target === 'board') {
      setPanel(null)
      setProjectId(null)
      return
    }

    if (target === 'projects') {
      setPanel(null)
      setProjectId(null)
      // On the desktop board the projects are already on screen, so
      // this is a no-op there and a scroll on narrower layouts.
      projectsRef.current?.scrollIntoView({ block: 'nearest' })
      projectsRef.current?.focus({ preventScroll: true })
      return
    }

    setProjectId(null)
    setPanel(target)
    track({ name: 'panel_opened', panel: target })
  }, [])

  const openProject = useCallback((id: string) => {
    setPanel(null)
    setProjectId(id)
    track({ name: 'project_opened', project: id })
  }, [])

  const closePanel = useCallback(() => setPanel(null), [])
  const closeProject = useCallback(() => setProjectId(null), [])

  const active: NavTarget = panel ?? 'board'
  const PanelBody = panel ? full[panel] : null

  return (
    <>
      <a
        href="#wk-main"
        className="sr-only rounded-md bg-[var(--purple)] px-4 py-2 text-[13px] font-semibold text-white focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-[100]"
      >
        Skip to content
      </a>

      <div className="wk-shell mx-auto w-full max-w-[1680px] p-3 pb-[calc(3.5rem+env(safe-area-inset-bottom))] lg:pb-3">
        <TopBar />

        <div className="wk-board">
          <div className="wk-area-rail">
            <Rail
              active={active}
              onSelect={handleNav}
              onOpenProject={openProject}
              openProjectId={projectId}
            />
          </div>

          <main id="wk-main" className="wk-area-position">
            <PositionCard />
          </main>

          {/* Projects sit in the first viewport by design — they are
              the strongest evidence on the page, so they are not
              something the visitor has to go looking for. */}
          <section
            ref={projectsRef}
            tabIndex={-1}
            aria-labelledby="wk-projects-heading"
            className="wk-area-projects wk-projects wk-rise wk-d2 focus:outline-none"
          >
            <h2 id="wk-projects-heading" className="sr-only">
              Projects
            </h2>
            {projects.map((item) => (
              <ProjectTile key={item.id} project={item} onOpen={openProject} />
            ))}
          </section>

          <div className="wk-area-cards wk-cards wk-rise wk-d3">
            {panelOrder.map((id) => {
              const meta = panelMeta[id]
              const Glance = glance[id]
              return (
                <Card
                  key={id}
                  label={meta.title}
                  accent={accentVar[meta.accent]}
                  onOpen={() => {
                    setPanel(id)
                    track({ name: 'panel_opened', panel: id })
                  }}
                  openLabel={`Open ${meta.title} — ${meta.caption}`}
                >
                  <Glance />
                </Card>
              )
            })}
          </div>
        </div>
      </div>

      <PhoneBar active={active} onSelect={handleNav} />

      {/* Mounted only while open: it keeps an empty heading out of the
          document, and the panel's own state starts clean each time. */}
      {panel !== null && PanelBody ? (
        <Sheet
          open
          onClose={closePanel}
          labelledBy="wk-panel-title"
          title={panelMeta[panel].title}
          eyebrow={panelMeta[panel].caption}
          accent={accentVar[panelMeta[panel].accent]}
        >
          <PanelBody />
        </Sheet>
      ) : null}

      {project ? <ProjectSheet project={project} onClose={closeProject} /> : null}
    </>
  )
}
