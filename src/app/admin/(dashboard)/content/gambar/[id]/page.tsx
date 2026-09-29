import Link from 'next/link'
import { notFound } from 'next/navigation'
import { findImageSlot } from '@/lib/media/catalog'
import { getImageAdminData } from '@/lib/media/server'
import ImageEditor from '@/components/admin/content/ImageEditor'

export const metadata = { title: 'Kelola Gambar | MTK Admin', robots: { index: false, follow: false } }
export default async function EditImagePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const slot = findImageSlot(id)
  if (!slot) notFound()
  const { drafts, published, error } = await getImageAdminData()
  if (error) return <div className="space-y-4"><Link href="/admin/content?tab=gambar" className="text-[#0B5EAA] underline">Kembali ke Kelola Gambar</Link><p role="alert" className="rounded-xl border border-amber-200 bg-amber-50 p-5 text-amber-900">{error}</p></div>
  const draft = drafts.find(row => row.image_key === id)
  const live = published.find(row => row.image_key === id)
  return <ImageEditor key={id + ':' + (draft?.revision || 0) + ':' + (live?.revision || 0)} slot={slot} draft={draft} published={live} />
}
