// Fixed image slots already used by the website. Shared sources update together.
export type ImageSlot = { id: string; src: string; label: string; group: string; pages: string[] }
export const imageSlots: ImageSlot[] = [
  {
    "id": "hero-image",
    "src": "/images/shared/hero image.webp",
    "label": "Banner utama",
    "group": "Umum & Beranda",
    "pages": [
      "/kontak",
      "/",
      "/proyek",
      "/tentang"
    ]
  },
  {
    "id": "tci-icon-banner",
    "src": "/images/proyek/tci/tci-icon-banner.webp",
    "label": "Ikon kawasan TCI — banner & kartu",
    "group": "Taman Cibaduyut Indah",
    "pages": [
      "/",
      "/proyek",
      "/proyek/tci"
    ]
  },
  {
    "id": "rancamanyar-banner",
    "src": "/images/proyek/rancamanyar/rancamanyar-banner.webp",
    "label": "Gerbang Rancamanyar — banner & kartu",
    "group": "Rancamanyar Indah",
    "pages": [
      "/",
      "/proyek",
      "/proyek/rancamanyar-indah"
    ]
  },
  {
    "id": "permatabb-gate-banner",
    "src": "/images/proyek/permata-buah-batu/permatabb-gate-banner.webp",
    "label": "Gerbang Permata Buah Batu — banner & kartu",
    "group": "Permata Buah Batu",
    "pages": [
      "/",
      "/proyek",
      "/proyek/permata-buah-batu"
    ]
  },
  {
    "id": "home1",
    "src": "/images/shared/home1.webp",
    "label": "Foto pengenalan beranda",
    "group": "Umum & Beranda",
    "pages": [
      "/"
    ]
  },
  {
    "id": "permatabuahbatu-detail",
    "src": "/images/proyek/permata-buah-batu/permatabuahbatu-detail.webp",
    "label": "Foto pengenalan Permata Buah Batu",
    "group": "Permata Buah Batu",
    "pages": [
      "/proyek/permata-buah-batu"
    ]
  },
  {
    "id": "rancamanyar-card",
    "src": "/images/proyek/rancamanyar/rancamanyar-card.webp",
    "label": "Foto pengenalan Rancamanyar",
    "group": "Rancamanyar Indah",
    "pages": [
      "/proyek/rancamanyar-indah"
    ]
  },
  {
    "id": "rancamanyar-living",
    "src": "/images/proyek/rancamanyar/rancamanyar-living.webp",
    "label": "Galeri — ruang tamu",
    "group": "Rancamanyar Indah",
    "pages": [
      "/proyek/rancamanyar-indah"
    ]
  },
  {
    "id": "rancamanyar-bed",
    "src": "/images/proyek/rancamanyar/rancamanyar-bed.webp",
    "label": "Galeri — kamar tidur",
    "group": "Rancamanyar Indah",
    "pages": [
      "/proyek/rancamanyar-indah"
    ]
  },
  {
    "id": "rancamanyar-back",
    "src": "/images/proyek/rancamanyar/rancamanyar-back.webp",
    "label": "Galeri — area belakang",
    "group": "Rancamanyar Indah",
    "pages": [
      "/proyek/rancamanyar-indah"
    ]
  },
  {
    "id": "tci1-gate",
    "src": "/images/proyek/tci/tci-1/tci1-gate.webp",
    "label": "Gerbang TCI 1 — banner & kartu",
    "group": "TCI 1",
    "pages": [
      "/proyek/tci",
      "/proyek/tci/tci-1"
    ]
  },
  {
    "id": "gerbangtci2-herobanner",
    "src": "/images/proyek/tci/tci-2/gerbangTCI2_HeroBanner.webp",
    "label": "Gerbang TCI 2 — banner & kartu",
    "group": "TCI 2",
    "pages": [
      "/proyek/tci",
      "/proyek/tci/tci-2"
    ]
  },
  {
    "id": "tci3-gate-banner",
    "src": "/images/proyek/tci/tci-3/tci3-gate-banner.webp",
    "label": "Gerbang TCI 3 — banner & kartu",
    "group": "TCI 3",
    "pages": [
      "/proyek/tci",
      "/proyek/tci/tci-3"
    ]
  },
  {
    "id": "kantorpemasaran-tci",
    "src": "/images/proyek/tci/KantorPemasaran_TCI.jpg",
    "label": "Kantor pemasaran TCI",
    "group": "Taman Cibaduyut Indah",
    "pages": [
      "/proyek/tci"
    ]
  },
  {
    "id": "tci1-living",
    "src": "/images/proyek/tci/tci-1/tci1-living.webp",
    "label": "Galeri — ruang tamu",
    "group": "TCI 1",
    "pages": [
      "/proyek/tci/tci-1"
    ]
  },
  {
    "id": "tci1-bed",
    "src": "/images/proyek/tci/tci-1/tci1-bed.webp",
    "label": "Galeri — kamar tidur",
    "group": "TCI 1",
    "pages": [
      "/proyek/tci/tci-1"
    ]
  },
  {
    "id": "tci1-kitchen",
    "src": "/images/proyek/tci/tci-1/tci1-kitchen.webp",
    "label": "Galeri — dapur",
    "group": "TCI 1",
    "pages": [
      "/proyek/tci/tci-1"
    ]
  },
  {
    "id": "tci1-house-card",
    "src": "/images/proyek/tci/tci-1/tci1-house-card.webp",
    "label": "Foto pengenalan TCI 1",
    "group": "TCI 1",
    "pages": [
      "/proyek/tci/tci-1"
    ]
  },
  {
    "id": "tci2-living",
    "src": "/images/proyek/tci/tci-2/tci2-living.webp",
    "label": "Galeri — ruang tamu",
    "group": "TCI 2",
    "pages": [
      "/proyek/tci/tci-2"
    ]
  },
  {
    "id": "tci2-bed",
    "src": "/images/proyek/tci/tci-2/tci2-bed.webp",
    "label": "Galeri — kamar tidur",
    "group": "TCI 2",
    "pages": [
      "/proyek/tci/tci-2"
    ]
  },
  {
    "id": "tci2-kitchen",
    "src": "/images/proyek/tci/tci-2/tci2-kitchen.webp",
    "label": "Galeri — dapur",
    "group": "TCI 2",
    "pages": [
      "/proyek/tci/tci-2"
    ]
  },
  {
    "id": "rumah-tci2",
    "src": "/images/proyek/tci/tci-2/Rumah-TCI2.jpg",
    "label": "Foto pengenalan TCI 2",
    "group": "TCI 2",
    "pages": [
      "/proyek/tci/tci-2"
    ]
  },
  {
    "id": "tci3-tipe-36",
    "src": "/images/proyek/tci/tci-3/cluster/tipe-36/tci3-tipe-36.webp",
    "label": "Kartu unit cluster tipe 36",
    "group": "TCI 3 · Cluster tipe 36",
    "pages": [
      "/proyek/tci/tci-3"
    ]
  },
  {
    "id": "tipe45-depannn",
    "src": "/images/proyek/tci/tci-3/cluster/tipe-45/Tipe45_Depannn.webp",
    "label": "Cluster tipe 45 — banner & kartu",
    "group": "TCI 3 · Cluster tipe 45",
    "pages": [
      "/proyek/tci/tci-3",
      "/proyek/tci/tci-3/tipe-45"
    ]
  },
  {
    "id": "tci3-tipe-50",
    "src": "/images/proyek/tci/tci-3/cluster/tipe-50/tci3-tipe-50.webp",
    "label": "Cluster tipe 50 — banner, kartu & spesifikasi",
    "group": "TCI 3 · Tipe 50",
    "pages": [
      "/proyek/tci/tci-3",
      "/proyek/tci/tci-3/tipe-50"
    ]
  },
  {
    "id": "tci3-t50-nc-detail",
    "src": "/images/proyek/tci/tci-3/non-cluster/tci3-t50-nc-detail.webp",
    "label": "Non-cluster tipe 50 — banner, kartu & spesifikasi",
    "group": "TCI 3 · Non-cluster",
    "pages": [
      "/proyek/tci/tci-3",
      "/proyek/tci/tci-3/non-cluster/tipe-50"
    ]
  },
  {
    "id": "tci3-ruko-ta-card",
    "src": "/images/proyek/tci/tci-3/ruko/tci3-ruko-ta-card.webp",
    "label": "Terranova — banner & kartu",
    "group": "TCI 3 · Ruko Terranova",
    "pages": [
      "/proyek/tci/tci-3",
      "/proyek/tci/tci-3/ruko/teranova"
    ]
  },
  {
    "id": "rumah-tci3",
    "src": "/images/proyek/tci/tci-3/Rumah-TCI3.jpg",
    "label": "Foto pengenalan TCI 3",
    "group": "TCI 3",
    "pages": [
      "/proyek/tci/tci-3"
    ]
  },
  {
    "id": "50-90",
    "src": "/images/proyek/tci/tci-3/denah/50-90.webp",
    "label": "Denah tipe 50 — cluster & non-cluster",
    "group": "TCI 3 · Tipe 50",
    "pages": [
      "/proyek/tci/tci-3/non-cluster/tipe-50",
      "/proyek/tci/tci-3/tipe-50"
    ]
  },
  {
    "id": "tipe50-living",
    "src": "/images/proyek/tci/tci-3/non-cluster/tipe50-living.webp",
    "label": "Galeri — ruang tamu",
    "group": "TCI 3 · Non-cluster",
    "pages": [
      "/proyek/tci/tci-3/non-cluster/tipe-50"
    ]
  },
  {
    "id": "tipe50-bed",
    "src": "/images/proyek/tci/tci-3/non-cluster/tipe50-bed.webp",
    "label": "Galeri — kamar tidur",
    "group": "TCI 3 · Non-cluster",
    "pages": [
      "/proyek/tci/tci-3/non-cluster/tipe-50"
    ]
  },
  {
    "id": "tipe50-kitchen",
    "src": "/images/proyek/tci/tci-3/non-cluster/tipe50-kitchen.webp",
    "label": "Galeri — dapur",
    "group": "TCI 3 · Non-cluster",
    "pages": [
      "/proyek/tci/tci-3/non-cluster/tipe-50"
    ]
  },
  {
    "id": "ruko-hall2",
    "src": "/images/proyek/tci/tci-3/ruko/ruko-hall2.webp",
    "label": "Foto spesifikasi ruko",
    "group": "TCI 3 · Ruko Terranova",
    "pages": [
      "/proyek/tci/tci-3/ruko/teranova"
    ]
  },
  {
    "id": "fp-terranova",
    "src": "/floor-plan/fp_terranova.webp",
    "label": "Denah ruko Terranova",
    "group": "TCI 3 · Ruko Terranova",
    "pages": [
      "/proyek/tci/tci-3/ruko/teranova"
    ]
  },
  {
    "id": "ruko-hall",
    "src": "/images/proyek/tci/tci-3/ruko/ruko-hall.webp",
    "label": "Galeri — ruang utama",
    "group": "TCI 3 · Ruko Terranova",
    "pages": [
      "/proyek/tci/tci-3/ruko/teranova"
    ]
  },
  {
    "id": "ruko-porch",
    "src": "/images/proyek/tci/tci-3/ruko/ruko-porch.webp",
    "label": "Galeri — teras ruko",
    "group": "TCI 3 · Ruko Terranova",
    "pages": [
      "/proyek/tci/tci-3/ruko/teranova"
    ]
  },
  {
    "id": "ruko-kitchen",
    "src": "/images/proyek/tci/tci-3/ruko/ruko-kitchen.webp",
    "label": "Galeri — dapur",
    "group": "TCI 3 · Ruko Terranova",
    "pages": [
      "/proyek/tci/tci-3/ruko/teranova"
    ]
  },
  {
    "id": "tci3-tipe36-hero",
    "src": "/images/proyek/tci/tci-3/cluster/tipe-36/tci3-tipe36-hero.webp",
    "label": "Banner & galeri ruang tamu tipe 36",
    "group": "TCI 3 · Cluster tipe 36",
    "pages": [
      "/proyek/tci/tci-3/tipe-36"
    ]
  },
  {
    "id": "tci3-tipe36-spesifikasi",
    "src": "/images/proyek/tci/tci-3/cluster/tipe-36/tci3-tipe36-spesifikasi.webp",
    "label": "Foto spesifikasi tipe 36",
    "group": "TCI 3 · Cluster tipe 36",
    "pages": [
      "/proyek/tci/tci-3/tipe-36"
    ]
  },
  {
    "id": "36-72",
    "src": "/images/proyek/tci/tci-3/denah/36-72.webp",
    "label": "Denah tipe 36",
    "group": "TCI 3 · Cluster tipe 36",
    "pages": [
      "/proyek/tci/tci-3/tipe-36"
    ]
  },
  {
    "id": "tci3-tipe36-kamar-utama",
    "src": "/images/proyek/tci/tci-3/cluster/tipe-36/tci3-tipe36-kamar-utama.webp",
    "label": "Galeri — kamar tidur utama",
    "group": "TCI 3 · Cluster tipe 36",
    "pages": [
      "/proyek/tci/tci-3/tipe-36"
    ]
  },
  {
    "id": "tci3-tipe36-kamar-anak",
    "src": "/images/proyek/tci/tci-3/cluster/tipe-36/tci3-tipe36-kamar-anak.webp",
    "label": "Galeri — kamar anak",
    "group": "TCI 3 · Cluster tipe 36",
    "pages": [
      "/proyek/tci/tci-3/tipe-36"
    ]
  },
  {
    "id": "tipe45-depansamping",
    "src": "/images/proyek/tci/tci-3/cluster/tipe-45/Tipe45_DepanSamping.webp",
    "label": "Foto spesifikasi tipe 45",
    "group": "TCI 3 · Cluster tipe 45",
    "pages": [
      "/proyek/tci/tci-3/tipe-45"
    ]
  },
  {
    "id": "45-84",
    "src": "/images/proyek/tci/tci-3/denah/45-84.webp",
    "label": "Denah tipe 45",
    "group": "TCI 3 · Cluster tipe 45",
    "pages": [
      "/proyek/tci/tci-3/tipe-45"
    ]
  },
  {
    "id": "foto-interior-tipe45-dapur",
    "src": "/images/proyek/tci/tci-3/cluster/tipe-45/Foto_Interior_tipe45_Dapur.webp",
    "label": "Galeri — dapur",
    "group": "TCI 3 · Cluster tipe 45",
    "pages": [
      "/proyek/tci/tci-3/tipe-45"
    ]
  },
  {
    "id": "foto-interior-tipe45-kamar2",
    "src": "/images/proyek/tci/tci-3/cluster/tipe-45/Foto_Interior_tipe45_Kamar2.webp",
    "label": "Galeri — kamar tidur utama",
    "group": "TCI 3 · Cluster tipe 45",
    "pages": [
      "/proyek/tci/tci-3/tipe-45"
    ]
  },
  {
    "id": "foto-interior-tipe45-kamar1",
    "src": "/images/proyek/tci/tci-3/cluster/tipe-45/Foto_Interior_tipe45_Kamar1.webp",
    "label": "Galeri — kamar anak",
    "group": "TCI 3 · Cluster tipe 45",
    "pages": [
      "/proyek/tci/tci-3/tipe-45"
    ]
  },
  {
    "id": "about1",
    "src": "/images/tentang/about1.webp",
    "label": "Foto pengenalan perusahaan",
    "group": "Tentang Kami",
    "pages": [
      "/tentang"
    ]
  },
  {
    "id": "about2",
    "src": "/images/tentang/about2.webp",
    "label": "Foto visi & misi",
    "group": "Tentang Kami",
    "pages": [
      "/tentang"
    ]
  },
  {
    "id": "cta-bg",
    "src": "/images/shared/cta-bg.webp",
    "label": "Latar ajakan konsultasi",
    "group": "Umum & Beranda",
    "pages": [
      "Semua halaman publik"
    ]
  },
  {
    "id": "whatsapp-svg",
    "src": "/images/icons/WhatsApp.svg.webp",
    "label": "Ikon WhatsApp",
    "group": "Umum & Beranda",
    "pages": [
      "Semua halaman publik",
      "Semua halaman publik"
    ]
  },
  {
    "id": "mtk-logo-1",
    "src": "/images/brand/mtk logo 1.png",
    "label": "Logo website (gunakan latar transparan)",
    "group": "Umum & Beranda",
    "pages": [
      "Semua halaman publik"
    ]
  }
]

export function findImageSlot(id: unknown) {
  return typeof id === 'string' ? imageSlots.find(slot => slot.id === id) : undefined
}
