import type { ReactNode } from 'react'

export default function FilterSummary({ children, hint, onReset }: {
  children: ReactNode
  hint?: string
  onReset?: () => void
}) {
  return (
    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs leading-5 text-gray-500">
      <p role="status" aria-live="polite">{children}</p>
      {hint && <p className="flex items-center gap-3"><span aria-hidden="true" className="text-gray-300">·</span>{hint}</p>}
      {onReset && <button type="button" onClick={onReset} className="min-h-9 rounded px-2 font-semibold text-[#0B5EAA] hover:bg-blue-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0B5EAA]">Reset filter</button>}
    </div>
  )
}
