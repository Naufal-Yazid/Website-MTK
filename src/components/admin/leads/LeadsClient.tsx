'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
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
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    const channel = supabase
      .channel('public:inquiries')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'inquiries',
        },
        () => {
          router.refresh()
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [supabase, router])

  return (
    <div className="space-y-5 rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
      <LeadsToolbar />
      <LeadsTable data={initialData} siteSettings={siteSettings} />
    </div>
  )
}
