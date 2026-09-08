import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// ============================================================
// Date helpers
//
// Every duration shown on the site is derived from the `start` /
// `end` months recorded in lib/data.ts. Nothing is hand-typed, so
// the timeline, the career snapshot and the experience blurb can
// never drift apart the way "6+ years" and "7+ years" did.
// ============================================================

const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']

/** Parses a 'YYYY-MM' string into [year, month] with month 1-indexed. */
function parseMonth(value: string): [number, number] {
  const [y, m] = value.split('-').map(Number)
  return [y, m]
}

/**
 * Whole months from `start` up to and including `end` (defaults to now).
 * Counted inclusively — the same convention LinkedIn and CVs use, so
 * "Jul 2023 – Dec 2023" reads as 6 months rather than 5.
 */
export function monthsBetween(start: string, end?: string | null): number {
  const [sy, sm] = parseMonth(start)
  const now = new Date()
  const [ey, em] = end ? parseMonth(end) : [now.getFullYear(), now.getMonth() + 1]
  return (ey - sy) * 12 + (em - sm) + 1
}

/** Completed whole years between `start` and now. */
export function yearsSince(start: string): number {
  return Math.floor(monthsBetween(start) / 12)
}

/** 14 -> "1 yr 2 mos", 6 -> "6 mos", 24 -> "2 yrs". */
export function formatDuration(months: number): string {
  const years = Math.floor(months / 12)
  const rest = months % 12
  const parts: string[] = []
  if (years) parts.push(`${years} yr${years > 1 ? 's' : ''}`)
  if (rest) parts.push(`${rest} mo${rest > 1 ? 's' : ''}`)
  return parts.join(' ') || '1 mo'
}

/** '2019-08' -> "Aug 2019". */
export function formatMonth(value: string): string {
  const [y, m] = parseMonth(value)
  return `${MONTHS[m - 1]} ${y}`
}

/** '2024-01' + '2025-02' -> "Jan 2024 – Feb 2025"; no end -> "… – Present". */
export function formatRange(start: string, end?: string | null): string {
  return `${formatMonth(start)} – ${end ? formatMonth(end) : 'Present'}`
}
