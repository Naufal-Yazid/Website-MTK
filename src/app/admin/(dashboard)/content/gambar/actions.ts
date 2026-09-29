'use server'

import { randomUUID } from 'node:crypto'
import { revalidatePath } from 'next/cache'
import { findImageSlot } from '@/lib/media/catalog'
import { IMAGE_BUCKET, imageMetadataError } from '@/lib/media/model'
import { convertToWebp } from '@/lib/media/convert'
import { requireContentAdmin } from '@/lib/content/server'
import { runAdminAction } from '@/lib/logs/server'

type Result = { success: true; revision: number } | { success: false; error: string }
const validRevision = (revision: number) => Number.isSafeInteger(revision) && revision >= 0 && revision <= 2147483645

function mutationError(error: { message?: string }) {
  if (error.message === 'image_conflict') return 'Gambar sudah diubah admin lain atau tab lain. Muat ulang sebelum mencoba lagi.'
  if (error.message === 'image_file_missing') return 'File gambar tidak ditemukan. Unggah ulang sebelum publikasi.'
  return 'Perubahan belum berhasil. Pastikan migrasi 006_website_images.sql sudah dijalankan dan sesi admin masih aktif.'
}
function refreshEditor(id: string) {
  revalidatePath('/admin/content')
  revalidatePath('/admin/content/gambar/' + id)
}

export async function uploadImageDraft(id: string, expectedRevision: number, form: FormData): Promise<Result> {
  const slot = findImageSlot(id)
  if (!slot || !validRevision(expectedRevision)) return { success: false, error: 'Gambar atau revisi tidak valid.' }
  try {
    return await runAdminAction({ action: 'image.upload_draft', summary: 'Mengunggah draft gambar ' + slot.label, details: { image_key: id } }, async () => {
      const client = await requireContentAdmin()
      const file = form.get('file')
      if (!(file instanceof File)) return { success: false as const, error: 'Pilih gambar terlebih dahulu.' }
      const invalid = imageMetadataError(file)
      if (invalid) return { success: false as const, error: invalid }
      // Check revision before conversion/upload; the RPC checks again atomically.
      const current = await client.from('site_image_drafts').select('revision').eq('image_key', id).maybeSingle()
      if (current.error) return { success: false as const, error: mutationError(current.error) }
      if ((current.data?.revision || 0) !== expectedRevision) return { success: false as const, error: mutationError({ message: 'image_conflict' }) }
      let converted: Awaited<ReturnType<typeof convertToWebp>>
      try { converted = await convertToWebp(Buffer.from(await file.arrayBuffer())) }
      catch { return { success: false as const, error: 'Gambar tidak dapat dikonversi. Gunakan JPG/PNG/WebP statis yang valid, maksimal 3 MB dan 40 megapiksel.' } }
      const path = id + '/' + randomUUID() + '.webp'
      const upload = await client.storage.from(IMAGE_BUCKET).upload(path, converted.data, { contentType: 'image/webp', upsert: false, cacheControl: '31536000' })
      if (upload.error) return { success: false as const, error: 'Upload WebP gagal. Periksa migrasi 006_website_images.sql, kapasitas Storage, dan koneksi.' }
      const result = await client.rpc('save_image_draft', { p_key: id, p_path: path, p_width: converted.width, p_height: converted.height, p_bytes: converted.bytes, p_expected_revision: expectedRevision })
      if (result.error) return { success: false as const, error: mutationError(result.error) }
      refreshEditor(id)
      return { success: true as const, revision: result.data }
    })
  } catch { return { success: false, error: 'Upload belum dapat dipastikan. Muat ulang untuk memeriksa draft sebelum mencoba lagi.' } }
}

export async function resetImageDraft(id: string, expectedRevision: number): Promise<Result> {
  const slot = findImageSlot(id)
  if (!slot || !validRevision(expectedRevision)) return { success: false, error: 'Gambar atau revisi tidak valid.' }
  try {
    return await runAdminAction({ action: 'image.reset_draft', summary: 'Memilih gambar bawaan ' + slot.label, details: { image_key: id } }, async () => {
      const client = await requireContentAdmin()
      const result = await client.rpc('save_image_draft', { p_key: id, p_path: '', p_width: 0, p_height: 0, p_bytes: 0, p_expected_revision: expectedRevision })
      if (result.error) return { success: false as const, error: mutationError(result.error) }
      refreshEditor(id)
      return { success: true as const, revision: result.data }
    })
  } catch { return { success: false, error: 'Draft belum dapat disimpan. Muat ulang dan periksa sesi admin.' } }
}

export async function publishImageDraft(id: string, expectedRevision: number): Promise<Result> {
  const slot = findImageSlot(id)
  if (!slot || !validRevision(expectedRevision) || !expectedRevision) return { success: false, error: 'Simpan draft gambar terlebih dahulu.' }
  try {
    return await runAdminAction({ action: 'image.publish', summary: 'Mempublikasikan gambar ' + slot.label, details: { image_key: id, revision: expectedRevision } }, async () => {
      const client = await requireContentAdmin()
      // The RPC copies the stored draft, checks the file and revision under a lock.
      const result = await client.rpc('publish_image_draft', { p_key: id, p_expected_revision: expectedRevision })
      if (result.error) return { success: false as const, error: mutationError(result.error) }
      revalidatePath('/', 'layout')
      refreshEditor(id)
      return { success: true as const, revision: result.data }
    })
  } catch { return { success: false, error: 'Publikasi belum dapat dipastikan. Muat ulang untuk memeriksa status gambar.' } }
}
