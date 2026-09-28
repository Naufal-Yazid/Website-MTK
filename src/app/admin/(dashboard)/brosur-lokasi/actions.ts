'use server'

import { randomUUID } from 'node:crypto'
import { findDocument } from '@/lib/content/model'
import { requireContentAdmin } from '@/lib/content/server'
import { runAdminAction } from '@/lib/logs/server'
import { BROCHURE_BUCKET, pdfMetadataError } from '@/lib/content/resources'

type UploadResult = { success: true; path: string } | { success: false; error: string }

export async function uploadBrochure(id: string, formData: FormData): Promise<UploadResult> {
  const doc = findDocument(id)
  if (!doc) return { success: false, error: 'Halaman tidak dikenal.' }
  try {
    return await runAdminAction({ action: 'brochure.upload', summary: 'Mengunggah brosur ' + doc.label, details: { document_key: doc.id } }, async () => {
      const client = await requireContentAdmin()
      const file = formData.get('file')
      if (!(file instanceof File)) return { success: false as const, error: 'Pilih file PDF terlebih dahulu.' }
      const invalid = pdfMetadataError(file)
      if (invalid) return { success: false as const, error: invalid }
      const signature = Buffer.from(await file.slice(0, 5).arrayBuffer()).toString('ascii')
      if (signature !== '%PDF-') return { success: false as const, error: 'Isi file bukan PDF yang valid.' }
      // Immutable names: replacing a brochure must never overwrite a published file.
      const path = doc.id + '/' + randomUUID() + '.pdf'
      const { error } = await client.storage.from(BROCHURE_BUCKET).upload(path, file, { contentType: 'application/pdf', upsert: false, cacheControl: '3600' })
      if (error) return { success: false as const, error: 'PDF belum berhasil diunggah. Pastikan migrasi 005_project_brochures.sql sudah dijalankan, lalu periksa koneksi dan izin Storage.' }
      return { success: true as const, path }
    })
  } catch {
    return { success: false, error: 'Upload belum berhasil. Periksa sesi admin dan koneksi, lalu coba lagi.' }
  }
}
