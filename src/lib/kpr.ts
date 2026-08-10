export function hitungCicilan({
  harga,
  dpPercent,
  bungaAnnualPercent = 7.5,
  tenorTahun,
}: {
  harga: number;
  dpPercent: number;
  bungaAnnualPercent?: number;
  tenorTahun: number;
}): {
  dpNominal: number;
  pokokPinjaman: number;
  cicilanPerBulan: number;
} {
  const dpNominal = (harga * dpPercent) / 100;
  const pokokPinjaman = harga - dpNominal;
  
  if (pokokPinjaman <= 0 || tenorTahun <= 0) {
    return { dpNominal, pokokPinjaman: 0, cicilanPerBulan: 0 };
  }

  const bungaBulan = bungaAnnualPercent / 100 / 12;
  const totalBulan = tenorTahun * 12;
  
  // Annuity Formula: P * [r(1+r)^n] / [(1+r)^n - 1]
  const cicilanPerBulan = Math.round(
    (pokokPinjaman * (bungaBulan * Math.pow(1 + bungaBulan, totalBulan))) /
      (Math.pow(1 + bungaBulan, totalBulan) - 1)
  );

  return {
    dpNominal,
    pokokPinjaman,
    cicilanPerBulan,
  };
}

export function formatRupiah(amount: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(amount);
}
