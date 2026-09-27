-- Apply after 001 and 002. No existing tables or data are removed.
BEGIN;

CREATE TABLE IF NOT EXISTS public.admin_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  kind text NOT NULL CHECK (kind IN ('audit', 'error')),
  source text NOT NULL CHECK (source IN ('admin_action', 'server')),
  actor_id uuid,
  actor_name text NOT NULL DEFAULT 'Sistem',
  action text NOT NULL,
  target_id text,
  summary text NOT NULL,
  details jsonb NOT NULL DEFAULT '{}'::jsonb,
  CONSTRAINT admin_logs_summary_length CHECK (length(summary) <= 500),
  CONSTRAINT admin_logs_action_length CHECK (length(action) <= 160)
);

-- Actor snapshots deliberately have no FK: deleting an admin must preserve history.
CREATE INDEX IF NOT EXISTS admin_logs_created_idx ON public.admin_logs (created_at DESC, id DESC);
CREATE INDEX IF NOT EXISTS admin_logs_kind_created_idx ON public.admin_logs (kind, created_at DESC);
ALTER TABLE public.admin_logs ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON public.admin_logs FROM anon, authenticated;
GRANT SELECT ON public.admin_logs TO authenticated;
GRANT SELECT, INSERT ON public.admin_logs TO service_role;

DROP POLICY IF EXISTS "Active admins can read logs" ON public.admin_logs;
CREATE POLICY "Active admins can read logs" ON public.admin_logs
  FOR SELECT TO authenticated
  USING (EXISTS (
    SELECT 1 FROM public.admins
    WHERE id = (SELECT auth.uid()) AND is_active = true
  ));

-- Logs are append-only for the application, including the service role.
REVOKE UPDATE, DELETE, TRUNCATE ON public.admin_logs FROM service_role;
COMMIT;
