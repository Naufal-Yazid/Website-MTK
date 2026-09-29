export const IMAGE_BUCKET = 'website-images'
export const MAX_IMAGE_BYTES = 3 * 1024 * 1024
export const MAX_IMAGE_PIXELS = 40_000_000
export type ImageMap = Record<string, string>
export type ImageRow = { image_key: string; path: string; revision: number; width: number; height: number; bytes: number }

export function imageMetadataError(file: { name: string; size: number; type: string }) {
  if (!/\.(?:jpe?g|png|webp)$/i.test(file.name) || !['image/jpeg', 'image/png', 'image/webp', ''].includes(file.type)) return 'Pilih gambar JPG, PNG, atau WebP. SVG, GIF, dan gambar animasi tidak didukung.'
  if (!file.size || file.size > MAX_IMAGE_BYTES) return 'Ukuran gambar maksimal 3 MB.'
  return null
}

export function isImagePath(value: unknown, id: string): value is string {
  if (typeof value !== 'string') return false
  if (value === '') return true
  const parts = value.split('/')
  return parts.length === 2 && parts[0] === id && /^[a-z0-9-]{1,80}$/.test(id) &&
    /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}\.webp$/.test(parts[1])
}

export function imageUrl(path: unknown, id: string): string | null {
  if (!isImagePath(path, id) || !path) return null
  try {
    const base = new URL(process.env.NEXT_PUBLIC_SUPABASE_URL || '')
    if (!['https:', 'http:'].includes(base.protocol) || base.username || base.password) return null
    return base.origin + '/storage/v1/object/public/' + IMAGE_BUCKET + '/' + path
  } catch { return null }
}
