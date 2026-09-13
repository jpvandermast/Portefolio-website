export type LearningOutcomeId = 'LU1' | 'LU2' | 'LU3' | 'LU4' | 'LU5';

export type StoryType = 'Research Story' | 'User Story' | 'Learning Story';

export type EvidenceFormat = 'Document' | 'Video' | 'Prototype' | 'GitHub' | 'Presentatie' | 'Binnenkort';

export type EvidenceStatus = 'Afgerond' | 'In uitvoering' | 'Binnenkort';

export interface EvidenceItem {
  id: string;
  luId: LearningOutcomeId;
  title: string;
  description: string;
  storyType: StoryType;
  format: EvidenceFormat;
  status: EvidenceStatus;
  sprint?: number;
  linkUrl?: string;
  linkLabel?: string;
  date?: string;
}

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

export interface ProjectPOC {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  status: 'In ontwikkeling' | 'Concept' | 'Gereed';
  sprint: number;
  tools: string[];
  relatedLUs: LearningOutcomeId[];
  liveUrl?: string;
  codeUrl?: string;
}

export interface SprintData {
  sprintNumber: number;
  weeks: string;
  theme: string;
  status: 'Afgerond' | 'Huidige sprint' | 'Gepland';
  stories: {
    research: string;
    userStory: string;
    learningStory: string;
  };
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
