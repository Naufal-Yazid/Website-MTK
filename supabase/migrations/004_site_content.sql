-- Content for existing pages only. Apply after 001, 002 and 003.
BEGIN;

CREATE TABLE IF NOT EXISTS public.site_content_drafts (
  document_key text PRIMARY KEY CHECK (document_key IN ('tci','rancamanyar','permata-buah-batu','tci-1','tci-2','tci-3','tipe-36','tipe-45','tipe-50','non-cluster-50','teranova')),
  content jsonb NOT NULL CHECK (jsonb_typeof(content) = 'object' AND octet_length(content::text) <= 131072),
  revision integer NOT NULL CHECK (revision > 0),
  updated_at timestamptz NOT NULL DEFAULT now(),
  updated_by uuid REFERENCES auth.users(id) ON DELETE SET NULL
);
CREATE TABLE IF NOT EXISTS public.site_content_published (
  document_key text PRIMARY KEY REFERENCES public.site_content_drafts(document_key),
  content jsonb NOT NULL CHECK (jsonb_typeof(content) = 'object' AND octet_length(content::text) <= 131072),
  revision integer NOT NULL CHECK (revision > 0),
  published_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.site_content_drafts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_content_published ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON public.site_content_drafts, public.site_content_published FROM anon, authenticated;
GRANT SELECT ON public.site_content_drafts TO authenticated;
GRANT SELECT ON public.site_content_published TO anon, authenticated;

DROP POLICY IF EXISTS "Active admins read content drafts" ON public.site_content_drafts;
CREATE POLICY "Active admins read content drafts" ON public.site_content_drafts
FOR SELECT TO authenticated USING (EXISTS (SELECT 1 FROM public.admins WHERE id = (SELECT auth.uid()) AND is_active = true));
DROP POLICY IF EXISTS "Visitors read published content" ON public.site_content_published;
CREATE POLICY "Visitors read published content" ON public.site_content_published
FOR SELECT TO anon, authenticated USING (true);

-- Writes only through these RPCs: server authentication plus DB authorization.
-- The transaction lock and revision checks prevent silent overwrites across admins/tabs.
CREATE OR REPLACE FUNCTION public.save_content_draft(p_key text, p_values jsonb, p_expected_revision integer)
RETURNS integer LANGUAGE plpgsql SECURITY DEFINER SET search_path = public, pg_temp AS $$
DECLARE current_revision integer; next_revision integer;
BEGIN
  IF NOT EXISTS (SELECT 1 FROM public.admins WHERE id = auth.uid() AND is_active = true) THEN
    RAISE EXCEPTION 'content_unauthorized';
  END IF;
  IF p_key IS NULL OR p_key NOT IN ('tci','rancamanyar','permata-buah-batu','tci-1','tci-2','tci-3','tipe-36','tipe-45','tipe-50','non-cluster-50','teranova')
    OR p_expected_revision IS NULL OR p_expected_revision < 0 OR p_expected_revision > 2147483645
    OR p_values IS NULL OR jsonb_typeof(p_values) <> 'object' OR octet_length(p_values::text) > 131072 THEN
    RAISE EXCEPTION 'content_invalid';
  END IF;
  PERFORM pg_advisory_xact_lock(hashtextextended('site-content:' || p_key, 0));
  SELECT revision INTO current_revision FROM public.site_content_drafts WHERE document_key = p_key;
  IF coalesce(current_revision, 0) <> p_expected_revision THEN RAISE EXCEPTION 'content_conflict'; END IF;
  next_revision := coalesce(current_revision, 0) + 1;
  INSERT INTO public.site_content_drafts(document_key, content, revision, updated_at, updated_by)
    VALUES (p_key, p_values, next_revision, now(), auth.uid())
    ON CONFLICT (document_key) DO UPDATE SET content = EXCLUDED.content, revision = EXCLUDED.revision, updated_at = EXCLUDED.updated_at, updated_by = EXCLUDED.updated_by;
  RETURN next_revision;
END;
$$;

CREATE OR REPLACE FUNCTION public.publish_content_draft(p_key text, p_expected_revision integer)
RETURNS integer LANGUAGE plpgsql SECURITY DEFINER SET search_path = public, pg_temp AS $$
DECLARE draft public.site_content_drafts%ROWTYPE;
BEGIN
  IF NOT EXISTS (SELECT 1 FROM public.admins WHERE id = auth.uid() AND is_active = true) THEN RAISE EXCEPTION 'content_unauthorized'; END IF;
  IF p_key IS NULL OR p_expected_revision IS NULL OR p_expected_revision < 1 THEN RAISE EXCEPTION 'content_invalid'; END IF;
  PERFORM pg_advisory_xact_lock(hashtextextended('site-content:' || p_key, 0));
  SELECT * INTO draft FROM public.site_content_drafts WHERE document_key = p_key;
  IF NOT FOUND THEN RAISE EXCEPTION 'content_missing'; END IF;
  IF draft.revision <> p_expected_revision THEN RAISE EXCEPTION 'content_conflict'; END IF;
  INSERT INTO public.site_content_published(document_key, content, revision, published_at)
    VALUES (p_key, draft.content, draft.revision, now())
    ON CONFLICT (document_key) DO UPDATE SET content = EXCLUDED.content, revision = EXCLUDED.revision, published_at = EXCLUDED.published_at;
  RETURN draft.revision;
END;
$$;

REVOKE ALL ON FUNCTION public.save_content_draft(text,jsonb,integer) FROM PUBLIC, anon;
REVOKE ALL ON FUNCTION public.publish_content_draft(text,integer) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.save_content_draft(text,jsonb,integer) TO authenticated;
GRANT EXECUTE ON FUNCTION public.publish_content_draft(text,integer) TO authenticated;
COMMIT;
