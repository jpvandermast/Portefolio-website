import React from 'react';
import { Bento } from '../components/home/Bento';
import { ContactStrip } from '../components/home/ContactStrip';
import { Hero } from '../components/home/Hero';
import { WorkTeaser } from '../components/home/WorkTeaser';
import { Container } from '../components/ui/Container';
import { Reveal } from '../components/ui/Reveal';
import { SectionHeader } from '../components/ui/SectionHeader';
import { useDocumentTitle } from '../lib/useDocumentTitle';

export default function HomePage() {
  useDocumentTitle('');
  return (
    <>
      <Hero />
      <Container className="py-16 sm:py-24">
        <SectionHeader eyebrow="Overzicht" title="Waar ik nu sta" description="Live uit mijn portfolio-database: voortgang, de lopende sprint en het nieuwste bewijs." />
        <Bento />
        <div className="mt-16 sm:mt-24">
          <SectionHeader eyebrow="Onderzoek en bouwen" title="Wat ik onderzoek en bouw" description="Mijn onderzoek naar AI in het vak van de webontwikkelaar en de AI-oplossingen die ik tijdens de minor maak." />
          <WorkTeaser />
        </div>
        <Reveal className="mt-16 sm:mt-24">
          <ContactStrip />
        </Reveal>
      </Container>
    </>
  );
}
