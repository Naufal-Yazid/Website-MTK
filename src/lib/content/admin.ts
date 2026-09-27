import 'server-only'
import { redirect } from 'next/navigation'
import { requireContentAdmin } from './server'

export async function getContentAdminData() {
  let client: Awaited<ReturnType<typeof requireContentAdmin>>
  try { client = await requireContentAdmin() } catch { redirect('/admin/login') }
  try {
    const [drafts, published] = await Promise.all([
      client.from('site_content_drafts').select('*'),
      client.from('site_content_published').select('*'),
    ])
    if (drafts.error || published.error) {
      const missing = [drafts.error?.code, published.error?.code].some(code => code === '42P01' || code === 'PGRST205')
      return { drafts: [], published: [], error: missing
        ? 'Editor belum diaktifkan. Jalankan migrasi 004_site_content.sql di Supabase terlebih dahulu. Konten publik tetap memakai versi bawaan.'
        : 'Data konten belum dapat dimuat. Periksa koneksi dan izin database lalu muat ulang; penyimpanan dinonaktifkan sementara.' }
    }
    return { drafts: drafts.data || [], published: published.data || [], error: null }
  } catch {
    return { drafts: [], published: [], error: 'Tidak dapat terhubung ke database konten. Muat ulang sebelum melakukan perubahan.' }
  }
}
