import {
  Users,
  ShieldCheck,
  Palette,
  BarChart3,
  Globe,
  Sparkles,
  Rocket,
  Zap,
  Code2,
  Layers,
  Monitor,
  Cpu,
  Database,
  Lock,
  Eye,
  Heart,
  Target,
  Lightbulb,
  Blocks,
  Gauge,
  Workflow,
  BrainCircuit,
  Fingerprint,
  Cloud,
  Laptop,
  Smartphone,
  PenTool,
  GitBranch,
  MessagesSquare,
  Award,
  TrendingUp,
  Settings2,
  Pencil,
  type LucideIcon,
} from 'lucide-react'

const iconRegistry: Record<string, LucideIcon> = {
  users: Users,
  shield: ShieldCheck,
  palette: Palette,
  chart: BarChart3,
  globe: Globe,
  sparkles: Sparkles,
  rocket: Rocket,
  zap: Zap,
  code: Code2,
  layers: Layers,
  monitor: Monitor,
  cpu: Cpu,
  database: Database,
  lock: Lock,
  eye: Eye,
  heart: Heart,
  target: Target,
  lightbulb: Lightbulb,
  blocks: Blocks,
  gauge: Gauge,
  workflow: Workflow,
  brain: BrainCircuit,
  fingerprint: Fingerprint,
  cloud: Cloud,
  laptop: Laptop,
  smartphone: Smartphone,
  pen: PenTool,
  pencil: Pencil,
  git: GitBranch,
  messages: MessagesSquare,
  award: Award,
  trending: TrendingUp,
  settings: Settings2,
}

export function resolveIcon(key: string) {
  const Icon = iconRegistry[key.toLowerCase().trim()]
  if (Icon) {
    return <Icon className="size-4" />
  }
  return <span className="text-sm">{key}</span>
}

/** All available icon keys for the admin panel */
export const availableIcons = Object.keys(iconRegistry)
