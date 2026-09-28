import Link from 'next/link'
import { notFound } from 'next/navigation'
import { findDocument, mergeValues } from '@/lib/content/model'
import { getContentAdminData } from '@/lib/content/admin'
import ContentEditor from '@/components/admin/content/ContentEditor'

export const metadata = { title: 'Edit Konten | MTK Admin' }

export default async function ContentEditorPage({ params, searchParams }: { params: Promise<{ id: string }>; searchParams: Promise<{ mode?: string }> }) {
  const doc = findDocument((await params).id)
  if (!doc) notFound()
  const mode = (await searchParams).mode
  const resourcesOnly = mode === 'brosur-lokasi'
  const statusOnly = mode === 'ketersediaan' && doc.fields.some(field => field.kind === 'availability')
  const { drafts, published, error } = await getContentAdminData()
  if (error) return <div className="space-y-4"><Link href="/admin/content" className="text-sm text-blue-700 underline">Kembali ke Konten Website</Link><div role="alert" className="rounded-xl border border-amber-200 bg-amber-50 p-5 text-sm text-amber-900">{error}</div></div>
  const draft = drafts.find(row => row.document_key === doc.id)
  const live = published.find(row => row.document_key === doc.id)
  return <ContentEditor key={`${doc.id}:${draft?.revision || 0}:${live?.revision || 0}:${statusOnly}:${resourcesOnly}`} document={doc} statusOnly={statusOnly} resourcesOnly={resourcesOnly}
    initialValues={mergeValues(doc, draft?.content || live?.content)} publishedValues={mergeValues(doc, live?.content)}
    draftRevision={draft?.revision || 0} publishedRevision={live?.revision || 0} updatedAt={draft?.updated_at || null} />
}
