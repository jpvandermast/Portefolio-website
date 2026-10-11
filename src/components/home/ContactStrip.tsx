import React from 'react';
import { Linkedin, Mail } from 'lucide-react';
import { aboutData } from '../../../shared/portfolioContent';
import { Button } from '../ui/Button';

/** Korte contactstrook onderaan de homepage. */
export const ContactStrip: React.FC = () => (
  <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 rounded-panel bg-card ring-1 ring-line shadow-card px-6 py-7 sm:px-10 sm:py-9">
    <div>
      <h2 className="text-h2">Vragen of feedback?</h2>
      <p className="mt-2 text-muted max-w-md">Over een story, een leeruitkomst of samenwerken met AI: ik hoor het graag.</p>
    </div>
    <div className="flex flex-wrap gap-3">
      <Button href={`mailto:${aboutData.email}`} size="lg">
        <Mail className="w-4 h-4" aria-hidden="true" />
        Mail mij
      </Button>
      <Button href={aboutData.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" variant="secondary" size="lg">
        <Linkedin className="w-4 h-4" aria-hidden="true" />
        LinkedIn
      </Button>
    </div>
  </div>
);
