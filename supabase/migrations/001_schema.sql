-- ============================================================
-- 001_schema.sql — DDL: All table definitions
-- ============================================================

-- Enable UUID generation
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ============================================================
-- USERS (extends Supabase auth.users)
-- ============================================================
CREATE TABLE IF NOT EXISTS public.profiles (
  id          UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name   VARCHAR(255),
  avatar_url  TEXT,
  role        VARCHAR(50) NOT NULL DEFAULT 'user', -- 'user' | 'admin' | 'moderator'
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
-- POSTS (Вести)
-- ============================================================
CREATE TABLE IF NOT EXISTS public.posts (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title       VARCHAR(255) NOT NULL,
  slug        VARCHAR(255) UNIQUE NOT NULL,
  content     TEXT NOT NULL,
  excerpt     TEXT,
  cover_url   TEXT,
  category    VARCHAR(100),
  author_id   UUID NOT NULL REFERENCES public.profiles(id) ON DELETE SET NULL,
  published   BOOLEAN NOT NULL DEFAULT FALSE,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
-- EVENTS (Настани)
-- ============================================================
CREATE TABLE IF NOT EXISTS public.events (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title        VARCHAR(255) NOT NULL,
  description  TEXT,
  cover_url    TEXT,
  start_date   TIMESTAMPTZ NOT NULL,
  end_date     TIMESTAMPTZ NOT NULL,
  location     TEXT,
  city         VARCHAR(100),
  category     VARCHAR(50), -- 'party' | 'workshop' | 'sports' | 'other'
  created_by   UUID NOT NULL REFERENCES public.profiles(id) ON DELETE SET NULL,
  published    BOOLEAN NOT NULL DEFAULT FALSE,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
-- ANNOUNCEMENTS (Огласи — стипендии, работа, итн.)
-- ============================================================
CREATE TABLE IF NOT EXISTS public.announcements (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title        VARCHAR(255) NOT NULL,
  content      TEXT NOT NULL,
  type         VARCHAR(50) NOT NULL, -- 'scholarship' | 'job' | 'housing' | 'other'
  external_url TEXT,
  deadline     TIMESTAMPTZ,
  created_by   UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  published    BOOLEAN NOT NULL DEFAULT FALSE,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
-- DAILY MESSAGES (Порака на денот)
-- ============================================================
CREATE TABLE IF NOT EXISTS public.daily_messages (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  message    TEXT NOT NULL,
  author     VARCHAR(255),
  active     BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
