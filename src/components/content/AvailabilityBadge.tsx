import { availabilityOptions, type Availability } from '@/lib/content/availability'

export default function AvailabilityBadge({ status, placement = 'inline' }: { status: Availability; placement?: 'inline' | 'card' }) {
  const option = availabilityOptions.find(item => item.value === status)!
  return (
    <span data-availability={status} data-placement={placement} className={`inline-flex w-fit shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full border px-3 py-1 text-xs font-semibold ${option.className} ${placement === 'card' ? 'absolute right-3 top-3 z-10 shadow-sm' : ''}`}>
      <span className="h-1.5 w-1.5 rounded-full bg-current" aria-hidden="true" />
      {option.label}
    </span>
  )
}
