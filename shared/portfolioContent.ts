// Gedeeld tussen de frontend (src/) en de serverfunctie (api/). Geen browser- of Node-specifieke imports.
import type { AboutData, LearningOutcome } from '../src/types';

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

/**
 * Officiële leeruitkomsten uit de Canvas-rubriek (Sprint 1) en het minimaal aantal keer "voldoende"
 * uit de minorgids (v2.0, p. 7). Niet zelf herformuleren: coaches herkennen deze teksten.
 * Ook gebruikt door de chatbot (api/_lib/context.ts: code, title, shortDescription).
 */
export const learningOutcomes: LearningOutcome[] = [
  {
    id: 'LU1',
    nummer: 1,
    code: 'LU1',
    title: 'Impact AI op beroep',
    label: 'Impact',
    shortDescription:
      'Je kunt zelfstandig onderzoek doen naar de impact van AI in jouw toekomstig beroep en vaststellen welke nieuwe AI- en digitale vaardigheden daarvoor nodig zijn.',
    minimumVoldoende: 2,
  },
  {
    id: 'LU2',
    nummer: 2,
    code: 'LU2',
    title: 'Praktijkoplossing AI',
    label: 'Oplossing',
    shortDescription:
      'Je kunt zelfstandig een AI-oplossing ontwerpen, realiseren en presenteren die een specifieke beroepspraktijk radicaal transformeert (verandert).',
    minimumVoldoende: 4,
  },
  {
    id: 'LU3',
    nummer: 3,
    code: 'LU3',
    title: 'Ethisch en verantwoord',
    label: 'Ethiek',
    shortDescription:
      'Je kunt zelfstandig de ethische vraagstukken en uitdagingen van AI in je vakgebied identificeren en aanbevelingen formuleren voor verantwoord AI-gebruik, rekening houdend met privacy, bias en transparantie.',
    minimumVoldoende: 2,
  },
  {
    id: 'LU4',
    nummer: 4,
    code: 'LU4',
    title: 'AI-tools en technieken',
    label: 'Tools',
    shortDescription:
      'Je kunt zelfstandig verschillende AI-tools en platforms toepassen (zoals machine-learningtechnieken, chatbots, agents, prompts, etc.) en deze gebruiken om specifieke taken binnen je vakgebied op te lossen.',
    minimumVoldoende: 4,
  },
  {
    id: 'LU5',
    nummer: 5,
    code: 'LU5',
    title: 'Zelfstandig en zelfsturend',
    label: 'Zelfsturing',
    shortDescription:
      'Je kunt een eigen leerroute vaststellen en uitvoeren waarbij je zelfstandig je leervragen stelt, relevante bronnen en tools selecteert, je eigen voortgang monitort en kritisch reflecteert op je leerproces en persoonlijke ontwikkeling in het AI-landschap.',
    minimumVoldoende: 6,
  },
];

/** Minorgids: minimaal 24 voldoende beoordeelde leeruitkomsten over 8 sprints, minimaal 3 LU's per sprint. */
export const MINIMUM_TOTAAL_VOLDOENDE = 24;
