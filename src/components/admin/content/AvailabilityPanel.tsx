import type { getContentAdminData } from '@/lib/content/admin'
import { buildAdminCatalog } from '@/lib/content/admin-catalog'
import ManagementCatalog from './ManagementCatalog'

type AdminData = Awaited<ReturnType<typeof getContentAdminData>>
type Props = { drafts: AdminData['drafts']; published: AdminData['published']; error: AdminData['error'] }

export default function AvailabilityPanel({ drafts, published, error }: Props) {
  return <ManagementCatalog items={buildAdminCatalog(drafts, published, 'availability')} mode="availability" error={error} />
}
