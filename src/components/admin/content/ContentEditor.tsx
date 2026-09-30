'use client'

import { useEffect, useState, useTransition } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Save, Eye, Send, Loader2, ArrowLeft, ChevronDown, BookOpen } from 'lucide-react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog'
import { saveContentDraft, publishContentDraft } from '@/app/admin/(dashboard)/content/actions'
import type { ContentDocument } from '@/lib/content/model'
import type { ContentValues } from '@/lib/content/values'
import { availabilityFor, availabilityLabel, availabilityOptions } from '@/lib/content/availability'
import BrochureField from '@/components/admin/content/BrochureField'
import { isMapUrl } from '@/lib/content/resources'
import AvailabilityBadge from '@/components/content/AvailabilityBadge'

type Props = { document: ContentDocument; initialValues: ContentValues; publishedValues: ContentValues; draftRevision: number; publishedRevision: number; updatedAt: string | null; statusOnly?: boolean; resourcesOnly?: boolean }
const button = 'inline-flex min-h-11 items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0B5EAA] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50'

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
  const fieldGroups = resourcesOnly
    ? [
        { label: 'Brosur', fields: editableFields.filter(field => field.kind === 'brochure') },
        { label: 'Lokasi', fields: editableFields.filter(field => field.kind !== 'brochure') },
      ].filter(group => group.fields.length > 0)
    : groups.map(group => ({ label: group, fields: editableFields.filter(field => field.group === group) }))

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
    <div className="mx-auto w-full space-y-6">
      <Link href={resourcesOnly ? '/admin/brosur-lokasi' : statusOnly ? '/admin/content?tab=ketersediaan' : '/admin/content'} className="inline-flex min-h-11 items-center gap-2 rounded-lg text-sm font-medium text-[#0B5EAA] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0B5EAA]"><ArrowLeft className="h-4 w-4" aria-hidden="true" />{resourcesOnly ? 'Brosur dan Lokasi' : statusOnly ? 'Status Ketersediaan Unit' : 'Konten Website'}</Link>
      <header className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0"><p className="mb-2 text-xs font-semibold uppercase tracking-wider text-[#0B5EAA]">{resourcesOnly ? 'Brosur dan Lokasi' : statusOnly ? 'Status Ketersediaan' : 'Edit konten'} / {doc.category}</p><h1 className="text-2xl font-bold tracking-tight text-gray-900">{doc.label}</h1><p className="mt-2 max-w-2xl text-sm leading-relaxed text-gray-500">{resourcesOnly ? 'Unggah PDF dan atur Google Maps. Brosur yang kosong tetap tampil sebagai placeholder.' : statusOnly ? 'Atur penanda ketersediaan pada kartu dan halaman detail unit.' : 'Perbarui informasi halaman tanpa mengubah foto, rute, atau desain website.'}</p></div>
        <Link href={resourcesOnly ? '/admin/brosur-lokasi/petunjuk' : '/admin/content/petunjuk'} className={`${button} shrink-0 self-start border border-blue-200 bg-white text-[#0B5EAA] hover:bg-blue-50`}><BookOpen className="h-4 w-4" aria-hidden="true" />Lihat petunjuk</Link>
      </header>
      {(statusOnly || resourcesOnly) && otherChanges > 0 && <div role="note" className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">Draft halaman ini juga berisi {otherChanges} perubahan di luar bagian ini. Publikasi menerbitkan seluruh draft, bukan hanya isian yang sedang ditampilkan. Periksa semua perubahan pada konfirmasi, atau <Link href={`/admin/content/${doc.id}`} className="font-semibold underline">buka editor lengkap</Link> terlebih dahulu.</div>}

      <div className={resourcesOnly ? 'grid gap-6 lg:grid-cols-[minmax(0,1fr)_340px] lg:items-start xl:grid-cols-[minmax(0,1fr)_380px]' : 'contents'}>
      <ol aria-label="Alur pengelolaan" className={resourcesOnly ? 'grid gap-4 rounded-xl border border-gray-200 bg-white p-5 shadow-sm lg:col-start-2 lg:row-start-2' : 'grid gap-3 rounded-xl border border-gray-200 bg-white p-4 sm:grid-cols-3 sm:p-5'}>
        {[['Simpan Draft', 'Simpan perubahan tanpa mengubah website.'], ['Preview', 'Periksa tampilan sebelum ditayangkan.'], ['Publikasikan', 'Tampilkan draft kepada pengunjung.']].map(([title, detail], index) => <li key={title} className="flex gap-3"><span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-50 text-xs font-bold text-[#0B5EAA]">{index + 1}</span><div><p className="text-sm font-semibold text-gray-900">{title}</p><p className="mt-1 text-xs leading-relaxed text-gray-500">{detail}</p></div></li>)}
      </ol>
      <div className={resourcesOnly ? 'z-20 space-y-4 rounded-xl border border-gray-200 bg-white p-5 shadow-sm lg:col-start-2 lg:row-start-1' : 'z-20 space-y-3 rounded-xl border border-gray-200 bg-white p-4 shadow-sm sm:p-5 lg:sticky lg:top-0'}>
        <div className={resourcesOnly ? 'flex flex-col gap-4' : 'flex flex-wrap items-center justify-between gap-4'}>
          <div className="min-w-0 text-sm">{resourcesOnly && <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-gray-400">Status konten</p>}<strong className={dirty ? 'text-amber-800' : 'text-gray-900'}>{dirty ? 'Perubahan belum disimpan' : draftRevision > publishedRevision ? `Draft tersimpan · revisi ${draftRevision}` : publishedRevision ? `Sudah dipublikasikan · revisi ${publishedRevision}` : 'Konten bawaan website'}</strong><p className="mt-1 text-xs leading-relaxed text-gray-500">{differences.length} isian berbeda dari versi publik.{updatedAt ? ` Disimpan ${new Date(updatedAt).toLocaleString('id-ID', { timeZone: 'Asia/Jakarta' })} WIB.` : ''}</p></div>
          <div className={resourcesOnly ? 'grid w-full grid-cols-1 gap-2' : 'grid w-full grid-cols-1 gap-2 sm:flex sm:w-auto sm:flex-wrap'}>
            <button type="submit" form="content-editor" disabled={pending || (!dirty && draftRevision > 0)} className={`${button} border border-gray-200 bg-white hover:bg-gray-50`}>{pending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}Simpan Draft</button>
            <button type="button" onClick={() => setConfirmPublish(true)} disabled={pending || dirty || draftRevision === 0 || draftRevision === publishedRevision} className={`${button} bg-[#0B5EAA] text-white hover:bg-[#094c89]`}><Send className="h-4 w-4" />Publikasikan</button>
          </div>
        </div>
        <div className={resourcesOnly ? 'flex flex-col items-start gap-2 border-t border-gray-100 pt-4 text-xs' : 'flex flex-wrap items-center gap-3 border-t border-gray-100 pt-3 text-xs'}>
          <span className="inline-flex items-center gap-1 font-semibold"><Eye className="h-4 w-4" />Preview draft:</span>
          {previewPaths.map((path, index) => dirty || !draftRevision || pending ? <span key={path} className="text-gray-400">{index === 0 ? 'Halaman detail' : path === '/' ? 'Kartu beranda' : 'Kartu ringkasan'}</span> : <a key={path} href={`${path}?preview=${doc.id}`} target="_blank" rel="noopener noreferrer" className="text-[#0B5EAA] underline">{index === 0 ? 'Halaman detail' : path === '/' ? 'Kartu beranda' : 'Kartu ringkasan'} ↗</a>)}
          {(dirty || !draftRevision) && <span className="text-amber-700">Simpan draft dahulu agar preview sesuai isian.</span>}
          <a href={doc.path} target="_blank" rel="noopener noreferrer" className={resourcesOnly ? 'mt-1 text-gray-500 underline' : 'ml-auto text-gray-500 underline'}>Lihat versi publik ↗</a>
        </div>
        {message && <p role="alert" className="rounded-lg bg-red-50 p-3 text-sm text-red-700">{message}</p>}
      </div>

      <form id="content-editor" noValidate onSubmit={event => { event.preventDefault(); save() }} className={resourcesOnly ? 'space-y-4 lg:col-start-1 lg:row-span-2 lg:row-start-1' : 'space-y-4'}>
        <div className="flex flex-wrap items-center justify-between gap-2"><h2 className="text-base font-semibold text-gray-900">{resourcesOnly ? 'File & tautan proyek' : statusOnly ? 'Ketersediaan unit' : 'Isi halaman'}</h2><p className="text-xs text-gray-500">{fieldGroups.length} bagian · {editableFields.length} isian</p></div>
        <fieldset disabled={pending} className="space-y-4">
          {fieldGroups.map((group, index) => <details key={group.label} open={index < 3} className="group rounded-xl border border-gray-200 bg-white shadow-sm">
            <summary className="flex min-h-16 cursor-pointer list-none items-center gap-3 rounded-xl px-4 py-4 font-semibold text-gray-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0B5EAA] sm:px-5 [&::-webkit-details-marker]:hidden"><span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-xs text-gray-500">{String(index + 1).padStart(2, '0')}</span><span className="min-w-0 flex-1 text-sm">{group.label}</span><ChevronDown className="h-4 w-4 shrink-0 text-gray-400 transition-transform group-open:rotate-180" aria-hidden="true" /></summary>
            <div className="grid gap-6 border-t border-gray-100 p-4 sm:p-6">
              {group.fields.map(field => <div key={field.key} className="block space-y-2 text-sm">
                <label htmlFor={field.key} className="block font-medium text-gray-700">{field.label}</label>
                {field.kind === 'brochure' ? <BrochureField documentId={doc.id} value={values[field.key]} disabled={pending} onBusy={setUploading} onChange={value => setValues(prev => ({ ...prev, [field.key]: value }))} /> : field.kind === 'availability' ? <select id={field.key} value={values[field.key]} onChange={event => setValues(prev => ({ ...prev, [field.key]: event.target.value }))} className="h-12 w-full rounded-lg border border-gray-200 bg-white px-4 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500">{availabilityOptions.map(option => <option key={option.value} value={option.value}>{option.label}</option>)}</select> : field.kind === 'textarea' ? <textarea id={field.key} rows={4} maxLength={field.maxLength} value={values[field.key]} onChange={event => setValues(prev => ({ ...prev, [field.key]: event.target.value }))} className="w-full rounded-lg border border-gray-200 bg-white p-3 leading-relaxed focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500" /> : <input id={field.key} type="text" inputMode={field.kind === 'number' ? 'numeric' : 'text'} maxLength={field.maxLength} value={values[field.key]} onChange={event => setValues(prev => ({ ...prev, [field.key]: event.target.value }))} className="min-h-12 w-full rounded-lg border border-gray-200 bg-white px-4 py-3 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500" />}
                <span className="block text-xs leading-relaxed text-gray-500">{field.kind === 'availability' ? 'Hijau: tersedia. Kuning: hampir habis. Merah: habis. Belum berubah di publik sampai dipublikasikan.' : field.kind === 'brochure' ? 'Brosur tidak berubah di publik sampai draft dipublikasikan.' : field.kind === 'map' ? 'Tempel link HTTPS Google Maps (Bagikan → Salin link). Kosongkan jika belum tersedia.' : field.kind === 'map-embed' ? 'Google Maps → Bagikan → Sematkan peta. Tempel hanya URL pada src, bukan seluruh kode iframe. Kosongkan untuk menyembunyikan peta.' : field.kind === 'number' ? 'Rupiah penuh tanpa titik/koma. Contoh: 500000000.' : `${values[field.key].length}/${field.maxLength} karakter. Teks biasa, bukan HTML.`}</span>
                {field.kind === 'availability' && <AvailabilityBadge status={availabilityFor({ [doc.id]: values }, doc.id)} />}
                {field.kind === 'map' && values[field.key] && isMapUrl(values[field.key]) && <a href={values[field.key]} target="_blank" rel="noopener noreferrer" className="inline-block text-sm text-blue-700 underline">Periksa lokasi ↗</a>}
              </div>)}
            </div>
          </details>)}
        </fieldset>
      </form>
      </div>

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
