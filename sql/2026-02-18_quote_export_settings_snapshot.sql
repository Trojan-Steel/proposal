-- Add settings version and proposal inputs snapshot to quote_exports (idempotent).

alter table if exists public.quote_exports add column if not exists settings_version_id uuid;
alter table if exists public.quote_exports add column if not exists settings_blob_hash text;
alter table if exists public.quote_exports add column if not exists proposal_inputs jsonb;
