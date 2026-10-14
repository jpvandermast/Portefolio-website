import { supabase } from './supabase';
import type { Project } from '../types';

/** Publieke URL in bucket "onderzoeken" (visualisaties bij onderzoeken; los van de bucket "stories" van de pipeline). */
export function onderzoekUrl(storagePath: string): string {
  if (!supabase) throw new Error('Supabase is niet geconfigureerd');
  return supabase.storage.from('onderzoeken').getPublicUrl(storagePath).data.publicUrl;
}

/** Alle zichtbare projecten en onderzoeken, op volgorde (RLS filtert zichtbaar = true). */
export async function getProjecten(): Promise<Project[]> {
  if (!supabase) throw new Error('Supabase is niet geconfigureerd');
  const { data, error } = await supabase
    .from('projecten')
    .select('id, titel, beschrijving, type, link_url, link_label, tools, sprint, volgorde, story_slug, afbeelding_pad, afbeelding_alt')
    .order('volgorde', { ascending: true })
    .order('created_at', { ascending: true });
  if (error) throw error;
  return (data ?? []) as Project[];
}
