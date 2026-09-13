import React from 'react';
import { ArrowRight, BookOpen, Compass, CheckCircle2, FileText, Sparkles } from 'lucide-react';

export const HeroSection: React.FC = () => {
  return (
    <section className="relative bg-gradient-to-br from-[#0c1420] via-[#121D2F] to-[#25467d] text-white py-20 lg:py-24 px-6">
      <div className="max-w-[1120px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Core Narrative */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Eyebrow */}
            <span className="text-[#9cbce8] font-bold text-[13px] tracking-[0.06em] uppercase block">
              Hogeschool Utrecht • Minor Future-proof met AI! (2026)
            </span>

            {/* Main Headline (48px, line-height 1.15, bold 700) */}
            <h1 className="text-3xl sm:text-[44px] lg:text-[48px] font-bold text-white leading-[1.15] tracking-tight">
              AI in de Commerciële Beroepspraktijk: Onderzoeken, Bouwen & Verantwoorden
            </h1>

            {/* Subtitle / Intro */}
            <p className="text-base sm:text-[18px] text-white/90 leading-relaxed max-w-2xl font-normal">
              Welkom op het centrale portfolio van <strong>Josse van der Mast</strong>. Hier verzamel ik 
              al het bewijsmateriaal van wat ik onderzoek, ontwerp en leer tijdens deze 20-weekse minor, 
              volledig gestructureerd rondom de <strong>5 officiële leeruitkomsten (LU1 t/m LU5)</strong>.
            </p>

            {/* Hero Tags */}
            <div className="flex flex-wrap gap-x-6 gap-y-2 text-[14px] text-white/85 pt-1">
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#3762AB]"></span>
                Commerciële Economie
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#3762AB]"></span>
                20 Weken • 10 Sprints
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#3762AB]"></span>
                Research, User & Learning Stories
              </span>
            </div>

            {/* Action Buttons (16px 30px, radius 4px, font-bold) */}
            <div className="pt-4 flex flex-wrap items-center gap-4">
              <a
                href="#leeruitkomsten"
                className="inline-flex items-center justify-center gap-2.5 bg-[#3762AB] hover:bg-[#2b4d87] text-white py-4 px-[30px] rounded-[4px] font-bold text-[16px] transition-colors"
              >
                <span>Bekijk Bewijsstukken per LU</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="#onderzoek"
                className="inline-flex items-center justify-center bg-white/10 hover:bg-white/15 text-white border border-white/20 py-4 px-[30px] rounded-[4px] font-bold text-[16px] transition-colors"
              >
                <span>Onderzoeksplan</span>
              </a>

              <a
                href="#over-mij"
                className="inline-flex items-center justify-center text-white/80 hover:text-white py-4 px-4 font-semibold text-[15px] transition-colors"
              >
                Wie is Josse? →
              </a>
            </div>

          </div>

          {/* Right Column: Text & Metrics Card (Geen foto's) */}
          <div className="lg:col-span-4">
            <div className="bg-white/5 border border-white/15 rounded-[6px] p-6 lg:p-7 backdrop-blur-xs space-y-6">
              
              <div className="space-y-2">
                <span className="text-[#9cbce8] font-bold text-[11px] tracking-[0.06em] uppercase block">
                  Minor Inrichting
                </span>
                <h3 className="text-xl font-bold text-white">
                  3 Typen Verhalen
                </h3>
                <p className="text-xs text-white/80 leading-relaxed">
                  De minor hanteert een Agile aanpak verdeeld over 10 tweewekelijkse sprints:
                </p>
              </div>

              <div className="space-y-3.5">
                <div className="p-3.5 rounded-[4px] bg-white/5 border border-white/10">
                  <div className="text-xs font-bold text-white flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#3762AB]"></span>
                    Research Stories
                  </div>
                  <p className="text-[12px] text-white/75 mt-1">
                    Academisch en praktijkonderzoek naar AI-transformatie in verkoop en klantcontact.
                  </p>
                </div>

                <div className="p-3.5 rounded-[4px] bg-white/5 border border-white/10">
                  <div className="text-xs font-bold text-white flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#3762AB]"></span>
                    User Stories
                  </div>
                  <p className="text-[12px] text-white/75 mt-1">
                    Functionele AI proof-of-concepts, prototypes en tastbare automatiseringstools.
                  </p>
                </div>

                <div className="p-3.5 rounded-[4px] bg-white/5 border border-white/10">
                  <div className="text-xs font-bold text-white flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#3762AB]"></span>
                    Learning Stories
                  </div>
                  <p className="text-[12px] text-white/75 mt-1">
                    Nieuwe AI-technieken beheersen, prompting logboeken en zelfreflectie.
                  </p>
                </div>
              </div>

              {/* Metrics grid */}
              <div className="pt-4 border-t border-white/15 grid grid-cols-3 gap-2 text-center">
                <div>
                  <div className="text-2xl font-bold text-white">20</div>
                  <div className="text-[11px] text-white/70">Weken</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-white">10</div>
                  <div className="text-[11px] text-white/70">Sprints</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-[#9cbce8]">5</div>
                  <div className="text-[11px] text-white/70">Leeruitkomsten</div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
