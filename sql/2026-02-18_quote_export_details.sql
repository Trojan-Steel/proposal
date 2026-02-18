create table if not exists public.quote_export_deck_lines (
  id bigint generated always as identity primary key,
  export_id uuid not null references public.quote_exports(id) on delete cascade,
  row_index integer not null default 0,
  line_type text not null default '',
  manufacturer text not null default '',
  sqs numeric(14,2) not null default 0,
  tons numeric(14,2) not null default 0,
  units numeric(14,2) not null default 0,
  raw_json jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
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
  raw_json jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists quote_export_joist_lines_export_id_idx on public.quote_export_joist_lines (export_id);

create table if not exists public.quote_export_pricing_lines (
  id bigint generated always as identity primary key,
  export_id uuid not null references public.quote_exports(id) on delete cascade,
  row_index integer not null default 0,
  label text not null default '',
  amount numeric(14,2) not null default 0,
  raw_json jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists quote_export_pricing_lines_export_id_idx on public.quote_export_pricing_lines (export_id);
