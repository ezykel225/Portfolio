// ============================================================
// lib/data.ts — Single source of truth for all portfolio content
// Edit this file to update the portfolio. No need to touch components.
//
// Durations and year counts are NOT written by hand anywhere. They are
// derived from the `start` / `end` months below via lib/utils.ts, so
// the timeline, the career snapshot and the prose can't contradict
// each other.
// ============================================================

import type { Project, ExperienceItem, Certification } from './types'
import { monthsBetween, yearsSince } from './utils'

export const personal = {
  name: 'Ezequel Bautista',

  // Primary professional identity. Development leads; the IT support and
  // data annotation background is real supporting experience, presented
  // as such rather than as the headline.
  role: 'Junior Web Developer',
  seeking: 'Seeking my first developer role',
  studentLine: '4th year BSIT student · graduating 2027',

  location: 'Dumaguete, Central Visayas, Philippines',
  locationShort: 'Dumaguete, PH',
  email: 'ezykel225@gmail.com',
  github: 'https://github.com/ezykel225',
  linkedin: 'https://www.linkedin.com/in/ezykel225',
  resumeUrl: '/resume.pdf',

  available: true,
  availableText: 'Open to junior developer roles, internships, part-time and remote work',

  // One line under the h1 — what I do, stated concretely.
  summary:
    'I build full-stack web apps with React, TypeScript and Supabase, and mobile apps with Expo and React Native. Two of them are shipped and running — the code for both is on GitHub.',

  bio: [
    "I'm Ezequel, a 4th year BSIT student at Asian College of Science and Technology (graduating 2027), based in Dumaguete, Central Visayas, Philippines.",
    "I learn by building things that have to actually work. My two main projects are a barangay e-processing system — React and Supabase, with role-based dashboards, Row Level Security policies and a booking system — and a React Native fitness app built with Expo. Both are live, and both repositories are public.",
    "Alongside my studies I've built hands-on IT experience through two internships, as an IT Support Intern at ECE Contact Centers and Inspiro/Infocom. I've also worked remotely as a Data Annotator with Remotasks PH and Outlier AI on AI training projects, and in customer service at Qualfon Dumaguete — work that taught me to be careful, self-managed, and clear with people.",
  ],

  loves: [
    'Building full-stack web apps with React and Supabase',
    'Building mobile apps with Expo and React Native',
    'Getting access control right — auth, roles, and RLS policies',
    'Picking up new tools and systems quickly',
    'Applying what I learn in class to real, working software',
  ],

  // The terminal is the site's signature. It now answers the three
  // questions a recruiter has in the first five seconds.
  terminalLines: [
    {
      prompt: 'whoami',
      output: 'ezequel — junior web developer // React · TypeScript · Supabase · React Native',
    },
    {
      prompt: 'cat goal.txt',
      output: '"Looking for my first developer role. 4th year BSIT, graduating 2027."',
    },
    {
      prompt: 'ls ~/shipped',
      output: 'barangay-batinguel-e-system/   fitpro/',
    },
  ],
}

export const techStack = [
  {
    category: 'frontend & mobile',
    // Next.js is here because this portfolio is built with it — see the
    // footer and package.json. Nothing in this list is aspirational.
    items: ['React', 'Next.js', 'React Router', 'React Native', 'Expo', 'TypeScript', 'Tailwind CSS'],
  },
  {
    category: 'backend & services',
    items: ['Supabase Auth', 'Postgres', 'Row Level Security', 'Supabase Storage'],
  },
  {
    category: 'tools & libraries',
    items: [
      'Git',
      'GitHub',
      'React Context',
      'AsyncStorage',
      'react-hot-toast',
      'react-native-chart-kit',
      'react-native-svg',
    ],
  },
]

// ============================================================
// Projects
//
// Every technical claim in the case studies below is traceable to the
// source of the two public repositories linked from each card:
//   github.com/ezykel225/barangay-batinguel
//   github.com/ezykel225/fitpro
// `scope` holds measured facts about the codebase only — never usage,
// adoption or performance numbers, which nothing here can support.
// ============================================================

export const projects: Project[] = [
  {
    id: 'barangay-batinguel',
    title: 'Barangay Batinguel E-System',
    subtitle: 'Local government services, online',
    type: 'Full-stack web app',
    year: '2025 – 2026',
    desc: 'A web-based e-processing system for Barangay Batinguel, Dumaguete City. Residents book the covered court, request documents and check announcements online; officials and the health-centre nurse manage it all from role-specific dashboards.',
    highlights: [
      'Three user roles, each with its own dashboard',
      'Supabase Auth + Row Level Security on every table',
      'Booking calendar with slot-conflict re-checks',
    ],
    tags: ['React 19', 'React Router v6', 'Supabase', 'Postgres', 'Tailwind CSS'],
    emoji: '🏛️',
    gradient: 'from-[#0C2340] to-[#1D4ED8]',
    images: [
      '/projects/bbes-1-home.png',
      '/projects/bbes-2-officials.png',
      '/projects/bbes-3-login.png',
      '/projects/bbes-4-court-reservation.png',
      '/projects/bbes-5-health-center.png',
    ],
    live: 'https://barangay-batinguel-e-processing.vercel.app/',
    github: 'https://github.com/ezykel225/barangay-batinguel.git',
    category: ['all', 'web', 'full-stack'],
    caseStudy: {
      problem:
        'A barangay runs several separate services — announcements and events, the health-centre schedule, document requests, waste collection and the covered court — with no single place online for residents to reach any of them, and no shared system for the officials and the health-centre nurse who administer them.',
      solution:
        'One React application with a public side and three protected dashboards on top of a Supabase Postgres database. Residents get self-service; officials and the nurse each get only the tools their role is responsible for.',
      features: [
        {
          group: 'Public',
          items: [
            'Home, Announcements and Events, each with a detail page',
            'Barangay officials directory',
            'Health-centre schedule and medical programs',
            'Covered-court reservation with an availability calendar and optional GCash or in-kind donation',
            'Resident sign-up and self-service password reset',
          ],
        },
        {
          group: 'Official dashboard',
          items: [
            'Reservations, announcements, events and document requests',
            'Waste-collection schedule and officials directory',
            'Residents registry and resident-account verification queue',
            'Reports and an activity log',
          ],
        },
        {
          group: 'Nurse dashboard',
          items: ['Health-centre events', 'Medical programs', 'Weekly availability schedule'],
        },
        {
          group: 'Resident dashboard',
          items: ['Request barangay documents', 'Track request status', 'View their own court reservations'],
        },
      ],
      technical: [
        {
          key: 'access_control',
          title: 'Access control enforced twice, not once',
          body: 'A ProtectedRoute component gates what the browser renders per role, but that only controls the UI. The real enforcement is Row Level Security policies on every Supabase table, so a request that bypasses the frontend still gets rejected by the database. Where a write can be filtered out by a policy, the code checks that a row actually came back instead of assuming the insert succeeded.',
        },
        {
          key: 'privilege_escalation',
          title: 'Found and closed two privilege-escalation holes in my own policies',
          body: 'Reviewing the policies I had written, I found that the INSERT policy on profiles checked the row id but never constrained role — so anyone could sign up directly against the public key and insert themselves as an official. Separately, residents could write any column on their own row, including setting verification_status to "verified" and skipping the officials\' queue entirely. I restricted self-service inserts to role = \'resident\', and extended a BEFORE UPDATE trigger so residents can only make the one legitimate transition (a rejected account back to pending when a new ID is uploaded). Both fixes are recorded as a numbered SQL migration and were verified in pg_policies afterwards.',
        },
        {
          key: 'auth_deadlock',
          title: 'Debugged an app-wide hang caused by a duplicated auth call',
          body: 'The app intermittently froze with "Auth check timed out" — even on public pages with no login involved. The cause was in AuthProvider: it called supabase.auth.getSession() alongside an onAuthStateChange subscription, but onAuthStateChange already fires once with the current session the moment you subscribe. The redundant call raced the first one for the browser-wide auth lock on every page load, and because the provider wraps the whole app, every request through the shared Supabase client queued behind the stuck lock. Removing the duplicate call removed the contention.',
        },
        {
          key: 'booking_conflicts',
          title: 'Booking calendar that avoids double-booking',
          body: 'The calendar pre-computes which time slots are taken for a whole month in a single query, so fully booked days grey out without one request per day, and multi-hour bookings correctly mark every slot they cover. Because someone else can book while the form is open, availability is re-checked immediately before the insert and the user gets a specific "that slot was just booked" message. I documented in the code that this narrows rather than eliminates the race, and that a uniqueness constraint on (date, time) is what would close it fully.',
        },
        {
          key: 'private_documents',
          title: 'Uploaded IDs served through short-lived signed URLs',
          body: 'Residents upload an ID for account verification. Rather than exposing those files on a public bucket, officials view them through a Supabase signed URL that expires after 120 seconds. The repository README notes honestly that two other buckets are still public and should be moved to the same pattern.',
        },
        {
          key: 'migrations',
          title: 'Schema tracked as versioned SQL',
          body: 'Tables, RLS policies and triggers live as numbered migration files in the repo rather than as untracked clicks in the Supabase dashboard, so a new environment can be rebuilt by applying them in order. The README also documents which keys are safe to expose client-side and why the policies — not the key — are what protect the data.',
        },
      ],
      scope: [
        { value: '3', label: 'user_roles' },
        { value: '14', label: 'database_tables' },
        { value: '14', label: 'app_routes' },
        { value: '8.4k', label: 'lines_of_code' },
      ],
      role: 'Solo build — routing and UI, Supabase Auth integration, the Postgres schema, and the Row Level Security policies that enforce it.',
      stack: [
        { group: 'Frontend', items: ['React 19', 'React Router v6', 'Tailwind CSS', 'react-hot-toast', 'react-datepicker', 'react-icons'] },
        { group: 'Backend', items: ['Supabase Auth', 'Postgres', 'Row Level Security', 'Supabase Storage', 'SQL migrations'] },
      ],
    },
  },
  {
    id: 'fitpro',
    title: 'FitPro: The Lazy Fitness Assistant',
    subtitle: 'Fitness tracking with the effort removed',
    type: 'Mobile app',
    year: '2025',
    desc: 'A mobile fitness app built with Expo and React Native for people who give up on tracking because it takes too much work. Pre-built workout plans, one-tap logging, and streaks and badges that update themselves.',
    highlights: [
      'TypeScript strict mode, logic split across 5 custom hooks',
      'Personalised calorie targets from the Mifflin-St Jeor equation',
      'Fully offline — typed AsyncStorage layer, no account needed',
    ],
    tags: ['Expo', 'React Native', 'TypeScript', 'Expo Router', 'AsyncStorage'],
    emoji: '🏋️',
    gradient: 'from-[#0A2010] to-[#166534]',
    images: [
      '/projects/fitpro-1-onboarding.png',
      '/projects/fitpro-2-home.png',
      '/projects/fitpro-3-workout.png',
      '/projects/fitpro-4-nutrition.png',
      '/projects/fitpro-5-progress.png',
      '/projects/fitpro-6-achievements.png',
      '/projects/fitpro-7-settings.png',
    ],
    live: 'https://fitpro101.netlify.app/',
    github: 'https://github.com/ezykel225/FitPro.git',
    category: ['all', 'mobile'],
    caseStudy: {
      problem:
        'Most fitness apps ask for a lot of effort before they give anything back: build your own plan, weigh every meal, remember to log it. People who are busy or unmotivated abandon them in the first week — which is exactly the group that most needs the consistency.',
      solution:
        'An app designed around the smallest possible effort per session. Workout plans come pre-built, meals log in one tap, and the things that drive motivation — streaks, progress charts and badges — update automatically as a side effect of using it. Everything is stored on the device, so there is no account to create before you can start.',
      features: [
        {
          group: 'Onboarding',
          items: ['Collects gender, age, height, weight, training frequency and goals', 'Generates a personalised daily calorie and macro target'],
        },
        {
          group: 'Daily use',
          items: [
            'Home — streak, calories today, workout completion, quick actions and a daily quote',
            'Workout — Push / Pull / Legs / Upper / Full Body plans, tick off exercises, rest timer, log the session',
            'Nutrition — add meals with calories, protein, carbs and fats against the daily targets',
          ],
        },
        {
          group: 'Motivation & progress',
          items: [
            'Progress — weight log, trend line chart and body stats',
            'Achievements — badges for streaks, workout counts and meals logged',
            'Settings — edit profile and goals, dark mode, notifications toggle, reset all data',
          ],
        },
      ],
      technical: [
        {
          key: 'architecture',
          title: 'Screens stay thin; the logic lives in hooks',
          body: 'Every piece of behaviour sits in one of five custom hooks — useWorkout, useNutrition, useProgress, useAchievements and useSettings. Screens call the functions those hooks return and never touch storage or business rules directly, so a screen file stays a layout and the rules stay testable in one place. Navigation is Expo Router\'s file-based (tabs) group.',
        },
        {
          key: 'persistence',
          title: 'One typed seam over AsyncStorage',
          body: 'services/storage.ts is the only file in the project that imports AsyncStorage. It holds all nine storage keys in a single namespaced STORAGE_KEYS object, and exposes a generic getItem<T>(key, fallback) that returns the fallback when a key is missing or the JSON fails to parse — so no caller has to null-check. Writes log and return false instead of throwing, so a failed write can never crash the UI while in-memory state still updates. Keeping it to one seam means swapping to a real API later would not touch a single screen or hook.',
        },
        {
          key: 'calorie_math',
          title: 'Real nutrition maths, with its limits stated',
          body: 'Onboarding answers become a daily target through the Mifflin-St Jeor BMR equation and standard activity multipliers, then a goal-specific adjustment: roughly a 500 kcal deficit to lose fat, a 300 kcal surplus to build muscle, and a mild 150 kcal deficit when both are selected, since neither a full deficit nor a full surplus fits recomposition. There is a safety floor so a smaller or less active profile never gets an unsafe target, and every value stays editable in Settings. The code says in comments that this is a well-established estimate, not medical advice.',
        },
        {
          key: 'streaks',
          title: 'Streak logic that is idempotent per day',
          body: 'Completing a workout stores lastCompletedDate. The update returns early if that date is already today, so finishing twice cannot inflate the streak; it increments only when the previous entry was literally yesterday, and otherwise resets to 1. Longest streak is tracked separately so a broken run does not erase the personal best.',
        },
        {
          key: 'achievements',
          title: 'Badges unlock on events rather than polling',
          body: 'useAchievements exposes checkAndUnlock(stats), which screens call after a relevant action — finishing a workout, logging a meal. Each badge maps to a threshold check and already-unlocked badges short-circuit, so nothing runs on a timer and unlocking is a direct consequence of the action that earned it.',
        },
        {
          key: 'typing',
          title: 'TypeScript strict mode and shared tokens',
          body: 'The project runs with strict: true. Shared interfaces live in constants/types.ts, design tokens (colours, spacing, radii) in constants/theme.ts, and defaults — workout plans, quotes, badges, goals — in constants/data.ts, so a screen never hard-codes a colour or a magic number. Dark mode is a single ThemeContext consumed app-wide.',
        },
      ],
      scope: [
        { value: '6', label: 'screens_plus_onboarding' },
        { value: '5', label: 'custom_hooks' },
        { value: '6', label: 'reusable_components' },
        { value: '9', label: 'persisted_keys' },
      ],
      role: 'Solo build — app architecture, all five hooks, the storage layer, the nutrition calculations and the UI.',
      stack: [
        { group: 'Core', items: ['Expo 54', 'React Native 0.81', 'TypeScript (strict)', 'Expo Router'] },
        { group: 'Data & UI', items: ['AsyncStorage', 'React Context', 'react-native-chart-kit', 'react-native-svg', 'react-native-paper', 'expo-linear-gradient'] },
      ],
      liveNote: 'The live link is a react-native-web build of the app, so it runs in a browser. The real target is iOS and Android via Expo Go.',
    },
  },
]

export const projectFilters = ['all', 'web', 'mobile', 'full-stack']

// ============================================================
// Experience
//
// Ordered by the data, not by hand: current roles first, then most
// recently finished. `start` / `end` drive every date and duration.
// ============================================================

const experienceEntries: ExperienceItem[] = [
  {
    id: 'remotasks',
    role: 'Data Annotator',
    company: 'Remotasks PH',
    location: 'Remote · Philippines',
    start: '2019-08',
    end: null,
    color: 'purple',
    desc: 'Performing 2D and 3D data annotation to support AI/ML model training, ensuring accuracy and consistency across large volumes of data.',
    bullets: [
      'Maintained quality standards on long-term annotation projects, contributing to real-world AI training datasets',
    ],
    skills: ['Data Annotation', '2D/3D Annotation', 'Quality Assurance', 'Remote Work'],
  },
  {
    id: 'inspiro',
    role: 'Information Technology Intern',
    company: 'Inspiro/Infocom',
    location: 'Dumaguete City, Philippines',
    start: '2025-06',
    end: '2025-08',
    durationNote: '200 hrs',
    color: 'blue',
    desc: 'Delivered technical support and troubleshooting for IT-related issues within a corporate environment.',
    bullets: [
      'Built practical experience in diagnosing and resolving hardware and software problems',
    ],
    skills: ['IT Support', 'Technical Troubleshooting', 'Hardware/Software Diagnostics'],
  },
  {
    id: 'outlier',
    role: 'Data Annotator',
    company: 'Outlier AI',
    location: 'Remote · Philippines',
    start: '2024-01',
    end: '2025-02',
    color: 'gray',
    desc: 'Contributed to multiple AI training projects, annotating and labeling data to improve model accuracy.',
    bullets: [
      'Contributed to multiple AI training projects, including Bubble Tea, Dune Building Permits, Dolphin, OVG Gaming, and Final Boss Battle Gaming',
      'Adapted quickly across different project types and datasets, from object recognition to gaming environments',
    ],
    skills: ['Data Annotation', 'AI Training Data', 'Adaptability'],
  },
  {
    id: 'ece',
    role: 'IT Support Intern',
    company: 'ECE Contact Centers',
    location: 'Dumaguete City, Philippines',
    start: '2024-06',
    end: '2024-07',
    durationNote: '100 hrs',
    color: 'blue',
    desc: 'Provided IT support in a fast-paced contact center environment, troubleshooting technical issues for staff and clients.',
    bullets: [
      'Gained hands-on experience with IT support workflows and ticketing systems',
    ],
    skills: ['IT Support', 'Technical Troubleshooting'],
  },
  {
    id: 'qualfon',
    role: 'Customer Service Representative',
    company: 'Qualfon Dumaguete',
    location: 'Dumaguete City, Philippines',
    start: '2023-07',
    end: '2023-12',
    color: 'amber',
    desc: 'Supported a Tier II Vail Resort account, resolving customer inquiries and escalations with a focus on clear communication and problem-solving.',
    bullets: [
      'Handled high call volumes while maintaining service quality standards',
    ],
    skills: ['Customer Service', 'Communication', 'Problem Solving'],
  },
]

/** Current roles first, then by most recent end date. */
export const experience: ExperienceItem[] = [...experienceEntries].sort((a, b) => {
  if (!a.end && b.end) return -1
  if (a.end && !b.end) return 1
  return (b.end ?? '').localeCompare(a.end ?? '')
})

/** The longest-running role — the anchor for "years of remote work". */
const longestRunning = experienceEntries.reduce((longest, item) =>
  monthsBetween(item.start, item.end) > monthsBetween(longest.start, longest.end) ? item : longest
)

/**
 * The career snapshot. Every figure is computed, so there is exactly one
 * place any of these numbers can come from.
 *
 * "yrs_remote_work" is deliberately specific: it counts remote data
 * annotation work, and must never be read as years of development
 * experience.
 */
export const careerSnapshot = [
  { value: String(yearsSince(longestRunning.start)), label: 'yrs_remote_work' },
  { value: String(experienceEntries.length), label: 'roles_held' },
  { value: String(projects.length), label: 'apps_shipped' },
  { value: '2027', label: 'graduating' },
]

/**
 * What the non-development experience actually contributes to
 * development work. Each theme names the role that backs it — no
 * transferable-skills boilerplate that isn't evidenced above.
 */
export const experienceThemes = [
  {
    title: 'Self-managed remote work',
    body: `${yearsSince(longestRunning.start)} years of remote annotation work with Remotasks and Outlier, delivered without supervision or an office.`,
  },
  {
    title: 'Quality-sensitive detail work',
    body: 'Annotation is graded on accuracy and consistency across large volumes — the same care a code review asks for.',
  },
  {
    title: 'Troubleshooting under pressure',
    body: 'Two IT support internships diagnosing hardware and software problems for staff and clients in contact-centre environments.',
  },
  {
    title: 'Explaining things to people',
    body: 'Handling Tier II escalations at Qualfon meant making technical answers clear to someone who did not want a technical answer.',
  },
]

export const education = [
  {
    id: 'bsit',
    degree: 'Bachelor of Science in Information Technology',
    school: 'Asian College of Science and Technology',
    date: '2023 – 2027 (Expected)',
    current: true,
    desc: 'Studying Information Technology while working part-time in data annotation, IT support, and customer service roles.',
    subjects: [],
  },
]

// No certifications yet — add real ones here once earned, e.g.:
// { id: 'slug', name: 'Certification Name', issuer: 'Issuing Org', year: '2026', color: 'green' }
export const certifications: Certification[] = []
