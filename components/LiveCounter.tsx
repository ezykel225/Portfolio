'use client'
import { useEffect, useState } from 'react'

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

/**
 * "N viewing now · M views".
 *
 * Renders nothing at all until the first successful reply, and nothing
 * ever if the backend is not configured or is unreachable — the counter
 * is a nicety, and a broken one is worse than none. There is no loading
 * state and no error state for the same reason: the row simply appears
 * when there is something true to say.
 *
 * Pinging stops while the tab is hidden, so a forgotten background tab
 * neither inflates the count nor burns through the request budget.
 */
export function LiveCounter() {
  const [live, setLive] = useState<Live | null>(null)

  useEffect(() => {
    const id = sessionId()
    let cancelled = false
    let timer: ReturnType<typeof setTimeout> | undefined
    let first = true

    const ping = async () => {
      if (document.visibilityState !== 'visible') return
      try {
        const response = await fetch('/api/presence', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id, first }),
        })
        if (!response.ok) return
        const data = await response.json()
        if (!cancelled && data?.available) {
          first = false
          setLive({ viewing: data.viewing, views: data.views })
        }
      } catch {
        // Offline or blocked: keep whatever was last shown.
      }
    }

    const loop = () => {
      void ping()
      timer = setTimeout(loop, PING_MS)
    }
    loop()

    // Catch up immediately when the visitor comes back to the tab.
    const onVisible = () => {
      if (document.visibilityState === 'visible') void ping()
    }
    document.addEventListener('visibilitychange', onVisible)

    return () => {
      cancelled = true
      if (timer) clearTimeout(timer)
      document.removeEventListener('visibilitychange', onVisible)
    }
  }, [])

  if (!live) return null

  return (
    <p
      className="flex items-center gap-2 rounded-full border border-[var(--wk-line)] px-2.5 py-1 font-mono text-[10.5px] tracking-wide text-[var(--muted2)]"
      // One announcement when the numbers settle, not on every poll.
      aria-live="off"
    >
      <span className="relative flex h-1.5 w-1.5 shrink-0" aria-hidden="true">
        <span className="animate-pulse-dot absolute inline-flex h-full w-full rounded-full bg-[var(--green)]" />
      </span>
      <span className="text-[var(--muted)]">
        {live.viewing} viewing now
      </span>
      <span aria-hidden="true" className="text-[var(--wk-line)]">·</span>
      <span>{live.views.toLocaleString()} views</span>
    </p>
  )
}
