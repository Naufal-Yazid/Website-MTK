"use client";

import { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { hitungCicilan, formatRupiah } from "@/lib/kpr";

interface KPRCalculatorProps {
  initialHarga?: number;
}

export default function KPRCalculator({ initialHarga = 500000000 }: KPRCalculatorProps) {
  const [harga, setHarga] = useState<number>(initialHarga);
  const [dpPercent, setDpPercent] = useState<number>(10);
  const [bank, setBank] = useState<string>("BCA");
  const [tenor, setTenor] = useState<number>(15);

  // Bank interest rates reference
  const bankRates: Record<string, number> = {
    BCA: 7.25,
    BRI: 7.5,
    Mandiri: 7.4,
    BTN: 7.75,
  };

  const currentRate = bankRates[bank] || 7.5;
  const { dpNominal, cicilanPerBulan } = hitungCicilan({
    harga,
    dpPercent,
    bungaAnnualPercent: currentRate,
    tenorTahun: tenor,
  });

  return (
    <section className="bg-[#F9FAFB] py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          {/* Left Description Column */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <span className="text-xs uppercase tracking-widest font-semibold text-[#0B5EAA]">
                KPR
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#111827] mt-1">
                Simulasi KPR
              </h2>
            </div>

            <p className="text-sm text-[#6B7280] leading-relaxed">
              Hitung estimasi cicilan bulanan Anda dengan kalkulator pintar kami. Rencanakan keuangan Anda dengan lebih baik bersama Marga Tirta Kencana.
            </p>

            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-3 text-sm text-[#111827] font-medium">
                <CheckCircle2 className="w-5 h-5 text-[#0B5EAA] shrink-0" />
                <span>Kerjasama resmi dengan Bank ternama</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-[#111827] font-medium">
                <CheckCircle2 className="w-5 h-5 text-[#0B5EAA] shrink-0" />
                <span>Proses persetujuan cepat & mudah</span>
              </div>
            </div>
          </div>

          {/* Right Interactive Card Column */}
          <div className="lg:col-span-7">
            <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 sm:p-8 shadow-sm space-y-5">
              {/* Field 1: Property Price */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                  Harga Properti (IDR)
                </label>
                <input
                  type="text"
                  readOnly
                  value={harga.toLocaleString("id-ID")}
                  className="w-full h-11 px-3.5 rounded-lg border border-[#E5E7EB] text-sm text-[#111827] bg-[#F9FAFB] font-semibold cursor-not-allowed outline-none"
                />
              </div>

              {/* Field 2: Down Payment (DP) */}
              <div>
                <div className="flex items-center justify-between text-xs font-semibold text-gray-700 mb-1.5">
                  <span>Uang Muka (DP) {dpPercent}%</span>
                  <span className="text-[#0B5EAA] font-bold">
                    {formatRupiah(dpNominal)} ({dpPercent}%)
                  </span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="50"
                  step="5"
                  value={dpPercent}
                  onChange={(e) => setDpPercent(Number(e.target.value))}
                  className="w-full accent-[#0B5EAA] cursor-pointer"
                />
              </div>

              {/* Field 3: Bank Select */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                  Pilih Bank
                </label>
                <select
                  value={bank}
                  onChange={(e) => setBank(e.target.value)}
                  className="w-full h-11 px-3.5 rounded-lg border border-[#E5E7EB] text-sm text-[#111827] bg-white focus:border-[#0B5EAA] focus:ring-2 focus:ring-[#0B5EAA]/20 outline-none cursor-pointer"
                >
                  <option value="BCA">BCA (Bunga ~7.25%/th)</option>
                  <option value="BRI">BRI (Bunga ~7.50%/th)</option>
                  <option value="Mandiri">Mandiri (Bunga ~7.40%/th)</option>
                  <option value="BTN">BTN (Bunga ~7.75%/th)</option>
                </select>
              </div>

              {/* Field 4: Tenor */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                  Tenor (Tahun)
                </label>
                <select
                  value={tenor}
                  onChange={(e) => setTenor(Number(e.target.value))}
                  className="w-full h-11 px-3.5 rounded-lg border border-[#E5E7EB] text-sm text-[#111827] bg-white focus:border-[#0B5EAA] focus:ring-2 focus:ring-[#0B5EAA]/20 outline-none cursor-pointer"
                >
                  <option value={5}>5 Tahun</option>
                  <option value={10}>10 Tahun</option>
                  <option value={15}>15 Tahun</option>
                  <option value={20}>20 Tahun</option>
                  <option value={25}>25 Tahun</option>
                  <option value={30}>30 Tahun</option>
                </select>
              </div>

              {/* Divider */}
              <div className="border-t border-[#E5E7EB] pt-4">
                <div className="text-xs text-[#6B7280]">Estimasi Cicilan Bulanan</div>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-2xl sm:text-3xl font-bold text-[#0B5EAA]">
                    {formatRupiah(cicilanPerBulan)}
                  </span>
                  <span className="text-sm text-[#6B7280]">/ bulan*</span>
                </div>
                <p className="text-[11px] italic text-[#6B7280] mt-2">
                  *Hanya estimasi, suku bunga dapat berubah sewaktu-waktu sesuai ketentuan bank.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
