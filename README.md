# Ezequel Bautista — Portfolio

A personal portfolio built as a compact developer workspace rather than a long
scrolling page.

The whole thing — who I am, what I've built, my stack, my experience and how to
reach me — fits in a single viewport from 1280px up. Navigation opens drawers
over the board instead of loading pages, so nothing costs a page load.

## Stack

Next.js 15 (App Router) · React 19 · TypeScript (strict) · Tailwind CSS v4 ·
next/font. No backend, no database, no runtime dependencies beyond the framework.

## Running it

```bash
npm install
npm run dev     # http://localhost:3000
```

Other scripts:

```bash
npm run build       # production build
npm run lint        # eslint
npm run typecheck   # tsc --noEmit
```

## Live viewer counter

The badge row shows `N viewing now · M views`, backed by Upstash Redis.

It is **optional**. Without credentials the API answers 503, the component
renders nothing and the rest of the site is unaffected — so a local checkout
needs no setup at all.

To enable it, add Upstash Redis from the Vercel Marketplace; the integration
injects the variables itself. Either naming works:

```
KV_REST_API_URL        /  UPSTASH_REDIS_REST_URL
KV_REST_API_TOKEN      /  UPSTASH_REDIS_REST_TOKEN
```

How it works: `app/api/presence/route.ts` keeps a Redis sorted set scored by
each viewer's last ping. Every request prunes entries older than 30 seconds
and counts what remains, so someone who closes the tab drops off without
having to announce it.

The ping id lives in `localStorage`, which is shared across a browser's tabs,
so one person counts once however many tabs they have open. Views are counted
per page load, which is what a view means.

Nothing stored identifies a visitor: the id is a random string used only to
collapse one browser's pings into a single entry. It is never logged, and the
server drops it thirty seconds after the last ping. No IP, no cookie, no
fingerprint.

## Where the content lives

`lib/data.ts` is the single source of truth for every piece of content — personal
details, projects and their case studies, experience, education, tech stack and
links. Edit that file and the whole site follows; no component holds copy of its
own.

Durations and year counts are **never** typed by hand. They are derived from the
`start` / `end` months in `lib/data.ts` through the helpers in `lib/utils.ts`, so
the timeline, the headline figures and the prose cannot contradict each other.

`lib/workspace.ts` is a view-model over that data: it groups, orders and formats,
but never introduces a fact of its own.

## Layout

Three deliberate compositions rather than one design scaled down:

| Width | Composition |
| --- | --- |
| `< 1024px` | Stacked column, identity card on top, navigation in a thumb-reachable bottom bar |
| `1024–1279px` | Persistent left rail, two columns, compact cards in a strip |
| `≥ 1280px` | Left rail, main column, third column of cards — the board stops scrolling |
| `≥ 1440px` | Third column widens |

The no-scroll board is gated on viewport height as well as width, so a short
desktop window scrolls rather than crushing the project tiles.

## Colours

All design tokens are declared once in `app/globals.css` under `@theme`.
`app/workspace.css` only aliases them — it introduces no hex values of its own.

## Accessibility

- Every rendered text node meets WCAG AA against its composited background
- Drawers are native `<dialog>` + `showModal()`, so focus trapping, Esc-to-close
  and page inertness come from the platform
- Skip link, visible focus rings on every control, one `<h1>`, one `<main>`
- `prefers-reduced-motion` removes every animation on the page
