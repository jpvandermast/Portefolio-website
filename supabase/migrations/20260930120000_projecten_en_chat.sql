-- Additief: alleen nieuwe tabellen. Bestaande story-tabellen worden niet aangeraakt.

-- 1. projecten: door Josse zelf gevuld via de Table Editor; publiek leesbaar (alleen zichtbaar = true)
create table public.projecten (
  id            uuid primary key default gen_random_uuid(),
  titel         text not null,
  beschrijving  text not null default '',
  type          text not null check (type in ('project', 'onderzoek')),
  link_url      text,
  link_label    text,
  tools         text[] not null default '{}',
  sprint        int check (sprint >= 1),
  volgorde      int not null default 0,
  zichtbaar     boolean not null default true,
  created_at    timestamptz not null default now()
);

alter table public.projecten enable row level security;

create policy "projecten publiek leesbaar"
  on public.projecten for select
  to anon, authenticated
  using (zichtbaar);

-- 2. chat_sessies: alleen de server (secret key) mag lezen/schrijven
create table public.chat_sessies (
  id            uuid primary key default gen_random_uuid(),
  ip_hash       text,
  created_at    timestamptz not null default now(),
  laatst_actief timestamptz not null default now()
);

create index chat_sessies_ip_hash_idx on public.chat_sessies (ip_hash);

-- 3. chat_berichten
create table public.chat_berichten (
  id         uuid primary key default gen_random_uuid(),
  sessie_id  uuid not null references public.chat_sessies (id) on delete cascade,
  rol        text not null check (rol in ('gebruiker', 'assistent')),
  inhoud     text not null,
  created_at timestamptz not null default now()
);

create index chat_berichten_sessie_created_idx
  on public.chat_berichten (sessie_id, created_at);

-- RLS aan, bewust ZONDER policies: anon en authenticated kunnen niets.
alter table public.chat_sessies   enable row level security;
alter table public.chat_berichten enable row level security;

-- Extra vangnet: ook op tabelniveau geen rechten voor de publieke rollen.
revoke all on public.chat_sessies   from anon, authenticated;
revoke all on public.chat_berichten from anon, authenticated;
