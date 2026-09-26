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
        <p className="text-gray-500">Kelola profil admin, informasi kontak, dan integrasi website.</p>
      </div>

      <Tabs defaultValue="contact" className="space-y-5">
        <TabsList className="grid h-auto w-full grid-cols-3 justify-start rounded-none border-0 border-b border-gray-200 bg-transparent p-0 sm:flex">
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
        </TabsList>
        <TabsContent value="contact"><ContactSettings settings={settings} /></TabsContent>
        <TabsContent value="account"><AccountSettings admins={admins || []} /></TabsContent>
        <TabsContent value="integration"><IntegrationSettings settings={settings} /></TabsContent>
      </Tabs>
    </div>
  )
}
