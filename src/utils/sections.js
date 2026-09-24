/**
 * Section registry — single source of truth for navigation + scroll spy.
 * `id` must match the corresponding section element id in App.jsx.
 */
export const SECTIONS = [
  { id: 'hero', label: 'Home', icon: 'Home' },
  { id: 'about', label: 'About', icon: 'User' },
  { id: 'skills', label: 'Skills', icon: 'Cpu' },
  { id: 'experience', label: 'Experience', icon: 'Briefcase' },
  { id: 'projects', label: 'Projects', icon: 'FolderGit2' },
  { id: 'education', label: 'Education', icon: 'GraduationCap' },
  { id: 'contact', label: 'Contact', icon: 'Send' },
]

export const SECTION_IDS = SECTIONS.map((s) => s.id)
