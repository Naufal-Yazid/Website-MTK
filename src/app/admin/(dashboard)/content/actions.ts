'use server'

import { revalidatePath } from 'next/cache'
import { findDocument, validateValues } from '@/lib/content/model'
import { requireContentAdmin } from '@/lib/content/server'
import { runAdminAction } from '@/lib/logs/server'
import type { ContentValues } from '@/lib/content/values'

export type ContentActionResult = { success: true; revision: number } | { success: false; error: string }

function errorMessage(error: { message?: string; code?: string }) {
  if (error.message === 'content_conflict') return 'Konten sudah diubah admin lain atau tab lain. Salin perubahan Anda, lalu muat ulang sebelum menyimpan/publikasi.'
  if (error.message === 'content_unauthorized') return 'Sesi admin tidak valid. Silakan login kembali.'
  if (error.message === 'content_missing') return 'Simpan draft sebelum melakukan publikasi.'
  if (['PGRST202', 'PGRST205', '42P01', '42883'].includes(error.code || '')) return 'Jalankan migrasi 004_site_content.sql di Supabase terlebih dahulu.'
  return 'Perubahan belum berhasil disimpan. Periksa koneksi database dan coba lagi.'
}

export async function saveContentDraft(id: string, values: ContentValues, expectedRevision: number): Promise<ContentActionResult> {
  const doc = findDocument(id)
  if (!doc || !Number.isSafeInteger(expectedRevision) || expectedRevision < 0 || expectedRevision > 2147483645) return { success: false, error: 'Dokumen atau revisi tidak valid.' }
  try {
    return await runAdminAction({ action: 'content.save_draft', summary: `Menyimpan draft ${doc.label}`, details: { document_key: doc.id, previous_revision: expectedRevision } }, async () => {
      const client = await requireContentAdmin()
      const parsed = validateValues(doc, values)
      if (parsed.error) return { success: false as const, error: parsed.error }
      const { data, error } = await client.rpc('save_content_draft', { p_key: doc.id, p_values: parsed.values!, p_expected_revision: expectedRevision })
      if (error) return { success: false as const, error: errorMessage(error) }
      revalidatePath('/admin/content')
      revalidatePath(`/admin/content/${doc.id}`)
      return { success: true as const, revision: data }
    })
  } catch {
    return { success: false, error: 'Sesi atau koneksi admin bermasalah. Muat ulang dan coba lagi.' }
  }
}

export async function publishContentDraft(id: string, expectedRevision: number): Promise<ContentActionResult> {
  const doc = findDocument(id)
  if (!doc || !Number.isSafeInteger(expectedRevision) || expectedRevision < 1) return { success: false, error: 'Simpan draft yang valid sebelum publikasi.' }
  try {
    return await runAdminAction({ action: 'content.publish', summary: `Mempublikasikan ${doc.label}`, details: { document_key: doc.id, revision: expectedRevision } }, async () => {
      const client = await requireContentAdmin()
      const draft = await client.from('site_content_drafts').select('content, revision').eq('document_key', doc.id).single()
      if (draft.error) return { success: false as const, error: errorMessage(draft.error) }
      if (draft.data.revision !== expectedRevision) return { success: false as const, error: errorMessage({ message: 'content_conflict' }) }
      const parsed = validateValues(doc, draft.data.content)
      if (parsed.error) return { success: false as const, error: 'Draft tidak sesuai format terbaru. Buka editor dan simpan ulang terlebih dahulu.' }
      // DB copies this exact saved revision atomically, never an unsaved browser payload.
      const { data, error } = await client.rpc('publish_content_draft', { p_key: doc.id, p_expected_revision: expectedRevision })
      if (error) return { success: false as const, error: errorMessage(error) }
      for (const path of ['/', '/proyek', '/proyek/tci', '/proyek/tci/tci-3', doc.path, '/admin/content', `/admin/content/${doc.id}`]) revalidatePath(path)
      return { success: true as const, revision: data }
    })
  } catch {
    return { success: false, error: 'Publikasi belum dapat dipastikan. Muat ulang status konten sebelum mencoba lagi.' }
  }
}
