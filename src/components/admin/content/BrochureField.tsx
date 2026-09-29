'use client'

import { useState, startTransition } from 'react'
import { FileText, Upload } from 'lucide-react'
import { uploadBrochure } from '@/app/admin/(dashboard)/brosur-lokasi/actions'
import { brochureUrl, pdfMetadataError } from '@/lib/content/resources'

type Props = { documentId: string; value: string; disabled: boolean; onChange: (value: string) => void; onBusy: (busy: boolean) => void }

export default function BrochureField({ documentId, value, disabled, onChange, onBusy }: Props) {
  const [message, setMessage] = useState('')
  const [uploading, setUploading] = useState(false)
  const url = brochureUrl(value)

  async function upload(file: File) {
    setMessage('')
    const invalid = pdfMetadataError(file)
    if (invalid) { setMessage(invalid); return }
    setUploading(true); onBusy(true)
    try {
      const data = new FormData(); data.set('file', file)
      const result = await uploadBrochure(documentId, data)
      if (!result.success) { setMessage(result.error); return }
      onChange(result.path)
      setMessage('PDF berhasil diunggah. Simpan Draft, periksa preview, lalu Publikasikan untuk memasangnya di website.')
    } catch { setMessage('Upload belum berhasil. Coba lagi; brosur sebelumnya tetap dipertahankan.') }
    finally { setUploading(false); onBusy(false) }
  }

  return <div className="space-y-4 rounded-xl border border-gray-200 bg-slate-50/60 p-4 sm:p-5">
    <div className="flex items-start gap-3"><span className="rounded-lg bg-white p-2.5 text-[#0B5EAA]"><FileText className="h-5 w-5" aria-hidden="true" /></span><div className="min-w-0"><p className="text-sm font-semibold text-gray-900">{value ? 'Brosur dipilih' : 'Belum ada brosur'}</p><p className="mt-1 text-xs leading-relaxed text-gray-500">{value ? 'PDF ini akan digunakan setelah draft dipublikasikan.' : 'Pengunjung melihat “Brosur · Segera tersedia”.'}</p>{url && <a href={url} target="_blank" rel="noopener noreferrer" className="mt-2 inline-flex min-h-9 items-center rounded text-sm font-semibold text-[#0B5EAA] underline focus-visible:ring-2 focus-visible:ring-[#0B5EAA]">Periksa PDF yang dipilih ↗</a>}</div></div>
    <label className="block space-y-3 rounded-lg border border-dashed border-blue-200 bg-white p-4">
      <span className="flex items-center gap-2 text-sm font-medium text-gray-700"><Upload className="h-4 w-4 text-[#0B5EAA]" aria-hidden="true" />Unggah / ganti PDF (maks. 3 MB)</span>
      <input id="brochure.path" type="file" accept=".pdf,application/pdf" disabled={disabled || uploading} className="block w-full min-w-0 rounded-lg text-xs text-gray-500 file:mr-3 file:min-h-11 file:cursor-pointer file:rounded-lg file:border-0 file:bg-[#0B5EAA] file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-[#094c89] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0B5EAA] disabled:opacity-50"
        onChange={event => { const file = event.target.files?.[0]; event.target.value = ''; if (file) startTransition(() => upload(file)) }} />
    </label>
    <p className="text-xs leading-relaxed text-gray-500">Hanya unggah brosur untuk publik. File yang diunggah dapat diakses melalui tautannya meskipun tombol di website belum dipublikasikan. Jangan unggah dokumen rahasia.</p>
    {value && <button type="button" disabled={disabled || uploading} onClick={() => { if (window.confirm('Kembalikan ke placeholder? Perubahan baru tampil setelah Simpan Draft dan Publikasikan. File lama tidak dihapus.')) onChange('') }} className="min-h-11 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0B5EAA] disabled:opacity-50">Gunakan placeholder</button>}
    <p role="status" aria-live="polite" className="text-sm text-blue-800">{uploading ? 'Sedang mengunggah PDF… Jangan tinggalkan halaman ini.' : message}</p>
  </div>
}
