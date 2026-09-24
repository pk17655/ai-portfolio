import {
  // social
  Linkedin, Github, Mail, Globe, Twitter, Phone,
  // skill categories
  Code2, Layers, Server, Sparkles, ShieldCheck, Cloud, Database, Cpu, Palette, Wrench,
  // certifications / achievements
  Terminal, Braces, Trophy, Target, Zap, Rocket, Award, Medal, Star, BadgeCheck,
  // nav / sections
  Home, User, Briefcase, FolderGit2, GraduationCap, Send, Bot, BrainCircuit,
  // fallback
  Circle,
} from 'lucide-react'

/**
 * Registry of the Lucide icons referenced from JSON config. Using explicit
 * named imports (instead of `import * as`) lets Vite tree-shake the icon set,
 * keeping the bundle small.
 *
 * To use a new icon name in a config file, add it here too. Unknown names
 * safely fall back to a neutral circle.
 */
const REGISTRY = {
  Linkedin, Github, Mail, Globe, Twitter, Phone,
  Code2, Layers, Server, Sparkles, ShieldCheck, Cloud, Database, Cpu, Palette, Wrench,
  Terminal, Braces, Trophy, Target, Zap, Rocket, Award, Medal, Star, BadgeCheck,
  Home, User, Briefcase, FolderGit2, GraduationCap, Send, Bot, BrainCircuit,
}

/**
 * Renders a Lucide icon by its string name (as stored in JSON config).
 * Usage: <Icon name="Cloud" className="w-5 h-5" />
 */
export default function Icon({ name, ...props }) {
  const Cmp = REGISTRY[name] || Circle
  return <Cmp {...props} />
}
