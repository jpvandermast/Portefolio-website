import React, { useState } from 'react';
import { Calendar, CheckCircle2, Clock, ArrowRight, Search, Code, Brain } from 'lucide-react';
import { sprintTimeline } from '../data/portfolioData';

export const SprintOverviewSection: React.FC = () => {
  const [activeSprintIndex, setActiveSprintIndex] = useState<number>(0);
  const selectedSprint = sprintTimeline[activeSprintIndex];

  return (
    <section id="sprints" className="py-20 bg-[#FAF8F5] border-b border-[#EAE3D6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#F4EFE6] text-xs font-bold uppercase tracking-wider text-[#1A2E4A] mb-3">
            <span>20 Weken • 10 Sprints</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1A2E4A] tracking-tight">
            Sprint-overzicht & Minor Voortgang
          </h2>
          <p className="mt-3 text-lg text-[#556980]">
            Elke twee weken doorloop ik een complete sprint met een Research Story (onderzoek), 
            User Story (AI-oplossing bouwen) en Learning Story (nieuwe vaardigheid).
          </p>
        </div>

        {/* Sprint Timeline Selector */}
        <div className="bg-white rounded-3xl border border-[#E8E1D5] p-6 lg:p-8 shadow-xs">
          
          {/* Progress Tracker bar */}
          <div className="mb-8">
            <div className="flex items-center justify-between text-xs font-bold text-[#1A2E4A] mb-2">
              <span className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#C58B2E] animate-ping"></span>
                <span>Huidige Voortgang: Sprint 1 (Weken 1-2)</span>
              </span>
              <span className="text-[#6C7E92]">Sprint {activeSprintIndex + 1} van 10 geselecteerd</span>
            </div>
            
            {/* Visual Sprint Pills Bar */}
            <div className="grid grid-cols-5 sm:grid-cols-10 gap-1.5 p-1.5 rounded-2xl bg-[#F4EFE6] border border-[#E0D7C6]">
              {sprintTimeline.map((sprint, idx) => {
                const isCurrent = sprint.status === 'Huidige sprint';
                const isSelected = activeSprintIndex === idx;

                return (
                  <button
                    key={sprint.sprintNumber}
                    onClick={() => setActiveSprintIndex(idx)}
                    className={`py-2.5 px-1 rounded-xl text-xs font-extrabold transition-all flex flex-col items-center justify-center gap-0.5 ${
                      isSelected
                        ? 'bg-[#1A2E4A] text-white shadow-xs'
                        : isCurrent
                        ? 'bg-white text-[#1A2E4A] border border-[#C58B2E]'
                        : 'text-[#5C6F84] hover:bg-white/60'
                    }`}
                  >
                    <span className="text-[10px] uppercase tracking-tighter opacity-80">S{sprint.sprintNumber}</span>
                    <span className="text-[11px] leading-none">
                      {isCurrent ? '●' : `W${idx * 2 + 1}`}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Detailed Selected Sprint Card */}
          <div className="bg-[#FAF8F5] rounded-2xl p-6 lg:p-8 border border-[#E8E1D5]">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#EAE3D6]">
              <div className="space-y-1">
                <div className="flex items-center gap-2.5">
                  <span className="px-3 py-1 rounded-lg text-xs font-extrabold bg-[#1A2E4A] text-white">
                    Sprint {selectedSprint.sprintNumber}
                  </span>
                  <span className="text-xs font-semibold text-[#6C7E92]">
                    {selectedSprint.weeks}
                  </span>
                  <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full ${
                    selectedSprint.status === 'Huidige sprint'
                      ? 'bg-amber-100 text-amber-900 border border-amber-300'
                      : 'bg-[#EDE6DA] text-[#635544]'
                  }`}>
                    {selectedSprint.status}
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-[#1A2E4A] pt-1">
                  {selectedSprint.theme}
                </h3>
              </div>

              {/* Prev / Next sprint navigation */}
              <div className="flex items-center gap-2">
                <button
                  disabled={activeSprintIndex === 0}
                  onClick={() => setActiveSprintIndex((prev) => Math.max(0, prev - 1))}
                  className="px-3 py-1.5 rounded-lg border border-[#D5CABE] bg-white text-xs font-bold text-[#1A2E4A] disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#F4EFE6]"
                >
                  Vorige
                </button>
                <button
                  disabled={activeSprintIndex === sprintTimeline.length - 1}
                  onClick={() => setActiveSprintIndex((prev) => Math.min(sprintTimeline.length - 1, prev + 1))}
                  className="px-3 py-1.5 rounded-lg border border-[#D5CABE] bg-white text-xs font-bold text-[#1A2E4A] disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#F4EFE6]"
                >
                  Volgende
                </button>
              </div>
            </div>

            {/* The Three Story Pillars */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
              
              {/* Research Story */}
              <div className="bg-white p-5 rounded-xl border border-[#E0D7C6] shadow-2xs flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#1A2E4A] mb-2">
                    <Search className="w-4 h-4 text-[#52796F]" />
                    <span>Research Story</span>
                  </div>
                  <h4 className="text-sm font-bold text-[#1A2E4A] mb-2">
                    Onderzoek naar AI-impact
                  </h4>
                  <p className="text-xs text-[#52667A] leading-relaxed">
                    {selectedSprint.stories.research}
                  </p>
                </div>
                <div className="pt-4 mt-2 text-[10px] font-bold text-[#52796F] uppercase tracking-wider">
                  Koppeling: LU1 / LU3
                </div>
              </div>

              {/* User Story */}
              <div className="bg-white p-5 rounded-xl border border-[#E0D7C6] shadow-2xs flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#1A2E4A] mb-2">
                    <Code className="w-4 h-4 text-[#C58B2E]" />
                    <span>User Story</span>
                  </div>
                  <h4 className="text-sm font-bold text-[#1A2E4A] mb-2">
                    AI-oplossing ontwerpen & bouwen
                  </h4>
                  <p className="text-xs text-[#52667A] leading-relaxed">
                    {selectedSprint.stories.userStory}
                  </p>
                </div>
                <div className="pt-4 mt-2 text-[10px] font-bold text-[#C58B2E] uppercase tracking-wider">
                  Koppeling: LU2 / LU4
                </div>
              </div>

              {/* Learning Story */}
              <div className="bg-white p-5 rounded-xl border border-[#E0D7C6] shadow-2xs flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#1A2E4A] mb-2">
                    <Brain className="w-4 h-4 text-[#4A7FB5]" />
                    <span>Learning Story</span>
                  </div>
                  <h4 className="text-sm font-bold text-[#1A2E4A] mb-2">
                    Nieuwe vaardigheden & zelfsturing
                  </h4>
                  <p className="text-xs text-[#52667A] leading-relaxed">
                    {selectedSprint.stories.learningStory}
                  </p>
                </div>
                <div className="pt-4 mt-2 text-[10px] font-bold text-[#4A7FB5] uppercase tracking-wider">
                  Koppeling: LU4 / LU5
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
