import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

type Props = {
  href: string
  label: string
  context: string
  disabled?: boolean
}

const className = 'inline-flex min-h-11 w-fit max-w-full items-center justify-center gap-2 rounded-lg bg-[#0B5EAA] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#094c89] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0B5EAA] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-500'

export default function AdminCardAction({ href, label, context, disabled = false }: Props) {
  if (disabled) return <button type="button" disabled className={className} aria-label={label + ' — ' + context}>{label}</button>
  return <Link href={href} className={className} aria-label={label + ' — ' + context}>
    {label}<ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" />
  </Link>
}
