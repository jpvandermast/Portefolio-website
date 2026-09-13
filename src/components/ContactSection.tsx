import React from 'react';
import { Mail, Linkedin, Github, MapPin, GraduationCap, ArrowUpRight } from 'lucide-react';
import { aboutData } from '../data/portfolioData';

export const ContactSection: React.FC = () => {
  return (
    <section id="contact" className="py-24 px-6 bg-white border-b border-[#e4e7ea]">
      <div className="max-w-[1120px] mx-auto">
        
        {/* Section Header with Eyebrow */}
        <div className="max-w-2xl mb-12">
          <span className="text-[#121D2F] font-bold text-[13px] tracking-[0.06em] uppercase block mb-3.5">
            Contact & Verbinding
          </span>
          <h2 className="text-3xl sm:text-[34px] font-bold text-[#121D2F] leading-tight mb-2">
            Direct in Contact Komen
          </h2>
          <p className="text-[16px] text-[#4a5b6b] leading-relaxed">
            Heb je vragen over een van de bewijsstukken, feedback op een uitwerking of interesse in 
            een AI-proof-of-concept voor jouw organisatie? Neem direct contact op via onderstaande kanalen.
          </p>
        </div>

        {/* Main Contact Container (Reference card style) */}
        <div className="bg-[#f6f7f8] rounded-[6px] border border-[#e4e7ea] p-8 lg:p-12">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Column: Direct Action Buttons (No Form!) */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-[0.06em] text-[#121D2F] block mb-2">
                  Directe Contactknoppen
                </span>
                <p className="text-[15px] text-[#4a5b6b] leading-relaxed">
                  Kies je gewenste medium om een bericht te sturen of mijn professionele netwerk te bekijken:
                </p>
              </div>

              {/* Action Buttons Stack (16px 30px, 4px radius, bold) */}
              <div className="flex flex-wrap gap-4 pt-2">
                {/* 1. Direct Mailen (Accentblauw #3762AB) */}
                <a
                  href={`mailto:${aboutData.email}`}
                  className="inline-flex items-center justify-center gap-2.5 bg-[#3762AB] hover:bg-[#2b4d87] text-white py-4 px-[30px] rounded-[4px] font-bold text-[16px] transition-colors shadow-xs"
                >
                  <Mail className="w-5 h-5" />
                  <span>Direct Mailen</span>
                </a>

                {/* 2. LinkedIn Profiel (Navy #121D2F) */}
                <a
                  href={aboutData.socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2.5 bg-[#121D2F] hover:bg-[#2b4d87] text-white py-4 px-[30px] rounded-[4px] font-bold text-[16px] transition-colors shadow-xs"
                >
                  <Linkedin className="w-5 h-5" />
                  <span>LinkedIn-profiel</span>
                  <ArrowUpRight className="w-4 h-4 opacity-70" />
                </a>

                {/* 3. GitHub Profiel */}
                <a
                  href={aboutData.socialLinks.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2.5 bg-white hover:bg-[#e4e7ea] text-[#121D2F] border border-[#e4e7ea] py-4 px-[30px] rounded-[4px] font-bold text-[16px] transition-colors"
                >
                  <Github className="w-5 h-5" />
                  <span>GitHub Repository</span>
                  <ArrowUpRight className="w-4 h-4 opacity-70" />
                </a>
              </div>
            </div>

            {/* Right Column: Contact Details Cards */}
            <div className="lg:col-span-5 space-y-4">
              
              <div className="bg-white p-5 rounded-[6px] border border-[#e4e7ea] flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-[#121D2F] text-white flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold uppercase tracking-[0.06em] text-[#4a5b6b]">
                    E-mailadres
                  </div>
                  <a
                    href={`mailto:${aboutData.email}`}
                    className="text-[15px] font-bold text-[#121D2F] hover:text-[#3762AB] transition-colors"
                  >
                    {aboutData.email}
                  </a>
                </div>
              </div>

              <div className="bg-white p-5 rounded-[6px] border border-[#e4e7ea] flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-[#121D2F] text-white flex items-center justify-center shrink-0">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold uppercase tracking-[0.06em] text-[#4a5b6b]">
                    Instelling & Opleiding
                  </div>
                  <div className="text-[14px] font-bold text-[#121D2F]">
                    Hogeschool Utrecht • Commerciële Economie
                  </div>
                  <div className="text-xs text-[#4a5b6b]">
                    Minor Future-proof met AI! (2026)
                  </div>
                </div>
              </div>

              <div className="bg-white p-5 rounded-[6px] border border-[#e4e7ea] flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-[#121D2F] text-white flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold uppercase tracking-[0.06em] text-[#4a5b6b]">
                    Standplaats
                  </div>
                  <div className="text-[14px] font-bold text-[#121D2F]">
                    {aboutData.location}
                  </div>
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
