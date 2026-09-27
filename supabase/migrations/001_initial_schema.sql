-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create admins table
CREATE TABLE public.admins (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT NOT NULL UNIQUE,
    full_name TEXT NOT NULL,
    avatar_url TEXT,
    role TEXT NOT NULL DEFAULT 'admin' CHECK (role IN ('super_admin', 'admin')),
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Apply updated_at trigger to admins
CREATE TRIGGER update_admins_updated_at
    BEFORE UPDATE ON public.admins
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Create inquiries table
CREATE TABLE public.inquiries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    full_name TEXT NOT NULL,
    whatsapp_number TEXT NOT NULL,
    selected_project TEXT,
    selected_type TEXT,
    message TEXT,
    status TEXT NOT NULL DEFAULT 'baru' CHECK (status IN ('baru', 'diproses', 'sudah_dihubungi', 'batal')),
    wa_clicked BOOLEAN NOT NULL DEFAULT false,
    is_read BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Apply updated_at trigger to inquiries
CREATE TRIGGER update_inquiries_updated_at
    BEFORE UPDATE ON public.inquiries
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Create site_settings table
CREATE TABLE public.site_settings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    wa_number TEXT,
    wa_greeting_template TEXT,
    company_email TEXT,
    company_phone TEXT,
    company_address TEXT,
    instagram_url TEXT,
    tiktok_url TEXT,
    facebook_url TEXT,
    youtube_url TEXT,
    ga_measurement_id TEXT,
    meta_pixel_id TEXT,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_by UUID REFERENCES public.admins(id) ON DELETE SET NULL
);

-- Apply updated_at trigger to site_settings
CREATE TRIGGER update_site_settings_updated_at
    BEFORE UPDATE ON public.site_settings
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Create wa_click_logs table
CREATE TABLE public.wa_click_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    inquiry_id UUID NOT NULL REFERENCES public.inquiries(id) ON DELETE CASCADE,
    admin_id UUID NOT NULL REFERENCES public.admins(id) ON DELETE CASCADE,
    clicked_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_inquiries_created_at ON public.inquiries(created_at DESC);
CREATE INDEX idx_inquiries_status ON public.inquiries(status);
CREATE INDEX idx_inquiries_is_read ON public.inquiries(is_read);
CREATE INDEX idx_wa_click_logs_clicked_at ON public.wa_click_logs(clicked_at DESC);

-- Enable RLS
ALTER TABLE public.admins ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.wa_click_logs ENABLE ROW LEVEL SECURITY;

-- Admin profiles are readable by signed-in admins. Mutations that can affect
-- privileges are performed by verified Server Actions with the service role.
CREATE POLICY "Authenticated users can read admins"
    ON public.admins FOR SELECT TO authenticated USING (true);

-- Inquiries
CREATE POLICY "Allow authenticated users full access on inquiries"
    ON public.inquiries
    FOR ALL
    TO authenticated
    USING (true)
    WITH CHECK (true);

-- Public forms may create leads, but only authenticated admins may read/change them.
CREATE POLICY "Public can create inquiries"
    ON public.inquiries FOR INSERT TO anon WITH CHECK (true);

-- Settings are readable by admins. Writes go through privileged Server Actions.
CREATE POLICY "Authenticated users can read site settings"
    ON public.site_settings FOR SELECT TO authenticated USING (true);

-- WA Click Logs
CREATE POLICY "Allow authenticated users full access on wa_click_logs"
    ON public.wa_click_logs
    FOR ALL
    TO authenticated
    USING (true)
    WITH CHECK (true);

-- Insert default site_settings
INSERT INTO public.site_settings (wa_number, wa_greeting_template)
VALUES ('', 'Halo {nama}, terima kasih telah tertarik dengan proyek {proyek}.');

-- Public avatar bucket. Upload/delete remains restricted to authenticated admins.
INSERT INTO storage.buckets (id, name, public)
VALUES ('avatars', 'avatars', true)
ON CONFLICT (id) DO UPDATE SET public = EXCLUDED.public;

CREATE POLICY "Public can view admin avatars"
    ON storage.objects FOR SELECT TO public USING (bucket_id = 'avatars');

CREATE POLICY "Admins can upload avatars"
    ON storage.objects FOR INSERT TO authenticated
    WITH CHECK (bucket_id = 'avatars');

CREATE POLICY "Admins can update avatars"
    ON storage.objects FOR UPDATE TO authenticated
    USING (bucket_id = 'avatars') WITH CHECK (bucket_id = 'avatars');
