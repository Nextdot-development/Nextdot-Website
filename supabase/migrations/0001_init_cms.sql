-- ============================================================================
-- Nextdot Blog CMS — Supabase schema, RLS, and Storage setup
-- Paste into: Supabase Dashboard → SQL Editor → New query → Run
-- Safe to re-run (idempotent). No service-role key is ever needed in the app;
-- the browser uses only the publishable/anon key, gated by the RLS below.
-- ============================================================================

-- ---------------------------------------------------------------------------
-- Helper: auto-maintain updated_at on UPDATE
-- ---------------------------------------------------------------------------
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- ---------------------------------------------------------------------------
-- Table: categories
-- ---------------------------------------------------------------------------
create table if not exists public.categories (
  id         uuid primary key default gen_random_uuid(),
  name       text not null unique,
  slug       text not null unique,
  created_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- Table: blogs  (mirrors the CMS BlogDoc; content/faq/tags/related as jsonb)
-- ---------------------------------------------------------------------------
create table if not exists public.blogs (
  id               uuid primary key default gen_random_uuid(),
  title            text not null default '',
  slug             text not null unique,
  excerpt          text not null default '',
  content          jsonb not null default '[]'::jsonb,   -- BlogBlock[]
  featured_image   text not null default '',
  image_alt        text not null default '',
  category         text not null default '',
  tags             jsonb not null default '[]'::jsonb,    -- string[]
  seo_title        text not null default '',
  meta_description text not null default '',
  read_time        text not null default '',
  author           text not null default '',
  status           text not null default 'draft'
                     check (status in ('draft','scheduled','published','archived')),
  publish_at       timestamptz,                            -- scheduled/intended go-live
  published_at     timestamptz,                            -- first time it went live
  time_zone        text not null default 'Asia/Kolkata',
  related_blogs    jsonb not null default '[]'::jsonb,     -- slug[]
  faq              jsonb not null default '[]'::jsonb,     -- {q,a}[]
  canonical_url    text not null default '',
  og_image         text not null default '',
  twitter_image    text not null default '',
  version          integer not null default 1,
  created_by       text not null default '',
  updated_by       text not null default '',
  created_at       timestamptz not null default now(),
  updated_at       timestamptz not null default now()
);

create index if not exists blogs_status_idx      on public.blogs (status);
create index if not exists blogs_updated_at_idx  on public.blogs (updated_at desc);
create index if not exists blogs_publish_at_idx  on public.blogs (publish_at);

drop trigger if exists blogs_set_updated_at on public.blogs;
create trigger blogs_set_updated_at
  before update on public.blogs
  for each row execute function public.set_updated_at();

-- ---------------------------------------------------------------------------
-- Table: blog_versions  (version history; snapshot before each explicit save)
-- ---------------------------------------------------------------------------
create table if not exists public.blog_versions (
  id         uuid primary key default gen_random_uuid(),
  blog_id    uuid not null references public.blogs(id) on delete cascade,
  version    integer not null,
  edited_by  text not null default '',
  edited_at  timestamptz not null default now(),
  status     text not null,
  title      text not null default '',
  data       jsonb not null default '{}'::jsonb,           -- full editable payload
  created_at timestamptz not null default now()
);

create index if not exists blog_versions_blog_idx
  on public.blog_versions (blog_id, version desc);

-- ---------------------------------------------------------------------------
-- Table: media  (image library metadata; files live in Storage)
-- ---------------------------------------------------------------------------
create table if not exists public.media (
  id           uuid primary key default gen_random_uuid(),
  url          text not null,
  path         text not null,
  name         text not null default '',
  alt          text not null default '',
  caption      text not null default '',
  size         bigint not null default 0,
  content_type text not null default '',
  width        integer not null default 0,
  height       integer not null default 0,
  created_at   timestamptz not null default now()
);

create index if not exists media_created_at_idx on public.media (created_at desc);

-- ---------------------------------------------------------------------------
-- Seed default categories (no-op if already present)
-- ---------------------------------------------------------------------------
insert into public.categories (name, slug) values
  ('Featured',    'featured'),
  ('Voice AI',    'voice-ai'),
  ('Healthcare',  'healthcare'),
  ('Compliance',  'compliance'),
  ('AI Strategy', 'ai-strategy')
on conflict (name) do nothing;

-- ============================================================================
-- ROW LEVEL SECURITY
-- Restrictive by default: RLS ON + policies ONLY for the `authenticated` role.
-- The `anon` role has no policy → no read and no write on CMS tables.
-- (The public website is static/prerendered and never reads these tables.)
-- ============================================================================
alter table public.blogs         enable row level security;
alter table public.blog_versions enable row level security;
alter table public.categories    enable row level security;
alter table public.media         enable row level security;

drop policy if exists "admin_full_access_blogs"         on public.blogs;
drop policy if exists "admin_full_access_blog_versions" on public.blog_versions;
drop policy if exists "admin_full_access_categories"    on public.categories;
drop policy if exists "admin_full_access_media"         on public.media;

create policy "admin_full_access_blogs"
  on public.blogs         for all to authenticated using (true) with check (true);
create policy "admin_full_access_blog_versions"
  on public.blog_versions for all to authenticated using (true) with check (true);
create policy "admin_full_access_categories"
  on public.categories    for all to authenticated using (true) with check (true);
create policy "admin_full_access_media"
  on public.media         for all to authenticated using (true) with check (true);

-- ============================================================================
-- STORAGE: blog-images bucket (public read, authenticated write)
-- 10 MB limit + image MIME allowlist enforced at the bucket level.
-- ============================================================================
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'blog-images', 'blog-images', true, 10485760,
  array['image/png','image/jpeg','image/jpg','image/webp','image/gif','image/avif','image/svg+xml']
)
on conflict (id) do update
  set public = true,
      file_size_limit = 10485760,
      allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "blog_images_public_read"   on storage.objects;
drop policy if exists "blog_images_admin_insert"  on storage.objects;
drop policy if exists "blog_images_admin_update"  on storage.objects;
drop policy if exists "blog_images_admin_delete"  on storage.objects;

-- Anyone may READ images (so <img src> works on the static public site).
create policy "blog_images_public_read"
  on storage.objects for select
  to public
  using (bucket_id = 'blog-images');

-- Only authenticated admins may upload / modify / remove images.
create policy "blog_images_admin_insert"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'blog-images');

create policy "blog_images_admin_update"
  on storage.objects for update
  to authenticated
  using (bucket_id = 'blog-images')
  with check (bucket_id = 'blog-images');

create policy "blog_images_admin_delete"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'blog-images');

-- ============================================================================
-- REALTIME (optional): let the admin lists update live. Harmless if unused.
-- ============================================================================
do $$
begin
  if not exists (select 1 from pg_publication_tables
                 where pubname='supabase_realtime' and schemaname='public' and tablename='blogs') then
    alter publication supabase_realtime add table public.blogs;
  end if;
  if not exists (select 1 from pg_publication_tables
                 where pubname='supabase_realtime' and schemaname='public' and tablename='categories') then
    alter publication supabase_realtime add table public.categories;
  end if;
  if not exists (select 1 from pg_publication_tables
                 where pubname='supabase_realtime' and schemaname='public' and tablename='media') then
    alter publication supabase_realtime add table public.media;
  end if;
  if not exists (select 1 from pg_publication_tables
                 where pubname='supabase_realtime' and schemaname='public' and tablename='blog_versions') then
    alter publication supabase_realtime add table public.blog_versions;
  end if;
end $$;

-- Done.
