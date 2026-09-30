import { FilePenLine, Layers3, ImageIcon } from 'lucide-react'
import { getImageAdminData } from '@/lib/media/server'
import ImageLibrary from '@/components/admin/content/ImageLibrary'
import { getContentAdminData } from '@/lib/content/admin'
import { buildAdminCatalog } from '@/lib/content/admin-catalog'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import AvailabilityPanel from '@/components/admin/content/AvailabilityPanel'
import ManagementHeader from '@/components/admin/content/ManagementHeader'
import ManagementCatalog from '@/components/admin/content/ManagementCatalog'

export const metadata = { title: 'Konten Website | MTK Admin' }
const tabClass = 'min-h-12 gap-2 whitespace-normal rounded-none border-0 border-b-[3px] border-transparent bg-transparent px-3 text-sm font-medium text-gray-500 shadow-none hover:text-gray-900 data-[state=active]:border-[#1E3A5F] data-[state=active]:bg-transparent data-[state=active]:font-semibold data-[state=active]:text-[#1E3A5F] data-[state=active]:shadow-none sm:px-6'

export default async function ContentPage({ searchParams }: { searchParams: Promise<{ tab?: string }> }) {
  const tab = (await searchParams).tab
  const initialTab = tab === 'gambar' ? 'gambar' : tab === 'ketersediaan' ? 'ketersediaan' : 'konten'
  const { drafts, published, error } = await getContentAdminData()
  const imageData = await getImageAdminData()
  return <div className="space-y-6">
    <ManagementHeader title="Konten Website" description="Pilih halaman yang ingin diperbarui." guide="/admin/content/petunjuk" />
    <Tabs key={initialTab} defaultValue={initialTab} className="space-y-6">
      <TabsList aria-label="Submenu Konten Website" className="grid h-auto w-full grid-cols-1 justify-start rounded-none border-0 border-b border-gray-200 bg-transparent p-0 sm:flex sm:flex-wrap">
        <TabsTrigger value="konten" className={tabClass}><FilePenLine className="h-4 w-4 shrink-0" aria-hidden="true" />Edit konten</TabsTrigger>
        <TabsTrigger value="ketersediaan" className={tabClass}><Layers3 className="h-4 w-4 shrink-0" aria-hidden="true" />Status Ketersediaan</TabsTrigger>
        <TabsTrigger value="gambar" className={tabClass}><ImageIcon className="h-4 w-4 shrink-0" aria-hidden="true" />Kelola Gambar</TabsTrigger>
      </TabsList>
      <TabsContent value="konten"><ManagementCatalog items={buildAdminCatalog(drafts, published, 'content')} mode="content" error={error} /></TabsContent>
      <TabsContent value="ketersediaan"><AvailabilityPanel drafts={drafts} published={published} error={error} /></TabsContent>
      <TabsContent value="gambar"><ImageLibrary {...imageData} /></TabsContent>
    </Tabs>
  </div>
}
