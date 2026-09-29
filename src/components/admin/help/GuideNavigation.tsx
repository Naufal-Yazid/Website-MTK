import Link from 'next/link'
import { ArrowLeft, ArrowRight } from 'lucide-react'

const buttonClass = 'inline-flex min-h-11 items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0B5EAA] focus-visible:ring-offset-2'

export default function GuideNavigation({ href, label }: { href: string; label: string }) {
  return (
    <nav aria-label="Navigasi petunjuk" className="flex flex-col gap-3 border-b border-gray-200 pb-5 sm:flex-row sm:items-center sm:justify-between">
      <Link href="/admin/help" className={buttonClass + ' border border-gray-200 bg-white text-gray-700 hover:bg-gray-50'}>
        <ArrowLeft className="h-4 w-4 shrink-0" aria-hidden="true" />
        Semua petunjuk
      </Link>
      <Link href={href} className={buttonClass + ' bg-[#0B5EAA] text-white hover:bg-[#094c89] hover:text-white'}>
        {label}
        <ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" />
      </Link>
    </nav>
  )
}
