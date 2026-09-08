export interface CaseStudySection {
  /** Short mono heading, e.g. "role_based_access". */
  key: string
  title: string
  body: string
}

export interface CaseStudy {
  /** One line a recruiter can skim: what this is and who it's for. */
  problem: string
  solution: string
  /** Grouped feature list — keeps long lists scannable in the modal. */
  features: { group: string; items: string[] }[]
  /** The engineering detail: how it was actually built. */
  technical: CaseStudySection[]
  /** Neutral, measurable scope facts. Never outcomes or usage claims. */
  scope: { value: string; label: string }[]
  role: string
  stack: { group: string; items: string[] }[]
  /** Optional caveat shown next to the live link (e.g. web build of a mobile app). */
  liveNote?: string
}

export interface Project {
  id: string
  title: string
  /** Five-or-so words: what kind of thing this is. */
  subtitle: string
  /** "Web app" / "Mobile app" — rendered as the card's type badge. */
  type: string
  year: string
  /** Two sentences max — the card body. Depth lives in `caseStudy`. */
  desc: string
  /** Three or four skimmable proof points shown on the card. */
  highlights: string[]
  tags: string[]
  emoji: string
  gradient: string
  images: string[]
  live: string
  github: string
  category: string[]
  caseStudy: CaseStudy
}

export interface ExperienceItem {
  id: string
  role: string
  company: string
  location: string
  /** 'YYYY-MM'. The displayed date range and duration derive from this. */
  start: string
  /** 'YYYY-MM', or null while the role is ongoing. */
  end: string | null
  /**
   * Set only where elapsed time is the wrong unit — the two internships
   * are measured in required hours, not months.
   */
  durationNote?: string
  color: string
  desc: string
  bullets: string[]
  skills: string[]
}

export interface Certification {
  id: string
  name: string
  issuer: string
  year: string
  color: string
}
