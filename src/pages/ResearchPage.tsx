import React from 'react';
import { FlaskConical } from 'lucide-react';
import { ProjectTypePage } from '../components/projecten/ProjectTypePage';

export default function ResearchPage() {
  return (
    <ProjectTypePage
      type="onderzoek"
      title="Onderzoek"
      lead="Mijn onderzoek naar de toekomst van AI in het vakgebied van de webdesigner: wat verandert er, en welke vaardigheden heb ik daarvoor nodig?"
      metaDescription="Het onderzoek van Josse van der Mast naar de toekomst van AI in het vakgebied van de webdesigner."
      icon={FlaskConical}
      comingSoonTitle="De toekomst van AI in het vakgebied van de webdesigner"
      comingSoonText="Dit onderzoek is afgerond en wordt hier binnenkort gepubliceerd, met een samenvatting en het volledige verslag."
      relatedType="RS"
      relatedText="Ander onderzoek dat ik tijdens de sprints heb gedaan."
    />
  );
}
