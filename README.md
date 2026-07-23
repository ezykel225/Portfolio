# ezequel.dev — Portfolio

Personal portfolio website built with **Next.js 15**, **TypeScript**, **Tailwind CSS**, and **Framer Motion**.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev
# → http://localhost:3000

# Build for production
npm run build

# Deploy to Vercel
npx vercel --prod
```

## 📁 Project Structure

```
ezequel-portfolio/
├── app/                    # Next.js App Router
│   ├── layout.tsx          # Root layout, fonts, metadata
│   ├── page.tsx            # Home page
│   ├── globals.css         # Global styles + CSS variables
│   └── not-found.tsx       # 404 page
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx      # Sticky top navigation
│   │   └── Footer.tsx      # Site footer
│   ├── sections/
│   │   ├── Hero.tsx        # Terminal animation + intro
│   │   ├── About.tsx       # Bio + what I love
│   │   ├── TechStack.tsx   # Skills by category
│   │   ├── Projects.tsx    # Filterable project grid
│   │   ├── Experience.tsx  # Work timeline + certs
│   │   ├── GitHub.tsx      # Contribution heatmap
│   │   └── Contact.tsx     # Contact form + links
│   └── ui/
│       ├── Button.tsx      # Reusable button
│       ├── SectionLabel.tsx
│       ├── SkillChip.tsx
│       └── TimelineItem.tsx
├── lib/
│   ├── data.ts             # ⭐ ALL CONTENT LIVES HERE
│   ├── animations.ts       # Framer Motion variants
│   ├── types.ts            # TypeScript interfaces
│   └── utils.ts            # cn() helper
└── public/
    ├── resume.pdf          # Your CV — replace this!
    └── og-image.png        # Social share image
```

## ✏️ Customizing Content

**All content is in `lib/data.ts`** — just edit that file:

- `personal` — your name, links, bio, tagline
- `techStack` — your skills grouped by category
- `projects` — your project list
- `experience` — your work history
- `education` — your education
- `certifications` — your certs

## 🎨 Design Tokens

Colors are CSS variables in `app/globals.css`:

| Variable      | Value     | Usage          |
|---------------|-----------|----------------|
| `--bg`        | `#09090B` | Page background |
| `--surface`   | `#111113` | Cards, panels  |
| `--border`    | `#27272A` | All borders    |
| `--purple`    | `#7C3AED` | Primary accent |
| `--purple-l`  | `#A78BFA` | Light purple   |
| `--green`     | `#22C55E` | Available/success |
| `--muted`     | `#71717A` | Body text      |

## 📦 Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **Animation:** Framer Motion
- **Fonts:** Syne + DM Sans + Fira Code (Google Fonts)
- **Deploy:** Vercel

## 🌐 Deploy

Push to GitHub, then import at [vercel.com](https://vercel.com). Zero config needed.

---

Built by Ezequel · Manila, Philippines
