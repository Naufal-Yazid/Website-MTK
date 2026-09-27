-- Run ONLY on a disposable PostgreSQL cluster/database, never on Supabase or production.
\set ON_ERROR_STOP on
DO $$ BEGIN IF current_database() <> 'mtk_content_test' THEN RAISE EXCEPTION 'Requires disposable mtk_content_test database'; END IF; END $$;
CREATE ROLE anon NOLOGIN;
CREATE ROLE authenticated NOLOGIN;
CREATE SCHEMA auth;
CREATE TABLE auth.users (id uuid PRIMARY KEY);
CREATE FUNCTION auth.uid() RETURNS uuid LANGUAGE sql STABLE AS $$ SELECT nullif(current_setting('request.jwt.claim.sub', true), '')::uuid $$;
CREATE TABLE public.admins (id uuid PRIMARY KEY, is_active boolean NOT NULL);
GRANT USAGE ON SCHEMA public, auth TO anon, authenticated;
GRANT SELECT ON public.admins TO authenticated;
INSERT INTO auth.users VALUES ('11111111-1111-4111-8111-111111111111'), ('22222222-2222-4222-8222-222222222222');
INSERT INTO public.admins VALUES ('11111111-1111-4111-8111-111111111111', true), ('22222222-2222-4222-8222-222222222222', false);
\ir ../supabase/migrations/004_site_content.sql

SET ROLE authenticated;
SELECT set_config('request.jwt.claim.sub', '11111111-1111-4111-8111-111111111111', false);
DO $$ BEGIN
  IF public.save_content_draft('tci','{"hero.title":"draft 1"}',0) <> 1 THEN RAISE EXCEPTION 'save failed'; END IF;
  IF EXISTS (SELECT 1 FROM public.site_content_published) THEN RAISE EXCEPTION 'draft leaked before publish'; END IF;
  IF public.publish_content_draft('tci',1) <> 1 THEN RAISE EXCEPTION 'publish failed'; END IF;
  PERFORM public.save_content_draft('tci','{"hero.title":"private draft 2"}',1);
  IF (SELECT content->>'hero.title' FROM public.site_content_published WHERE document_key='tci') <> 'draft 1' THEN RAISE EXCEPTION 'draft changed live content'; END IF;
  BEGIN PERFORM public.save_content_draft('tci','{}',1); RAISE EXCEPTION 'stale save accepted';
    EXCEPTION WHEN raise_exception THEN IF SQLERRM <> 'content_conflict' THEN RAISE; END IF; END;
  BEGIN PERFORM public.publish_content_draft('tci',1); RAISE EXCEPTION 'stale publish accepted';
    EXCEPTION WHEN raise_exception THEN IF SQLERRM <> 'content_conflict' THEN RAISE; END IF; END;
  BEGIN PERFORM public.save_content_draft('unknown','{}',0); RAISE EXCEPTION 'unknown project accepted';
    EXCEPTION WHEN raise_exception THEN IF SQLERRM <> 'content_invalid' THEN RAISE; END IF; END;
  BEGIN UPDATE public.site_content_published SET content='{}'; RAISE EXCEPTION 'direct write allowed';
    EXCEPTION WHEN insufficient_privilege THEN NULL; END;
END $$;

SELECT set_config('request.jwt.claim.sub', '22222222-2222-4222-8222-222222222222', false);
DO $$ BEGIN
  IF EXISTS (SELECT 1 FROM public.site_content_drafts) THEN RAISE EXCEPTION 'inactive admin read drafts'; END IF;
  BEGIN PERFORM public.save_content_draft('tci','{}',2); RAISE EXCEPTION 'inactive save accepted';
    EXCEPTION WHEN raise_exception THEN IF SQLERRM <> 'content_unauthorized' THEN RAISE; END IF; END;
  BEGIN PERFORM public.publish_content_draft('tci',2); RAISE EXCEPTION 'inactive publish accepted';
    EXCEPTION WHEN raise_exception THEN IF SQLERRM <> 'content_unauthorized' THEN RAISE; END IF; END;
END $$;

RESET ROLE;
SET ROLE anon;
DO $$ BEGIN
  IF (SELECT content->>'hero.title' FROM public.site_content_published WHERE document_key='tci') <> 'draft 1' THEN RAISE EXCEPTION 'public content incorrect'; END IF;
  BEGIN PERFORM * FROM public.site_content_drafts; RAISE EXCEPTION 'anonymous read drafts';
    EXCEPTION WHEN insufficient_privilege THEN NULL; END;
  BEGIN PERFORM public.save_content_draft('tci','{}',2); RAISE EXCEPTION 'anonymous save accepted';
    EXCEPTION WHEN insufficient_privilege THEN NULL; END;
  BEGIN PERFORM public.publish_content_draft('tci',2); RAISE EXCEPTION 'anonymous publish accepted';
    EXCEPTION WHEN insufficient_privilege THEN NULL; END;
END $$;
RESET ROLE;
SELECT 'All content database checks passed' AS result;
