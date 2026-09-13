import React from 'react';
import { 
  Target, 
  TrendingUp, 
  Sparkles, 
  Dumbbell, 
  Music, 
  Cpu, 
  Compass, 
  Quote, 
  Lightbulb, 
  Briefcase 
} from 'lucide-react';
import { aboutData } from '../data/portfolioData';

export const AboutSection: React.FC = () => {
  return (
    <section id="over-mij" className="py-24 px-6 bg-[#f6f7f8] border-b border-[#e4e7ea]">
      <div className="max-w-[1120px] mx-auto">
        
        {/* Section Header with Eyebrow */}
        <div className="max-w-2xl mb-12">
          <span className="text-[#121D2F] font-bold text-[13px] tracking-[0.06em] uppercase block mb-3.5">
            Over Josse
          </span>
          <h2 className="text-3xl sm:text-[34px] font-bold text-[#121D2F] leading-tight mb-2">
            Commerciële Drive & Menselijke Verbinding
          </h2>
          <p className="text-[16px] text-[#4a5b6b] leading-relaxed">
            Wie ik ben achter de bewijsstukken. Mijn achtergrond in commerciële teams, 
            mijn talenten, passies en ambities voor de toekomst met AI.
          </p>
        </div>

        {/* Bio Narrative & Quote Block */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
          
          {/* Main Story Paragraphs */}
          <div className="lg:col-span-7 space-y-4">
            {aboutData.bioParagraphs.map((paragraph, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-[6px] border border-[#e4e7ea] text-[15px] text-[#22303f] leading-relaxed"
              >
                {paragraph}
              </div>
            ))}
          </div>

          {/* Quote & AI Vision Box */}
          <div className="lg:col-span-5 space-y-4 flex flex-col">
            
            {/* Quote Box in Navy Style */}
            <div className="bg-[#121D2F] text-white p-7 rounded-[6px] relative flex-1 flex flex-col justify-between">
              <div>
                <Quote className="w-8 h-8 text-[#3762AB] mb-4 opacity-80" />
                <p className="text-[17px] font-medium italic text-white/95 leading-snug">
                  "{aboutData.quote}"
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-white/15 text-[13px] tracking-[0.06em] uppercase text-[#9cbce8] font-bold">
                — {aboutData.name}
              </div>
            </div>

            {/* AI Vision snippet */}
            <div className="bg-white p-6 rounded-[6px] border border-[#e4e7ea] space-y-2">
              <h3 className="text-[18px] font-bold text-[#121D2F] flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-[#3762AB]" />
                Mijn visie op AI
              </h3>
              <p className="text-[14px] text-[#4a5b6b] leading-relaxed">
                {aboutData.aiVision[0]}
              </p>
            </div>

          </div>
        </div>

        {/* 3 Core Pillars: Talenten, Passies & Dromen */}
        <div className="mb-4">
          <span className="text-[#121D2F] font-bold text-[13px] tracking-[0.06em] uppercase block mb-2">
            Persoonlijke Pijlers
          </span>
          <h3 className="text-2xl sm:text-[28px] font-bold text-[#121D2F] mb-8">
            Talenten, Passies en Dromen
          </h3>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          
          {/* Blok 1: Talenten */}
          <div className="bg-white p-8 rounded-[6px] border border-[#e4e7ea] hover:shadow-[0_4px_12px_rgba(0,0,0,0.08)] transition-all flex flex-col">
            <div className="w-12 h-12 rounded-full bg-[#121D2F] flex items-center justify-center text-white mb-5 shrink-0">
              <Target className="w-6 h-6 stroke-[2]" />
            </div>
            <h3 className="text-[20px] font-bold text-[#121D2F] mb-3">
              Talenten & Kwaliteiten
            </h3>
            <p className="text-[14px] text-[#4a5b6b] mb-6 leading-relaxed">
              Kerncompetenties ontwikkeld tijdens sales- en leidinggevende rollen en deze minor:
            </p>
            <div className="space-y-4 flex-1">
              {aboutData.talents.map((talent, idx) => (
                <div key={idx} className="pb-3 border-b border-[#e4e7ea] last:border-0 last:pb-0">
                  <div className="text-[14px] font-bold text-[#121D2F] mb-1">
                    {talent.title}
                  </div>
                  <p className="text-[13px] text-[#4a5b6b] leading-relaxed">
                    {talent.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Blok 2: Passies (Tekst-only met ronde icoon-badges, GEEN foto's) */}
          <div className="bg-white p-8 rounded-[6px] border border-[#e4e7ea] hover:shadow-[0_4px_12px_rgba(0,0,0,0.08)] transition-all flex flex-col">
            <div className="w-12 h-12 rounded-full bg-[#121D2F] flex items-center justify-center text-white mb-5 shrink-0">
              <Sparkles className="w-6 h-6 stroke-[2]" />
            </div>
            <h3 className="text-[20px] font-bold text-[#121D2F] mb-3">
              Passies & Energie
            </h3>
            <p className="text-[14px] text-[#4a5b6b] mb-6 leading-relaxed">
              Wat mij mentaal scherp, energiek en nieuwsgierig houdt buiten studie en werk:
            </p>
            <div className="space-y-4 flex-1">
              {aboutData.passions.map((passion, idx) => (
                <div key={idx} className="pb-3 border-b border-[#e4e7ea] last:border-0 last:pb-0">
                  <div className="flex items-center gap-2 text-[14px] font-bold text-[#121D2F] mb-1">
                    {passion.iconName === 'Dumbbell' && <Dumbbell className="w-4 h-4 text-[#3762AB]" />}
                    {passion.iconName === 'Music' && <Music className="w-4 h-4 text-[#3762AB]" />}
                    {passion.iconName === 'Cpu' && <Cpu className="w-4 h-4 text-[#3762AB]" />}
                    <span>{passion.title}</span>
                  </div>
                  <p className="text-[13px] text-[#4a5b6b] leading-relaxed">
                    {passion.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Blok 3: Dromen (Exact de opgegeven tekst) */}
          <div className="bg-white p-8 rounded-[6px] border border-[#e4e7ea] hover:shadow-[0_4px_12px_rgba(0,0,0,0.08)] transition-all flex flex-col">
            <div className="w-12 h-12 rounded-full bg-[#121D2F] flex items-center justify-center text-white mb-5 shrink-0">
              <Compass className="w-6 h-6 stroke-[2]" />
            </div>
            <h3 className="text-[20px] font-bold text-[#121D2F] mb-3">
              Dromen & Ambities
            </h3>
            <p className="text-[14px] text-[#4a5b6b] mb-4 leading-relaxed">
              Mijn plannen na de studie en de richting waarin ik wil doorgroeien:
            </p>
            <div className="bg-[#f6f7f8] p-5 rounded-[4px] border border-[#e4e7ea] flex-1">
              <p className="text-[14px] text-[#22303f] leading-[1.65]">
                {aboutData.dreamsText}
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
