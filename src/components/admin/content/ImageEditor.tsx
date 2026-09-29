'use client'

import { useEffect, useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Upload, Send, Loader2 } from 'lucide-react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog'
import { uploadImageDraft, resetImageDraft, publishImageDraft } from '@/app/admin/(dashboard)/content/gambar/actions'
import { imageMetadataError, imageUrl, type ImageRow } from '@/lib/media/model'
import type { ImageSlot } from '@/lib/media/catalog'

const button = 'inline-flex min-h-11 items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0B5EAA] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50'
export default function ImageEditor({ slot, draft, published }: { slot: ImageSlot; draft?: ImageRow; published?: ImageRow }) {
  const router = useRouter()
  const [file, setFile] = useState<File | null>(null)
  const [message, setMessage] = useState('')
  const [busy, startTransition] = useTransition()
  const [confirm, setConfirm] = useState(false)
  const pending = Boolean(draft && draft.revision !== published?.revision)
  const liveUrl = imageUrl(published?.path, slot.id) || slot.src
  const draftUrl = draft ? imageUrl(draft.path, slot.id) || slot.src : liveUrl

  useEffect(() => {
    if (!busy && !file) return
    const warn = (event: BeforeUnloadEvent) => { event.preventDefault(); event.returnValue = '' }
    window.addEventListener('beforeunload', warn)
    return () => window.removeEventListener('beforeunload', warn)
  }, [busy, file])

  function run(action: () => ReturnType<typeof publishImageDraft>) {
    setMessage('')
    startTransition(async () => {
      try {
        const result = await action()
        if (!result.success) { setMessage(result.error); return }
        setFile(null); setConfirm(false)
        router.refresh()
      } catch { setMessage('Koneksi terputus. Muat ulang untuk memeriksa hasil; gambar publik tidak diganti tanpa publikasi.') }
    })
  }
  return <div className="space-y-6">
    <Link href="/admin/content?tab=gambar" className="inline-flex min-h-11 items-center gap-2 rounded text-sm font-semibold text-[#0B5EAA] focus-visible:ring-2 focus-visible:ring-[#0B5EAA]"><ArrowLeft className="h-4 w-4" aria-hidden="true" />Kelola Gambar</Link>
    <header><p className="text-xs font-semibold text-[#0B5EAA]">{slot.group}</p><h1 className="mt-2 text-2xl font-bold text-gray-900">{slot.label}</h1><p className="mt-2 text-sm leading-relaxed text-gray-500">Perubahan berlaku untuk semua pemakaian gambar ini: {slot.pages.join(', ')}.</p></header>
    <div className="flex flex-wrap items-center justify-between gap-3"><p className="text-sm text-gray-500">Unggah → periksa draft → publikasikan.</p><Link href="/admin/content/gambar/petunjuk" className={button + ' border border-gray-200 bg-white text-[#0B5EAA] hover:bg-blue-50'}>Lihat petunjuk</Link></div>
    {message && <p role="alert" className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-800">{message}</p>}
    <div className="grid gap-5 lg:grid-cols-2">{[['Versi publik', liveUrl], ['Preview draft', draftUrl]].map(([title, url]) => <section key={title} className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
      <h2 className="border-b border-gray-100 px-5 py-4 font-semibold text-gray-900">{title}</h2><div className="flex h-72 items-center justify-center bg-slate-100 p-4 sm:h-96">
        {/* eslint-disable-next-line @next/next/no-img-element -- Uncropped preview of converted upload. */}
        <img src={url} alt={title + ' — ' + slot.label} className="h-full w-full object-contain" />
      </div><div className="space-y-2 p-4"><a href={url} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center rounded text-sm font-semibold text-[#0B5EAA] underline focus-visible:ring-2 focus-visible:ring-[#0B5EAA]">Buka ukuran penuh ↗</a><p className="text-xs text-gray-500">{title === 'Versi publik' ? 'Foto yang dilihat pengunjung saat ini.' : pending ? 'Draft tersimpan · revisi ' + draft!.revision : 'Belum ada draft baru.'}</p></div>
    </section>)}</div>
    <p className="text-xs leading-relaxed text-gray-500">Preview gambar utuh; pemotongan di website mengikuti frame yang sudah ada.</p>
    <section className="space-y-4 rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
      <h2 className="font-semibold text-gray-900">Unggah pengganti</h2>
      <label className="block space-y-2"><span className="text-sm text-gray-600">JPG, PNG, atau WebP · maksimal 3 MB / 40 megapiksel</span><input type="file" accept=".jpg,.jpeg,.png,.webp,image/jpeg,image/png,image/webp" disabled={busy} onChange={event => {
        const selected = event.target.files?.[0]; event.target.value = ''
        if (!selected) return
        const invalid = imageMetadataError(selected)
        if (invalid) { setMessage(invalid); setFile(null); return }
        setFile(selected); setMessage('')
      }} className="block w-full min-w-0 rounded-lg border border-dashed border-blue-200 bg-blue-50/40 p-3 text-sm file:mr-3 file:min-h-11 file:rounded-lg file:border-0 file:bg-[#0B5EAA] file:px-4 file:text-sm file:font-semibold file:text-white focus-visible:ring-2 focus-visible:ring-[#0B5EAA]" /></label>
      {file && <p className="break-all text-sm text-gray-600">Dipilih: {file.name} · {(file.size / 1024 / 1024).toFixed(2)} MB</p>}
      <p className="text-xs leading-relaxed text-gray-500">Otomatis WebP. Hanya unggah gambar publik; tautan draft juga bisa diakses. Jangan unggah dokumen rahasia.</p>
      {draft?.path && <p className="text-xs font-medium text-gray-600">Hasil draft: WebP · {draft.width} × {draft.height} px · {(draft.bytes / 1024).toFixed(0)} KB</p>}
      <div className="flex flex-wrap gap-3">
        <button type="button" disabled={!file || busy} onClick={() => {
          if (!file || (pending && !window.confirm('Ganti draft gambar yang belum terbit? Versi publik tetap tidak berubah.'))) return
          const form = new FormData(); form.set('file', file)
          run(() => uploadImageDraft(slot.id, draft?.revision || 0, form))
        }} className={button + ' bg-[#0B5EAA] text-white hover:bg-[#094c89]'}><Upload className="h-4 w-4" aria-hidden="true" />Unggah & simpan draft</button>
        <button type="button" disabled={busy || !draft?.path} onClick={() => {
          if (window.confirm('Simpan gambar bawaan sebagai draft? Foto lama tidak dihapus, dan publik belum berubah.')) run(() => resetImageDraft(slot.id, draft?.revision || 0))
        }} className={button + ' border border-gray-200 bg-white text-gray-700 hover:bg-gray-50'}>Kembalikan gambar bawaan</button>
      </div>
    </section>
    <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
      <p role="status" aria-live="polite" className="flex items-center gap-2 text-sm text-gray-600">{busy && <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />}{busy ? 'Memproses… jangan tutup halaman ini.' : pending ? 'Draft siap diperiksa dan dipublikasikan.' : 'Tidak ada draft baru untuk dipublikasikan.'}</p>
      <button type="button" disabled={busy || !pending || Boolean(file)} onClick={() => setConfirm(true)} className={button + ' bg-[#0B5EAA] text-white hover:bg-[#094c89]'}><Send className="h-4 w-4" aria-hidden="true" />Publikasikan gambar</button>
    </div>
    <Dialog open={confirm} onOpenChange={value => { if (!busy) setConfirm(value) }}><DialogContent><DialogHeader><DialogTitle>Publikasikan gambar ini?</DialogTitle><DialogDescription>Draft revisi {draft?.revision} akan mengganti foto di semua lokasi pemakaiannya. Perubahan teks dan gambar lain tidak ikut dipublikasikan.</DialogDescription></DialogHeader><p className="text-sm leading-relaxed text-gray-600">{slot.label} — {slot.pages.join(', ')}</p><DialogFooter><button type="button" disabled={busy} onClick={() => setConfirm(false)} className={button + ' border border-gray-200'}>Batal</button><button type="button" disabled={busy} onClick={() => run(() => publishImageDraft(slot.id, draft!.revision))} className={button + ' bg-[#0B5EAA] text-white'}>Ya, publikasikan</button></DialogFooter></DialogContent></Dialog>
  </div>
}
