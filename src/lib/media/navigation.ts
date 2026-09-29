import { imageSlots, type ImageSlot } from './catalog'

export const imagePageTabs = [
  { id: 'umum', label: 'Umum', path: 'Semua halaman publik' },
  { id: 'beranda', label: 'Beranda', path: '/' },
  { id: 'tentang', label: 'Tentang Kami', path: '/tentang' },
  { id: 'kontak', label: 'Kontak', path: '/kontak' },
  { id: 'proyek', label: 'Daftar Proyek', path: '/proyek' },
  { id: 'tci', label: 'TCI', path: '/proyek/tci' },
  { id: 'tci-1', label: 'TCI 1', path: '/proyek/tci/tci-1' },
  { id: 'tci-2', label: 'TCI 2', path: '/proyek/tci/tci-2' },
  { id: 'tci-3', label: 'TCI 3 & Unit', path: '/proyek/tci/tci-3' },
  { id: 'rancamanyar', label: 'Rancamanyar', path: '/proyek/rancamanyar-indah' },
  { id: 'permata', label: 'Permata Buah Batu', path: '/proyek/permata-buah-batu' },
] as const

export const tciImagePages = [
  { label: 'Semua halaman TCI 3', path: '' },
  { label: 'Halaman utama TCI 3', path: '/proyek/tci/tci-3' },
  { label: 'Cluster · Tipe 36', path: '/proyek/tci/tci-3/tipe-36' },
  { label: 'Cluster · Tipe 45', path: '/proyek/tci/tci-3/tipe-45' },
  { label: 'Cluster · Tipe 50', path: '/proyek/tci/tci-3/tipe-50' },
  { label: 'Non-Cluster · Tipe 50', path: '/proyek/tci/tci-3/non-cluster/tipe-50' },
  { label: 'Ruko · Terranova Arcade', path: '/proyek/tci/tci-3/ruko/teranova' },
]

export function imagesForPage(id: string): ImageSlot[] {
  const tab = imagePageTabs.find(item => item.id === id)
  if (!tab) return []
  return imageSlots.filter(slot => slot.pages.some(path => path === tab.path || (id === 'tci-3' && path.startsWith(tab.path + '/'))))
}

export function imagePageLabel(path: string) {
  return imagePageTabs.find(tab => tab.path === path)?.label
    || tciImagePages.find(page => page.path === path)?.label
    || path
}
