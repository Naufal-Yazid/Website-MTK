'use client'

import { useEffect, useState, useTransition } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Save, Eye, Send, Loader2 } from 'lucide-react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog'
import { saveContentDraft, publishContentDraft } from '@/app/admin/(dashboard)/content/actions'
import type { ContentDocument } from '@/lib/content/model'
import type { ContentValues } from '@/lib/content/values'
import { availabilityFor, availabilityLabel, availabilityOptions } from '@/lib/content/availability'
import BrochureField from '@/components/admin/content/BrochureField'
import { isMapUrl } from '@/lib/content/resources'
import AvailabilityBadge from '@/components/content/AvailabilityBadge'

type Props = { document: ContentDocument; initialValues: ContentValues; publishedValues: ContentValues; draftRevision: number; publishedRevision: number; updatedAt: string | null; statusOnly?: boolean; resourcesOnly?: boolean }
const button = 'inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold disabled:cursor-not-allowed disabled:opacity-50'

export default function ContentEditor({ document: doc, initialValues, publishedValues, draftRevision, publishedRevision, updatedAt, statusOnly = false, resourcesOnly = false }: Props) {
  const router = useRouter()
  const [values, setValues] = useState(initialValues)
  const [saving, startTransition] = useTransition()
  const [uploading, setUploading] = useState(false)
  const pending = saving || uploading
  const [message, setMessage] = useState('')
  const [confirmPublish, setConfirmPublish] = useState(false)
  const dirty = doc.fields.some(field => values[field.key] !== initialValues[field.key])
  const differences = doc.fields.filter(field => values[field.key] !== publishedValues[field.key])
  const editableFields = statusOnly ? doc.fields.filter(field => field.kind === 'availability') : resourcesOnly ? doc.fields.filter(field => field.group === 'Brosur dan Lokasi') : doc.fields
  const otherChanges = differences.filter(field => !editableFields.includes(field)).length
  const groups = [...new Set(editableFields.map(field => field.group))].sort((a, b) => {
    const order = (value: string) => value === 'Ketersediaan unit' ? -1 : value === 'HERO' ? 0 : value === 'Harga' ? 1 : value === 'Kartu ringkasan' ? 2 : 3
    return order(a) - order(b)
  })

  useEffect(() => {
    if (!dirty && !uploading) return
    const preventExit = (event: BeforeUnloadEvent) => { event.preventDefault(); event.returnValue = '' }
    const preventNavigation = (event: MouseEvent) => {
      const link = (event.target as HTMLElement).closest?.('a[href]') as HTMLAnchorElement | null
      if (link && link.target !== '_blank' && !window.confirm('Ada perubahan belum tersimpan. Tinggalkan editor?')) {
        event.preventDefault(); event.stopPropagation()
      }
    }
    window.addEventListener('beforeunload', preventExit)
    window.document.addEventListener('click', preventNavigation, true)
    return () => { window.removeEventListener('beforeunload', preventExit); window.document.removeEventListener('click', preventNavigation, true) }
  }, [dirty, uploading])

  function save() {
    setMessage('')
    startTransition(async () => {
      try {
        const result = await saveContentDraft(doc.id, values, draftRevision)
        if (!result.success) { setMessage(result.error); return }
        router.refresh()
      } catch { setMessage('Draft belum dapat disimpan. Periksa koneksi dan coba lagi; isian tetap dipertahankan.') }
    })
  }
  function publish() {
    setMessage('')
    startTransition(async () => {
      try {
        const result = await publishContentDraft(doc.id, draftRevision)
        if (!result.success) { setMessage(result.error); setConfirmPublish(false); return }
        setConfirmPublish(false)
        router.refresh()
      } catch { setMessage('Publikasi belum dapat dipastikan. Muat ulang untuk memeriksa status.'); setConfirmPublish(false) }
    })
  }

  const previewPaths = [...new Set([doc.path, ...(doc.category === 'Komplek' ? ['/', '/proyek'] : doc.category === 'Fase TCI' ? ['/proyek/tci'] : ['/proyek/tci/tci-3']), ...(statusOnly ? ['/', '/proyek', '/proyek/tci'] : [])])]

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <Link href={resourcesOnly ? '/admin/brosur-lokasi' : statusOnly ? '/admin/content?tab=ketersediaan' : '/admin/content'} className="text-sm font-medium text-[#0B5EAA]">← {resourcesOnly ? 'Brosur dan Lokasi' : statusOnly ? 'Status Ketersediaan Unit' : 'Konten Website'}</Link>
      <header><h1 className="text-2xl font-bold">{resourcesOnly ? `Brosur dan Lokasi · ${doc.label}` : statusOnly ? `Status · ${doc.label}` : doc.label}</h1><p className="mt-2 text-sm text-gray-500">{resourcesOnly ? 'Unggah PDF dan atur link Google Maps. Simpan Draft, periksa Preview, lalu Publikasikan. Kosongkan brosur untuk menampilkan placeholder.' : statusOnly ? 'Pilih status, simpan draft, periksa preview, lalu publikasikan. Badge pada kartu dan halaman detail mengikuti status yang diterbitkan.' : 'Edit teks, harga, spesifikasi, status unit, brosur, dan lokasi. Identitas inquiry, rute, gambar, dan desain tetap. Harga unit dipakai bersama oleh kartu dan simulasi KPR.'}</p></header>
      {(statusOnly || resourcesOnly) && otherChanges > 0 && <div role="note" className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">Draft halaman ini juga berisi {otherChanges} perubahan di luar bagian ini. Publikasi menerbitkan seluruh draft, bukan hanya isian yang sedang ditampilkan. Periksa semua perubahan pada konfirmasi, atau <Link href={`/admin/content/${doc.id}`} className="font-semibold underline">buka editor lengkap</Link> terlebih dahulu.</div>}
      <div className="sticky top-0 z-20 space-y-3 rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="text-sm"><strong>{dirty ? 'Perubahan belum disimpan' : draftRevision > publishedRevision ? `Draft tersimpan · revisi ${draftRevision}` : publishedRevision ? `Sudah dipublikasikan · revisi ${publishedRevision}` : 'Konten bawaan website'}</strong><p className="mt-1 text-xs text-gray-500">{differences.length} field berbeda dari publik.{updatedAt ? ` Disimpan ${new Date(updatedAt).toLocaleString('id-ID', { timeZone: 'Asia/Jakarta' })} WIB.` : ''}</p></div>
          <div className="flex flex-wrap gap-2">
            <button type="submit" form="content-editor" disabled={pending || (!dirty && draftRevision > 0)} className={`${button} border border-gray-200 bg-white hover:bg-gray-50`}>{pending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}Simpan Draft</button>
            <button type="button" onClick={() => setConfirmPublish(true)} disabled={pending || dirty || draftRevision === 0 || draftRevision === publishedRevision} className={`${button} bg-[#0B5EAA] text-white hover:bg-[#094c89]`}><Send className="h-4 w-4" />Publikasikan</button>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-3 border-t border-gray-100 pt-3 text-xs">
          <span className="inline-flex items-center gap-1 font-semibold"><Eye className="h-4 w-4" />Preview draft:</span>
          {previewPaths.map((path, index) => dirty || !draftRevision || pending ? <span key={path} className="text-gray-400">{index === 0 ? 'Halaman detail' : path === '/' ? 'Kartu beranda' : 'Kartu ringkasan'}</span> : <a key={path} href={`${path}?preview=${doc.id}`} target="_blank" rel="noopener noreferrer" className="text-[#0B5EAA] underline">{index === 0 ? 'Halaman detail' : path === '/' ? 'Kartu beranda' : 'Kartu ringkasan'} ↗</a>)}
          {(dirty || !draftRevision) && <span className="text-amber-700">Simpan draft dahulu agar preview sesuai isian.</span>}
          <a href={doc.path} target="_blank" rel="noopener noreferrer" className="ml-auto text-gray-500 underline">Lihat versi publik ↗</a>
        </div>
        {message && <p role="alert" className="rounded-lg bg-red-50 p-3 text-sm text-red-700">{message}</p>}
      </div>

      <form id="content-editor" noValidate onSubmit={event => { event.preventDefault(); save() }} className="space-y-4">
        <fieldset disabled={pending} className="space-y-4">
          {groups.map((group, index) => <details key={group} open={index < 3} className="rounded-xl border border-gray-200 bg-white shadow-sm">
            <summary className="cursor-pointer px-5 py-4 font-semibold text-gray-800">{group}</summary>
            <div className="grid gap-5 border-t border-gray-100 p-5">
              {editableFields.filter(field => field.group === group).map(field => <div key={field.key} className="block space-y-2 text-sm">
                <label htmlFor={field.key} className="block font-medium text-gray-700">{field.label}</label>
                {field.kind === 'brochure' ? <BrochureField documentId={doc.id} value={values[field.key]} disabled={pending} onBusy={setUploading} onChange={value => setValues(prev => ({ ...prev, [field.key]: value }))} /> : field.kind === 'availability' ? <select id={field.key} value={values[field.key]} onChange={event => setValues(prev => ({ ...prev, [field.key]: event.target.value }))} className="w-full rounded-lg border border-gray-200 bg-white p-3 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500">{availabilityOptions.map(option => <option key={option.value} value={option.value}>{option.label}</option>)}</select> : field.kind === 'textarea' ? <textarea id={field.key} rows={4} maxLength={field.maxLength} value={values[field.key]} onChange={event => setValues(prev => ({ ...prev, [field.key]: event.target.value }))} className="w-full rounded-lg border border-gray-200 bg-white p-3 leading-relaxed focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500" /> : <input id={field.key} type="text" inputMode={field.kind === 'number' ? 'numeric' : 'text'} maxLength={field.maxLength} value={values[field.key]} onChange={event => setValues(prev => ({ ...prev, [field.key]: event.target.value }))} className="w-full rounded-lg border border-gray-200 bg-white p-3 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500" />}
                <span className="block text-xs text-gray-400">{field.kind === 'availability' ? 'Hijau: tersedia. Kuning: hampir habis. Merah: habis. Belum berubah di publik sampai dipublikasikan.' : field.kind === 'brochure' ? 'Brosur tidak berubah di publik sampai draft dipublikasikan.' : field.kind === 'map' ? 'Tempel link HTTPS Google Maps (Bagikan → Salin link). Kosongkan jika belum tersedia.' : field.kind === 'map-embed' ? 'Google Maps → Bagikan → Sematkan peta. Tempel hanya URL pada src, bukan seluruh kode iframe. Kosongkan untuk menyembunyikan peta.' : field.kind === 'number' ? 'Rupiah penuh tanpa titik/koma. Contoh: 500000000.' : `${values[field.key].length}/${field.maxLength} karakter. Teks biasa, bukan HTML.`}</span>
                {field.kind === 'availability' && <AvailabilityBadge status={availabilityFor({ [doc.id]: values }, doc.id)} />}
                {field.kind === 'map' && values[field.key] && isMapUrl(values[field.key]) && <a href={values[field.key]} target="_blank" rel="noopener noreferrer" className="inline-block text-sm text-blue-700 underline">Periksa lokasi ↗</a>}
              </div>)}
            </div>
          </details>)}
        </fieldset>
      </form>

      <Dialog open={confirmPublish} onOpenChange={value => { if (!pending) setConfirmPublish(value) }}>
        <DialogContent className="max-h-[85vh] overflow-y-auto">
          <DialogHeader><DialogTitle>Publikasikan {doc.label}?</DialogTitle><DialogDescription>Draft revisi {draftRevision} akan menggantikan konten dan status yang dilihat pengunjung, termasuk kartu dan halaman terkait. Periksa preview sebelum melanjutkan.</DialogDescription></DialogHeader>
          <div className="max-h-64 space-y-3 overflow-y-auto text-sm">{differences.length === 0 ? <p>Tidak ada perbedaan teks dari versi publik.</p> : differences.map(field => <div key={field.key} className="rounded-lg border border-gray-200 p-3"><p className="font-semibold">{field.label}</p><p className="mt-1 break-words text-gray-500">Sebelum: {field.kind === 'availability' ? availabilityLabel(publishedValues[field.key]) : publishedValues[field.key]}</p><p className="mt-1 break-words text-[#0B5EAA]">Sesudah: {field.kind === 'availability' ? availabilityLabel(values[field.key]) : values[field.key]}</p></div>)}</div>
          <DialogFooter><button disabled={pending} onClick={() => setConfirmPublish(false)} className={`${button} border border-gray-200`}>Batal</button><button disabled={pending} onClick={publish} className={`${button} bg-[#0B5EAA] text-white`}>{pending && <Loader2 className="h-4 w-4 animate-spin" />}Ya, publikasikan</button></DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
