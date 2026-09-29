-- Run after 005_project_brochures.sql. Marketing images only; no private documents.
BEGIN;
CREATE TABLE IF NOT EXISTS public.site_image_drafts (
  image_key text PRIMARY KEY CHECK (image_key IN ('hero-image','tci-icon-banner','rancamanyar-banner','permatabb-gate-banner','home1','permatabuahbatu-detail','rancamanyar-card','rancamanyar-living','rancamanyar-bed','rancamanyar-back','tci1-gate','gerbangtci2-herobanner','tci3-gate-banner','kantorpemasaran-tci','tci1-living','tci1-bed','tci1-kitchen','tci1-house-card','tci2-living','tci2-bed','tci2-kitchen','rumah-tci2','tci3-tipe-36','tipe45-depannn','tci3-tipe-50','tci3-t50-nc-detail','tci3-ruko-ta-card','rumah-tci3','50-90','tipe50-living','tipe50-bed','tipe50-kitchen','ruko-hall2','fp-terranova','ruko-hall','ruko-porch','ruko-kitchen','tci3-tipe36-hero','tci3-tipe36-spesifikasi','36-72','tci3-tipe36-kamar-utama','tci3-tipe36-kamar-anak','tipe45-depansamping','45-84','foto-interior-tipe45-dapur','foto-interior-tipe45-kamar2','foto-interior-tipe45-kamar1','about1','about2','cta-bg','whatsapp-svg','mtk-logo-1')),
  path text NOT NULL,
  revision integer NOT NULL CHECK (revision > 0),
  width integer NOT NULL DEFAULT 0 CHECK (width BETWEEN 0 AND 3200),
  height integer NOT NULL DEFAULT 0 CHECK (height BETWEEN 0 AND 3200),
  bytes integer NOT NULL DEFAULT 0 CHECK (bytes BETWEEN 0 AND 3145728),
  updated_at timestamptz NOT NULL DEFAULT now(),
  updated_by uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  CHECK (path = '' OR (split_part(path, '/', 1) = image_key AND path ~ '^[a-z0-9-]+/[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}\.webp$'))
);
CREATE TABLE IF NOT EXISTS public.site_image_published (
  image_key text PRIMARY KEY REFERENCES public.site_image_drafts(image_key),
  path text NOT NULL,
  revision integer NOT NULL CHECK (revision > 0),
  width integer NOT NULL DEFAULT 0,
  height integer NOT NULL DEFAULT 0,
  bytes integer NOT NULL DEFAULT 0,
  published_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.site_image_drafts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_image_published ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON public.site_image_drafts, public.site_image_published FROM anon, authenticated;
GRANT SELECT ON public.site_image_drafts TO authenticated;
GRANT SELECT ON public.site_image_published TO anon, authenticated;
DROP POLICY IF EXISTS "Active admins read image drafts" ON public.site_image_drafts;
CREATE POLICY "Active admins read image drafts" ON public.site_image_drafts FOR SELECT TO authenticated
USING (EXISTS (SELECT 1 FROM public.admins WHERE id = (SELECT auth.uid()) AND is_active = true));
DROP POLICY IF EXISTS "Visitors read published images" ON public.site_image_published;
CREATE POLICY "Visitors read published images" ON public.site_image_published FOR SELECT TO anon, authenticated USING (true);

INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES ('website-images', 'website-images', true, 3145728, ARRAY['image/webp'])
ON CONFLICT (id) DO UPDATE SET public = true, file_size_limit = 3145728, allowed_mime_types = ARRAY['image/webp'];
DROP POLICY IF EXISTS "Active admins upload website images" ON storage.objects;
CREATE POLICY "Active admins upload website images" ON storage.objects FOR INSERT TO authenticated WITH CHECK (
  bucket_id = 'website-images'
  AND EXISTS (SELECT 1 FROM public.admins WHERE id = (SELECT auth.uid()) AND is_active = true)
  AND split_part(name, '/', 1) IN ('hero-image','tci-icon-banner','rancamanyar-banner','permatabb-gate-banner','home1','permatabuahbatu-detail','rancamanyar-card','rancamanyar-living','rancamanyar-bed','rancamanyar-back','tci1-gate','gerbangtci2-herobanner','tci3-gate-banner','kantorpemasaran-tci','tci1-living','tci1-bed','tci1-kitchen','tci1-house-card','tci2-living','tci2-bed','tci2-kitchen','rumah-tci2','tci3-tipe-36','tipe45-depannn','tci3-tipe-50','tci3-t50-nc-detail','tci3-ruko-ta-card','rumah-tci3','50-90','tipe50-living','tipe50-bed','tipe50-kitchen','ruko-hall2','fp-terranova','ruko-hall','ruko-porch','ruko-kitchen','tci3-tipe36-hero','tci3-tipe36-spesifikasi','36-72','tci3-tipe36-kamar-utama','tci3-tipe36-kamar-anak','tipe45-depansamping','45-84','foto-interior-tipe45-dapur','foto-interior-tipe45-kamar2','foto-interior-tipe45-kamar1','about1','about2','cta-bg','whatsapp-svg','mtk-logo-1')
  AND name ~ '^[a-z0-9-]+/[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}\.webp$'
);
DROP POLICY IF EXISTS "Active admins inspect website images" ON storage.objects;
CREATE POLICY "Active admins inspect website images" ON storage.objects FOR SELECT TO authenticated USING (
  bucket_id = 'website-images' AND EXISTS (SELECT 1 FROM public.admins WHERE id = (SELECT auth.uid()) AND is_active = true)
);
-- No UPDATE/DELETE permission: replacement uploads never overwrite live files.

CREATE OR REPLACE FUNCTION public.save_image_draft(p_key text, p_path text, p_width integer, p_height integer, p_bytes integer, p_expected_revision integer)
RETURNS integer LANGUAGE plpgsql SECURITY DEFINER SET search_path = public, pg_temp AS $$
DECLARE current_revision integer; next_revision integer;
BEGIN
  IF NOT EXISTS (SELECT 1 FROM public.admins WHERE id = auth.uid() AND is_active = true) THEN RAISE EXCEPTION 'image_unauthorized'; END IF;
  IF p_key IS NULL OR p_key NOT IN ('hero-image','tci-icon-banner','rancamanyar-banner','permatabb-gate-banner','home1','permatabuahbatu-detail','rancamanyar-card','rancamanyar-living','rancamanyar-bed','rancamanyar-back','tci1-gate','gerbangtci2-herobanner','tci3-gate-banner','kantorpemasaran-tci','tci1-living','tci1-bed','tci1-kitchen','tci1-house-card','tci2-living','tci2-bed','tci2-kitchen','rumah-tci2','tci3-tipe-36','tipe45-depannn','tci3-tipe-50','tci3-t50-nc-detail','tci3-ruko-ta-card','rumah-tci3','50-90','tipe50-living','tipe50-bed','tipe50-kitchen','ruko-hall2','fp-terranova','ruko-hall','ruko-porch','ruko-kitchen','tci3-tipe36-hero','tci3-tipe36-spesifikasi','36-72','tci3-tipe36-kamar-utama','tci3-tipe36-kamar-anak','tipe45-depansamping','45-84','foto-interior-tipe45-dapur','foto-interior-tipe45-kamar2','foto-interior-tipe45-kamar1','about1','about2','cta-bg','whatsapp-svg','mtk-logo-1') OR p_path IS NULL
     OR p_expected_revision IS NULL OR p_expected_revision < 0 OR p_expected_revision > 2147483645
     OR p_width IS NULL OR p_height IS NULL OR p_bytes IS NULL THEN RAISE EXCEPTION 'image_invalid'; END IF;
  IF p_path <> '' AND NOT EXISTS (SELECT 1 FROM storage.objects WHERE bucket_id = 'website-images' AND name = p_path) THEN RAISE EXCEPTION 'image_file_missing'; END IF;
  PERFORM pg_advisory_xact_lock(hashtextextended('site-image:' || p_key, 0));
  SELECT revision INTO current_revision FROM public.site_image_drafts WHERE image_key = p_key;
  IF coalesce(current_revision, 0) <> p_expected_revision THEN RAISE EXCEPTION 'image_conflict'; END IF;
  next_revision := coalesce(current_revision, 0) + 1;
  INSERT INTO public.site_image_drafts(image_key, path, revision, width, height, bytes, updated_by)
  VALUES (p_key, p_path, next_revision, p_width, p_height, p_bytes, auth.uid())
  ON CONFLICT (image_key) DO UPDATE SET path = EXCLUDED.path, revision = EXCLUDED.revision, width = EXCLUDED.width,
    height = EXCLUDED.height, bytes = EXCLUDED.bytes, updated_at = now(), updated_by = auth.uid();
  RETURN next_revision;
END;
$$;
CREATE OR REPLACE FUNCTION public.publish_image_draft(p_key text, p_expected_revision integer)
RETURNS integer LANGUAGE plpgsql SECURITY DEFINER SET search_path = public, pg_temp AS $$
DECLARE draft public.site_image_drafts%ROWTYPE;
BEGIN
  IF NOT EXISTS (SELECT 1 FROM public.admins WHERE id = auth.uid() AND is_active = true) THEN RAISE EXCEPTION 'image_unauthorized'; END IF;
  IF p_key IS NULL OR p_expected_revision IS NULL OR p_expected_revision < 1 THEN RAISE EXCEPTION 'image_invalid'; END IF;
  PERFORM pg_advisory_xact_lock(hashtextextended('site-image:' || p_key, 0));
  SELECT * INTO draft FROM public.site_image_drafts WHERE image_key = p_key;
  IF NOT FOUND THEN RAISE EXCEPTION 'image_missing'; END IF;
  IF draft.revision <> p_expected_revision THEN RAISE EXCEPTION 'image_conflict'; END IF;
  IF draft.path <> '' AND NOT EXISTS (SELECT 1 FROM storage.objects WHERE bucket_id = 'website-images' AND name = draft.path) THEN RAISE EXCEPTION 'image_file_missing'; END IF;
  INSERT INTO public.site_image_published(image_key, path, revision, width, height, bytes)
  VALUES (p_key, draft.path, draft.revision, draft.width, draft.height, draft.bytes)
  ON CONFLICT (image_key) DO UPDATE SET path = EXCLUDED.path, revision = EXCLUDED.revision, width = EXCLUDED.width,
    height = EXCLUDED.height, bytes = EXCLUDED.bytes, published_at = now();
  RETURN draft.revision;
END;
$$;
REVOKE ALL ON FUNCTION public.save_image_draft(text,text,integer,integer,integer,integer) FROM PUBLIC, anon;
REVOKE ALL ON FUNCTION public.publish_image_draft(text,integer) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.save_image_draft(text,text,integer,integer,integer,integer) TO authenticated;
GRANT EXECUTE ON FUNCTION public.publish_image_draft(text,integer) TO authenticated;
COMMIT;
