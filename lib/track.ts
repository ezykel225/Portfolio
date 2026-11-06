'use client'
import { track as vercelTrack } from '@vercel/analytics'

/**
 * Analytics events.
 *
 * Nothing here identifies a visitor, because nothing can: a visit is an
 * anonymous browser request. What these record is what the page was used
 * for — which project was opened, which panel was read, whether anyone
 * reached for a way to get in touch. That is the useful signal: not who
 * came, but whether the work is landing.
 *
 * No cookies, no fingerprinting, no personal data leaves the browser.
 */
type Event =
  | { name: 'project_opened'; project: string }
  | { name: 'panel_opened'; panel: string }
  | { name: 'contact_clicked'; method: 'email' | 'github' | 'linkedin' }
  | { name: 'resume_downloaded'; from: 'rail' | 'header' | 'position_card' }

export function track(event: Event) {
  const { name, ...properties } = event
  vercelTrack(name, properties)
}
