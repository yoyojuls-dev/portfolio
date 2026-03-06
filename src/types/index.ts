export interface Project {
  id: number
  title: string
  description: string
  tags: string[]
  image?: string
  liveUrl?: string
  githubUrl?: string
  featured?: boolean
}

export interface Skill {
  category: string
  items: string[]
}

export interface NavLink {
  label: string
  href: string
}

export interface ContactForm {
  name: string
  email: string
  message: string
}
