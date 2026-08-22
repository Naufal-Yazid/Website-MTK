export interface InquiryData {
  nama: string;
  wa: string;
  proyek?: string;
  tipe?: string;
  pertanyaan?: string;
}

export function buildWAUrl(data: InquiryData, defaultPhone = "6285759072321"): string {
  let message = `Halo, saya *${data.nama || "Calon Pembeli"}*`;
  if (data.wa) {
    message += ` (${data.wa})`;
  }
  if (data.proyek && data.proyek !== "Pilih Proyek") {
    message += ` tertarik dengan proyek *${data.proyek}*`;
  } else {
    message += ` bermaksud berkonsultasi mengenai proyek perumahan Marga Tirta Kencana`;
  }
  if (data.tipe && data.tipe !== "Pilih Tipe") {
    message += ` tipe *${data.tipe}*`;
  }
  if (data.pertanyaan && data.pertanyaan.trim().length > 0) {
    message += `.\n\nPertanyaan: ${data.pertanyaan.trim()}`;
  } else {
    message += `. Mohon informasi lebih lanjut mengenai brosur dan harga.`;
  }

  return `https://wa.me/${defaultPhone}?text=${encodeURIComponent(message)}`;
}
