-- ============================================================
-- seed.sql — DML: Dummy data for local development
-- ============================================================
-- NOTE: Run this AFTER migrations 001–004.
-- NOTE: Admin user must be created via Supabase Auth first,
--       then update the profile role manually:
--       UPDATE public.profiles SET role = 'admin' WHERE id = '<your-user-id>';

-- ============================================================
-- DAILY MESSAGES
-- ============================================================
INSERT INTO public.daily_messages (message, author) VALUES
  ('Не заборавај — секој испит е само уште еден чекор напред.', 'Тим Студентарија'),
  ('Кафето е студентскиот гориво. Продолжи!', NULL),
  ('Рокот е утре. Но ти го знаеш тоа.', 'Тим Студентарија'),
  ('Ако студираш во 2 часот навечер, знај дека не си сам.', NULL),
  ('Успехот не доаѓа преку ноќ — но ни дедлајнот.', 'Тим Студентарија');

-- ============================================================
-- POSTS (requires a valid author_id from profiles)
-- ============================================================
-- Uncomment and replace <ADMIN_USER_ID> after creating admin user:
--
-- INSERT INTO public.posts (title, slug, content, excerpt, category, author_id, published) VALUES
--   (
--     'Нови стипендии за академска 2026/2027',
--     'novi-stipendii-2026-2027',
--     'Министерството за образование објави нов конкурс за доделување стипендии...',
--     'Конкурс за стипендии отворен до 15 јули.',
--     'стипендии',
--     '<ADMIN_USER_ID>',
--     TRUE
--   ),
--   (
--     'Промени во распоредот на испити — јунска сесија',
--     'promeni-raspored-ispiti-juni',
--     'Деканатот на ФИНКИ објави измени во распоредот на испити...',
--     'Важно за студентите на ФИНКИ.',
--     'администрација',
--     '<ADMIN_USER_ID>',
--     TRUE
--   );

-- ============================================================
-- EVENTS (requires a valid created_by from profiles)
-- ============================================================
-- Uncomment and replace <ADMIN_USER_ID> after creating admin user:
--
-- INSERT INTO public.events (title, description, start_date, end_date, city, category, created_by, published) VALUES
--   (
--     'Студентска журка — крај на семестар',
--     'Го прославуваме крајот на семестарот заедно!',
--     '2026-07-05 21:00:00+02',
--     '2026-07-06 02:00:00+02',
--     'Скопје',
--     'party',
--     '<ADMIN_USER_ID>',
--     TRUE
--   ),
--   (
--     'Работилница: CV и интервју за работа',
--     'Научи како да напишеш CV и да се подготвиш за интервју.',
--     '2026-07-10 17:00:00+02',
--     '2026-07-10 19:00:00+02',
--     'Скопје',
--     'workshop',
--     '<ADMIN_USER_ID>',
--     TRUE
--   );
