import 'server-only'
import { cache } from 'react'
import { createClient } from '@supabase/supabase-js'
import { redirect } from 'next/navigation'
import { requireContentAdmin } from '@/lib/content/server'
import type { Database } from '@/lib/types/database'
import { imageSlots } from './catalog'
import { imageUrl, type ImageMap } from './model'

export const getPublishedImages = cache(async (): Promise<ImageMap> => {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  if (!url || !key) return {}
  try {
    // Anonymous client: a normal public request can never load an image draft.
    const client = createClient<Database>(url, key, {
      auth: { persistSession: false, autoRefreshToken: false },
      global: { fetch: (input, init) => fetch(input, { ...init, cache: 'no-store', signal: AbortSignal.timeout(4000) }) },
    })
    const { data, error } = await client.from('site_image_published').select('image_key, path')
    if (error) return {}
    const images: ImageMap = {}
    for (const slot of imageSlots) {
      const src = imageUrl(data?.find(row => row.image_key === slot.id)?.path, slot.id)
      if (src) images[slot.src] = src
    }
    return images
  } catch { return {} }
})

export async function getImageAdminData() {
  let client: Awaited<ReturnType<typeof requireContentAdmin>>
  try { client = await requireContentAdmin() } catch { redirect('/admin/login') }
  try {
    const [drafts, published] = await Promise.all([
      client.from('site_image_drafts').select('image_key, path, revision, width, height, bytes'),
      client.from('site_image_published').select('image_key, path, revision, width, height, bytes'),
    ])
    if (drafts.error || published.error) return { drafts: [], published: [], error: 'Kelola gambar belum dapat dimuat. Pastikan migrasi 006_website_images.sql sudah dijalankan di Supabase, lalu periksa koneksi dan muat ulang.' }
    return { drafts: drafts.data || [], published: published.data || [], error: null }
  } catch { return { drafts: [], published: [], error: 'Data gambar tidak dapat dimuat. Periksa koneksi, lalu muat ulang. Foto publik tetap menggunakan gambar yang tersedia.' } }
}
