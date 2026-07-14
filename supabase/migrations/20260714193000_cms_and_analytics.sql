-- CMS + analytics persistence for Luxury Cabins (Cloudflare Workers-safe)

create table if not exists public.cms_state (
  id text primary key default 'main',
  data jsonb not null,
  updated_at timestamptz not null default now()
);

create table if not exists public.analytics_state (
  id text primary key default 'main',
  data jsonb not null,
  updated_at timestamptz not null default now()
);

alter table public.cms_state enable row level security;
alter table public.analytics_state enable row level security;

-- Public read for published CMS (site rendering). Writes only via service role.
drop policy if exists "cms_state_public_read" on public.cms_state;
create policy "cms_state_public_read"
  on public.cms_state
  for select
  to anon, authenticated
  using (true);

drop policy if exists "analytics_state_no_public" on public.analytics_state;
create policy "analytics_state_no_public"
  on public.analytics_state
  for select
  to authenticated
  using (false);

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'uploads',
  'uploads',
  true,
  8388608,
  array['image/jpeg', 'image/png', 'image/webp', 'image/gif']
)
on conflict (id) do update set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "uploads_public_read" on storage.objects;
create policy "uploads_public_read"
  on storage.objects
  for select
  to public
  using (bucket_id = 'uploads');

drop policy if exists "uploads_service_insert" on storage.objects;
create policy "uploads_service_insert"
  on storage.objects
  for insert
  to authenticated
  with check (bucket_id = 'uploads');
