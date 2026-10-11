/**
 * Vervolgvragen onder het laatste antwoord: een vaste lijst per onderwerp, zonder extra API-aanroep.
 */
const TOPICS: { match: RegExp; questions: string[] }[] = [
  { match: /onderzo|research|bron/i, questions: ['Wat waren de belangrijkste conclusies?', 'Welke bronnen gebruikte Josse?', 'Wat betekent dit voor zijn vak?'] },
  { match: /tool|claude|gemini|perplexity|hubspot|moneybird|ai studio|vercel|supabase/i, questions: ['Waarom koos Josse voor deze tools?', 'Wat heeft hij ermee gebouwd?', 'Wat leerde hij over het gebruik van AI-tools?'] },
  { match: /leeruitkomst|\blu\s?\d/i, questions: ['Welke stories horen bij LU4?', 'Hoe werkt Josse aan zelfsturing (LU5)?', 'Wat zijn de vijf leeruitkomsten?'] },
  { match: /sprint/i, questions: ['Wat heeft Josse in die sprint geleerd?', 'Welke tools gebruikte hij daarbij?', 'Wat was het lastigste in die sprint?'] },
  { match: /passie|talent|droom|wie is|over josse/i, questions: ['Wat zijn de dromen van Josse?', 'Hoe kijkt Josse naar AI?', 'Hoe kan ik Josse bereiken?'] },
];

const DEFAULT = ['Wat heeft Josse in sprint 1 gedaan?', 'Welke AI-tools gebruikt Josse?', 'Wie is Josse en wat drijft hem?'];

export function followUps(question: string, answer: string, asked: string[]): string[] {
  const text = `${question} ${answer}`;
  const topic = TOPICS.find((t) => t.match.test(question)) ?? TOPICS.find((t) => t.match.test(text));
  const pool = [...(topic?.questions ?? []), ...DEFAULT];
  const seen = new Set(asked.map((q) => q.trim().toLowerCase()));
  return [...new Set(pool)].filter((q) => !seen.has(q.toLowerCase())).slice(0, 3);
}
