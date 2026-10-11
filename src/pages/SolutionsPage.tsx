import React from 'react';
import { Bot } from 'lucide-react';
import { ProjectTypePage } from '../components/projecten/ProjectTypePage';

export default function SolutionsPage() {
  return (
    <ProjectTypePage
      type="project"
      title="AI-oplossingen"
      lead="De AI-oplossingen en prototypes die ik tijdens de minor ontwerp, bouw en presenteer: werkende toepassingen voor een echte beroepspraktijk."
      metaDescription="AI-oplossingen en prototypes die Josse van der Mast bouwt in de minor Future-proof met AI."
      icon={Bot}
      comingSoonTitle="Gebouwde AI-oplossingen en prototypes"
      comingSoonText="Hier komen de AI-oplossingen die ik in de komende sprints bouw, met uitleg, gebruikte tools en een link naar het resultaat."
      relatedType="US"
      relatedText="User Stories waarin ik al iets heb gebouwd of opgeleverd."
    />
  );
}
