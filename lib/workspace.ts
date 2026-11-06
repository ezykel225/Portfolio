// ============================================================
// lib/workspace.ts — view-model for the board
//
// Nothing here restates a personal fact. Everything below
// is derived from lib/data.ts (the single source of truth) and from
// the date helpers in lib/utils.ts, so a change in one place still
// changes both portfolios. Nothing here introduces a number, a
// claim, a technology or a contact route that data.ts does not
// already hold.
// ============================================================

import { personal, experience, education, techStack, projects, TODO } from './data'
import { monthsBetween, formatDuration, formatRange, yearsSince } from './utils'

/** Accent keys map to the existing brand tokens — no new colours. */
export type Accent = 'purple' | 'blue' | 'green' | 'amber'

export const accentVar: Record<Accent, string> = {
  purple: 'var(--purple-l)',
  blue: 'var(--blue)',
  green: 'var(--green)',
  amber: 'var(--amber)',
}

/** The four things a visitor should be able to open without scrolling. */
export type PanelId = 'about' | 'stack' | 'experience' | 'contact'

export const panelMeta: Record<PanelId, { title: string; caption: string; accent: Accent }> = {
  about: { title: 'About', caption: 'Who I am and where I study', accent: 'green' },
  stack: { title: 'Stack', caption: 'What I build with', accent: 'blue' },
  experience: { title: 'Experience', caption: 'Roles held so far', accent: 'amber' },
  contact: { title: 'Contact', caption: 'How to reach me', accent: 'purple' },
}

// ------------------------------------------------------------
// Identity
// ------------------------------------------------------------

/** "Ezequel Bautista" -> "EB". Used instead of a photo, because the
 *  repository contains no photograph and inventing one is not an option. */
export const monogram = personal.name
  .split(' ')
  .map((part) => part[0])
  .join('')
  .slice(0, 2)
  .toUpperCase()

// ------------------------------------------------------------
// Experience, ordered for a developer story
//
// The roles are split rather than ranked by date alone: the two IT
// internships are the closest thing to technical employment, so they
// lead. Nothing is hidden — the remaining roles are still listed, and
// every date and duration is still computed from start/end.
// ------------------------------------------------------------

const TECHNICAL_IDS = new Set(['inspiro', 'ece'])

export type ExperienceRow = {
  id: string
  role: string
  company: string
  location: string
  range: string
  /** Hours for the internships, elapsed months for everything else. */
  duration: string
  current: boolean
  technical: boolean
  desc: string
  bullets: string[]
  /** Outcome lines; empty until written. */
  results: string[]
  skills: string[]
  accent: Accent
}

const accentForColor = (color: string): Accent =>
  color === 'blue' || color === 'green' || color === 'amber' ? color : 'purple'

function toRow(item: (typeof experience)[number]): ExperienceRow {
  return {
    id: item.id,
    role: item.role,
    company: item.company,
    location: item.location,
    range: formatRange(item.start, item.end),
    duration: item.durationNote ?? formatDuration(monthsBetween(item.start, item.end)),
    current: item.end === null,
    technical: TECHNICAL_IDS.has(item.id),
    desc: item.desc,
    bullets: item.bullets,
    results: item.results ?? [],
    skills: item.skills,
    accent: accentForColor(item.color),
  }
}

export const experienceRows: ExperienceRow[] = experience.map(toRow)

/** IT-support internships first — they carry the developer story. */
export const experienceByRelevance: ExperienceRow[] = [
  ...experienceRows.filter((row) => row.technical),
  ...experienceRows.filter((row) => !row.technical),
]

export const remoteYears = yearsSince(
  experience.reduce((longest, item) =>
    monthsBetween(item.start, item.end) > monthsBetween(longest.start, longest.end) ? item : longest
  ).start
)

// ------------------------------------------------------------
// Compact card content
// ------------------------------------------------------------

const degree = education[0]

/**
 * Three lines that fit a small card and still say something.
 *
 * Deliberately does NOT restate what I build — that is the headline
 * of the positioning card, and saying it twice on one screen wastes
 * the space the board is trying to save.
 */
export const aboutFacts: { label: string; value: string }[] = [
  // TODO(ezequel): one line on what you are working on or learning right
  // now — e.g. "Finishing the barangay capstone; learning testing with
  // Vitest". It replaced a line that just repeated the hero badge.
  // Hidden until filled in.
  { label: 'now', value: TODO },
  { label: 'studying', value: `${degree.degree} · ${degree.school}` },
  { label: 'based', value: personal.location },
].filter((fact) => fact.value !== TODO)

/** Group counts for the stack card, so it reads as a summary not a wall. */
export const stackGroups = techStack.map((group) => ({
  category: group.category,
  items: group.items,
  count: group.items.length,
}))

export const stackTotal = techStack.reduce((total, group) => total + group.items.length, 0)

/** Contact routes. Exactly the three that exist in data.ts. */
export const contactRoutes = [
  { key: 'email', label: 'Email', value: personal.email, href: `mailto:${personal.email}` },
  { key: 'github', label: 'GitHub', value: strip(personal.github), href: personal.github },
  { key: 'linkedin', label: 'LinkedIn', value: strip(personal.linkedin), href: personal.linkedin },
] as const

function strip(url: string) {
  return url.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '')
}

/** Reads a measured figure out of a project's own scope list. */
function scopeValue(projectId: string, label: string): string | null {
  const project = projects.find((item) => item.id === projectId)
  return project?.caseStudy.scope.find((item) => item.label === label)?.value ?? null
}

/**
 * Headline figures.
 *
 * Every one is either counted from the data or read from a project's
 * measured scope — none is typed in by hand, and none is a usage,
 * adoption or performance claim. Anything still TODO drops out rather
 * than showing a placeholder, so the row is always true.
 *
 * "yrs remote (non-dev)" is labelled that way on purpose: it counts
 * remote data-annotation work and must never read as development
 * experience.
 */
export const workspaceStats: { value: string; label: string }[] = [
  { value: String(projects.length), label: 'apps built' },
  { value: scopeValue('barangay-batinguel', 'user_roles') ?? TODO, label: 'barangay roles' },
  // TODO(ezequel): how many modules the barangay system has, and what you
  // count as a module. The repo gives 14 routes and 14 tables, but nothing
  // defines "module", so this stays hidden until you decide.
  { value: TODO, label: 'barangay modules' },
  { value: `${remoteYears}y`, label: 'yrs remote (non-dev)' },
].filter((stat) => stat.value !== TODO)
