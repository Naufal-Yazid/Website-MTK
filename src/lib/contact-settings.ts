export const DEFAULT_CONTACT_SETTINGS = {
  waNumber: '6285759072321',
  waGreetingTemplate: 'Halo {nama}, terima kasih telah tertarik dengan proyek {proyek}.',
  companyEmail: 'marketingmtk140@gmail.com',
  companyPhone: '+62 857 5907 2321',
  companyAddress: 'Jl. BKR No.140, Cigereleng, Kec. Regol, Kota Bandung, Jawa Barat 40253',
  instagramUrl: 'https://www.instagram.com/marketing.mtk140?utm_source=ig_web_button_share_sheet&igsi=ZDNlZDc0MzIxNw==',
  tiktokUrl: 'https://www.tiktok.com/@rumahmurah.project?is_from_webapp=1&sender_device=pc',
};

type ContactSettingsSource = {
  wa_number?: string | null;
  wa_greeting_template?: string | null;
  company_email?: string | null;
  company_phone?: string | null;
  company_address?: string | null;
  instagram_url?: string | null;
  tiktok_url?: string | null;
};

export function resolveContactSettings(source?: ContactSettingsSource | null) {
  return {
    waNumber: source?.wa_number || DEFAULT_CONTACT_SETTINGS.waNumber,
    waGreetingTemplate: source?.wa_greeting_template || DEFAULT_CONTACT_SETTINGS.waGreetingTemplate,
    companyEmail: source?.company_email || DEFAULT_CONTACT_SETTINGS.companyEmail,
    companyPhone: source?.company_phone || DEFAULT_CONTACT_SETTINGS.companyPhone,
    companyAddress: source?.company_address || DEFAULT_CONTACT_SETTINGS.companyAddress,
    instagramUrl: source?.instagram_url || DEFAULT_CONTACT_SETTINGS.instagramUrl,
    tiktokUrl: source?.tiktok_url || DEFAULT_CONTACT_SETTINGS.tiktokUrl,
  };
}

export type ResolvedContactSettings = ReturnType<typeof resolveContactSettings>;
