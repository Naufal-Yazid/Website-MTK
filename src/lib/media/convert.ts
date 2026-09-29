import 'server-only'
import sharp from 'sharp'
import { MAX_IMAGE_BYTES, MAX_IMAGE_PIXELS } from './model'

export async function convertToWebp(input: Buffer) {
  if (!input.length || input.length > MAX_IMAGE_BYTES) throw new Error('Ukuran gambar maksimal 3 MB.')
  try {
    const decoder = sharp(input, { limitInputPixels: MAX_IMAGE_PIXELS, failOn: 'warning' })
    const metadata = await decoder.metadata()
    if (!['jpeg', 'png', 'webp'].includes(metadata.format || '') || (metadata.pages || 1) > 1) throw new Error('unsupported')
    // Decode actual pixels; re-encode, auto-orient, preserve alpha and strip EXIF/GPS.
    const { data, info } = await decoder.rotate().resize({ width: 3200, height: 3200, fit: 'inside', withoutEnlargement: true })
      .webp({ quality: 90, effort: 4 }).timeout({ seconds: 15 }).toBuffer({ resolveWithObject: true })
    if (data.length > MAX_IMAGE_BYTES) throw new Error('output_too_large')
    return { data, width: info.width, height: info.height, bytes: data.length }
  } catch {
    throw new Error('Gambar tidak dapat diproses. Gunakan JPG/PNG/WebP statis yang valid, maksimal 3 MB dan 40 megapiksel. Coba perkecil gambar terlebih dahulu.')
  }
}
