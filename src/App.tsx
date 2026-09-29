import React from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { LearningOutcomesSection } from './components/LearningOutcomesSection';
import { ResearchSection } from './components/ResearchSection';
import { ProjectsSection } from './components/ProjectsSection';
import { SprintOverviewSection } from './components/SprintOverviewSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { useMatch } from 'react-router';
import { StoryPanel } from './components/StoryPanel';

export default function App() {
  // /stories/:slug toont dezelfde homepage met het story-paneel open
  const storyMatch = useMatch('/stories/:slug');
  const slug = storyMatch?.params.slug;

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#22303f] font-sans antialiased selection:bg-[#3762AB] selection:text-white">
      {/* Top Navigation */}
      <Navbar />

      {/* Main Content Sections in requested sequence */}
      <main className="flex-1">
        {/* 1. Hero / Intro */}
        <HeroSection />

        {/* 2. Over mij (Talenten, Passies, Dromen & Visie) */}
        <AboutSection />

        {/* 3. Leeruitkomsten (LU1 t/m LU5) */}
        <LearningOutcomesSection />

        {/* 4. Onderzoek */}
        <ResearchSection />

        {/* 5. Projecten / Gebouwde oplossingen */}
        <ProjectsSection />

        {/* 6. Sprint-overzicht (Tijdlijn) */}
        <SprintOverviewSection />

        {/* 7. Contact (Vereenvoudigd met directe knoppen) */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />

      {slug && <StoryPanel key={slug} slug={slug} />}
    </div>
  );
}
