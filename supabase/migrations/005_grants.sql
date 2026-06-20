-- ============================================================
-- 005_grants.sql — Role permissions for anon and authenticated
-- ============================================================

-- ANON: read-only on public content
GRANT SELECT ON public.profiles       TO anon;
GRANT SELECT ON public.posts          TO anon;
GRANT SELECT ON public.events         TO anon;
GRANT SELECT ON public.announcements  TO anon;
GRANT SELECT ON public.daily_messages TO anon;

-- AUTHENTICATED: read + own profile update
GRANT SELECT ON public.profiles       TO authenticated;
GRANT SELECT ON public.posts          TO authenticated;
GRANT SELECT ON public.events         TO authenticated;
GRANT SELECT ON public.announcements  TO authenticated;
GRANT SELECT ON public.daily_messages TO authenticated;
GRANT UPDATE ON public.profiles       TO authenticated;

-- SERVICE ROLE: full access (used server-side only)
GRANT ALL ON public.profiles          TO service_role;
GRANT ALL ON public.posts             TO service_role;
GRANT ALL ON public.events            TO service_role;
GRANT ALL ON public.announcements     TO service_role;
GRANT ALL ON public.daily_messages    TO service_role;
