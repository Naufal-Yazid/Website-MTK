import { Download, MapPin } from 'lucide-react'
import { brochureUrl, isMapUrl } from '@/lib/content/resources'
import type { ContentValues } from '@/lib/content/values'

const button = 'inline-flex items-center justify-center gap-2 rounded-lg border border-white px-5 py-2.5 text-xs font-medium text-white transition-colors sm:text-sm'

export default function ProjectActions({ values }: { values: ContentValues }) {
  const brochure = brochureUrl(values['brochure.path'])
  const location = values['location.url']
  return <div className="flex flex-wrap items-center gap-3 pt-2" data-project-actions>
    {brochure ? <a href={brochure} download className={button + ' hover:bg-white/10'}><Download className="h-4 w-4" aria-hidden="true" />Download Brosur</a>
      : <button type="button" disabled className={button + ' cursor-not-allowed border-white/30 text-white/70'}><Download className="h-4 w-4" aria-hidden="true" />Brosur · Segera tersedia</button>}
    {location && isMapUrl(location) ? <a href={location} target="_blank" rel="noopener noreferrer" className={button + ' hover:bg-white/10'}><MapPin className="h-4 w-4" aria-hidden="true" />Lihat Lokasi</a>
      : <button type="button" disabled className={button + ' cursor-not-allowed border-white/30 text-white/70'}><MapPin className="h-4 w-4" aria-hidden="true" />Lokasi · Segera tersedia</button>}
  </div>
}
