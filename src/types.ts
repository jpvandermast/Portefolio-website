export type LearningOutcomeId = 'LU1' | 'LU2' | 'LU3' | 'LU4' | 'LU5';

export interface LearningOutcome {
  id: LearningOutcomeId;
  code: string;
  title: string;
  shortDescription: string;
  detailedDescription: string;
  assessmentCriteria: string[];
  colorBadge: string;
}

export interface ResearchStory {
  title: string;
  field: string;
  statusText: string;
  summary: string;
  researchQuestions: string[];
  expectedOutput: string;
  linkUrl?: string;
  linkLabel: string;
  isAvailable: boolean;
}

export interface SprintData {
  sprintNumber: number;
  weeks: string;
  theme: string;
  status: 'Afgerond' | 'Huidige sprint' | 'Gepland';
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
}
