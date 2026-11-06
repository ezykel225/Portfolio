'use client'
import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'

/** How often a visible tab says "still here". */
const PING_MS = 12_000
const VISITOR_KEY = 'wk:visitor'

type Live = { viewing: number; views: number }

const newId = () => Math.random().toString(36).slice(2) + Date.now().toString(36)

/**
 * The id this browser pings with.
 *
 * Deliberately localStorage rather than sessionStorage: sessionStorage is
 * per-tab, so somebody with three tabs open would have been counted as
 * three people viewing. localStorage is shared across a browser's tabs,
 * so one person counts once however many tabs they have open.
 *
 * It is a random string, used only to collapse this browser's own pings
 * into one entry. It is never logged, and the server drops it thirty
 * seconds after the last ping, so it identifies nobody and persists
 * nowhere but this browser.
 */
function visitorId(): string {
  try {
    const existing = localStorage.getItem(VISITOR_KEY)
    if (existing) return existing
    const id = newId()
    localStorage.setItem(VISITOR_KEY, id)
    return id
  } catch {
    // Private windows and blocked storage: a per-load id still works,
    // it just means tabs there are counted separately.
    return newId()
  }
}

// ------------------------------------------------------------
// One poller for the whole page.
//
// The counter is rendered twice — once in the rail, once in the compact
// header — and only one of those is ever on screen. They must not each
// run their own loop: that would double the request volume and, because
// each would claim to be the tab's first ping, count every visit twice.
// So the polling lives here, at module scope, and the components are
// just subscribers.
//
// `counted` is per page load, which is what a view means: a reload or a
// new tab is a new view, while the viewer count stays one per browser.
// ------------------------------------------------------------

let live: Live | null = null
let counted = false
let timer: ReturnType<typeof setTimeout> | undefined
const listeners = new Set<(value: Live | null) => void>()

async function ping() {
  if (typeof document === 'undefined' || document.visibilityState !== 'visible') return
  try {
    const response = await fetch('/api/presence', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: visitorId(), first: !counted }),
    })
    if (!response.ok) return
    const data = await response.json()
    if (!data?.available) return
    counted = true
    live = { viewing: data.viewing, views: data.views }
    listeners.forEach((listener) => listener(live))
  } catch {
    // Offline or blocked: keep whatever was last shown.
  }
}

function loop() {
  void ping()
  timer = setTimeout(loop, PING_MS)
}

/** Catch up as soon as the visitor returns to the tab. */
function onVisible() {
  if (document.visibilityState === 'visible') void ping()
}

function subscribe(listener: (value: Live | null) => void) {
  listeners.add(listener)
  if (listeners.size === 1) {
    document.addEventListener('visibilitychange', onVisible)
    loop()
  }
  return () => {
    listeners.delete(listener)
    if (listeners.size === 0) {
      if (timer) clearTimeout(timer)
      timer = undefined
      document.removeEventListener('visibilitychange', onVisible)
    }
  }
}

/**
 * "N viewing now · M views".
 *
 * Renders nothing until the first successful reply, and nothing at all if
 * the backend is not configured or is unreachable — the counter is a
 * nicety, and a broken one is worse than none. There is no loading state
 * and no error state for the same reason: the line simply appears when
 * there is something true to say.
 */
export function LiveCounter({ className }: { className?: string }) {
  const [value, setValue] = useState<Live | null>(live)

  useEffect(() => subscribe(setValue), [])

  if (!value) return null

  return (
    <p
      // Styled as one of the identity card's meta lines rather than as a
      // badge, so it reads as part of who is here rather than as chrome.
      className={cn('flex items-center gap-2 text-[11.5px] text-[var(--muted2)]', className)}
      // Not announced on every poll — the numbers change on their own and
      // interrupting a screen reader every twelve seconds would be hostile.
      aria-live="off"
    >
      <span className="relative flex h-1.5 w-1.5 shrink-0" aria-hidden="true">
        <span className="animate-pulse-dot absolute inline-flex h-full w-full rounded-full bg-[var(--green)]" />
      </span>
      <span className="truncate">
        <span className="text-[var(--muted)]">{value.viewing} viewing now</span>
        {' · '}
        {value.views.toLocaleString()} views
      </span>
    </p>
  )
}
