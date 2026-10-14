import { supabase } from './supabase';
import type { SprintLuBeoordeling, Story, StoryFile, StoryOverviewItem } from '../types';

export const STORY_TYPE_LABELS = {
  US: 'User Story',
  RS: 'Research Story',
  LS: 'Learning Story',
} as const;

export const LU_LABELS: Record<number, string> = {
  1: 'Impact',
  2: 'Oplossing',
  3: 'Ethiek',
  4: 'Tools',
  5: 'Zelfsturing',
};

function client() {
  if (!supabase) throw new Error('Supabase is niet geconfigureerd');
  return supabase;
}

/** Publieke URL in bucket "stories"; met downloadName wordt het een echte download (Content-Disposition). */
export function publicUrl(storagePath: string, downloadName?: string): string {
  return client()
    .storage.from('stories')
    .getPublicUrl(storagePath, downloadName ? { download: downloadName } : undefined).data.publicUrl;
}

/** Alle zichtbare stories, gesorteerd op sprint en logboek_rij, inclusief LU-koppelingen. */
export async function getStoryOverview(): Promise<StoryOverviewItem[]> {
  const db = client();
  const [overview, lus] = await Promise.all([
    db
      .from('story_overzicht')
      .select('id, slug, titel, type, sprint, logboek_rij, korte_versie, klein_pad, klein_alt')
      .order('sprint', { ascending: true })
      .order('logboek_rij', { ascending: true }),
    db.from('story_leeruitkomsten').select('story_id, lu, onderbouwing'),
  ]);
  if (overview.error) throw overview.error;
  if (lus.error) throw lus.error;

  const byStory = new Map<string, number[]>();
  const notesByStory = new Map<string, Record<number, string>>();
  for (const row of lus.data ?? []) {
    byStory.set(row.story_id, [...(byStory.get(row.story_id) ?? []), row.lu]);
    notesByStory.set(row.story_id, { ...(notesByStory.get(row.story_id) ?? {}), [row.lu]: row.onderbouwing ?? '' });
  }
  return (overview.data ?? []).map((s) => ({
    ...(s as Omit<StoryOverviewItem, 'lus' | 'luNotities'>),
    lus: (byStory.get(s.id) ?? []).sort((a, b) => a - b),
    luNotities: notesByStory.get(s.id) ?? {},
  }));
}

/** Eén story met bestanden en LU's; null als de slug niet bestaat (of niet zichtbaar is). */
export async function getStory(slug: string): Promise<Story | null> {
  const db = client();
  const { data: story, error } = await db
    .from('stories')
    .select(
      'id, slug, titel, type, sprint, logboek_rij, korte_versie, opdracht_md, gedaan_md, resultaat_md, geleerd_md',
    )
    .eq('slug', slug)
    .maybeSingle();
  if (error) throw error;
  if (!story) return null;

  const [files, lus] = await Promise.all([
    db.from('story_files').select('*').eq('story_id', story.id).order('volgorde', { ascending: true }),
    db.from('story_leeruitkomsten').select('lu, onderbouwing').eq('story_id', story.id),
  ]);
  if (files.error) throw files.error;
  if (lus.error) throw lus.error;

  return {
    ...(story as Omit<Story, 'files' | 'lus' | 'luNotities'>),
    files: (files.data ?? []) as StoryFile[],
    lus: (lus.data ?? []).map((r) => r.lu).sort((a, b) => a - b),
    luNotities: Object.fromEntries((lus.data ?? []).map((r) => [r.lu, r.onderbouwing ?? ''])),
  };
}

/** Zelfbeoordeling (voldoende/onvoldoende) per sprint en leeruitkomst. */
export async function getSprintLuBeoordelingen(): Promise<SprintLuBeoordeling[]> {
  const { data, error } = await client()
    .from('sprint_leeruitkomsten')
    .select('sprint, lu, niveau')
    .order('sprint', { ascending: true });
  if (error) throw error;
  return (data ?? []) as SprintLuBeoordeling[];
}

/** Bijlagen (rol `document`) van een story, op volgorde. */
export async function getStoryDocuments(storyId: string): Promise<StoryFile[]> {
  const { data, error } = await client()
    .from('story_files')
    .select('*')
    .eq('story_id', storyId)
    .eq('rol', 'document')
    .order('volgorde', { ascending: true });
  if (error) throw error;
  return (data ?? []) as StoryFile[];
}
