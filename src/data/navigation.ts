/** Hoofdnavigatie. Projecten verschijnt alleen als de tabel `projecten` rijen heeft. */
export interface NavItem {
  label: string;
  to: string;
  description: string;
}

export const NAV_ITEMS: NavItem[] = [
  { label: 'Bewijs', to: '/stories', description: 'Alle stories met zoeken en filters' },
  { label: 'Leeruitkomsten', to: '/leeruitkomsten', description: 'Voortgang en bewijs per LU' },
  { label: 'Sprints', to: '/sprints', description: 'Tijdlijn met alle sprints' },
  { label: 'Over mij', to: '/over-mij', description: 'Wie ik ben en wat me drijft' },
];

export const PROJECTEN_ITEM: NavItem = { label: 'Projecten', to: '/projecten', description: 'Projecten en onderzoeken' };
