// ============================================================
// lib/data.ts — Single source of truth for all portfolio content
// Edit this file to update your portfolio. No need to touch components.
// ============================================================

export const personal = {
  name: 'Ezequel Bautista',
  title: 'BSIT Student | IT Support | Data Annotation',
  location: 'Dumaguete, Central Visayas, Philippines',
  locationShort: 'Dumaguete, PH',
  email: 'ezykel225@gmail.com',
  github: 'https://github.com/ezykel225',
  linkedin: 'https://www.linkedin.com/in/ezykel225',
  resumeUrl: '/resume.pdf',
  available: true,
  availableText: 'Open to Part-Time, Freelance & Remote Work',
  tagline: 'Learning by building, one project at a time.',
  bio: [
    "I'm Ezequel, a 4th year BSIT student at Asian College of Science and Technology (graduating 2027), based in Dumaguete, Central Visayas, Philippines.",
    "I've built hands-on IT experience through two internships — as an IT Support Intern at ECE Contact Centers and Inspiro/Infocom — where I handled technical support tasks in fast-paced environments. Alongside my studies, I've worked as a Data Annotator with Remotasks PH and Outlier AI, contributing to AI training projects, and I have customer service experience from Qualfon Dumaguete.",
    "Outside of work, I build my own projects — including a barangay e-processing system and a fitness tracking app — to keep learning and applying what I study in real, working software.",
  ],
  loves: [
    'Building full-stack web apps with React and Supabase',
    'Building mobile apps with Expo and React Native',
    'Picking up new tools and systems quickly',
    'Applying what I learn in class to real projects',
  ],
  stats: [
    { value: '2', label: 'projects_shipped' },
    { value: '6+', label: 'years_data_annotation' },
    { value: '2', label: 'it_support_internships' },
    { value: '2027', label: 'graduating' },
  ],
  terminalLines: [
    { prompt: 'whoami', output: 'ezequel // BSIT Student · IT Support · Data Annotation · Dumaguete, PH' },
    { prompt: 'cat status.txt', output: '"4th year BSIT student, graduating 2027. Open to part-time & freelance work."' },
  ],
}

export const techStack = [
  {
    category: 'frontend & mobile',
    items: ['React', 'React Router', 'React Native', 'Expo', 'TypeScript', 'Tailwind CSS'],
  },
  {
    category: 'backend & services',
    items: ['Supabase (Auth, Database, Storage)'],
  },
  {
    category: 'tools & libraries',
    items: ['react-hot-toast', 'react-native-chart-kit', 'react-native-svg', 'AsyncStorage', 'React Context', 'Git', 'GitHub'],
  },
]

export const projects = [
  {
    id: 'barangay-batinguel',
    title: 'Barangay Batinguel E-System',
    desc: 'A web-based e-processing system for Barangay Batinguel, Dumaguete City. Residents can view announcements and events, check the health center schedule, and reserve the covered court online. Officials and the assigned nurse have protected dashboards to manage these services.',
    tags: ['React 19', 'React Router v6', 'Supabase', 'Tailwind CSS', 'react-hot-toast'],
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
    category: ['all', 'react', 'fullstack'],
  },
  {
    id: 'fitpro',
    title: 'FitPro: The Lazy Fitness Assistant',
    desc: 'A mobile fitness app built with Expo and React Native that automates workout tracking, calorie monitoring, and progress management. Includes workout plans, nutrition logging, progress charts, and achievement badges.',
    tags: ['Expo', 'React Native', 'TypeScript', 'AsyncStorage', 'react-native-chart-kit'],
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
    category: ['all', 'react'],
  },
]

export const projectFilters = ['all', 'react', 'fullstack']

export const experience = [
  {
    id: 'remotasks',
    role: 'Data Annotator',
    company: 'Remotasks PH',
    location: 'Remote · Philippines',
    date: 'Aug 2019 – Present',
    duration: '7+ years',
    current: true,
    color: 'purple',
    desc: 'Performing 2D and 3D data annotation to support AI/ML model training, ensuring accuracy and consistency across large volumes of data.',
    bullets: [
      'Performed 2D and 3D data annotation to support AI/ML model training',
      'Maintained quality standards on long-term annotation projects, contributing to real-world AI training datasets',
    ],
    skills: ['Data Annotation', '2D/3D Annotation', 'Quality Assurance'],
  },
  {
    id: 'outlier',
    role: 'Data Annotator',
    company: 'Outlier AI',
    location: 'Remote · Philippines',
    date: 'Jan 2024 – Feb 2025',
    duration: '1 yr 2 mos',
    current: false,
    color: 'gray',
    desc: 'Contributed to multiple AI training projects, annotating and labeling data to improve model accuracy.',
    bullets: [
      'Contributed to multiple AI training projects, including Bubble Tea, Dune Building Permits, Dolphin, OVG Gaming, and Final Boss Battle Gaming',
      'Adapted quickly across different project types and datasets, from object recognition to gaming environments',
    ],
    skills: ['Data Annotation', 'AI Training Data', 'Adaptability'],
  },
  {
    id: 'qualfon',
    role: 'Customer Service Representative',
    company: 'Qualfon Dumaguete',
    location: 'Dumaguete City, Philippines',
    date: 'Jul 2023 – Dec 2023',
    duration: '6 mos',
    current: false,
    color: 'amber',
    desc: 'Supported a Tier II Vail Resort account, resolving customer inquiries and escalations with a focus on clear communication and problem-solving.',
    bullets: [
      'Supported a Tier II Vail Resort account, resolving customer inquiries and escalations',
      'Handled high call volumes while maintaining service quality standards',
    ],
    skills: ['Customer Service', 'Communication', 'Problem Solving'],
  },
  {
    id: 'ece',
    role: 'IT Support Intern',
    company: 'ECE Contact Centers',
    location: 'Dumaguete City, Philippines',
    date: 'Jun 2024 – Jul 2024',
    duration: '100 hrs',
    current: false,
    color: 'blue',
    desc: 'Provided IT support in a fast-paced contact center environment, troubleshooting technical issues for staff and clients.',
    bullets: [
      'Provided IT support in a fast-paced contact center environment',
      'Gained hands-on experience with IT support workflows and ticketing systems',
    ],
    skills: ['IT Support', 'Technical Troubleshooting'],
  },
  {
    id: 'inspiro',
    role: 'Information Technology Intern',
    company: 'Inspiro/Infocom',
    location: 'Dumaguete City, Philippines',
    date: 'Jun 2025 – Aug 2025',
    duration: '200 hrs',
    current: false,
    color: 'blue',
    desc: 'Delivered technical support and troubleshooting for IT-related issues within a corporate environment.',
    bullets: [
      'Delivered technical support and troubleshooting for IT-related issues within a corporate environment',
      'Built practical experience in diagnosing and resolving hardware and software problems',
    ],
    skills: ['IT Support', 'Technical Troubleshooting', 'Hardware/Software Diagnostics'],
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
export const certifications: { id: string; name: string; issuer: string; year: string; color: string }[] = []
