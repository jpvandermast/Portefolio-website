import {
  AboutData,
  LearningOutcome,
  ProjectPOC,
  ResearchStory,
  SprintData,
} from '../types';

export const aboutData: AboutData = {
  name: 'Josse van der Mast',
  role: 'Student Commerciële Economie (HU)',
  institution: 'Hogeschool Utrecht',
  minorTitle: 'Future-proof met AI!',
  quote: 'Oprechte connecties zijn de basis voor elk succes — juist in een tijdperk waarin AI de technologische standaard wordt.',
  bioParagraphs: [
    'Ik ben Josse, student Commerciële Economie aan de Hogeschool Utrecht. Met inmiddels meer dan drie jaar ervaring in sales en commerciële teams bij o.a. Fieldstars en Greenteam ben ik gedreven, leergierig en doelgericht. Ik houd van concrete uitdagingen en focus op het realiseren van tastbare resultaten.',
    'Voor de minor "Future-proof met AI!" onderzoek ik hoe opkomende AI-technologieën zoals generatieve modellen, predictive sales analytics en agents de commerciële beroepspraktijk transformeren. Mijn doel is niet alleen om AI theoretisch te begrijpen, maar om zelf functionele oplossingen te ontwerpen en ethisch onderbouwde keuzes te maken.',
    'Binnen deze 20-weekse minor werk ik in sprints van twee weken aan Research Stories, User Stories en Learning Stories. Op deze centrale website leg ik alle voortgang en bewijsstukken vast per leeruitkomst.'
  ],
  talents: [
    {
      title: 'Commerciële Intuïtie & Klantcontact',
      description: 'Van straatwerving en teamleiderschap (Captain) tot B2B leadkwalificatie: het vermogen om snel tot de kern van de klantbehoefte te komen en duurzaam vertrouwen op te bouwen.',
      iconName: 'Target',
    },
    {
      title: 'Proactief & Doelgericht',
      description: 'Doelen stellen en doorzetten totdat er meetbaar resultaat staat. Niet afwachten als de situatie complex is, maar gestructureerd experimenteren en bijsturen.',
      iconName: 'TrendingUp',
    },
    {
      title: 'Technologische Nieuwsgierigheid',
      description: 'Gepassioneerd over hoe AI-tools het werkveld efficiënter maken en repetitieve taken wegnemen, zodat de focus kan verschuiven naar hoogwaardig menselijk contact.',
      iconName: 'Sparkles',
    },
  ],
  passions: [
    {
      title: 'De Sportschool',
      description: 'Al ruim vier jaar ben ik hier bijna dagelijks te vinden. Voor mij dé manier om fysiek en mentaal fit te blijven, discipline vast te houden en met een leeg hoofd aan de dag te beginnen.',
      iconName: 'Dumbbell',
    },
    {
      title: 'Festivals & Muziek',
      description: 'Muziek is een constante energiebron. Ik bezoek graag festivals met vrienden om live optredens te beleven en nieuwe inspiratie en connecties op te doen.',
      iconName: 'Music',
    },
    {
      title: 'Nieuwe AI-tools ontdekken',
      description: 'Door de razendsnelle opkomst van AI probeer ik wekelijks nieuwe modellen, agent-frameworks en workflow-automations uit om direct te zien wat in de praktijk werkt.',
      iconName: 'Cpu',
    },
  ],
  dreamsText:
    'Na mijn studietijd wil ik eerst nog volop genieten van het studentenleven, om er daarna even tussenuit te gaan en te reizen. Daarna wil ik het liefst zo snel mogelijk iets voor mezelf beginnen — al sluit ik niet uit dat ik eerst een paar jaar werkervaring opdoe bij een bedrijf waar ik veel kan leren, om vanuit dat vakgebied later zelf iets op te zetten. In welke richting precies weet ik nog niet zeker, maar naarmate de tijd vordert merk ik dat het steeds meer richting AI trekt. Vandaar dat ik deze minor volg, en ook nu al de eerste stappen zet als ondernemer in AI-gedreven webdevelopment. Of dit uiteindelijk groot wordt is de vraag, maar het is voor mij een mooie manier om tegelijk ervaring op te doen met zowel AI als ondernemerschap.',
  aiVision: [
    'AI ontwikkelt zich exponentieel en transformeert organisaties over de hele breedte. Het neemt routinematige werkzaamheden en data-intensieve analyses over, maar het menselijk oordeel, morele besef en empathie blijven onvervangbaar.',
    'In commerciële functies wordt AI geen vervanger van de professional, maar een co-pilot: professionals die AI effectief inzetten zullen diegenen inhalen die achterblijven. Daarom richt ik mijn minor op hands-on tooling, ethische kaders en strategische impact.'
  ],
  email: 'jossevandermast@gmail.com',
  location: 'Utrecht, Nederland',
  socialLinks: {
    linkedin: 'https://www.linkedin.com/in/josse-van-der-mast-7b703a207/',
    github: 'https://github.com/jpvandermast/',
  },
};

export const learningOutcomes: LearningOutcome[] = [
  {
    id: 'LU1',
    code: 'LU1',
    title: 'AI-impact op de toekomstige beroepspraktijk analyseren en evalueren',
    shortDescription: 'Onderzoek naar hoe AI het commerciële vakgebied verandert, inclusief kansen, risico’s en veranderende competenties.',
    detailedDescription: 'De student analyseert grondig welke strategische, technologische en operationele consequenties opkomende AI-innovaties hebben voor de toekomstige beroepspraktijk (Commerciële Economie, sales, marketing en klantrelatiebeheer). Dit omvat marktonderzoek, trendanalyse en strategische aanbevelingen.',
    assessmentCriteria: [
      'Gronde analyse van AI-trends binnen commercieel werkveld',
      'Kwantitatieve en kwalitatieve onderbouwing met vakliteratuur en experts',
      'Concrete impact op taken, workflows en vereiste competenties'
    ],
    colorBadge: 'bg-[#121D2F] text-white',
  },
  {
    id: 'LU2',
    code: 'LU2',
    title: 'Praktijkgerichte AI-oplossing ontwerpen, realiseren en presenteren',
    shortDescription: 'Van probleemdefinitie en user research naar een werkend AI-prototype (proof-of-concept) en overtuigende demonstratie.',
    detailedDescription: 'De student ontwerpt en bouwt zelfstandig of in teamverband een tastbare AI-oplossing (bijv. een slimme agent, predictive tool of workflow automation). De oplossing lost een reëel praktijkprobleem op en wordt gedemonstreerd aan belanghebbenden.',
    assessmentCriteria: [
      'Duidelijke probleemanalyse en doelgroepbepaling (User Stories)',
      'Functioneel ontworpen en getest AI-prototype / proof-of-concept',
      'Heldere en professionele presentatie/pitch van de werking en meerwaarde'
    ],
    colorBadge: 'bg-[#1a2d47] text-white',
  },
  {
    id: 'LU3',
    code: 'LU3',
    title: 'Ethiek en verantwoord AI-gebruik beoordelen',
    shortDescription: 'Kritische reflectie op privacy, bias, wetgeving (zoals de EU AI Act), transparantie en menselijke controle.',
    detailedDescription: 'De student toetst AI-toepassingen aan ethische principes, maatschappelijke waarden en wettelijke kaders. Denk aan data-integriteit, algoritmische vooringenomenheid, privacy (AVG/GDPR), aansprakelijkheid en de balans tussen automatisering en menselijk toezicht.',
    assessmentCriteria: [
      'Toepassing van een ethisch framework (bijv. EU AI Act of Ethical AI Canvas)',
      'Identificatie van bias, hallucinaties en privacyrisico’s',
      'Gefundeerde afweging tussen efficiëntie en menselijke autonomie'
    ],
    colorBadge: 'bg-[#253e63] text-white',
  },
  {
    id: 'LU4',
    code: 'LU4',
    title: 'AI-tools en technieken gebruiken',
    shortDescription: 'Actieve beheersing van moderne AI-instrumenten: van geavanceerd prompten en RAG tot API-integraties en automation tools.',
    detailedDescription: 'De student demonstreert praktische vaardigheid in het selecteren, configureren en combineren van moderne AI-technologieën (zoals LLM’s, multimodale modellen, API’s, workflow automations en data-tools) om workflows efficiënter te maken.',
    assessmentCriteria: [
      'Effectief gebruik van moderne AI-modellen, API’s en prompts',
      'Evaluatie van de prestaties, kosten en beperkingen van verschillende tools',
      'Documentatie van prompts, architectuur en technische keuzes'
    ],
    colorBadge: 'bg-[#2f5082] text-white',
  },
  {
    id: 'LU5',
    code: 'LU5',
    title: 'Zelfstandig en zelfsturend werken',
    shortDescription: 'Scrum/Agile-werkwijze, iteratieve sprintplanningen, feedback verwerken en systematische zelfreflectie over de 20 weken.',
    detailedDescription: 'De student plant en stuurt het eigen leer- en ontwikkelproces volgens de Scrum/Agile-methodiek. Dit blijkt uit heldere sprintdoelen (Research, User en Learning Stories), regelmatige reflecties, actieve feedbackophaling en zelfsturing gedurende de 20 weken.',
    assessmentCriteria: [
      'Consistente sprintplanningen en sprint reviews (2-wekelijkse cadans)',
      'Actief ophalen, documenteren en toepassen van peer- en docentfeedback',
      'Diepgaande reflecties op de eigen professionele groei als AI-professional'
    ],
    colorBadge: 'bg-[#3762AB] text-white',
  },
];

export const researchTopic: ResearchStory = {
  title: 'De Toekomst van AI in het Commerciële Vakgebied: Balans Tussen Automatisering en Menselijk Vertrouwen',
  field: 'Commerciële Economie & AI Beroepspraktijk',
  statusText: 'Onderzoek volgt binnenkort',
  summary: 'In het kader van de minor onderzoek ik hoe de snelle evolutie van AI-technologie (waaronder generatieve agents, predictive customer analytics en real-time gespreksanalyses) de rol van de sales- en accountmanagementprofessional herziet. Welke taken worden geautomatiseerd, welke vaardigheden worden cruciaal en hoe behoud je de menselijke meerwaarde in commercie?',
  researchQuestions: [
    'Hoe beïnvloedt de opkomst van AI-agenten de traditionele B2B sales funnel van leadgeneratie tot closing?',
    'Welke competenties en ethische waarborgen zijn vereist voor commerciële professionals om effectief samen te werken met AI?',
    'Wat is de kwantitatieve impact van AI-gestuurde klantprofilering op conversie en klantvertrouwen in het MKB?'
  ],
  expectedOutput: 'Een academisch onderbouwd en praktijkgericht onderzoeksrapport, verrijkt met kwalitatieve expertinterviews en strategische richtlijnen voor organisaties.',
  linkUrl: '',
  linkLabel: 'Onderzoeksverslag volgt binnenkort (knop wordt actief na publicatie)',
  isAvailable: false,
};

export const initialProjects: ProjectPOC[] = [
  {
    id: 'poc-1',
    title: 'Project 1 — in ontwikkeling',
    subtitle: 'POC 1',
    description: 'Dit project wordt binnenkort toegevoegd.',
    status: 'In ontwikkeling',
    sprint: 1,
    tools: [],
    relatedLUs: [],
    liveUrl: '',
    codeUrl: '',
  },
  {
    id: 'poc-2',
    title: 'Project 2 — in ontwikkeling',
    subtitle: 'POC 2',
    description: 'Dit project wordt binnenkort toegevoegd.',
    status: 'In ontwikkeling',
    sprint: 2,
    tools: [],
    relatedLUs: [],
    liveUrl: '',
    codeUrl: '',
  },
  {
    id: 'poc-3',
    title: 'Project 3 — in ontwikkeling',
    subtitle: 'POC 3',
    description: 'Dit project wordt binnenkort toegevoegd.',
    status: 'In ontwikkeling',
    sprint: 3,
    tools: [],
    relatedLUs: [],
    liveUrl: '',
    codeUrl: '',
  },
];

export const sprintTimeline: SprintData[] = [
  {
    sprintNumber: 1,
    weeks: 'Weken 1 - 2',
    theme: 'Kick-off & Eerste Stories',
    status: 'Huidige sprint',
  },
  {
    sprintNumber: 2,
    weeks: 'Weken 3 - 4',
    theme: 'Sprint 2',
    status: 'Gepland',
  },
  {
    sprintNumber: 3,
    weeks: 'Weken 5 - 6',
    theme: 'Sprint 3',
    status: 'Gepland',
  },
  {
    sprintNumber: 4,
    weeks: 'Weken 7 - 8',
    theme: 'Sprint 4',
    status: 'Gepland',
  },
  {
    sprintNumber: 5,
    weeks: 'Weken 9 - 10',
    theme: 'Sprint 5',
    status: 'Gepland',
  },
  {
    sprintNumber: 6,
    weeks: 'Weken 11 - 12',
    theme: 'Sprint 6',
    status: 'Gepland',
  },
  {
    sprintNumber: 7,
    weeks: 'Weken 13 - 14',
    theme: 'Sprint 7',
    status: 'Gepland',
  },
  {
    sprintNumber: 8,
    weeks: 'Weken 15 - 16',
    theme: 'Sprint 8',
    status: 'Gepland',
  },
];
