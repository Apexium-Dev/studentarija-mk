-- ============================================================
-- 002_indexes.sql — Performance indexes
-- ============================================================

-- Posts
CREATE INDEX IF NOT EXISTS idx_posts_author_id  ON public.posts(author_id);
CREATE INDEX IF NOT EXISTS idx_posts_published   ON public.posts(published);
CREATE INDEX IF NOT EXISTS idx_posts_category    ON public.posts(category);
CREATE INDEX IF NOT EXISTS idx_posts_created_at  ON public.posts(created_at DESC);

-- Events
CREATE INDEX IF NOT EXISTS idx_events_created_by  ON public.events(created_by);
CREATE INDEX IF NOT EXISTS idx_events_published    ON public.events(published);
CREATE INDEX IF NOT EXISTS idx_events_city         ON public.events(city);
CREATE INDEX IF NOT EXISTS idx_events_category     ON public.events(category);
CREATE INDEX IF NOT EXISTS idx_events_start_date   ON public.events(start_date);

-- Announcements
CREATE INDEX IF NOT EXISTS idx_announcements_type       ON public.announcements(type);
CREATE INDEX IF NOT EXISTS idx_announcements_published  ON public.announcements(published);
CREATE INDEX IF NOT EXISTS idx_announcements_deadline   ON public.announcements(deadline);

-- Daily messages
CREATE INDEX IF NOT EXISTS idx_daily_messages_active ON public.daily_messages(active);
