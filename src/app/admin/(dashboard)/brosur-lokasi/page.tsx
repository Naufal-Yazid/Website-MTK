import { getContentAdminData } from '@/lib/content/admin'
import { buildAdminCatalog } from '@/lib/content/admin-catalog'
import ManagementHeader from '@/components/admin/content/ManagementHeader'
import ManagementCatalog from '@/components/admin/content/ManagementCatalog'

export const metadata = { title: 'Brosur dan Lokasi | MTK Admin' }

export default async function BrochureLocationPage() {
  const { drafts, published, error } = await getContentAdminData()
  return <div className="space-y-6">
    <ManagementHeader icon="brochures" title="Brosur dan Lokasi" description="Atur PDF brosur dan lokasi yang dilihat pengunjung website." guide="/admin/brosur-lokasi/petunjuk" />
    <ManagementCatalog items={buildAdminCatalog(drafts, published, 'resources')} mode="resources" error={error} />
  </div>
}
