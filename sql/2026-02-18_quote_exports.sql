create extension if not exists pgcrypto;

create table if not exists public.quote_exports (
  id uuid primary key default gen_random_uuid(),
  export_uuid text not null unique,
  quote_ref text not null default '',
  project_name text not null default '',
  project_location text not null default '',
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

alter table if exists public.quote_exports add column if not exists project_location text not null default '';

create index if not exists quote_exports_created_at_idx on public.quote_exports (created_at desc);
create index if not exists quote_exports_project_name_idx on public.quote_exports (project_name);
create index if not exists quote_exports_quote_ref_idx on public.quote_exports (quote_ref);
