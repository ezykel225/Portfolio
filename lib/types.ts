export interface Project {
  id: string
  title: string
  desc: string
  tags: string[]
  emoji: string
  gradient: string
  images: string[]
  live: string
  github: string
  category: string[]
}

export interface ExperienceItem {
  id: string
  role: string
  company: string
  location: string
  date: string
  duration: string
  current: boolean
  color: string
  desc: string
  bullets: string[]
  skills: string[]
}

export interface Certification {
  id: string
  name: string
  issuer: string
  year: string
  color: string
}
