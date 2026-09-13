import React from 'react';
import { Target, TrendingUp, Sparkles, Heart, Quote } from 'lucide-react';
import { aboutData } from '../data/portfolioData';

export const AboutSection: React.FC = () => {
  return (
    <section id="over-mij" className="py-20 bg-[#FAF8F5] border-b border-[#EAE3D6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#F4EFE6] text-xs font-bold uppercase tracking-wider text-[#1A2E4A] mb-3">
            <span>Persoonlijk Profiel</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1A2E4A] tracking-tight">
            Over Josse: Commerciële Drive & Menselijke Verbinding
          </h2>
          <p className="mt-3 text-lg text-[#556980]">
            Wie ik ben achter de bewijsstukken. Mijn achtergrond in sales en leiderschap, 
            mijn talenten en hoe ik de wisselwerking tussen mens en kunstmatige intelligentie zie.
          </p>
        </div>

        {/* Narrative & Visual Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-16">
          
          {/* Main Story & Philosophy */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Distinctive Quote Box */}
            <div className="p-6 rounded-2xl bg-[#1A2E4A] text-white relative shadow-sm">
              <Quote className="w-10 h-10 text-[#C58B2E] opacity-30 absolute top-4 right-4" />
              <p className="text-xl font-semibold italic text-[#F4EFE6] leading-snug">
                "{aboutData.quote}"
              </p>
              <div className="mt-4 text-xs tracking-wider uppercase text-[#D89C3C] font-bold">
                — Josse van der Mast
              </div>
            </div>

            {/* Story Paragraphs */}
            <div className="space-y-4 text-base text-[#475A70] leading-relaxed">
              {aboutData.bioParagraphs.map((paragraph, index) => (
                <p key={index} className="bg-[#FFFFFF] p-5 rounded-xl border border-[#EAE3D6] shadow-2xs">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Vision on AI Box */}
            <div className="p-6 rounded-2xl bg-[#F4EFE6] border border-[#E0D5C3] space-y-3">
              <h3 className="text-lg font-bold text-[#1A2E4A] flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-[#C58B2E]" />
                Mijn visie op de toekomst met AI
              </h3>
              {aboutData.aiVision.map((v, i) => (
                <p key={i} className="text-sm text-[#475A70] leading-relaxed">
                  {v}
                </p>
              ))}
            </div>

          </div>

          {/* Side Column: Portrait & Talents */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Secondary Photo */}
            <div className="bg-[#FFFFFF] p-4 rounded-2xl border border-[#E8E1D5] shadow-sm">
              <div className="overflow-hidden rounded-xl aspect-[4/5] bg-[#E8E1D5]">
                <img
                  src={aboutData.photos.about}
                  alt="Josse van der Mast in actie"
                  className="w-full h-full object-cover object-center hover:scale-102 transition-transform duration-300"
                />
              </div>
              <div className="mt-3 text-center">
                <span className="text-xs font-semibold text-[#6C7E92]">
                  Josse van der Mast • Student Commerciële Economie & AI minor
                </span>
              </div>
            </div>

            {/* Talents */}
            <div className="bg-[#FFFFFF] p-6 rounded-2xl border border-[#E8E1D5] shadow-xs space-y-4">
              <h3 className="text-lg font-bold text-[#1A2E4A]">
                Talenten & Kernkwaliteiten
              </h3>
              <div className="space-y-4">
                {aboutData.talents.map((talent, i) => {
                  return (
                    <div key={i} className="flex items-start gap-3.5 pb-3 border-b border-[#F0EBE1] last:border-0 last:pb-0">
                      <div className="w-9 h-9 rounded-lg bg-[#E7EEF6] text-[#1A2E4A] flex items-center justify-center shrink-0 mt-0.5">
                        {i === 0 && <Target className="w-4 h-4" />}
                        {i === 1 && <TrendingUp className="w-4 h-4" />}
                        {i === 2 && <Sparkles className="w-4 h-4 text-[#C58B2E]" />}
                      </div>
                      <div>
                        <div className="text-sm font-bold text-[#1A2E4A]">{talent.title}</div>
                        <p className="text-xs text-[#5C6F84] leading-relaxed mt-1">
                          {talent.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>
        </div>

        {/* Passions & Hobbies Cards */}
        <div className="mt-12 pt-12 border-t border-[#EAE3D6]">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h3 className="text-2xl font-bold text-[#1A2E4A]">
              Naast studie en technologie
            </h3>
            <p className="text-sm text-[#64748B] mt-1">
              Wat mij energie geeft, focus brengt en scherp houdt buiten de collegebanken.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {aboutData.passions.map((passion, index) => (
              <div
                key={index}
                className="bg-[#FFFFFF] rounded-2xl overflow-hidden border border-[#E8E1D5] shadow-xs hover:shadow-md transition-all flex flex-col group"
              >
                <div className="h-48 overflow-hidden bg-[#E8E1D5] relative">
                  <img
                    src={passion.imageUrl}
                    alt={passion.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 right-3 bg-[#FAF8F5]/90 backdrop-blur-xs p-1.5 rounded-full text-[#1A2E4A]">
                    <Heart className="w-4 h-4 text-[#C58B2E]" />
                  </div>
                </div>
                <div className="p-5 flex-1 flex flex-col">
                  <h4 className="text-lg font-bold text-[#1A2E4A] mb-2">{passion.title}</h4>
                  <p className="text-xs text-[#52667A] leading-relaxed flex-1">
                    {passion.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
