import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { LearningOutcomesSection } from './components/LearningOutcomesSection';
import { ResearchSection } from './components/ResearchSection';
import { ProjectsSection } from './components/ProjectsSection';
import { SprintOverviewSection } from './components/SprintOverviewSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { EvidenceItem } from './types';
import { initialEvidenceItems } from './data/portfolioData';

const LOCAL_STORAGE_KEY = 'josse_ai_portfolio_evidence_v1';

export default function App() {
  const [evidenceList, setEvidenceList] = useState<EvidenceItem[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch {
      // fallback to initial items
    }
    return initialEvidenceItems;
  });

  // Save to localStorage when updated
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(evidenceList));
    } catch (e) {
      console.warn('Could not persist evidence items to localStorage', e);
    }
  }, [evidenceList]);

  const handleAddEvidence = (newItem: EvidenceItem) => {
    setEvidenceList((prev) => [newItem, ...prev]);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-[#131D28] font-sans antialiased selection:bg-[#E8DFCFC0] selection:text-[#101E33]">
      {/* Top Navigation */}
      <Navbar currentSprint={1} />

      {/* Main Content Sections in requested sequence */}
      <main className="flex-1">
        {/* 1. Hero / Intro */}
        <HeroSection />

        {/* 2. Over mij */}
        <AboutSection />

        {/* 3. Leeruitkomsten (LU1 t/m LU5) */}
        <LearningOutcomesSection
          evidenceList={evidenceList}
          onAddEvidence={handleAddEvidence}
        />

        {/* 4. Onderzoek */}
        <ResearchSection />

        {/* 5. Projecten / Gebouwde oplossingen */}
        <ProjectsSection />

        {/* 6. Sprint-overzicht (Tijdlijn) */}
        <SprintOverviewSection />

        {/* 7. Contact */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
