import React, { useState } from 'react';
import { 
  FileText, 
  Clock, 
  HelpCircle, 
  Target, 
  Users, 
  BookOpen, 
  Lock, 
  ExternalLink,
  Edit3,
  Check
} from 'lucide-react';
import { researchTopic as defaultTopic } from '../data/portfolioData';

export const ResearchSection: React.FC = () => {
  const [researchData, setResearchData] = useState(defaultTopic);
  const [isEditingLink, setIsEditingLink] = useState(false);
  const [tempLink, setTempLink] = useState(researchData.linkUrl || '');

  const handleSaveLink = () => {
    setResearchData({
      ...researchData,
      linkUrl: tempLink,
      isAvailable: Boolean(tempLink && tempLink.trim() !== ''),
      linkLabel: tempLink ? 'Bekijk Onderzoeksrapport' : 'Onderzoeksverslag volgt binnenkort',
    });
    setIsEditingLink(false);
  };

  return (
    <section id="onderzoek" className="py-20 bg-[#FAF8F5] border-b border-[#EAE3D6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#F4EFE6] text-xs font-bold uppercase tracking-wider text-[#1A2E4A] mb-3">
            <span>Centraal Minor Onderzoek</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1A2E4A] tracking-tight">
            Onderzoek: De Toekomst van AI in het Commerciële Vakgebied
          </h2>
          <p className="mt-3 text-lg text-[#556980]">
            Een prominente verkenning naar hoe kunstmatige intelligentie de rol van de sales- en 
            accountmanagementprofessional herziet en welke menselijke kwaliteiten onmisbaar blijven.
          </p>
        </div>

        {/* Prominent Research Card */}
        <div className="bg-[#FFFFFF] rounded-3xl border-2 border-[#E0D7C6] shadow-sm overflow-hidden">
          
          {/* Top Banner with Navy Accent */}
          <div className="bg-[#1A2E4A] text-white p-8 lg:p-10 relative">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-bold text-[#E8A948] border border-white/15">
                <Clock className="w-3.5 h-3.5" />
                <span>{researchData.statusText}</span>
              </div>
              <span className="text-xs text-[#E7EEF6] font-medium tracking-wide uppercase">
                {researchData.field}
              </span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight max-w-4xl">
              {researchData.title}
            </h3>

            <p className="mt-4 text-base text-[#D0DEED] leading-relaxed max-w-3xl">
              {researchData.summary}
            </p>
          </div>

          {/* Core Body Grid */}
          <div className="p-8 lg:p-10 space-y-8 bg-white">
            
            {/* Research Questions */}
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-[#1A2E4A] mb-4 flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-[#C58B2E]" />
                <span>Centrale Onderzoeksvragen</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {researchData.researchQuestions.map((question, idx) => (
                  <div
                    key={idx}
                    className="p-5 rounded-2xl bg-[#FAF8F5] border border-[#EAE3D6] flex flex-col justify-between"
                  >
                    <div className="space-y-2">
                      <span className="w-7 h-7 rounded-lg bg-[#E7EEF6] text-[#1A2E4A] font-extrabold text-xs flex items-center justify-center">
                        0{idx + 1}
                      </span>
                      <p className="text-sm font-semibold text-[#1A2E4A] leading-snug">
                        {question}
                      </p>
                    </div>
                    <span className="text-[11px] text-[#6C7E92] mt-3 font-medium">
                      Deelvraag {idx + 1}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Methodology Pillars */}
            <div className="p-6 rounded-2xl bg-[#FAF8F5] border border-[#EAE3D6] grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-xl bg-[#E7EEF6] text-[#1A2E4A] shrink-0">
                  <BookOpen className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#1A2E4A]">
                    1. Literatuurstudie
                  </h4>
                  <p className="text-xs text-[#556980] mt-1 leading-relaxed">
                    Systematische analyse van academische en vakmatige publicaties over predictive customer analytics.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-xl bg-[#FBF3E4] text-[#C58B2E] shrink-0">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#1A2E4A]">
                    2. Expertinterviews
                  </h4>
                  <p className="text-xs text-[#556980] mt-1 leading-relaxed">
                    Kwalitatieve diepte-interviews met commercieel directeuren, teamleiders en AI-consultants.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-xl bg-[#E6F0EB] text-[#52796F] shrink-0">
                  <Target className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#1A2E4A]">
                    3. Synthese & Aanbevelingen
                  </h4>
                  <p className="text-xs text-[#556980] mt-1 leading-relaxed">
                    Praktische handvatten voor MKB-bedrijven om menselijke empathie te borgen bij AI-integratie.
                  </p>
                </div>
              </div>
            </div>

            {/* Placeholder Link Callout Card (Explicitly requested by user) */}
            <div className="p-6 rounded-2xl bg-[#FCFBF9] border-2 border-dashed border-[#DDD3C2] flex flex-col md:flex-row items-center justify-between gap-6">
              
              <div className="space-y-1 text-left">
                <div className="inline-flex items-center gap-2 text-xs font-bold text-[#C58B2E]">
                  <FileText className="w-4 h-4" />
                  <span>Document Status</span>
                </div>
                <h4 className="text-base font-bold text-[#1A2E4A]">
                  Onderzoeksverslag (In Voorbereiding)
                </h4>
                <p className="text-xs text-[#6C7E92] max-w-xl leading-relaxed">
                  Zodra het onderzoeksrapport is afgerond en goedgekeurd door docenten, 
                  wordt de officiële link naar het OneDrive- of PDF-document hier direct geactiveerd.
                </p>
              </div>

              {/* Disabled / Active Button */}
              <div className="flex flex-col items-center sm:items-end gap-2 shrink-0">
                {researchData.isAvailable && researchData.linkUrl ? (
                  <a
                    href={researchData.linkUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#1A2E4A] hover:bg-[#2C476F] text-white text-xs font-bold shadow-sm transition-all"
                  >
                    <span>{researchData.linkLabel}</span>
                    <ExternalLink className="w-4 h-4 text-[#E8A948]" />
                  </a>
                ) : (
                  <button
                    disabled
                    aria-disabled="true"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#EAE4D8] text-[#8C7E6D] text-xs font-bold cursor-not-allowed border border-[#D5CABE]"
                  >
                    <Lock className="w-3.5 h-3.5" />
                    <span>Onderzoek volgt binnenkort</span>
                  </button>
                )}

                {/* Quick In-Page Link Updater for Josse */}
                <button
                  onClick={() => setIsEditingLink(!isEditingLink)}
                  className="text-[11px] text-[#556980] hover:text-[#1A2E4A] flex items-center gap-1 font-semibold underline decoration-dotted"
                >
                  <Edit3 className="w-3 h-3" />
                  <span>{isEditingLink ? 'Sluit link editor' : 'Link nu al invullen?'}</span>
                </button>
              </div>

            </div>

            {/* Optional Link Input for Josse */}
            {isEditingLink && (
              <div className="p-4 bg-[#F4EFE6] rounded-xl border border-[#D5CABE] animate-in fade-in duration-200">
                <label className="block text-xs font-bold text-[#1A2E4A] mb-1">
                  Plak de OneDrive of Google Drive link naar je verslag:
                </label>
                <div className="flex gap-2">
                  <input
                    type="url"
                    value={tempLink}
                    onChange={(e) => setTempLink(e.target.value)}
                    placeholder="https://onedrive.live.com/... of https://drive.google.com/..."
                    className="flex-1 px-3 py-2 rounded-lg bg-white border border-[#D5CABE] text-xs text-[#1A2E4A] focus:outline-none focus:ring-2 focus:ring-[#1A2E4A]"
                  />
                  <button
                    onClick={handleSaveLink}
                    className="px-4 py-2 bg-[#1A2E4A] hover:bg-[#2C476F] text-white rounded-lg text-xs font-bold flex items-center gap-1"
                  >
                    <Check className="w-3.5 h-3.5" />
                    <span>Koppel Link</span>
                  </button>
                </div>
                <span className="text-[11px] text-[#6C7E92] mt-1 block">
                  Als je deze link invult, wordt de knop hierboven direct interactief!
                </span>
              </div>
            )}

          </div>

        </div>

      </div>
    </section>
  );
};
