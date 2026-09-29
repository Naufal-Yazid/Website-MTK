import type { ReactNode } from 'react'
import { LayoutDashboard, BarChart3, Users, FilePenLine, BookOpen, ScrollText, Settings, CircleHelp } from 'lucide-react'

const icons = {
  dashboard: LayoutDashboard,
  analytics: BarChart3,
  leads: Users,
  content: FilePenLine,
  brochures: BookOpen,
  logs: ScrollText,
  settings: Settings,
  help: CircleHelp,
}

type AdminPageHeaderProps = {
  icon: keyof typeof icons
  title: string
  description: string
  actions?: ReactNode
}

export default function AdminPageHeader({ icon, title, description, actions }: AdminPageHeaderProps) {
  const Icon = icons[icon]
  return (
    <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex min-w-0 flex-1 items-start gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-[#0B5EAA]">
          <Icon className="h-6 w-6" aria-hidden="true" />
        </div>
        <div className="min-w-0">
          <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
          <p className="mt-1 text-sm leading-relaxed text-gray-500">{description}</p>
        </div>
      </div>
      {actions && <div className="flex shrink-0 flex-wrap items-center gap-3 self-start sm:self-center">{actions}</div>}
    </header>
  )
}
