import Link from 'next/link'
import { BookOpen } from 'lucide-react'
import AdminPageHeader from '@/components/admin/AdminPageHeader'

export default function ManagementHeader({ title, description, guide, icon = 'content' }: { title: string; description: string; guide: string; icon?: 'content' | 'brochures' }) {
  return <AdminPageHeader icon={icon} title={title} description={description} actions={
    <Link href={guide} className="inline-flex min-h-11 shrink-0 items-center justify-center gap-2 self-start rounded-lg border border-blue-200 bg-white px-4 py-2.5 text-sm font-semibold text-[#0B5EAA] shadow-sm transition hover:bg-blue-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0B5EAA] focus-visible:ring-offset-2 sm:self-auto">
      <BookOpen className="h-4 w-4" aria-hidden="true" />Lihat petunjuk
    </Link>
  } />
}
