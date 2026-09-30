import { supabase } from './supabase';
import type { Story, StoryFile, StoryOverviewItem } from '../types';

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
    db.from('story_leeruitkomsten').select('story_id, lu'),
  ]);
  if (overview.error) throw overview.error;
  if (lus.error) throw lus.error;

  const byStory = new Map<string, number[]>();
  for (const row of lus.data ?? []) {
    byStory.set(row.story_id, [...(byStory.get(row.story_id) ?? []), row.lu]);
  }
  return (overview.data ?? []).map((s) => ({
    ...(s as Omit<StoryOverviewItem, 'lus'>),
    lus: (byStory.get(s.id) ?? []).sort((a, b) => a - b),
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
    db.from('story_leeruitkomsten').select('lu').eq('story_id', story.id),
  ]);
  if (files.error) throw files.error;
  if (lus.error) throw lus.error;

  return {
    ...(story as Omit<Story, 'files' | 'lus'>),
    files: (files.data ?? []) as StoryFile[],
    lus: (lus.data ?? []).map((r) => r.lu).sort((a, b) => a - b),
  };
}
