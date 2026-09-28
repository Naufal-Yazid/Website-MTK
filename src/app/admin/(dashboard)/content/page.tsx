import Link from 'next/link'
import { FilePenLine, BookOpen } from 'lucide-react'
import { contentDocuments } from '@/lib/content/catalog'
import { getContentAdminData } from '@/lib/content/admin'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import AvailabilityPanel from '@/components/admin/content/AvailabilityPanel'
import AdminCardAction from '@/components/admin/content/AdminCardAction'

export const metadata = { title: 'Konten Website | MTK Admin' }

export default async function ContentPage({ searchParams }: { searchParams?: Promise<{ tab?: string }> } = {}) {
  const initialTab = (await searchParams)?.tab === 'ketersediaan' ? 'ketersediaan' : 'konten'
  const { drafts, published, error } = await getContentAdminData()
  return (
    <div className="space-y-8">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0">
          <h1 className="text-2xl font-bold text-gray-900">Konten Website</h1>
          <p className="mt-2 text-sm text-gray-500">Pilih halaman yang ingin diperbarui.</p>
        </div>
        <Link href="/admin/content/petunjuk" className="inline-flex min-h-11 shrink-0 items-center justify-center gap-2 self-start rounded-lg border border-blue-200 bg-white px-4 py-2.5 text-sm font-semibold text-[#0B5EAA] shadow-sm transition hover:bg-blue-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0B5EAA] focus-visible:ring-offset-2 sm:self-auto">
          <BookOpen className="h-4 w-4" aria-hidden="true" />
          Lihat petunjuk
        </Link>
      </header>
      <Tabs key={initialTab} defaultValue={initialTab} className="space-y-6">
        <TabsList aria-label="Submenu Konten Website" className="flex h-auto w-full flex-wrap justify-start gap-2 rounded-none border-0 border-b border-gray-200 bg-transparent p-0 pb-4">
          <TabsTrigger value="konten" className="min-h-11 rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold text-[#0B5EAA] data-[state=active]:border-[#0B5EAA] data-[state=active]:bg-[#0B5EAA] data-[state=active]:text-white">Edit konten</TabsTrigger>
          <TabsTrigger value="ketersediaan" className="min-h-11 whitespace-normal rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold text-[#0B5EAA] data-[state=active]:border-[#0B5EAA] data-[state=active]:bg-[#0B5EAA] data-[state=active]:text-white">Status Ketersediaan</TabsTrigger>
        </TabsList>
        <TabsContent value="konten" className="space-y-8">
      {error && <div role="alert" className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">{error}</div>}
      {['Komplek', 'Fase TCI', 'Tipe unit'].map(category => (
        <section key={category} className="space-y-3">
          <h2 className="text-lg font-semibold">{category}</h2>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {contentDocuments.filter(doc => doc.category === category).map(doc => {
              const draft = drafts.find(row => row.document_key === doc.id)
              const live = published.find(row => row.document_key === doc.id)
              const pending = draft && draft.revision !== live?.revision
              return (
                <article key={doc.id} className="flex flex-col rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
                  <div className="flex items-start justify-between gap-3"><FilePenLine className="h-6 w-6 text-[#0B5EAA]" /><span className={`rounded-full px-2.5 py-1 text-xs font-medium ${pending ? 'bg-amber-50 text-amber-800' : 'bg-slate-100 text-slate-600'}`}>{error ? 'Belum terhubung' : pending ? 'Ada draft' : live ? `Terbit · r${live.revision}` : 'Konten bawaan'}</span></div>
                  <h3 className="mt-4 font-semibold text-gray-900">{doc.label}</h3>
                  <p className="mt-1 break-all text-xs text-gray-500">{doc.path}</p>
                  <div className="mt-auto pt-5">
                    <AdminCardAction href={`/admin/content/${doc.id}`} label={error ? 'Editor belum tersedia' : 'Edit konten'} context={doc.label} disabled={Boolean(error)} />
                  </div>
                </article>
              )
            })}
          </div>
        </section>
      ))}
        </TabsContent>
        <TabsContent value="ketersediaan">
          <AvailabilityPanel drafts={drafts} published={published} error={error} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
