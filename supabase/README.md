# Database — Редослед на извршување

Изврши ги фајловите по овој редослед во Supabase SQL Editor:

1. `migrations/001_schema.sql` — Креирање на табелите
2. `migrations/002_indexes.sql` — Индекси за перформанси
3. `migrations/003_triggers.sql` — Тригери (updated_at, нов корисник)
4. `migrations/004_rls.sql` — Row Level Security policies
5. `seed.sql` — Тест податоци (опционално, само за development)

## После извршување

Креирај admin корисник преку Supabase Auth, потоа:

```sql
UPDATE public.profiles SET role = 'admin' WHERE id = '<твојот-user-id>';
```
