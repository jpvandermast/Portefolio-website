import React from 'react';
import { ArrowRight, BookOpen, FileCode, CheckCircle2, Compass, ShieldCheck } from 'lucide-react';
import { aboutData } from '../data/portfolioData';

export const HeroSection: React.FC = () => {
  return (
    <section className="relative overflow-hidden pt-8 pb-16 lg:pt-14 lg:pb-24 border-b border-[#EAE3D6]">
      {/* Subtle background decoration */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="absolute -top-32 right-10 w-96 h-96 rounded-full bg-[#EADCC8] blur-3xl" />
        <div className="absolute top-48 -left-20 w-80 h-80 rounded-full bg-[#D4E0EE] blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Core Narrative */}
          <div className="lg:col-span-7 space-y-6 text-left">
            
            {/* Context Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F4EFE6] border border-[#E0D7C6] text-xs font-semibold text-[#1A2E4A]">
              <span className="w-2 h-2 rounded-full bg-[#C58B2E] animate-pulse"></span>
              <span>Hogeschool Utrecht • Minor Future-proof met AI! (2026)</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-5xl font-extrabold text-[#1A2E4A] tracking-tight leading-[1.15]">
              AI in de Commerciële Beroepspraktijk:{' '}
              <span className="text-[#35537E]">Onderzoeken, Bouwen & Verantwoorden.</span>
            </h1>

            {/* Subtitle / Intro */}
            <p className="text-lg sm:text-xl text-[#4A5D73] leading-relaxed max-w-2xl font-normal">
              Welkom op het centrale portfolio van <strong className="text-[#1A2E4A] font-semibold">Josse van der Mast</strong>. 
              Hier verzamel ik al het bewijsmateriaal van wat ik onderzoek, ontwerp en leer tijdens de 20-weekse minor, 
              volledig gekoppeld aan de <strong className="text-[#1A2E4A] font-semibold">5 leeruitkomsten (LU1 t/m LU5)</strong>.
            </p>

            {/* Minor Mechanism Explanation (Sprint context) */}
            <div className="p-4 rounded-xl bg-[#FFFFFF] border border-[#E8E1D5] shadow-xs space-y-2">
              <div className="text-xs font-bold uppercase tracking-wider text-[#C58B2E] flex items-center gap-1.5">
                <Compass className="w-3.5 h-3.5" />
                Wat je op deze site kunt verwachten
              </div>
              <p className="text-sm text-[#4A5D73] leading-normal">
                De minor is opgebouwd uit sprints van twee weken met drie pijlers: 
                <strong className="text-[#1A2E4A]"> Research Stories</strong> (onderzoek naar AI-impact in sales), 
                <strong className="text-[#1A2E4A]"> User Stories</strong> (het bouwen van werkende AI proof-of-concepts) en 
                <strong className="text-[#1A2E4A]"> Learning Stories</strong> (nieuwe AI-vaardigheden & ethische kaders).
              </p>
            </div>

            {/* Primary Action Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <a
                href="#leeruitkomsten"
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl text-sm font-bold text-white bg-[#1A2E4A] hover:bg-[#2C476F] shadow-sm hover:shadow transition-all group"
              >
                <BookOpen className="w-4 h-4 text-[#E8A948]" />
                <span>Bekijk Bewijsstukken per LU</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>

              <a
                href="#onderzoek"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-bold text-[#1A2E4A] bg-[#F4EFE6] hover:bg-[#EBE2D3] border border-[#DDD3C2] transition-colors"
              >
                <span>Onderzoeksplan</span>
              </a>

              <a
                href="#over-mij"
                className="inline-flex items-center justify-center px-4 py-3.5 text-sm font-semibold text-[#5A6D82] hover:text-[#1A2E4A] transition-colors"
              >
                Wie is Josse?
              </a>
            </div>

            {/* Quick Metrics Bar */}
            <div className="pt-4 grid grid-cols-3 gap-3 max-w-lg border-t border-[#EAE3D6]">
              <div>
                <div className="text-2xl font-extrabold text-[#1A2E4A]">20</div>
                <div className="text-xs font-medium text-[#64748B]">Weken Minor</div>
              </div>
              <div>
                <div className="text-2xl font-extrabold text-[#1A2E4A]">10</div>
                <div className="text-xs font-medium text-[#64748B]">Agile Sprints</div>
              </div>
              <div>
                <div className="text-2xl font-extrabold text-[#C58B2E]">5</div>
                <div className="text-xs font-medium text-[#64748B]">Leeruitkomsten (LU)</div>
              </div>
            </div>

          </div>

          {/* Right Column: Visual Portrait & Credentials Card */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="relative w-full max-w-sm">
              
              {/* Outer decorative halo */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-[#1A2E4A] to-[#C58B2E] opacity-15 transform rotate-2"></div>
              
              {/* Main Photo Card */}
              <div className="relative bg-[#FFFFFF] p-3 rounded-2xl border border-[#E8E1D5] shadow-lg">
                <div className="overflow-hidden rounded-xl aspect-[4/5] relative bg-[#E8E1D5]">
                  <img
                    src={aboutData.photos.hero}
                    alt={aboutData.name}
                    className="w-full h-full object-cover object-top hover:scale-102 transition-transform duration-500"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#0F1C2E]/90 via-[#0F1C2E]/40 to-transparent p-5 text-white">
                    <div className="text-lg font-bold">{aboutData.name}</div>
                    <div className="text-xs text-[#EADCC8]">{aboutData.role}</div>
                  </div>
                </div>

                {/* Sub-card info */}
                <div className="mt-3 p-3 bg-[#FAF8F5] rounded-xl border border-[#EFE8DD] flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-[#52796F]" />
                    <div className="text-xs text-[#1A2E4A]">
                      <span className="font-semibold block">Beoordelingsportfolio</span>
                      <span className="text-[#64748B]">Minor Future-proof met AI</span>
                    </div>
                  </div>
                  <span className="inline-flex items-center px-2 py-1 rounded text-[11px] font-bold bg-[#E7EEF6] text-[#1A2E4A]">
                    HU Utrecht
                  </span>
                </div>
              </div>

              {/* Float Badge */}
              <div className="absolute -bottom-4 -left-4 bg-[#1A2E4A] text-white py-2 px-3.5 rounded-xl shadow-md border border-[#2C476F] flex items-center gap-2 text-xs font-semibold">
                <CheckCircle2 className="w-4 h-4 text-[#C58B2E]" />
                <span>LU1 t/m LU5 Gedekt</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
