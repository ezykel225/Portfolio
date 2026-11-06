'use client'
import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'

/** How often a visible tab says "still here". */
const PING_MS = 12_000
const SESSION_KEY = 'wk:session'

type Live = { viewing: number; views: number }

function sessionId(): string {
  try {
    const existing = sessionStorage.getItem(SESSION_KEY)
    if (existing) return existing
    const id = Math.random().toString(36).slice(2) + Date.now().toString(36)
    sessionStorage.setItem(SESSION_KEY, id)
    return id
  } catch {
    // Private windows and blocked storage: a per-load id still works,
    // it just counts a reload as a new view.
    return Math.random().toString(36).slice(2) + Date.now().toString(36)
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
      body: JSON.stringify({ id: sessionId(), first: !counted }),
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
