create extension if not exists pgcrypto;

create table if not exists public.quote_exports (
  id uuid primary key default gen_random_uuid(),
  export_uuid text not null unique,
  quote_ref text not null default '',
  project_name text not null default '',
  selected_option_name text not null default '',
  is_boost_on boolean not null default false,
  final_subtotal numeric(14,2) not null default 0,
  total_margin_dollars numeric(14,2) not null default 0,
  total_margin_pct numeric(9,4) not null default 0,
  deck_supplier text not null default '',
  joist_supplier text not null default '',
  app_version text not null default '',
  snapshot_json jsonb not null,
  created_at timestamptz not null default now()
);

create index if not exists quote_exports_created_at_idx on public.quote_exports (created_at desc);
create index if not exists quote_exports_project_name_idx on public.quote_exports (project_name);
create index if not exists quote_exports_quote_ref_idx on public.quote_exports (quote_ref);

create table if not exists public.quote_export_deck_lines (
  id bigint generated always as identity primary key,
  export_id uuid not null references public.quote_exports(id) on delete cascade,
  row_index integer not null default 0,
  line_type text not null default '',
  manufacturer text not null default '',
  sqs numeric(14,2) not null default 0,
  tons numeric(14,2) not null default 0,
  units numeric(14,2) not null default 0,
  raw_json jsonb not null default '{}'::jsonb
);

create index if not exists quote_export_deck_lines_export_id_idx on public.quote_export_deck_lines (export_id);

create table if not exists public.quote_export_joist_lines (
  id bigint generated always as identity primary key,
  export_id uuid not null references public.quote_exports(id) on delete cascade,
  row_index integer not null default 0,
  description text not null default '',
  manufacturer text not null default '',
  units numeric(14,2) not null default 0,
  tons numeric(14,2) not null default 0,
  raw_json jsonb not null default '{}'::jsonb
);

create index if not exists quote_export_joist_lines_export_id_idx on public.quote_export_joist_lines (export_id);

create table if not exists public.quote_export_pricing_lines (
  id bigint generated always as identity primary key,
  export_id uuid not null references public.quote_exports(id) on delete cascade,
  row_index integer not null default 0,
  label text not null default '',
  amount numeric(14,2) not null default 0,
  raw_json jsonb not null default '{}'::jsonb
);

create index if not exists quote_export_pricing_lines_export_id_idx on public.quote_export_pricing_lines (export_id);
