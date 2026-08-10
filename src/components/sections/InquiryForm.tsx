"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import { buildWAUrl } from "@/lib/wa";

interface InquiryFormProps {
  defaultProyek?: string;
  defaultTipe?: string;
}

export default function InquiryForm({
  defaultProyek = "Pilih Proyek",
  defaultTipe = "Pilih Tipe",
}: InquiryFormProps) {
  const [nama, setNama] = useState("");
  const [wa, setWa] = useState("");
  const [proyek, setProyek] = useState(defaultProyek);
  const [tipe, setTipe] = useState(defaultTipe);
  const [pertanyaan, setPertanyaan] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const url = buildWAUrl({
      nama,
      wa,
      proyek,
      tipe,
      pertanyaan,
    });
    window.open(url, "_blank");
  };

  return (
    <section className="bg-white py-16 md:py-20">
      <div className="max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 items-start">
          {/* Left Description Column */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-[3px] h-8 bg-[#0B5EAA] rounded-full" />
              <h2 className="text-xl sm:text-2xl font-bold text-[#111827]">
                Formulir Inquiry Properti
              </h2>
            </div>
            <p className="text-sm text-[#6B7280] leading-relaxed max-w-sm">
              Silakan lengkapi data di bawah ini. Informasi yang Anda masukkan akan otomatis terisi di pesan WhatsApp untuk mempercepat proses layanan kami.
            </p>
          </div>

          {/* Right Form Column */}
          <div className="md:col-span-7">
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Row 1: Nama Lengkap & Nomor WhatsApp */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                    Nama Lengkap
                  </label>
                  <input
                    type="text"
                    required
                    value={nama}
                    onChange={(e) => setNama(e.target.value)}
                    placeholder="Contoh: Budi Santoso"
                    className="w-full h-11 px-3.5 rounded-lg border border-[#E5E7EB] text-sm text-[#111827] bg-white focus:border-[#0B5EAA] focus:ring-2 focus:ring-[#0B5EAA]/20 outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                    Nomor WhatsApp
                  </label>
                  <input
                    type="tel"
                    required
                    value={wa}
                    onChange={(e) => setWa(e.target.value)}
                    placeholder="081234567XXX"
                    className="w-full h-11 px-3.5 rounded-lg border border-[#E5E7EB] text-sm text-[#111827] bg-white focus:border-[#0B5EAA] focus:ring-2 focus:ring-[#0B5EAA]/20 outline-none transition-all"
                  />
                </div>
              </div>

              {/* Row 2: Pilihan Perumahan & Tipe Perumahan */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                    Pilihan Perumahan
                  </label>
                  <select
                    value={proyek}
                    onChange={(e) => setProyek(e.target.value)}
                    className="w-full h-11 px-3.5 rounded-lg border border-[#E5E7EB] text-sm text-[#111827] bg-white focus:border-[#0B5EAA] focus:ring-2 focus:ring-[#0B5EAA]/20 outline-none transition-all cursor-pointer"
                  >
                    <option value="Pilih Proyek">Pilih Proyek</option>
                    <option value="TCI 1">TCI 1 (Taman Cibaduyut Indah 1)</option>
                    <option value="TCI 2">TCI 2 (Taman Cibaduyut Indah 2)</option>
                    <option value="TCI 3">TCI 3 (Taman Cibaduyut Indah 3)</option>
                    <option value="Rancamanyar Indah">Rancamanyar Indah</option>
                    <option value="Permata Buah Batu">Permata Buah Batu</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                    Tipe Perumahan
                  </label>
                  <select
                    value={tipe}
                    onChange={(e) => setTipe(e.target.value)}
                    className="w-full h-11 px-3.5 rounded-lg border border-[#E5E7EB] text-sm text-[#111827] bg-white focus:border-[#0B5EAA] focus:ring-2 focus:ring-[#0B5EAA]/20 outline-none transition-all cursor-pointer"
                  >
                    <option value="Pilih Tipe">Pilih Tipe</option>
                    <option value="Tipe 36">Tipe 36</option>
                    <option value="Tipe 45">Tipe 45</option>
                    <option value="Tipe 50">Tipe 50</option>
                    <option value="Ruko / Commercial">Ruko / Commercial</option>
                  </select>
                </div>
              </div>

              {/* Row 3: Pertanyaan (Opsional) */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                  Pertanyaan (Opsional)
                </label>
                <textarea
                  value={pertanyaan}
                  onChange={(e) => setPertanyaan(e.target.value)}
                  placeholder="Tuliskan pertanyaan detail Anda di sini..."
                  className="w-full h-24 p-3.5 rounded-lg border border-[#E5E7EB] text-sm text-[#111827] bg-white focus:border-[#0B5EAA] focus:ring-2 focus:ring-[#0B5EAA]/20 outline-none transition-all resize-none"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full h-12 rounded-lg bg-[#0B5EAA] text-white font-semibold text-sm hover:bg-[#0A4F91] transition-all flex items-center justify-center gap-2 shadow-sm active:scale-[0.99]"
              >
                <Send className="w-4 h-4" />
                <span>Kirim ke WhatsApp</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
