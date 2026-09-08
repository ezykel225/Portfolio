# ezequel.dev — Portfolio

Personal portfolio site for **Ezequel Bautista**, junior web developer.
Built with **Next.js 15** (App Router), **TypeScript** and **Tailwind CSS v4**.

## 🚀 Quick start

```bash
npm install

npm run dev        # http://localhost:3000
npm run build      # production build
npm start          # serve the production build

npm run lint       # ESLint (flat config)
npm run typecheck  # tsc --noEmit
```

Deploy: push to GitHub and import at [vercel.com](https://vercel.com). Zero config.

## 📁 Project structure

```
├── app/
│   ├── layout.tsx          # Root layout, fonts, metadata
│   ├── page.tsx            # Home page + skip link
│   ├── globals.css         # @theme design tokens, focus, reduced motion
│   └── not-found.tsx       # 404 page
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx      # Sticky nav + mobile menu
│   │   └── Footer.tsx
│   ├── sections/
│   │   ├── Hero.tsx            # Terminal + positioning + CTAs
│   │   ├── About.tsx
│   │   ├── TechStack.tsx
│   │   ├── Projects.tsx        # Filterable project cards
│   │   ├── ProjectCaseStudy.tsx # Case-study dialog
│   │   ├── Experience.tsx      # Timeline, snapshot, education
│   │   ├── GitHub.tsx          # Contribution heatmap
│   │   └── Contact.tsx         # Google Forms contact form
│   └── ui/
│       ├── Button.tsx      # Renders <a> with href, <button> without
│       ├── Modal.tsx       # Native <dialog> wrapper
│       ├── SectionLabel.tsx
│       ├── SkillChip.tsx
│       ├── TimelineItem.tsx
│       └── icons.tsx       # Inline SVGs (no icon dependency)
├── lib/
│   ├── data.ts             # ⭐ ALL CONTENT LIVES HERE
│   ├── types.ts            # TypeScript interfaces
│   └── utils.ts            # cn() + date/duration helpers
└── public/
    ├── resume.pdf
    ├── og-image.png
    └── projects/           # Project screenshots
```

## ✏️ Editing content

**Everything is in `lib/data.ts`:**

| Export | What it holds |
|---|---|
| `personal` | Name, role, links, summary, bio, terminal lines |
| `techStack` | Skills grouped by category |
| `projects` | Project cards **and** their full case studies |
| `experience` | Work history (see *Dates* below) |
| `careerSnapshot` | Computed — do not hand-edit |
| `experienceThemes` | What the non-dev roles contribute |
| `education`, `certifications` | Study and certs |

### Dates are computed, not typed

Each experience entry stores `start` and `end` as `'YYYY-MM'` (`end: null`
while ongoing). The displayed range, the duration badge, the
`yrs_remote_work` figure in the career snapshot and the prose in
`experienceThemes` are all derived from those two fields by
`lib/utils.ts`.

Change the month, and every place that mentions it updates together. The
site previously carried a hand-typed "6+ years" and "7+ years" describing
the same job — this is why.

The two internships are the one exception: they set `durationNote`
(`'100 hrs'`, `'200 hrs'`) because they were measured in required hours,
not elapsed months.

### Case-study content

Each project's `caseStudy` holds the problem, solution, grouped features,
the technical write-up, scope figures, role and stack. `scope` is for
**measured facts about the codebase only** (tables, routes, hooks) — not
users, traffic or performance, which nothing in this repo can back up.

## 🎨 Design tokens

Tailwind v4 does not read `tailwind.config.ts`. Tokens are declared in
`@theme` in `app/globals.css`, which is what generates the utilities
(`font-syne`, `text-muted`, `border-border`, …). The shorter `--bg` /
`--purple` aliases used by inline styles are derived from those same
tokens, so each value is defined once.

| Token | Value | Usage |
|---|---|---|
| `--color-bg` | `#09090B` | Page background |
| `--color-surface` | `#111113` | Cards, panels |
| `--color-border` | `#27272A` | All borders |
| `--color-purple` | `#7C3AED` | Primary accent |
| `--color-purple-l` | `#A78BFA` | Light purple, links |
| `--color-green` | `#22C55E` | Available / success |
| `--color-muted` | `#8B8B96` | Body text (5.9:1 on bg) |
| `--color-muted2` | `#7E7E8A` | Meta text (5.0:1 on bg) |

The two neutrals are set where they are so body and meta text clear WCAG
AA — the previous values measured 4.12:1 and 2.57:1.

Fonts come from `next/font` as `--font-syne-src` / `--font-dm-src` /
`--font-mono-src`, aliased into the Tailwind font tokens. The `-src`
suffix keeps next/font and Tailwind from overwriting each other's
variables.

## ♿ Accessibility notes

- Skip link, mobile navigation, and a visible focus ring on every control.
- Section labels are the page's `<h2>`s, so heading order runs h1 → h2 → h3
  and every `<section>` has an accessible name.
- Case studies use a native `<dialog>` opened with `showModal()`, for
  platform focus trapping and Esc-to-close.
- `prefers-reduced-motion` holds the blinking cursor and pulsing dot at
  their visible state.

## ⚙️ Configuration

`metadataBase` (in `app/layout.tsx`) resolves absolute OG image URLs. It
reads `NEXT_PUBLIC_SITE_URL`, falls back to Vercel's production domain,
and only then to a literal. Set the env var once the final domain is
settled.

## 📦 Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **Fonts:** Syne + DM Sans + Fira Code (`next/font`)
- **Contact:** Google Forms (`no-cors` POST)
- **Deploy:** Vercel

No animation or icon libraries — the site ships `clsx`, `tailwind-merge`
and Next.js itself.

---

Built by Ezequel · Dumaguete, Philippines
