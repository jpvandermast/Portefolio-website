import React from 'react';
import { ExternalLink, Code2, Bot, Layers, Sparkles } from 'lucide-react';
import { initialProjects } from '../data/portfolioData';

export const ProjectsSection: React.FC = () => {
  const getProjectIcon = (index: number) => {
    switch (index) {
      case 0:
        return <Bot className="w-6 h-6 stroke-[2]" />;
      case 1:
        return <Layers className="w-6 h-6 stroke-[2]" />;
      case 2:
        return <Sparkles className="w-6 h-6 stroke-[2]" />;
      default:
        return <Code2 className="w-6 h-6 stroke-[2]" />;
    }
  };

  return (
    <section id="projecten" className="py-24 px-6 bg-white border-b border-[#e4e7ea]">
      <div className="max-w-[1120px] mx-auto">
        
        {/* Section Header with Eyebrow */}
        <div className="max-w-2xl mb-12">
          <span className="text-[#121D2F] font-bold text-[13px] tracking-[0.06em] uppercase block mb-3.5">
            Proof-of-Concepts & AI Solutions
          </span>
          <h2 className="text-3xl sm:text-[34px] font-bold text-[#121D2F] leading-tight mb-2">
            Gebouwde AI-Oplossingen & Prototypes
          </h2>
          <p className="text-[16px] text-[#4a5b6b] leading-relaxed">
            Tijdens de minor ontwikkel ik concrete, werkende AI-oplossingen (User Stories). 
            Hieronder vind je de prototypes, technische architecturen en koppelingen met de leeruitkomsten.
          </p>
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {initialProjects.map((project, idx) => {
            const isDev = project.status === 'In ontwikkeling';

            return (
              <div
                key={project.id}
                className="bg-white p-8 rounded-[6px] border border-[#e4e7ea] hover:shadow-[0_4px_12px_rgba(0,0,0,0.08)] transition-all flex flex-col justify-between"
              >
                <div>
                  {/* Top row: Round navy badge & sprint tag */}
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-full bg-[#121D2F] text-white flex items-center justify-center shrink-0">
                      {getProjectIcon(idx)}
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-bold uppercase tracking-[0.06em] bg-[#f6f7f8] text-[#121D2F] px-2.5 py-1 rounded-[4px] border border-[#e4e7ea]">
                        Sprint {project.sprint}
                      </span>
                    </div>
                  </div>

                  {/* Status indicator */}
                  <div className="mb-3">
                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-[4px] text-[11px] font-bold ${
                        isDev
                          ? 'bg-[#eaf0fa] text-[#2b4d87]'
                          : 'bg-[#f6f7f8] text-[#5e6d7d]'
                      }`}
                    >
                      <span className={`w-1.5 h-1.5 rounded-full ${isDev ? 'bg-[#3762AB] animate-pulse' : 'bg-[#5e6d7d]'}`}></span>
                      <span>{project.status}</span>
                    </span>
                  </div>

                  <h3 className="text-[20px] font-bold text-[#121D2F] mb-1 leading-snug">
                    {project.title}
                  </h3>

                  {project.subtitle && (
                    <div className="text-xs text-[#3762AB] font-semibold mb-3">
                      {project.subtitle}
                    </div>
                  )}

                  <p className="text-[14px] text-[#4a5b6b] leading-relaxed mb-6">
                    {project.description}
                  </p>

                  {/* Related LUs badges if available */}
                  {project.relatedLUs.length > 0 && (
                    <div className="mb-6">
                      <div className="text-[11px] font-bold uppercase tracking-[0.06em] text-[#121D2F] mb-2">
                        Gekoppelde Leeruitkomsten:
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {project.relatedLUs.map((lu) => (
                          <span
                            key={lu}
                            className="px-2 py-0.5 rounded-[4px] text-[11px] font-bold bg-[#121D2F] text-white"
                          >
                            {lu}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Tools list if available */}
                  {project.tools.length > 0 && (
                    <div className="mb-6">
                      <div className="text-[11px] font-bold uppercase tracking-[0.06em] text-[#121D2F] mb-2">
                        Technologie & Frameworks:
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {project.tools.map((tool) => (
                          <span
                            key={tool}
                            className="px-2 py-0.5 rounded-[4px] text-[11px] font-medium bg-[#f6f7f8] text-[#22303f] border border-[#e4e7ea]"
                          >
                            {tool}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Bottom Card Actions */}
                <div className="pt-4 border-t border-[#e4e7ea] flex items-center justify-between gap-3 text-xs">
                  {project.liveUrl && project.liveUrl !== '#' ? (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 font-bold text-[#3762AB] hover:text-[#2b4d87]"
                    >
                      <span>Live demo</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  ) : (
                    <span className="text-[#6c7d8f] font-medium">Demo volgt</span>
                  )}

                  {project.codeUrl && project.codeUrl !== '#' ? (
                    <a
                      href={project.codeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 font-bold text-[#121D2F] hover:text-[#3762AB]"
                    >
                      <Code2 className="w-3.5 h-3.5" />
                      <span>Broncode</span>
                    </a>
                  ) : (
                    <span className="text-[#6c7d8f] font-medium">Code repo gepland</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Future POC Placeholder Card */}
        <div className="p-6 rounded-[6px] border border-dashed border-[#cbd2d9] bg-[#f6f7f8] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-[#121D2F] text-white flex items-center justify-center font-bold text-sm shrink-0">
              +
            </div>
            <div>
              <div className="text-[15px] font-bold text-[#121D2F]">
                Volgende Proof-of-Concepts (latere sprints)
              </div>
              <p className="text-[13px] text-[#4a5b6b]">
                In latere sprints worden geavanceerde AI-oplossingen gebouwd en hier gedocumenteerd.
              </p>
            </div>
          </div>
          <span className="text-xs font-bold text-[#3762AB] uppercase tracking-[0.06em] whitespace-nowrap">
            Gepland in Agile Backlog
          </span>
        </div>

      </div>
    </section>
  );
};
