-- Run after 004_site_content.sql. Only public marketing PDFs belong here.
BEGIN;

INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES ('project-brochures', 'project-brochures', true, 3145728, ARRAY['application/pdf'])
ON CONFLICT (id) DO UPDATE SET public = true, file_size_limit = 3145728, allowed_mime_types = ARRAY['application/pdf'];

DROP POLICY IF EXISTS "Active admins upload project brochures" ON storage.objects;
CREATE POLICY "Active admins upload project brochures" ON storage.objects
FOR INSERT TO authenticated WITH CHECK (
  bucket_id = 'project-brochures'
  AND EXISTS (SELECT 1 FROM public.admins WHERE id = (SELECT auth.uid()) AND is_active = true)
  AND name ~ '^(tci|rancamanyar|permata-buah-batu|tci-1|tci-2|tci-3|tipe-36|tipe-45|tipe-50|non-cluster-50|teranova)/[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}\.pdf$'
);

DROP POLICY IF EXISTS "Active admins inspect project brochures" ON storage.objects;
CREATE POLICY "Active admins inspect project brochures" ON storage.objects
FOR SELECT TO authenticated USING (
  bucket_id = 'project-brochures'
  AND EXISTS (SELECT 1 FROM public.admins WHERE id = (SELECT auth.uid()) AND is_active = true)
);

-- No UPDATE/DELETE policies: uploads use unique paths, preserving published files.
-- Public bucket downloads are public, including files not yet linked on a page.
COMMIT;
