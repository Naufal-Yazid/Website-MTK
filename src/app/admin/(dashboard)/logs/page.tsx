import Link from 'next/link'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { normalizeLogFilters } from '@/lib/logs/filters'
import type { Database } from '@/lib/types/database'

export const metadata = { title: 'Logs | MTK Admin' }
export const dynamic = 'force-dynamic'

type LogRow = Database['public']['Tables']['admin_logs']['Row']
const pageSize = 25
const fieldClass = 'w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900'
const dateFormat = new Intl.DateTimeFormat('id-ID', { dateStyle: 'medium', timeStyle: 'short', timeZone: 'Asia/Jakarta' })

export default async function LogsPage({ searchParams }: {
  searchParams: Promise<Record<string, string | string[] | undefined>>
}) {
  const filters = normalizeLogFilters(await searchParams)
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/admin/login')
  const { data: admin } = await supabase.from('admins').select('is_active').eq('id', user.id).single()
  if (!admin?.is_active) redirect('/admin/login')

  let rows: LogRow[] = []
  let count = 0
  let loadError = ''
  if (!filters.invalidRange) {
    try {
      let query = supabase.from('admin_logs').select('*', { count: 'exact' })
        .eq('kind', filters.kind)
        .order('created_at', { ascending: false }).order('id', { ascending: false })
      if (filters.q) query = query.or(`actor_name.ilike.%${filters.q}%,summary.ilike.%${filters.q}%,action.ilike.%${filters.q}%`)
      if (filters.from) query = query.gte('created_at', `${filters.from}T00:00:00+07:00`)
      if (filters.to) query = query.lte('created_at', `${filters.to}T23:59:59.999999+07:00`)
      const result = await query.range((filters.page - 1) * pageSize, filters.page * pageSize - 1)
      if (result.error) {
        loadError = ['PGRST205', '42P01'].includes(result.error.code)
          ? 'Penyimpanan log belum diaktifkan. Jalankan migrasi 003_admin_logs.sql di Supabase, kemudian muat ulang halaman ini.'
          : 'Log belum dapat dimuat. Periksa koneksi dan izin database, lalu coba lagi.'
      } else {
        rows = result.data || []
        count = result.count || 0
      }
    } catch {
      loadError = 'Log belum dapat dimuat. Silakan coba lagi.'
    }
  }

  const pages = Math.max(1, Math.ceil(count / pageSize))
  function href(kind = filters.kind, page = 1) {
    const params = new URLSearchParams({ kind, page: String(page) })
    if (filters.q) params.set('q', filters.q)
    if (filters.from) params.set('from', filters.from)
    if (filters.to) params.set('to', filters.to)
    return `/admin/logs?${params}`
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">Logs</h1>
          <p className="mt-1 text-sm text-gray-500">Riwayat aktivitas admin dan error server. Waktu ditampilkan dalam WIB.</p>
        </div>
        <form action="/admin/logs" method="get">
          {Object.entries({ kind: filters.kind, q: filters.q, from: filters.from, to: filters.to, page: String(filters.page) }).map(([name, value]) => (
            <input key={name} type="hidden" name={name} value={value} />
          ))}
          <button className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium hover:bg-gray-50">Muat ulang</button>
        </form>
      </div>

      <nav className="flex gap-2 border-b border-gray-200" aria-label="Kategori log">
        {([{ kind: 'audit', label: 'Riwayat Admin' }, { kind: 'error', label: 'Error Logs' }] as const).map((tab) => (
          <Link key={tab.kind} href={href(tab.kind)} aria-current={filters.kind === tab.kind ? 'page' : undefined}
            className={`border-b-2 px-4 py-3 text-sm font-semibold ${filters.kind === tab.kind ? 'border-[#0B5EAA] text-[#0B5EAA]' : 'border-transparent text-gray-500 hover:text-gray-900'}`}>
            {tab.label}
          </Link>
        ))}
      </nav>

      <form action="/admin/logs" method="get" className="grid gap-4 rounded-xl border border-gray-200 bg-white p-4 sm:grid-cols-2 lg:grid-cols-4">
        <input type="hidden" name="kind" value={filters.kind} />
        <label className="space-y-1 text-sm font-medium">Cari admin atau aktivitas
          <input name="q" defaultValue={filters.q} maxLength={80} placeholder="Nama admin atau aksi…" className={fieldClass} />
        </label>
        <label className="space-y-1 text-sm font-medium">Dari tanggal
          <input name="from" type="date" defaultValue={filters.from} className={fieldClass} />
        </label>
        <label className="space-y-1 text-sm font-medium">Sampai tanggal
          <input name="to" type="date" defaultValue={filters.to} className={fieldClass} />
        </label>
        <div className="flex items-end gap-3">
          <button className="rounded-lg bg-[#1E3A5F] px-4 py-2 text-sm font-semibold text-white hover:bg-[#294f7d]">Terapkan</button>
          <Link href={`/admin/logs?kind=${filters.kind}`} className="px-2 py-2 text-sm text-gray-600 underline">Reset</Link>
        </div>
      </form>

      {filters.invalidRange || loadError ? (
        <div role="alert" className="rounded-xl border border-amber-200 bg-amber-50 p-5 text-sm text-amber-900">
          {filters.invalidRange ? 'Tanggal awal tidak boleh melebihi tanggal akhir.' : loadError}
        </div>
      ) : (
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[760px] text-left text-sm">
              <caption className="sr-only">{filters.kind === 'audit' ? 'Riwayat aktivitas admin' : 'Daftar error aplikasi admin'}</caption>
              <thead className="bg-gray-50 text-xs uppercase text-gray-500">
                <tr>{['Waktu (WIB)', 'Pelaku', 'Aktivitas', 'Detail'].map((label) => <th scope="col" key={label} className="px-5 py-3 font-semibold">{label}</th>)}</tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {rows.map((log) => (
                  <tr key={log.id} className="align-top hover:bg-gray-50/50">
                    <td className="whitespace-nowrap px-5 py-4 text-gray-500">{dateFormat.format(new Date(log.created_at))}</td>
                    <td className="px-5 py-4"><p className="font-medium text-gray-900">{log.actor_name}</p><p className="mt-1 text-xs text-gray-500">{log.source === 'server' ? 'Server' : 'Admin'}</p></td>
                    <td className="px-5 py-4"><p className={log.kind === 'error' ? 'text-red-700' : 'text-gray-900'}>{log.summary}</p><p className="mt-1 text-xs text-gray-500">{log.action}</p></td>
                    <td className="px-5 py-4">
                      <details>
                        <summary className="cursor-pointer font-medium text-[#0B5EAA]">Lihat detail</summary>
                        <div className="mt-3 max-w-sm space-y-2 text-xs text-gray-600">
                          <p className="break-all">ID log: {log.id}</p>
                          {log.actor_id && <p className="break-all">ID admin: {log.actor_id}</p>}
                          {log.target_id && <p className="break-all">ID target: {log.target_id}</p>}
                          <pre className="whitespace-pre-wrap break-all rounded-lg bg-gray-50 p-3">{JSON.stringify(log.details, null, 2)}</pre>
                        </div>
                      </details>
                    </td>
                  </tr>
                ))}
                {rows.length === 0 && <tr><td colSpan={4} className="px-5 py-12 text-center text-gray-500">{count > 0 ? 'Halaman ini tidak berisi log. Kembali ke halaman sebelumnya.' : 'Belum ada log yang sesuai. Pencatatan dimulai setelah fitur diaktifkan.'}</td></tr>}
              </tbody>
            </table>
          </div>
          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-gray-100 px-5 py-4 text-sm">
            <p className="text-gray-500">{count} log · Halaman {filters.page} dari {pages}</p>
            <div className="flex gap-4">
              {filters.page > 1 && <Link href={href(filters.kind, Math.min(filters.page - 1, pages))} className="font-medium text-[#0B5EAA]">Sebelumnya</Link>}
              {filters.page < pages && <Link href={href(filters.kind, filters.page + 1)} className="font-medium text-[#0B5EAA]">Berikutnya</Link>}
            </div>
          </div>
        </div>
      )}
      <p className="text-xs leading-relaxed text-gray-500">Riwayat mencatat hasil aksi admin sejak fitur diaktifkan. Error Logs mencatat aksi yang gagal dan error server pada rute admin; bukan seluruh pesan console browser. Password, token, dan isi formulir tidak disimpan.</p>
    </div>
  )
}
