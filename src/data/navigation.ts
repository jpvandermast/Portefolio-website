/** Hoofdnavigatie. */
export interface NavItem {
  label: string;
  to: string;
  description: string;
}

export const NAV_ITEMS: NavItem[] = [
  { label: 'Bewijs', to: '/stories', description: 'Alle stories met zoeken en filters' },
  { label: 'Leeruitkomsten', to: '/leeruitkomsten', description: 'Voortgang en bewijs per LU' },
  { label: 'Onderzoek', to: '/onderzoek', description: 'Mijn onderzoek naar AI in het vak van de webontwikkelaar' },
  { label: 'AI-oplossingen', to: '/ai-oplossingen', description: 'De AI-oplossingen en prototypes die ik bouw' },
  { label: 'Sprints', to: '/sprints', description: 'Tijdlijn met alle sprints' },
  { label: 'Over mij', to: '/over-mij', description: 'Wie ik ben en wat me drijft' },
];
