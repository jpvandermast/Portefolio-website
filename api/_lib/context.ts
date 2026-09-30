import { aboutData, learningOutcomes } from '../../shared/portfolioContent.js';
import { CONTEXT_CACHE_MS } from './config.js';
import { supabaseAdmin } from './supabaseAdmin.js';

const TYPE_LABELS: Record<string, string> = { US: 'User Story', RS: 'Research Story', LS: 'Learning Story' };

/** Haalt afbeeldingslinks uit markdown weg; alleen de alt-tekst blijft over. */
function stripImages(md: string): string {
  return (md ?? '').replace(/!\[([^\]]*)\]\([^)]*\)/g, (_m, alt: string) => (alt ? `(afbeelding: ${alt})` : '')).trim();
}

let cache: { at: number; text: string } | null = null;

/** Portfolio-context voor de chatbot; 5 minuten gecached zodat nieuwe stories vanzelf meegaan. */
export async function getPortfolioContext(): Promise<string> {
  if (cache && Date.now() - cache.at < CONTEXT_CACHE_MS) return cache.text;

  const db = supabaseAdmin();
  const [stories, luLinks, projecten] = await Promise.all([
    db
      .from('stories')
      .select('slug, titel, type, sprint, logboek_rij, korte_versie, opdracht_md, gedaan_md, resultaat_md, geleerd_md, id')
      .eq('zichtbaar', true)
      .order('sprint', { ascending: true })
      .order('logboek_rij', { ascending: true }),
    db.from('story_leeruitkomsten').select('story_id, lu'),
    db
      .from('projecten')
      .select('titel, beschrijving, type, link_url, tools, sprint')
      .eq('zichtbaar', true)
      .order('volgorde', { ascending: true }),
  ]);
  if (stories.error) throw stories.error;
  if (luLinks.error) throw luLinks.error;
  if (projecten.error) throw projecten.error;

  const lusByStory = new Map<string, number[]>();
  for (const r of luLinks.data ?? []) lusByStory.set(r.story_id, [...(lusByStory.get(r.story_id) ?? []), r.lu]);

  const parts: string[] = [];

  parts.push(
    '## Over Josse',
    `Naam: ${aboutData.name}. ${aboutData.role}, ${aboutData.institution}. Minor: ${aboutData.minorTitle}`,
    `Locatie: ${aboutData.location}. E-mail: ${aboutData.email}. LinkedIn: ${aboutData.socialLinks.linkedin}. GitHub: ${aboutData.socialLinks.github}`,
    `Motto: ${aboutData.quote}`,
    ...aboutData.bioParagraphs,
    'Talenten: ' + aboutData.talents.map((t) => `${t.title} (${t.description})`).join(' | '),
    'Passies: ' + aboutData.passions.map((p) => `${p.title} (${p.description})`).join(' | '),
    `Dromen: ${aboutData.dreamsText}`,
    'Visie op AI: ' + aboutData.aiVision.join(' '),
    '',
    '## Leeruitkomsten van de minor',
    ...learningOutcomes.map((lu) => `${lu.code} - ${lu.title}: ${lu.shortDescription}`),
    '',
    '## Stories',
  );

  if ((stories.data ?? []).length === 0) parts.push('(Er zijn nog geen stories gepubliceerd.)');
  for (const s of stories.data ?? []) {
    const lus = lusByStory.get(s.id);
    parts.push(
      `### ${s.titel}`,
      `Type: ${TYPE_LABELS[s.type] ?? s.type} | Sprint ${s.sprint}${lus?.length ? ` | Leeruitkomsten: ${lus.map((n) => `LU${n}`).join(', ')}` : ''}`,
      `Link: /stories/${s.slug}`,
      `Korte versie: ${s.korte_versie}`,
      `Wat was de opdracht? ${stripImages(s.opdracht_md)}`,
      `Wat heb ik gedaan? ${stripImages(s.gedaan_md)}`,
      `Wat was het resultaat? ${stripImages(s.resultaat_md)}`,
      `Wat heb ik geleerd? ${stripImages(s.geleerd_md)}`,
      '',
    );
  }

  parts.push('## Projecten en onderzoeken');
  if ((projecten.data ?? []).length === 0) parts.push('(Er zijn nog geen projecten of onderzoeken gepubliceerd.)');
  for (const p of projecten.data ?? []) {
    parts.push(
      `- ${p.type === 'onderzoek' ? 'Onderzoek' : 'Project'}: ${p.titel}${p.sprint != null ? ` (sprint ${p.sprint})` : ''}. ${p.beschrijving}` +
        `${p.tools?.length ? ` Tools: ${p.tools.join(', ')}.` : ''}${p.link_url ? ` Link: ${p.link_url}` : ''}`,
    );
  }

  const text = parts.join('\n');
  cache = { at: Date.now(), text };
  return text;
}
