'use client'

import { useState, startTransition } from 'react'
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

  return <div className="space-y-3">
    <p className="text-sm text-gray-600">{value ? 'Brosur telah dipilih untuk draft ini.' : 'Belum ada brosur. Pengunjung melihat “Brosur · Segera tersedia”.'}</p>
    {url && <a href={url} target="_blank" rel="noopener noreferrer" className="inline-block text-sm font-semibold text-blue-700 underline">Periksa PDF yang dipilih ↗</a>}
    <label className="block space-y-2">
      <span className="text-sm font-medium">Unggah / ganti PDF (maks. 3 MB)</span>
      <input id="brochure.path" type="file" accept=".pdf,application/pdf" disabled={disabled || uploading} className="block w-full rounded-lg border border-gray-200 p-3 text-sm file:mr-3 file:rounded-md file:border-0 file:bg-blue-50 file:px-3 file:py-2 file:text-blue-700"
        onChange={event => { const file = event.target.files?.[0]; event.target.value = ''; if (file) startTransition(() => upload(file)) }} />
    </label>
    <p className="text-xs leading-relaxed text-gray-500">Hanya unggah brosur untuk publik. File yang diunggah dapat diakses melalui tautannya meskipun tombol di website belum dipublikasikan. Jangan unggah dokumen rahasia.</p>
    {value && <button type="button" disabled={disabled || uploading} onClick={() => { if (window.confirm('Kembalikan ke placeholder? Perubahan baru tampil setelah Simpan Draft dan Publikasikan. File lama tidak dihapus.')) onChange('') }} className="rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-700">Gunakan placeholder</button>}
    <p role="status" aria-live="polite" className="text-sm text-blue-800">{uploading ? 'Sedang mengunggah PDF… Jangan tinggalkan halaman ini.' : message}</p>
  </div>
}
