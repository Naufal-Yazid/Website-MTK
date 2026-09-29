import { contentDocuments } from './catalog'
import { mergeValues, resolvePublished } from './model'
import { availabilityFor, type Availability } from './availability'

export type CatalogMode = 'content' | 'resources' | 'availability'
export type CatalogItem = {
  id: string
  label: string
  path: string
  category: string
  pending: boolean
  revision: number
  hasBrochure: boolean
  hasLocation: boolean
  availability: Availability
  draftAvailability: Availability | null
}
type Row = { document_key: string; revision: number; content: unknown }

// Only send display metadata to the client, never complete drafts or admin records.
export function buildAdminCatalog(drafts: Row[], published: Row[], mode: CatalogMode): CatalogItem[] {
  const live = resolvePublished(published)
  return contentDocuments.filter(doc => mode !== 'availability' || doc.fields.some(field => field.kind === 'availability')).map(doc => {
    const draft = drafts.find(row => row.document_key === doc.id)
    const publication = published.find(row => row.document_key === doc.id)
    const pending = Boolean(draft && draft.revision !== publication?.revision)
    return {
      id: doc.id, label: doc.label, path: doc.path, category: doc.category,
      pending, revision: publication?.revision || 0,
      hasBrochure: Boolean(live[doc.id]['brochure.path']),
      hasLocation: Boolean(live[doc.id]['location.url']),
      availability: availabilityFor(live, doc.id),
      draftAvailability: pending ? availabilityFor({ ...live, [doc.id]: mergeValues(doc, draft?.content) }, doc.id) : null,
    }
  })
}

export function filterAdminCatalog(items: CatalogItem[], query: string, category: string, status: string) {
  const search = query.trim().toLocaleLowerCase('id-ID')
  return items.filter(item => (
    (!search || `${item.label} ${item.path}`.toLocaleLowerCase('id-ID').includes(search)) &&
    (category === 'all' || item.category === category) &&
    (status === 'all' || (status === 'draft' && item.pending) ||
      (status === 'published' && item.revision > 0 && !item.pending) ||
      (status === 'default' && item.revision === 0 && !item.pending) ||
      (status === 'missing-brochure' && !item.hasBrochure) ||
      (status === 'missing-location' && !item.hasLocation) || item.availability === status)
  ))
}
