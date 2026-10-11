import type { StoryOverviewItem, StoryTypeCode } from '../types';

/** Afgeleide cijfers voor hero, bento en overzichten; alles uit de StoriesContext, geen extra tabellen. */
export function storyStats(stories: StoryOverviewItem[]) {
  const sprints = new Set(stories.map((s) => s.sprint));
  const perLu: Record<number, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
  for (const s of stories) for (const lu of s.lus) perLu[lu] = (perLu[lu] ?? 0) + 1;
  const perType: Record<StoryTypeCode, number> = { US: 0, RS: 0, LS: 0 };
  for (const s of stories) perType[s.type] += 1;
  return {
    total: stories.length,
    sprintsWithEvidence: sprints.size,
    sprintNumbers: [...sprints].sort((a, b) => a - b),
    lusWithEvidence: Object.values(perLu).filter((n) => n > 0).length,
    perLu,
    perType,
    hasLuLinks: stories.some((s) => s.lus.length > 0),
  };
}

/** Nieuwste eerst: hoogste sprint, dan hoogste logboekrij. */
export function newestStories(stories: StoryOverviewItem[], count: number): StoryOverviewItem[] {
  return [...stories]
    .sort((a, b) => b.sprint - a.sprint || (b.logboek_rij ?? 0) - (a.logboek_rij ?? 0))
    .slice(0, count);
}

/** Vorige en volgende story in de vaste volgorde (sprint, logboek_rij). */
export function neighbours(stories: StoryOverviewItem[], slug: string) {
  const index = stories.findIndex((s) => s.slug === slug);
  if (index === -1) return { previous: null, next: null };
  return { previous: stories[index - 1] ?? null, next: stories[index + 1] ?? null };
}

/** Groepeert op sprintnummer, oplopend. */
export function groupBySprint(stories: StoryOverviewItem[]): [number, StoryOverviewItem[]][] {
  const map = new Map<number, StoryOverviewItem[]>();
  for (const s of stories) map.set(s.sprint, [...(map.get(s.sprint) ?? []), s]);
  return [...map.entries()].sort((a, b) => a[0] - b[0]);
}

/** Zoeken zonder hoofdletters en accenten ("e" vindt ook "é"). */
export function normalize(text: string): string {
  return text.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
}
