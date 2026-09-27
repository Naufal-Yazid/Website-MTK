import Link from 'next/link'
import type { ContentPreview } from '@/lib/content/server'

export default function PreviewNotice({ preview }: { preview: ContentPreview }) {
  if (!preview) return null
  return (
    <aside className="fixed bottom-4 left-4 right-24 z-[100] mx-auto flex max-w-3xl flex-wrap items-center justify-between gap-3 rounded-xl border border-amber-300 bg-amber-50 p-4 text-sm text-amber-950 shadow-xl" aria-label="Mode preview draft">
      <div><strong>Preview — {preview.label}</strong><p>{preview.revision ? `Draft tersimpan revisi ${preview.revision}. Belum mengubah halaman publik.` : 'Belum ada draft tersimpan; menampilkan konten saat ini.'}</p></div>
      <Link href={`/admin/content/${preview.id}`} className="font-semibold underline">Kembali ke editor</Link>
    </aside>
  )
}
