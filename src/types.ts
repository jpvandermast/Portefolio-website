export type LearningOutcomeId = 'LU1' | 'LU2' | 'LU3' | 'LU4' | 'LU5';

/** Leeruitkomst met de officiële tekst uit de Canvas-rubriek en de minimumnorm uit de minorgids. */
export interface LearningOutcome {
  id: LearningOutcomeId;
  /** 1-5; zelfde nummer als `lu` in story_leeruitkomsten */
  nummer: number;
  code: string;
  /** Officiële korte naam, bijv. "Impact AI op beroep" */
  title: string;
  /** Eén woord voor chips en grafieken, bijv. "Impact" */
  label: string;
  /** Officiële omschrijving (Canvas-rubriek) */
  shortDescription: string;
  /** Minimaal aantal keer voldoende beoordeeld (minorgids v2.0, p. 7) */
  minimumVoldoende: number;
}

export interface AboutData {
  name: string;
  role: string;
  institution: string;
  minorTitle: string;
  quote: string;
  bioParagraphs: string[];
  talents: {
    title: string;
    description: string;
    iconName: string;
  }[];
  passions: {
    title: string;
    description: string;
    iconName: string;
  }[];
  dreamsText: string;
  aiVision: string[];
  email: string;
  location: string;
  socialLinks: {
    linkedin: string;
    github: string;
  };
}

// ---- Stories uit Supabase (databasekolommen blijven Nederlands) ----

export type StoryTypeCode = 'US' | 'RS' | 'LS';

export interface StoryOverviewItem {
  id: string;
  slug: string;
  titel: string;
  type: StoryTypeCode;
  sprint: number;
  logboek_rij: number | null;
  korte_versie: string;
  klein_pad: string | null;
  klein_alt: string | null;
  /** LU-nummers 1-5, uit story_leeruitkomsten */
  lus: number[];
}

export interface StoryFile {
  id: string;
  story_id: string;
  rol: 'klein' | 'afbeelding' | 'document';
  volgorde: number;
  bestandsnaam: string;
  storage_path: string;
  mime: string | null;
  bytes: number | null;
  alt_of_weergavenaam: string;
}

export interface Story {
  id: string;
  slug: string;
  titel: string;
  type: StoryTypeCode;
  sprint: number;
  logboek_rij: number | null;
  korte_versie: string;
  opdracht_md: string;
  gedaan_md: string;
  resultaat_md: string;
  geleerd_md: string;
  files: StoryFile[];
  lus: number[];
}

// ---- Projecten uit Supabase (tabel projecten, door Josse gevuld via de Table Editor) ----

export interface Project {
  id: string;
  titel: string;
  beschrijving: string;
  type: 'project' | 'onderzoek';
  link_url: string | null;
  link_label: string | null;
  tools: string[];
  sprint: number | null;
  volgorde: number;
  /** Slug van de bijbehorende story (stories.slug): levert downloads en de link naar /stories/<slug> */
  story_slug: string | null;
  /** Pad in bucket `onderzoeken`, bijv. `<slug>/visualisatie.png` */
  afbeelding_pad: string | null;
  afbeelding_alt: string | null;
}
