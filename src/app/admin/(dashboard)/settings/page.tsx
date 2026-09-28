import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import ContactSettings from '@/components/admin/settings/ContactSettings'
import AccountSettings from '@/components/admin/settings/AccountSettings'
import IntegrationSettings from '@/components/admin/settings/IntegrationSettings'
import { createClient } from '@/lib/supabase/server'

export const metadata = { title: 'Pengaturan | MTK Admin' }

export default async function SettingsPage() {
  const supabase = await createClient()
  const [{ data: settings }, { data: admins }] = await Promise.all([
    supabase.from('site_settings').select('*').limit(1).maybeSingle(),
    supabase.from('admins').select('*').order('created_at', { ascending: true }),
  ])

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">Pengaturan</h1>
        <p className="text-gray-500">Kelola profil admin, informasi kontak, integrasi, dan versi website.</p>
      </div>

      <Tabs defaultValue="contact" className="space-y-5">
        <TabsList className="grid h-auto w-full grid-cols-2 justify-start rounded-none border-0 border-b border-gray-200 bg-transparent p-0 sm:flex sm:flex-wrap">
          <TabsTrigger
            value="contact"
            className="relative h-12 rounded-none border-0 border-b-[3px] border-transparent bg-transparent px-4 text-sm font-medium text-gray-500 shadow-none hover:text-gray-900 data-[state=active]:border-[#1E3A5F] data-[state=active]:bg-transparent data-[state=active]:font-semibold data-[state=active]:text-[#1E3A5F] data-[state=active]:shadow-none sm:w-52 sm:px-6"
          >
            Kontak
          </TabsTrigger>
          <TabsTrigger
            value="account"
            className="relative h-12 rounded-none border-0 border-b-[3px] border-transparent bg-transparent px-4 text-sm font-medium text-gray-500 shadow-none hover:text-gray-900 data-[state=active]:border-[#1E3A5F] data-[state=active]:bg-transparent data-[state=active]:font-semibold data-[state=active]:text-[#1E3A5F] data-[state=active]:shadow-none sm:w-52 sm:px-6"
          >
            Akun
          </TabsTrigger>
          <TabsTrigger
            value="integration"
            className="relative h-12 rounded-none border-0 border-b-[3px] border-transparent bg-transparent px-4 text-sm font-medium text-gray-500 shadow-none hover:text-gray-900 data-[state=active]:border-[#1E3A5F] data-[state=active]:bg-transparent data-[state=active]:font-semibold data-[state=active]:text-[#1E3A5F] data-[state=active]:shadow-none sm:w-52 sm:px-6"
          >
            Integrasi
          </TabsTrigger>
          <TabsTrigger value="website" className="relative h-12 rounded-none border-0 border-b-[3px] border-transparent bg-transparent px-4 text-sm font-medium text-gray-500 shadow-none hover:text-gray-900 data-[state=active]:border-[#1E3A5F] data-[state=active]:bg-transparent data-[state=active]:font-semibold data-[state=active]:text-[#1E3A5F] data-[state=active]:shadow-none sm:w-52 sm:px-6">Website</TabsTrigger>
        </TabsList>
        <TabsContent value="contact"><ContactSettings settings={settings} /></TabsContent>
        <TabsContent value="account"><AccountSettings admins={admins || []} /></TabsContent>
        <TabsContent value="integration"><IntegrationSettings settings={settings} /></TabsContent>
        <TabsContent value="website">
          <section className="w-full space-y-5 rounded-xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
            <header><h2 className="text-lg font-semibold text-gray-900">Versi Website</h2><p className="mt-1 text-sm text-gray-500">Informasi versi kode yang digunakan website ini. Hanya untuk dilihat, tidak dapat diubah dari admin.</p></header>
            <dl className="grid gap-4 sm:grid-cols-2">
              <div className="min-w-0 rounded-lg bg-gray-50 p-4"><dt className="text-xs font-medium text-gray-500">Versi / nama branch</dt><dd className="mt-2 break-all font-mono text-lg font-semibold text-[#0B5EAA]">{process.env.MTK_BUILD_BRANCH || 'Tidak tersedia'}</dd></div>
              <div className="min-w-0 rounded-lg bg-gray-50 p-4"><dt className="text-xs font-medium text-gray-500">Revisi kode (commit)</dt><dd className="mt-2 break-all font-mono text-lg font-semibold text-gray-900">{process.env.MTK_BUILD_COMMIT || 'Tidak tersedia'}</dd></div>
            </dl>
            <p className="text-sm leading-relaxed text-gray-500">Nama branch dibaca ketika server development dimulai atau website di-build. Setelah pindah branch, restart server lokal atau build dan deploy ulang. Perubahan draft/konten admin tidak mengubah versi kode ini.</p>
            <p className="text-xs leading-relaxed text-gray-500">Jika muncul “Tidak tersedia”, lingkungan build tidak menyediakan informasi Git. Developer dapat mengatur APP_GIT_BRANCH dan APP_GIT_COMMIT sebelum build.</p>
          </section>
        </TabsContent>
      </Tabs>
    </div>
  )
}
