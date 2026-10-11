/**
 * Sprintplanning najaar 2026 (semesterweekplanning, advies bijlage C).
 * Een sprint loopt van de startdatum tot en met de Show & Grow (woensdag, leerteamdag).
 * De database levert alleen het sprintnummer per story; deze data staat bewust in de code.
 */
export interface Sprint {
  nummer: number;
  /** Korte naam voor knoppen en chips */
  label: string;
  /** ISO-datum (jjjj-mm-dd), eerste dag */
  start: string;
  /** ISO-datum van de Show & Grow, laatste dag van de sprint */
  showAndGrow: string;
  opmerking?: string;
  /** Reparatiesprint: alleen indien nodig */
  reparatie?: boolean;
}

export const SPRINTS: Sprint[] = [
  { nummer: 1, label: 'Sprint 1', start: '2026-08-31', showAndGrow: '2026-09-16', opmerking: 'Inclusief kennismakingsweek' },
  { nummer: 2, label: 'Sprint 2', start: '2026-09-17', showAndGrow: '2026-09-30' },
  { nummer: 3, label: 'Sprint 3', start: '2026-10-01', showAndGrow: '2026-10-14' },
  { nummer: 4, label: 'Sprint 4', start: '2026-10-15', showAndGrow: '2026-11-04', opmerking: 'Herfstvakantie 19–23 oktober' },
  { nummer: 5, label: 'Sprint 5', start: '2026-11-05', showAndGrow: '2026-11-18' },
  { nummer: 6, label: 'Sprint 6', start: '2026-11-19', showAndGrow: '2026-12-02' },
  { nummer: 7, label: 'Sprint 7', start: '2026-12-03', showAndGrow: '2026-12-16' },
  { nummer: 8, label: 'Sprint 8', start: '2026-12-17', showAndGrow: '2027-01-13', opmerking: 'Kerstvakantie 21 december – 1 januari' },
  { nummer: 9, label: 'Reparatie', start: '2027-01-14', showAndGrow: '2027-01-27', opmerking: 'Alleen indien nodig', reparatie: true },
];

export type SprintStatus = 'afgerond' | 'bezig' | 'gepland';

/** Lokale datum als jjjj-mm-dd, zodat de vergelijking niet afhangt van tijdzones. */
function isoDay(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

function parseDay(iso: string): Date {
  const [y, m, d] = iso.split('-').map(Number);
  return new Date(y, m - 1, d);
}

export function getSprint(nummer: number): Sprint | undefined {
  return SPRINTS.find((s) => s.nummer === nummer);
}

export function sprintStatus(sprint: Sprint, today: Date = new Date()): SprintStatus {
  const day = isoDay(today);
  if (day > sprint.showAndGrow) return 'afgerond';
  if (day < sprint.start) return 'gepland';
  return 'bezig';
}

/**
 * De sprint die vandaag loopt. Vóór de minor: sprint 1; na de laatste reguliere sprint (en buiten de
 * reparatiesprint): sprint 8. Zo is er altijd een zinvolle "huidige" sprint om te tonen.
 */
export function getCurrentSprint(today: Date = new Date()): Sprint {
  const day = isoDay(today);
  const running = SPRINTS.find((s) => s.start <= day && day <= s.showAndGrow);
  if (running) return running;
  if (day < SPRINTS[0].start) return SPRINTS[0];
  return SPRINTS[SPRINTS.length - 2];
}

/** Hoe ver de sprint is (0-1) en hoeveel dagen tot en met de Show & Grow. */
export function sprintProgress(sprint: Sprint, today: Date = new Date()) {
  const start = parseDay(sprint.start).getTime();
  const end = parseDay(sprint.showAndGrow).getTime();
  const now = parseDay(isoDay(today)).getTime();
  const dayMs = 24 * 60 * 60 * 1000;
  const total = (end - start) / dayMs + 1;
  const passed = Math.min(Math.max((now - start) / dayMs + 1, 0), total);
  return {
    fraction: passed / total,
    daysUntilShowAndGrow: Math.max(Math.round((end - now) / dayMs), 0),
  };
}

const dateFormat = new Intl.DateTimeFormat('nl-NL', { day: 'numeric', month: 'short' });
const longDateFormat = new Intl.DateTimeFormat('nl-NL', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });

/** "17 sep." */
export function formatDay(iso: string): string {
  return dateFormat.format(parseDay(iso));
}

/** "woensdag 14 oktober 2026" */
export function formatLongDay(iso: string): string {
  return longDateFormat.format(parseDay(iso));
}

/** "1 okt. – 14 okt." */
export function formatRange(sprint: Sprint): string {
  return `${formatDay(sprint.start)} – ${formatDay(sprint.showAndGrow)}`;
}
