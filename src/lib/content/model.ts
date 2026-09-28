import { contentDocuments } from './catalog'
import { isAvailability } from './availability'
import { isBrochurePath, isMapUrl } from './resources'
import type { ContentBundle, ContentValues } from './values'

export type ContentField = {
  key: string
  label: string
  group: string
  defaultValue: string
  kind: 'text' | 'textarea' | 'number' | 'availability' | 'brochure' | 'map' | 'map-embed'
  maxLength: number
}
export type ContentDocument = {
  id: string
  label: string
  path: string
  category: string
  fields: ContentField[]
}

export function findDocument(id: unknown): ContentDocument | undefined {
  return typeof id === 'string' ? contentDocuments.find(doc => doc.id === id) : undefined
}

export function defaultValues(doc: ContentDocument): ContentValues {
  return Object.fromEntries(doc.fields.map(field => [field.key, field.defaultValue]))
}

function validValue(field: ContentField, value: unknown): value is string {
  if (field.kind === 'brochure') return isBrochurePath(value)
  if (field.kind === 'map' || field.kind === 'map-embed') return isMapUrl(value, field.kind === 'map-embed')
  if (field.kind === 'availability') return isAvailability(value)
  if (typeof value !== 'string' || !value.trim() || value.length > field.maxLength || /[\u0000-\u0008\u000b\u000c\u000e-\u001f]/.test(value)) return false
  return field.kind !== 'number' || (/^\d+$/.test(value) && Number.isSafeInteger(Number(value)) && Number(value) > 0 && Number(value) <= 1000000000000)
}

export function validateValues(doc: ContentDocument, input: unknown, options: { allowLegacyAvailability?: boolean } = {}): { values: ContentValues; error?: never } | { error: string; values?: never } {
  if (!input || typeof input !== 'object' || Array.isArray(input)) return { error: 'Format konten tidak valid.' }
  const keys = new Set(doc.fields.map(field => field.key))
  if (Object.keys(input).some(key => !keys.has(key))) return { error: 'Ada field yang tidak diizinkan.' }
  const values: ContentValues = {}
  for (const field of doc.fields) {
    // Older saved drafts predate availability/resources; new saves must include all fields.
    if (options.allowLegacyAvailability && ['availability', 'brochure', 'map', 'map-embed'].includes(field.kind) && !Object.hasOwn(input, field.key)) {
      values[field.key] = field.defaultValue
      continue
    }
    const value = (input as ContentValues)[field.key]
    if (field.kind === 'brochure' && !isBrochurePath(value, doc.id)) return { error: 'Brosur tidak valid. Unggah PDF untuk halaman ini, atau kosongkan untuk placeholder.' }
    if ((field.kind === 'map' || field.kind === 'map-embed') && !isMapUrl(value, field.kind === 'map-embed')) return { error: `${field.label}: gunakan URL HTTPS Google Maps yang valid, bukan kode iframe. Boleh kosong untuk placeholder.` }
    if (field.kind === 'availability' && !isAvailability(value)) return { error: 'Pilih status Tersedia, Hampir habis, atau Habis. Jika editor sudah lama terbuka, muat ulang terlebih dahulu.' }
    if (!Object.hasOwn(input, field.key) || !validValue(field, value)) return { error: `${field.label}: wajib diisi, maksimal ${field.maxLength} karakter${field.kind === 'number' ? ', angka Rupiah bulat tanpa titik/koma (1–1 triliun)' : ''}.` }
    values[field.key] = value.trim()
  }
  return { values }
}

// Never expose unknown keys or invalid stored values, even after direct database edits.
export function mergeValues(doc: ContentDocument, stored: unknown): ContentValues {
  const values = defaultValues(doc)
  if (!stored || typeof stored !== 'object' || Array.isArray(stored)) return values
  for (const field of doc.fields) {
    const value = (stored as ContentValues)[field.key]
    if (Object.hasOwn(stored, field.key) && validValue(field, value) && (field.kind !== 'brochure' || isBrochurePath(value, doc.id))) values[field.key] = value
  }
  return values
}

export function resolvePublished(rows: { document_key: string; content: unknown }[]): ContentBundle {
  return Object.fromEntries(contentDocuments.map(doc => [doc.id, mergeValues(doc, rows.find(row => row.document_key === doc.id)?.content)]))
}
