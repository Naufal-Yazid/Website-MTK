import type { ContentField } from './model'

export const BROCHURE_BUCKET = 'project-brochures'
export const MAX_BROCHURE_BYTES = 3 * 1024 * 1024
export const CLUSTER_BROCHURE = '/brosur/brosur-cluster-tci.pdf'
const resourceIds = ['tci', 'rancamanyar', 'permata-buah-batu', 'tci-1', 'tci-2', 'tci-3', 'tipe-36', 'tipe-45', 'tipe-50', 'non-cluster-50', 'teranova']
const clusterIds = ['tipe-36', 'tipe-45', 'tipe-50']
const tci3Map = 'https://maps.app.goo.gl/vswkS5vy8ATpDWPt5'
const mapQueries: Record<string, string> = {
  tci: 'Taman Cibaduyut Indah, Bandung',
  rancamanyar: 'Rancamanyar Indah, Baleendah, Bandung',
  'permata-buah-batu': 'Permata Buah Batu, Bojongsoang, Bandung',
  'tci-1': 'Taman Cibaduyut Indah I',
  'tci-2': 'Taman Cibaduyut Indah II',
}

export function isMapUrl(value: unknown, embed = false): value is string {
  if (typeof value !== 'string' || value.length > 4096 || /[\s\\]/.test(value)) return false
  if (value === '') return true
  try {
    const url = new URL(value)
    if (url.protocol !== 'https:' || url.username || url.password || url.port) return false
    if (!embed && url.hostname === 'maps.app.goo.gl') return /^\/[A-Za-z0-9]+$/.test(url.pathname)
    if (!['www.google.com', 'google.com', 'maps.google.com'].includes(url.hostname)) return false
    if (!/^\/maps(?:\/|$)/.test(url.pathname)) return false
    return !embed || url.pathname === '/maps/embed' || url.searchParams.get('output') === 'embed'
  } catch { return false }
}

export function isBrochurePath(value: unknown, documentId?: string): value is string {
  if (typeof value !== 'string') return false
  if (value === '' || value === CLUSTER_BROCHURE) return true
  const [id, file, extra] = value.split('/')
  return !extra && value.split('/').length === 2 && resourceIds.includes(id) &&
    (!documentId || id === documentId) &&
    /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}\.pdf$/.test(file)
}

export function brochureUrl(value: unknown): string | null {
  if (!isBrochurePath(value) || !value) return null
  if (value === CLUSTER_BROCHURE) return value
  const base = process.env.NEXT_PUBLIC_SUPABASE_URL
  if (!base) return null
  try {
    const url = new URL(base)
    if (!['https:', 'http:'].includes(url.protocol)) return null
    return url.origin + '/storage/v1/object/public/' + BROCHURE_BUCKET + '/' + value + '?download=brosur-' + value.split('/')[0] + '.pdf'
  } catch { return null }
}

const mapEmbeds: Record<string, string> = {
  "rancamanyar": "https://www.google.com/maps?q=Rancamanyar%20Indah%2C%20Baleendah%2C%20Bandung&output=embed",
  "permata-buah-batu": "https://www.google.com/maps?q=Permata%20Buah%20Batu%2C%20Bojongsoang%2C%20Bandung&output=embed",
  "tci-1": "https://www.google.com/maps?q=Taman%20Cibaduyut%20Indah%20I&output=embed",
  "tci-2": "https://www.google.com/maps?q=Taman%20Cibaduyut%20Indah%20II&output=embed",
  "tci-3": "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.350894603069!2d107.59729969999998!3d-6.967866599999995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e68e8dfcd2b8919%3A0xb935531870acc41!2sTaman%20Cibaduyut%20Indah%20III%2C%20Cangkuang%20Kulon%2C%20Kec.%20Dayeuhkolot%2C%20Kabupaten%20Bandung%2C%20Jawa%20Barat%2040239!5e0!3m2!1sen!2sid!4v1787558768072!5m2!1sen!2sid"
}

export function resourceFields(id: string): ContentField[] {
  const fields: ContentField[] = [
    { key: 'brochure.path', label: 'Brosur PDF', group: 'Brosur dan Lokasi', kind: 'brochure', defaultValue: clusterIds.includes(id) ? CLUSTER_BROCHURE : '', maxLength: 160 },
    { key: 'location.url', label: 'Link tombol Lihat Lokasi', group: 'Brosur dan Lokasi', kind: 'map', defaultValue: mapQueries[id] ? 'https://www.google.com/maps?q=' + encodeURIComponent(mapQueries[id]) : tci3Map, maxLength: 4096 },
  ]
  if (mapEmbeds[id]) fields.push({ key: 'location.embed', label: 'Link peta yang ditampilkan di halaman', group: 'Brosur dan Lokasi', kind: 'map-embed', defaultValue: mapEmbeds[id], maxLength: 4096 })
  return fields
}

export function pdfMetadataError(file: { name: string; type: string; size: number }): string | null {
  if (!/\.pdf$/i.test(file.name) || !['application/pdf', ''].includes(file.type)) return 'Pilih file brosur berformat PDF.'
  if (file.size < 5 || file.size > MAX_BROCHURE_BYTES) return 'Ukuran PDF harus lebih dari 0 dan maksimal 3 MB.'
  return null
}
