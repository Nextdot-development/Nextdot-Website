-- ============================================================================
--  Nextdot CMS — automatic publish → deploy (Option A: GoDaddy static)
-- ============================================================================
--  What this does
--  --------------
--  The public site is static (build-time prerender → GoDaddy). The ONLY way a
--  new/edited/scheduled post reaches the live HTML is a build+deploy. This runs
--  a small check inside Supabase every few minutes and, ONLY when something that
--  should be live has actually changed, pings GitHub Actions to build & deploy.
--
--  One mechanism covers everything:
--    • Publish Now      → live within ~1 cron tick (default 3 min)
--    • Edit a live post → redeploys within ~1 tick
--    • Schedule         → deploys right AFTER the chosen time (read-time rule,
--                         NO status flip, NO separate job)
--  It never build-storms: at most one dispatch per tick, and only when needed
--  (drafts / archived / future-scheduled changes never trigger a build).
--
--  This is the reliable replacement for GitHub's scheduled cron, which is
--  heavily throttled on free/public repos (that is why a post once sat for an
--  hour). pg_cron here is not throttled.
--
--  HOW TO INSTALL  (one time, ~3 min)
--  ----------------------------------
--   1. Create a GitHub token that may trigger the deploy workflow:
--        GitHub → Settings → Developer settings → Personal access tokens →
--        Fine-grained tokens → Generate new token
--          • Repository access: Only select repositories →
--                               Nextdot-development/Nextdot-Website
--          • Permissions → Repository → "Contents": Read and write
--        (A classic token with the "repo" scope also works.)
--   2. In Supabase → SQL Editor, paste THIS whole file.
--   3. Replace  PASTE_YOUR_GITHUB_TOKEN_HERE  below with that token.
--        ⚠ Keep the quotes. Do NOT send the token to anyone (not even in chat).
--   4. Run.  You should see "Success". Done — publishing is now automatic.
--
--  (deploy.yml already listens for this signal via
--   `repository_dispatch: types: [cms-publish]` — no code change needed.)
-- ============================================================================

-- 1) Extensions: scheduler + outbound HTTP (both available on all Supabase plans)
create extension if not exists pg_cron;
create extension if not exists pg_net;

-- 2) Remember the last time we asked GitHub to deploy, so we only ping on change.
create table if not exists public.deploy_state (
  id               int primary key default 1,
  last_dispatch_at timestamptz not null default now(),
  constraint deploy_state_singleton check (id = 1)
);
insert into public.deploy_state (id) values (1) on conflict (id) do nothing;

-- 3) The check-and-dispatch function.
create or replace function public.maybe_trigger_deploy()
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  last_at timestamptz;
  needs   boolean;
  -- >>> paste your GitHub token between the quotes, then delete this comment <<<
  gh_token constant text := 'PASTE_YOUR_GITHUB_TOKEN_HERE';
  gh_repo  constant text := 'Nextdot-development/Nextdot-Website';
begin
  select last_dispatch_at into last_at from public.deploy_state where id = 1;

  -- Something is (or just became) live AND changed since our last deploy?
  select exists (
    select 1 from public.blogs
    where
      -- a published post created/edited since the last deploy
      (status = 'published' and greatest(updated_at, publish_at) > last_at)
      -- OR a scheduled post whose go-live time passed since the last deploy
      or (status = 'scheduled' and publish_at <= now() and publish_at > last_at)
  ) into needs;

  if needs then
    perform net.http_post(
      url     => 'https://api.github.com/repos/' || gh_repo || '/dispatches',
      headers => jsonb_build_object(
        'Authorization', 'Bearer ' || gh_token,
        'Accept',        'application/vnd.github+json',
        'Content-Type',  'application/json',
        'User-Agent',    'nextdot-supabase-autodeploy'
      ),
      body    => jsonb_build_object('event_type', 'cms-publish')
    );
    update public.deploy_state set last_dispatch_at = now() where id = 1;
  end if;
end;
$$;

-- Only the scheduler (postgres) runs this — never the browser/anon key.
revoke all on function public.maybe_trigger_deploy() from public, anon, authenticated;

-- 4) Run it every 3 minutes. A named schedule upserts, so re-running this file
--    just updates the existing job (no duplicate).
select cron.schedule('cms-auto-deploy', '*/3 * * * *',
  $$select public.maybe_trigger_deploy();$$);

-- ---------------------------------------------------------------------------
--  Handy checks (optional)
-- ---------------------------------------------------------------------------
-- Fire a deploy right now (test):     select public.maybe_trigger_deploy();
-- See the schedule:                    select * from cron.job;
-- See recent runs:                     select * from cron.job_run_details order by start_time desc limit 5;
-- See outbound HTTP responses:         select * from net._http_response order by created desc limit 5;
-- Pause auto-deploy (instant rollback):select cron.unschedule('cms-auto-deploy');
