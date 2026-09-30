import React, { useState } from 'react';
import { Search, Code2, Brain, ChevronLeft, ChevronRight } from 'lucide-react';
import { sprintTimeline } from '../data/portfolioData';
import { useStories } from '../lib/StoriesContext';
import { StoryCard } from './StoryCard';
import type { StoryTypeCode } from '../types';

export const SprintOverviewSection: React.FC = () => {
  const [activeSprintIndex, setActiveSprintIndex] = useState<number>(0);
  const selectedSprint = sprintTimeline[activeSprintIndex];
  const { status, stories, reload } = useStories();
  const sprintStories = stories.filter((s) => s.sprint === selectedSprint.sprintNumber);

  const columns: {
    type: StoryTypeCode;
    label: string;
    title: string;
    lus: string;
    icon: React.ReactNode;
    emptyText: string;
  }[] = [
    { type: 'RS', label: 'Research Story', title: 'Onderzoek naar AI-impact', lus: 'LU1 / LU3', icon: <Search className="w-5 h-5 stroke-[2]" />, emptyText: 'Nog geen Research Story in deze sprint' },
    { type: 'US', label: 'User Story', title: 'AI-oplossing ontwerpen & bouwen', lus: 'LU2 / LU4', icon: <Code2 className="w-5 h-5 stroke-[2]" />, emptyText: 'Nog geen User Story in deze sprint' },
    { type: 'LS', label: 'Learning Story', title: 'Nieuwe tools & zelfsturing', lus: 'LU4 / LU5', icon: <Brain className="w-5 h-5 stroke-[2]" />, emptyText: 'Nog geen Learning Story in deze sprint' },
  ];

  return (
    <section id="sprints" className="py-24 px-6 bg-[#f6f7f8] border-b border-[#e4e7ea]">
      <div className="max-w-[1120px] mx-auto">
        
        {/* Section Header with Eyebrow */}
        <div className="max-w-2xl mb-12">
          <span className="text-[#121D2F] font-bold text-[13px] tracking-[0.06em] uppercase block mb-3.5">
            Agile Minor Structuur
          </span>
          <h2 className="text-3xl sm:text-[34px] font-bold text-[#121D2F] leading-tight mb-2">
            20 Weken Sprint-overzicht & Tijdlijn
          </h2>
          <p className="text-[16px] text-[#4a5b6b] leading-relaxed">
            De minor is opgebouwd uit 8 tweewekelijkse sprints volgens de Scrum/Agile-methodiek. 
            Elke sprint omvat drie verhaallijnen: Research (onderzoek), User (bouwen) en Learning (vaardigheden).
          </p>
        </div>

        {/* Sprint Timeline Container */}
        <div className="bg-white rounded-[6px] border border-[#e4e7ea] p-6 lg:p-8 hover:shadow-[0_4px_12px_rgba(0,0,0,0.08)] transition-all">
          
          {/* Header Bar of the Selector */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-6 border-b border-[#e4e7ea]">
            <div>
              <div className="text-[12px] font-bold uppercase tracking-[0.06em] text-[#121D2F]">
                Sprintselector (1 t/m 8)
              </div>
              <div className="text-xs text-[#4a5b6b] mt-0.5">
                Klik op een sprint om de bijbehorende stories en leeruitkomsten te bekijken
              </div>
            </div>

            {/* Previous / Next buttons */}
            <div className="flex items-center gap-2">
              <button
                disabled={activeSprintIndex === 0}
                onClick={() => setActiveSprintIndex((prev) => Math.max(0, prev - 1))}
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-[4px] border border-[#e4e7ea] bg-[#f6f7f8] hover:bg-[#e4e7ea] text-xs font-bold text-[#121D2F] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Vorige</span>
              </button>
              <button
                disabled={activeSprintIndex === sprintTimeline.length - 1}
                onClick={() => setActiveSprintIndex((prev) => Math.min(sprintTimeline.length - 1, prev + 1))}
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-[4px] border border-[#e4e7ea] bg-[#f6f7f8] hover:bg-[#e4e7ea] text-xs font-bold text-[#121D2F] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                <span>Volgende</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Visual Sprint Pills Bar - 8 sprints */}
          <div className="grid grid-cols-4 sm:grid-cols-8 gap-2 mb-8">
            {sprintTimeline.map((sprint, idx) => {
              const isCurrent = sprint.status === 'Huidige sprint';
              const isSelected = activeSprintIndex === idx;

              return (
                <button
                  key={sprint.sprintNumber}
                  onClick={() => setActiveSprintIndex(idx)}
                  className={`py-3 px-1.5 rounded-[4px] text-xs font-bold transition-all flex flex-col items-center justify-center gap-1 ${
                    isSelected
                      ? 'bg-[#121D2F] text-white'
                      : isCurrent
                      ? 'bg-[#eaf0fa] text-[#2b4d87] border-2 border-[#3762AB]'
                      : 'bg-[#f6f7f8] text-[#22303f] hover:bg-[#e4e7ea] border border-[#e4e7ea]'
                  }`}
                >
                  <span className="text-[10px] tracking-wider uppercase opacity-80">
                    S{sprint.sprintNumber}
                  </span>
                  <span className="text-[12px] leading-none">
                    {isCurrent ? 'Huidig' : `W${idx * 2 + 1}-${idx * 2 + 2}`}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Active Sprint Details Card */}
          <div className="bg-[#f6f7f8] rounded-[6px] p-6 lg:p-8 border border-[#e4e7ea]">
            
            {/* Title & Status */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-6 border-b border-[#e4e7ea] mb-6">
              <div>
                <div className="flex items-center gap-2.5 mb-1.5">
                  <span className="bg-[#121D2F] text-white px-2.5 py-0.5 rounded-[4px] text-xs font-bold">
                    Sprint {selectedSprint.sprintNumber}
                  </span>
                  <span className="text-xs font-medium text-[#4a5b6b]">
                    {selectedSprint.weeks}
                  </span>
                  <span
                    className={`px-2 py-0.5 rounded-[4px] text-[11px] font-bold ${
                      selectedSprint.status === 'Huidige sprint'
                        ? 'bg-[#eaf0fa] text-[#2b4d87] border border-[#3762AB]'
                        : 'bg-white text-[#5e6d7d] border border-[#e4e7ea]'
                    }`}
                  >
                    {selectedSprint.status}
                  </span>
                </div>
                <h3 className="text-[22px] font-bold text-[#121D2F]">
                  {selectedSprint.theme}
                </h3>
              </div>
            </div>

            {/* The Three Story Columns (uit Supabase) */}
            {status === 'error' && (
              <div role="alert" className="mb-6 p-4 rounded-[4px] bg-white border border-[#e4e7ea] text-[14px] text-[#4a5b6b] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <span>De stories konden niet worden geladen. Probeer het later opnieuw.</span>
                <button type="button" onClick={reload} className="bg-[#121D2F] hover:bg-[#2b4d87] text-white py-2 px-4 rounded-[4px] font-bold text-xs self-start">
                  Opnieuw proberen
                </button>
              </div>
            )}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6" aria-busy={status === 'loading'}>
              {columns.map((col) => {
                const items = sprintStories.filter((s) => s.type === col.type);
                const emptyText = sprintStories.length === 0 ? 'Komt binnenkort' : col.emptyText;
                return (
                  <div key={col.type} className="bg-white p-6 rounded-[6px] border border-[#e4e7ea] flex flex-col justify-between">
                    <div>
                      <div className="w-10 h-10 rounded-full bg-[#121D2F] text-white flex items-center justify-center mb-4">
                        {col.icon}
                      </div>
                      <div className="text-[12px] font-bold uppercase tracking-[0.06em] text-[#3762AB] mb-1">
                        {col.label} ({status === 'ready' ? items.length : '–'})
                      </div>
                      <h4 className="text-[16px] font-bold text-[#121D2F] mb-3">{col.title}</h4>
                      <div className="space-y-4">
                        {status === 'loading' ? (
                          <div className="animate-pulse space-y-2" role="status" aria-label="Stories laden">
                            <div className="aspect-[16/9] bg-[#e4e7ea] rounded-[4px]" />
                            <div className="h-3 bg-[#e4e7ea] rounded w-3/4" />
                          </div>
                        ) : items.length > 0 ? (
                          items.map((story) => <StoryCard key={story.id} story={story} />)
                        ) : (
                          <p className="text-[13px] text-[#6c7d8f] italic">{status === 'error' ? 'Niet beschikbaar' : emptyText}</p>
                        )}
                      </div>
                    </div>
                    <div className="pt-4 mt-4 border-t border-[#e4e7ea] text-[11px] font-bold uppercase tracking-[0.06em] text-[#121D2F]">
                      Koppeling: {col.lus}
                    </div>
                  </div>
                );
              })}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
