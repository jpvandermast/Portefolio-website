import React from 'react';
import { ExternalLink, Code2, Sparkles, Layers, Clock, CheckCircle2 } from 'lucide-react';
import { initialProjects } from '../data/portfolioData';

export const ProjectsSection: React.FC = () => {
  return (
    <section id="projecten" className="py-20 bg-[#FAF8F5] border-b border-[#EAE3D6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#F4EFE6] text-xs font-bold uppercase tracking-wider text-[#1A2E4A] mb-3">
            <span>Proof-of-Concepts & AI Solutions</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1A2E4A] tracking-tight">
            Gebouwde AI-Oplossingen & Prototypes
          </h2>
          <p className="mt-3 text-lg text-[#556980]">
            Tijdens de minor ontwikkel ik concrete, werkende AI-oplossingen (User Stories). 
            Hieronder vind je de prototypes, technische stacks en koppelingen met de leeruitkomsten.
          </p>
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {initialProjects.map((project) => {
            const isLive = project.status === 'Gereed';
            const isDev = project.status === 'In ontwikkeling';

            return (
              <div
                key={project.id}
                className="bg-white rounded-2xl border border-[#E8E1D5] overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
              >
                <div>
                  {/* Image banner */}
                  <div className="relative aspect-[16/10] bg-[#E8E1D5] overflow-hidden">
                    {project.previewImage ? (
                      <img
                        src={project.previewImage}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-[#1A2E4A] text-white">
                        <Sparkles className="w-8 h-8 text-[#C58B2E]" />
                      </div>
                    )}

                    {/* Status badge on image */}
                    <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-[#FAF8F5]/90 backdrop-blur-xs text-[#1A2E4A] shadow-xs">
                      {isDev ? (
                        <>
                          <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
                          <span>In ontwikkeling</span>
                        </>
                      ) : (
                        <>
                          <Clock className="w-3 h-3 text-[#64748B]" />
                          <span>Concept</span>
                        </>
                      )}
                    </div>

                    <div className="absolute top-3 right-3 px-2 py-0.5 rounded-md text-[10px] font-extrabold bg-[#1A2E4A] text-white">
                      Sprint {project.sprint}
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6 space-y-4">
                    
                    {/* LU Mapping Badges */}
                    <div className="flex flex-wrap items-center gap-1.5">
                      {project.relatedLUs.map((lu) => (
                        <span
                          key={lu}
                          className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-[#F4EFE6] text-[#1A2E4A] border border-[#E0D7C6]"
                        >
                          {lu}
                        </span>
                      ))}
                    </div>

                    <div>
                      <span className="text-xs font-semibold text-[#C58B2E] block mb-1">
                        {project.subtitle}
                      </span>
                      <h3 className="text-lg font-bold text-[#1A2E4A] leading-snug">
                        {project.title}
                      </h3>
                    </div>

                    <p className="text-xs text-[#556980] leading-relaxed">
                      {project.description}
                    </p>

                    {/* Tech stack pills */}
                    <div className="pt-2">
                      <div className="text-[10px] font-bold uppercase tracking-wider text-[#8A9BA8] mb-1.5">
                        Tools & Technologie
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {project.tools.map((tool) => (
                          <span
                            key={tool}
                            className="px-2 py-1 rounded-md text-[11px] font-medium bg-[#FAF8F5] text-[#33475B] border border-[#E8E1D5]"
                          >
                            {tool}
                          </span>
                        ))}
                      </div>
                    </div>

                  </div>
                </div>

                {/* Footer Action Buttons */}
                <div className="p-6 pt-0 border-t border-[#F4EFE6] mt-4 flex items-center justify-between gap-3">
                  {project.liveUrl && project.liveUrl !== '' ? (
                    <a
                      href={project.liveUrl}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1A2E4A] hover:text-[#2C476F]"
                    >
                      <ExternalLink className="w-3.5 h-3.5 text-[#C58B2E]" />
                      <span>Live POC</span>
                    </a>
                  ) : (
                    <span className="text-xs text-[#8C9AA8] font-medium">
                      Live link volgt in sprint {project.sprint}
                    </span>
                  )}

                  {project.codeUrl && project.codeUrl !== '' ? (
                    <a
                      href={project.codeUrl}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-[#556980] hover:text-[#1A2E4A]"
                    >
                      <Code2 className="w-3.5 h-3.5" />
                      <span>Code</span>
                    </a>
                  ) : null}
                </div>

              </div>
            );
          })}

          {/* Dedicated Placeholder Card for Future Minor Projects */}
          <div className="bg-[#FAF8F5] rounded-2xl border-2 border-dashed border-[#DCD1BF] p-8 flex flex-col items-center justify-center text-center space-y-3 min-h-[380px]">
            <div className="w-12 h-12 rounded-2xl bg-[#F0E8DC] flex items-center justify-center text-[#8C7E6D]">
              <Layers className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-[#1A2E4A]">
              Toekomstige AI Proof-of-Concept
            </h3>
            <p className="text-xs text-[#6C7E92] max-w-xs leading-relaxed">
              In latere sprints (Sprint 5 t/m 10) worden hier additionele prototypes 
              zoals RAG-systemen, AI-gesprekstrainers en geavanceerde automations toegevoegd.
            </p>
            <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#C58B2E] bg-white px-3 py-1.5 rounded-full border border-[#E0D7C6]">
              <Clock className="w-3 h-3" />
              <span>Gereserveerde Ruimte</span>
            </span>
          </div>

        </div>

      </div>
    </section>
  );
};
