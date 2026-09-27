import { NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { DEFAULT_CONTACT_SETTINGS, resolveContactSettings } from '@/lib/contact-settings';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const { data, error } = await createAdminClient()
      .from('site_settings')
      .select('wa_number, wa_greeting_template, company_email, company_phone, company_address, instagram_url, tiktok_url')
      .limit(1)
      .maybeSingle();

    if (error) throw error;
    return NextResponse.json(resolveContactSettings(data));
  } catch {
    return NextResponse.json(DEFAULT_CONTACT_SETTINGS);
  }
}
