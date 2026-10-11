-- Additief: projecten krijgt een koppeling met een story en een grote visualisatie; nieuwe bucket `onderzoeken`.
-- Bestaande rijen blijven werken (alle nieuwe kolommen zijn nullable).

-- 1. projecten: koppeling met de story (logisch naar stories.slug, geen harde FK) en de visualisatie
alter table public.projecten
  add column if not exists story_slug     text,
  add column if not exists afbeelding_pad text,   -- pad in bucket `onderzoeken`, bijv. '<slug>/visualisatie.png'
  add column if not exists afbeelding_alt text;

create index if not exists projecten_story_slug_idx on public.projecten (story_slug);

comment on column public.projecten.story_slug is 'Slug van de bijbehorende story (stories.slug); levert downloads en de link naar /stories/<slug>.';
comment on column public.projecten.afbeelding_pad is 'Pad in storage-bucket onderzoeken (16:9-visualisatie onder de kaart).';
comment on column public.projecten.afbeelding_alt is 'Alt-tekst van de visualisatie.';

-- 2. Storage-bucket `onderzoeken`: publiek leesbaar via publieke URL, zoals bucket `stories`.
--    Geen policies op storage.objects voor anon/authenticated: schrijven kan alleen met de service-role-sleutel.
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('onderzoeken', 'onderzoeken', true, 10485760, array['image/png', 'image/webp', 'image/jpeg'])
on conflict (id) do update
  set public = excluded.public,
      file_size_limit = excluded.file_size_limit,
      allowed_mime_types = excluded.allowed_mime_types;
