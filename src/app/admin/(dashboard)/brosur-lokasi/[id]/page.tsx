import ContentEditorPage from '../../content/[id]/page'

export const metadata = { title: 'Kelola Brosur dan Lokasi | MTK Admin' }

export default function BrochureLocationEditorPage({ params }: { params: Promise<{ id: string }> }) {
  return ContentEditorPage({ params, searchParams: Promise.resolve({ mode: 'brosur-lokasi' }) })
}
