import React from 'react';
import { 
  FileText, 
  Clock, 
  HelpCircle, 
  Target, 
  BookOpen, 
  ExternalLink 
} from 'lucide-react';
import { researchTopic } from '../data/portfolioData';

export const ResearchSection: React.FC = () => {
  return (
    <section id="onderzoek" className="py-24 px-6 bg-[#f6f7f8] border-b border-[#e4e7ea]">
      <div className="max-w-[1120px] mx-auto">
        
        {/* Section Header with Eyebrow */}
        <div className="max-w-2xl mb-12">
          <span className="text-[#121D2F] font-bold text-[13px] tracking-[0.06em] uppercase block mb-3.5">
            Centraal Minor Onderzoek
          </span>
          <h2 className="text-3xl sm:text-[34px] font-bold text-[#121D2F] leading-tight mb-2">
            De Toekomst van AI in het Commerciële Vakgebied
          </h2>
          <p className="text-[16px] text-[#4a5b6b] leading-relaxed">
            Een grondige verkenning naar hoe kunstmatige intelligentie de rol van de sales- en 
            accountmanagementprofessional herziet en welke menselijke kwaliteiten onmisbaar blijven.
          </p>
        </div>

        {/* Prominent Research Card */}
        <div className="bg-white rounded-[6px] border border-[#e4e7ea] hover:shadow-[0_4px_12px_rgba(0,0,0,0.08)] transition-all overflow-hidden">
          
          {/* Top Banner (Navy styling) */}
          <div className="bg-[#121D2F] text-white p-8 lg:p-10">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-[4px] bg-white/10 text-white text-xs font-bold border border-white/15">
                <Clock className="w-3.5 h-3.5 text-[#9cbce8]" />
                <span>{researchTopic.statusText}</span>
              </span>
              <span className="text-xs text-[#9cbce8] font-bold uppercase tracking-[0.06em]">
                {researchTopic.field}
              </span>
            </div>

            <h3 className="text-2xl sm:text-[28px] font-bold text-white leading-tight max-w-4xl mb-4">
              {researchTopic.title}
            </h3>

            <p className="text-[15px] text-white/90 leading-relaxed max-w-3xl">
              {researchTopic.summary}
            </p>
          </div>

          {/* Core Body Grid */}
          <div className="p-8 lg:p-10 space-y-8 bg-white">
            
            {/* Research Questions */}
            <div>
              <span className="text-[#121D2F] font-bold text-[13px] tracking-[0.06em] uppercase block mb-4">
                Centrale Onderzoeksvragen
              </span>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {researchTopic.researchQuestions.map((question, idx) => (
                  <div
                    key={idx}
                    className="p-6 rounded-[6px] bg-[#f6f7f8] border border-[#e4e7ea] flex flex-col"
                  >
                    <div className="w-10 h-10 rounded-full bg-[#121D2F] text-white flex items-center justify-center font-bold text-sm mb-4 shrink-0">
                      0{idx + 1}
                    </div>
                    <p className="text-[14px] text-[#22303f] font-medium leading-relaxed flex-1">
                      {question}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Expected Output & Report Action Button */}
            <div className="pt-6 border-t border-[#e4e7ea] flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="max-w-2xl">
                <div className="text-[12px] font-bold uppercase tracking-[0.06em] text-[#121D2F] mb-1">
                  Verwachte Eindrapportage
                </div>
                <p className="text-[14px] text-[#4a5b6b] leading-relaxed">
                  {researchTopic.expectedOutput}
                </p>
              </div>

              {/* Action Button */}
              {researchTopic.isAvailable && researchTopic.linkUrl ? (
                <a
                  href={researchTopic.linkUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-[#3762AB] hover:bg-[#2b4d87] text-white py-4 px-[30px] rounded-[4px] font-bold text-[16px] whitespace-nowrap transition-colors"
                >
                  <span>{researchTopic.linkLabel}</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              ) : (
                <button
                  disabled
                  className="inline-flex items-center justify-center gap-2 bg-[#f6f7f8] text-[#6c7d8f] border border-[#e4e7ea] py-4 px-[30px] rounded-[4px] font-bold text-[15px] cursor-not-allowed whitespace-nowrap"
                  title="Het onderzoeksrapport wordt hier gekoppeld zodra het is afgerond"
                >
                  <Clock className="w-4 h-4" />
                  <span>Onderzoek volgt binnenkort</span>
                </button>
              )}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
