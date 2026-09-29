'use client'

import { useRealtimeInquiries } from '@/lib/hooks/useRealtimeInquiries'
import { LeadsToolbar } from '@/components/admin/leads/LeadsToolbar'
import { LeadsTable } from '@/components/admin/leads/LeadsTable'
import { Database } from '@/lib/types/database'

type Inquiry = Database['public']['Tables']['inquiries']['Row']
type SiteSettings = Database['public']['Tables']['site_settings']['Row']

interface LeadsClientProps {
  initialData: Inquiry[]
  siteSettings: SiteSettings | null
}

export function LeadsClient({ initialData, siteSettings }: LeadsClientProps) {
  useRealtimeInquiries()

  return (
    <div className="space-y-5 rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
      <LeadsToolbar />
      <LeadsTable data={initialData} siteSettings={siteSettings} />
    </div>
  )
}
