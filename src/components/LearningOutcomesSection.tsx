import React, { useState } from 'react';
import { Link } from 'react-router';
import {
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  BookOpen,
  ArrowRight,
} from 'lucide-react';
import { learningOutcomes as defaultLUs } from '../data/portfolioData';
import { useStories } from '../lib/StoriesContext';
import { STORY_TYPE_LABELS } from '../lib/stories';

export const LearningOutcomesSection: React.FC = () => {
  const [selectedLuFilter, setSelectedLuFilter] = useState<string>('ALL');
  const [expandedLu, setExpandedLu] = useState<string | null>(null);
  const { status, stories, reload } = useStories();

  // Bewijs = stories gekoppeld aan een LU via story_leeruitkomsten (LU-nummer 1 hoort bij 'LU1')
  const evidenceFor = (luId: string) => stories.filter((s) => s.lus.includes(Number(luId.replace('LU', ''))));
  const totalEvidence = stories.reduce((sum, s) => sum + s.lus.length, 0);

  const toggleExpand = (id: string) => {
    setExpandedLu(expandedLu === id ? null : id);
  };

  const filteredOutcomes = selectedLuFilter === 'ALL'
    ? defaultLUs
    : defaultLUs.filter((lu) => lu.id === selectedLuFilter);

  return (
    <section id="leeruitkomsten" className="py-24 px-6 bg-white border-b border-[#e4e7ea]">
      <div className="max-w-[1120px] mx-auto">
        
        {/* Section Header with Eyebrow */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <span className="text-[#121D2F] font-bold text-[13px] tracking-[0.06em] uppercase block mb-3.5">
              Toetsing & Voortgang
            </span>
            <h2 className="text-3xl sm:text-[34px] font-bold text-[#121D2F] leading-tight mb-2">
              Leeruitkomsten (LU1 t/m LU5)
            </h2>
            <p className="text-[16px] text-[#4a5b6b] leading-relaxed">
              Voor elke leeruitkomst vind je hier de officiële doelstelling, beoordelingscriteria en 
              alle gekoppelde bewijsstukken uit Research, User en Learning Stories.
            </p>
          </div>

          {/* Quick Info Pill */}
          <div className="text-[13px] font-semibold text-[#4a5b6b] bg-[#f6f7f8] px-4 py-2.5 rounded-[4px] border border-[#e4e7ea] whitespace-nowrap">
            Totaal <strong className="text-[#121D2F]">{status === 'ready' ? totalEvidence : '–'}</strong> gekoppelde bewijsstukken
          </div>
        </div>

        {/* Filter Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 text-[14px]">
          <span className="text-xs font-bold text-[#121D2F] uppercase tracking-[0.06em] mr-2 shrink-0">
            Filter op:
          </span>
          <button
            onClick={() => setSelectedLuFilter('ALL')}
            className={`px-4 py-2 rounded-[4px] font-bold text-xs transition-colors shrink-0 ${
              selectedLuFilter === 'ALL'
                ? 'bg-[#121D2F] text-white'
                : 'bg-[#f6f7f8] text-[#22303f] hover:bg-[#e4e7ea]'
            }`}
          >
            Alle Leeruitkomsten (5)
          </button>
          {defaultLUs.map((lu) => (
            <button
              key={lu.id}
              onClick={() => setSelectedLuFilter(lu.id)}
              className={`px-4 py-2 rounded-[4px] font-bold text-xs transition-colors shrink-0 ${
                selectedLuFilter === lu.id
                  ? 'bg-[#3762AB] text-white'
                  : 'bg-[#f6f7f8] text-[#22303f] hover:bg-[#e4e7ea]'
              }`}
            >
              {lu.code}
            </button>
          ))}
        </div>

        {/* Learning Outcome Cards Stack */}
        <div className="space-y-8">
          {filteredOutcomes.map((lu) => {
            const isExpanded = expandedLu === lu.id;
            const matchingEvidence = evidenceFor(lu.id);

            return (
              <div
                key={lu.id}
                className="bg-white rounded-[6px] border border-[#e4e7ea] hover:shadow-[0_4px_12px_rgba(0,0,0,0.08)] transition-all overflow-hidden"
              >
                {/* Card Header */}
                <div className="p-6 sm:p-8">
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4">
                    
                    <div className="flex items-start gap-4">
                      {/* Round badge icon with navy background */}
                      <div className="w-12 h-12 rounded-full bg-[#121D2F] text-white flex items-center justify-center shrink-0">
                        <BookOpen className="w-6 h-6 stroke-[2]" />
                      </div>

                      <div>
                        <div className="flex items-center gap-2.5 mb-1.5">
                          <span className={`px-2.5 py-0.5 rounded-[4px] text-[11px] font-bold ${lu.colorBadge}`}>
                            {lu.code}
                          </span>
                          <span className="text-xs text-[#4a5b6b] font-medium">
                            {matchingEvidence.length} bewijsstuk{matchingEvidence.length === 1 ? '' : 'ken'}
                          </span>
                        </div>
                        <h3 className="text-[20px] font-bold text-[#121D2F] leading-snug">
                          {lu.title}
                        </h3>
                      </div>
                    </div>

                    {/* Criteria toggle button */}
                    <button
                      onClick={() => toggleExpand(lu.id)}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-[4px] bg-[#f6f7f8] hover:bg-[#e4e7ea] text-xs font-bold text-[#121D2F] transition-colors self-start shrink-0"
                    >
                      <span>Criteria</span>
                      {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                    </button>
                  </div>

                  <p className="text-[15px] text-[#4a5b6b] leading-relaxed mt-2">
                    {lu.detailedDescription}
                  </p>

                  {/* Expandable Assessment Criteria */}
                  {isExpanded && (
                    <div className="mt-6 p-5 rounded-[4px] bg-[#f6f7f8] border border-[#e4e7ea]">
                      <div className="text-[12px] font-bold uppercase tracking-[0.06em] text-[#121D2F] mb-3">
                        Officiële Beoordelingscriteria:
                      </div>
                      <ul className="space-y-2">
                        {lu.assessmentCriteria.map((crit, idx) => (
                          <li key={idx} className="flex items-start gap-2.5 text-[14px] text-[#22303f]">
                            <CheckCircle2 className="w-4 h-4 text-[#3762AB] shrink-0 mt-0.5" />
                            <span>{crit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                {/* Evidence Items for this LU */}
                <div className="border-t border-[#e4e7ea] bg-[#f6f7f8] p-6 sm:p-8">
                  <div className="text-[12px] font-bold uppercase tracking-[0.06em] text-[#121D2F] mb-4">
                    Gekoppelde Bewijsstukken ({lu.code}):
                  </div>

                  {status === 'loading' ? (
                    <div role="status" className="text-[14px] text-[#6c7d8f] bg-white p-4 rounded-[4px] border border-[#e4e7ea] animate-pulse">
                      Bewijsstukken laden…
                    </div>
                  ) : status === 'error' ? (
                    <div role="alert" className="text-[14px] text-[#4a5b6b] bg-white p-4 rounded-[4px] border border-[#e4e7ea] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <span>De bewijsstukken konden niet worden geladen.</span>
                      <button type="button" onClick={reload} className="bg-[#121D2F] hover:bg-[#2b4d87] text-white py-2 px-4 rounded-[4px] font-bold text-xs self-start">
                        Opnieuw proberen
                      </button>
                    </div>
                  ) : matchingEvidence.length === 0 ? (
                    <div className="text-[14px] text-[#6c7d8f] italic bg-white p-4 rounded-[4px] border border-[#e4e7ea]">
                      Nog geen bewijs gekoppeld aan {lu.code}.
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {matchingEvidence.map((ev) => (
                        <Link
                          key={ev.id}
                          to={`/stories/${ev.slug}`}
                          className="group bg-white p-5 rounded-[4px] border border-[#e4e7ea] flex flex-col justify-between hover:border-[#3762AB] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3762AB]"
                        >
                          <div>
                            <div className="text-xs font-bold text-[#121D2F] mb-2.5">
                              {STORY_TYPE_LABELS[ev.type]}
                            </div>
                            <h4 className="text-[16px] font-bold text-[#121D2F] mb-1.5 leading-snug group-hover:text-[#3762AB]">
                              {ev.titel}
                            </h4>
                            <p className="text-[13px] text-[#4a5b6b] leading-relaxed mb-4">{ev.korte_versie}</p>
                          </div>
                          <div className="pt-3 border-t border-[#e4e7ea] flex items-center justify-between gap-2 text-xs">
                            <span className="text-[#6c7d8f] font-medium">Sprint {ev.sprint}</span>
                            <span className="inline-flex items-center gap-1 font-bold text-[#3762AB]">
                              <span>Bekijk story</span>
                              <ArrowRight className="w-3.5 h-3.5" />
                            </span>
                          </div>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
