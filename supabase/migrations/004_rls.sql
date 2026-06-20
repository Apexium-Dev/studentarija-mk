-- ============================================================
-- 004_rls.sql — Row Level Security policies
-- ============================================================

-- Enable RLS on all tables
ALTER TABLE public.profiles      ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.posts         ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.events        ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.announcements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.daily_messages ENABLE ROW LEVEL SECURITY;

-- ============================================================
-- Helper: check if current user is admin
-- ============================================================
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND role = 'admin'
  );
$$ LANGUAGE sql SECURITY DEFINER SET search_path = public, auth, pg_catalog;

-- ============================================================
-- PROFILES
-- ============================================================
CREATE POLICY "profiles_select_public"
  ON public.profiles FOR SELECT
  USING (TRUE);

CREATE POLICY "profiles_update_own"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

-- ============================================================
-- POSTS
-- ============================================================
CREATE POLICY "posts_select_published"
  ON public.posts FOR SELECT
  USING (published = TRUE OR auth.uid() = author_id OR public.is_admin());

CREATE POLICY "posts_insert_admin"
  ON public.posts FOR INSERT
  WITH CHECK (public.is_admin());

CREATE POLICY "posts_update_admin"
  ON public.posts FOR UPDATE
  USING (public.is_admin());

CREATE POLICY "posts_delete_admin"
  ON public.posts FOR DELETE
  USING (public.is_admin());

-- ============================================================
-- EVENTS
-- ============================================================
CREATE POLICY "events_select_published"
  ON public.events FOR SELECT
  USING (published = TRUE OR public.is_admin());

CREATE POLICY "events_insert_admin"
  ON public.events FOR INSERT
  WITH CHECK (public.is_admin());

CREATE POLICY "events_update_admin"
  ON public.events FOR UPDATE
  USING (public.is_admin());

CREATE POLICY "events_delete_admin"
  ON public.events FOR DELETE
  USING (public.is_admin());

-- ============================================================
-- ANNOUNCEMENTS
-- ============================================================
CREATE POLICY "announcements_select_published"
  ON public.announcements FOR SELECT
  USING (published = TRUE OR public.is_admin());

CREATE POLICY "announcements_insert_admin"
  ON public.announcements FOR INSERT
  WITH CHECK (public.is_admin());

CREATE POLICY "announcements_update_admin"
  ON public.announcements FOR UPDATE
  USING (public.is_admin());

CREATE POLICY "announcements_delete_admin"
  ON public.announcements FOR DELETE
  USING (public.is_admin());

-- ============================================================
-- DAILY MESSAGES
-- ============================================================
CREATE POLICY "daily_messages_select_active"
  ON public.daily_messages FOR SELECT
  USING (active = TRUE OR public.is_admin());

CREATE POLICY "daily_messages_insert_admin"
  ON public.daily_messages FOR INSERT
  WITH CHECK (public.is_admin());

CREATE POLICY "daily_messages_update_admin"
  ON public.daily_messages FOR UPDATE
  USING (public.is_admin());

CREATE POLICY "daily_messages_delete_admin"
  ON public.daily_messages FOR DELETE
  USING (public.is_admin());
