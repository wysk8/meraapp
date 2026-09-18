-- MeraPela — esquema de base de datos para Supabase
-- Cómo usarlo: entra a tu proyecto de Supabase → SQL Editor → pega todo
-- este archivo → Run. Crea las tablas y las reglas de seguridad de una vez.

create extension if not exists "uuid-ossp";

-- ============================================================
-- PROFILES
-- ============================================================
create table if not exists profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text default 'MeraPela',
  created_at timestamptz default now()
);

-- ============================================================
-- CONTENT
-- ============================================================
create table if not exists content (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references auth.users(id) on delete cascade not null,
  title text not null,
  platform text default 'Sin definir',
  stage text default 'IDEA',
  when_text text default 'Sin fecha',
  note text default '',
  scheduled_at timestamptz,
  thumbnail text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- ============================================================
-- TASKS (Pendientes)
-- ============================================================
create table if not exists tasks (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references auth.users(id) on delete cascade not null,
  title text not null,
  tag text default 'General',
  level text default 'normal', -- urgente | importante | normal | opcional
  must boolean default false,
  when_text text default 'Hoy',
  completed boolean default false,
  created_at timestamptz default now()
);

-- ============================================================
-- IDEAS
-- ============================================================
create table if not exists ideas (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references auth.users(id) on delete cascade not null,
  title text not null,
  platform text default 'Sin definir',
  format text default 'Sin definir',
  potential text default 'Por evaluar',
  status text default 'nueva',
  created_at timestamptz default now()
);

-- ============================================================
-- CALENDAR_EVENTS (Agenda)
-- ============================================================
create table if not exists calendar_events (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references auth.users(id) on delete cascade not null,
  title text not null,
  time text default 'Por definir',
  date date default current_date,
  type text default 'life', -- stream | record | meet | life
  notes text,
  created_at timestamptz default now()
);

-- ============================================================
-- FINANCES (Plata + Gastos hormiga con category='hormiga')
-- ============================================================
create table if not exists finances (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references auth.users(id) on delete cascade not null,
  type text not null, -- ingreso | gasto
  category text default 'general', -- hormiga | recurrente | plataforma...
  description text,
  amount numeric not null default 0,
  date date default current_date,
  created_at timestamptz default now()
);

-- ============================================================
-- PLATFORM_STATS (para cuando se conecten las APIs de cada red)
-- ============================================================
create table if not exists platform_stats (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references auth.users(id) on delete cascade not null,
  platform text not null,
  views_k numeric,
  followers text,
  change_pct numeric,
  fetched_at timestamptz default now()
);

-- ============================================================
-- ROW LEVEL SECURITY — cada usuario solo ve y edita lo suyo
-- ============================================================
alter table profiles enable row level security;
alter table content enable row level security;
alter table tasks enable row level security;
alter table ideas enable row level security;
alter table calendar_events enable row level security;
alter table finances enable row level security;
alter table platform_stats enable row level security;

create policy "own profile" on profiles for all using (auth.uid() = id) with check (auth.uid() = id);
create policy "own content" on content for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "own tasks" on tasks for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "own ideas" on ideas for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "own calendar_events" on calendar_events for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "own finances" on finances for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "own platform_stats" on platform_stats for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- Crea el perfil automáticamente cuando alguien se registra
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id) values (new.id);
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
