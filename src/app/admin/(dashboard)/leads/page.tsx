import AdminPageHeader from '@/components/admin/AdminPageHeader'
import { createClient } from '@/lib/supabase/server'
import { LeadsClient } from '@/components/admin/leads/LeadsClient'
import { ExportButton } from '@/components/admin/leads/ExportButton'

interface PageProps {
  searchParams: Promise<{
    q?: string
    project?: string
    status?: string
    from?: string
    to?: string
  }>
}

export default async function LeadsPage({ searchParams }: PageProps) {
  const supabase = await createClient()
  
  // Await searchParams per Next.js 16 requirements
  const params = await searchParams
  
  const { data: siteSettings } = await supabase
    .from('site_settings')
    .select('*')
    .single()

  let query = supabase
    .from('inquiries')
    .select('*')
    .order('created_at', { ascending: false })

  if (params.q) {
    query = query.or(`full_name.ilike.%${params.q}%,whatsapp_number.ilike.%${params.q}%`)
  }

  if (params.project && params.project !== 'all') {
    query = query.eq('selected_project', params.project)
  }

  if (params.status && params.status !== 'all') {
    const statuses = ['baru', 'diproses', 'sudah_dihubungi', 'batal'] as const
    if (statuses.includes(params.status as (typeof statuses)[number])) {
      query = query.eq('status', params.status as (typeof statuses)[number])
    }
  }

  if (params.from && /^\d{4}-\d{2}-\d{2}$/.test(params.from)) {
    query = query.gte('created_at', `${params.from}T00:00:00.000Z`)
  }
  if (params.to && /^\d{4}-\d{2}-\d{2}$/.test(params.to)) {
    query = query.lte('created_at', `${params.to}T23:59:59.999Z`)
  }

  const { data: inquiries } = await query

  return (
    <div className="space-y-6">
      <AdminPageHeader icon="leads" title="Manajemen Leads" description="Kelola inquiry, status, dan tindak lanjut calon pelanggan." actions={<ExportButton data={inquiries || []} />} />
      
      <LeadsClient 
        initialData={inquiries || []} 
        siteSettings={siteSettings} 
      />
    </div>
  )
}
