import AvailabilityBadge from './AvailabilityBadge'
import type { Availability } from '@/lib/content/availability'

export default function HeroAvailability({ status }: { status: Availability }) {
  return (
    <div className="flex flex-wrap items-center gap-x-3 gap-y-2 border-t border-white/15 pt-4" data-hero-availability>
      <span className="text-xs font-medium text-white/80">Status ketersediaan</span>
      <AvailabilityBadge status={status} />
    </div>
  )
}
