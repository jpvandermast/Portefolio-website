import React, { useState } from 'react';
import { 
  FileText, 
  ExternalLink, 
  Plus, 
  CheckCircle2, 
  Clock, 
  Video, 
  Globe, 
  Github, 
  SlidersHorizontal,
  ChevronDown,
  ChevronUp,
  Layers,
  Copy,
  Check
} from 'lucide-react';
import { EvidenceFormat, EvidenceItem, LearningOutcome, LearningOutcomeId } from '../types';
import { learningOutcomes as defaultLUs } from '../data/portfolioData';
import { AddEvidenceModal } from './AddEvidenceModal';

interface LearningOutcomesSectionProps {
  evidenceList: EvidenceItem[];
  onAddEvidence: (item: EvidenceItem) => void;
}

export const LearningOutcomesSection: React.FC<LearningOutcomesSectionProps> = ({
  evidenceList,
  onAddEvidence,
}) => {
  const [selectedLuFilter, setSelectedLuFilter] = useState<string>('ALL');
  const [expandedLu, setExpandedLu] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [targetLuId, setTargetLuId] = useState<LearningOutcomeId>('LU1');
  const [copiedNotification, setCopiedNotification] = useState(false);

  // Format icon helper
  const getFormatIcon = (format: EvidenceFormat) => {
    switch (format) {
      case 'Video':
        return <Video className="w-4 h-4 text-[#C58B2E]" />;
      case 'Prototype':
        return <Globe className="w-4 h-4 text-[#4A7FB5]" />;
      case 'GitHub':
        return <Github className="w-4 h-4 text-[#1A2E4A]" />;
      case 'Document':
      default:
        return <FileText className="w-4 h-4 text-[#52796F]" />;
    }
  };

  const handleOpenAddModal = (luId: LearningOutcomeId) => {
    setTargetLuId(luId);
    setModalOpen(true);
  };

  const toggleExpand = (id: string) => {
    setExpandedLu(expandedLu === id ? null : id);
  };

  const copyJsonToClipboard = () => {
    navigator.clipboard.writeText(JSON.stringify(evidenceList, null, 2));
    setCopiedNotification(true);
    setTimeout(() => setCopiedNotification(false), 2500);
  };

  const filteredOutcomes = selectedLuFilter === 'ALL'
    ? defaultLUs
    : defaultLUs.filter((lu) => lu.id === selectedLuFilter);

  return (
    <section id="leeruitkomsten" className="py-20 bg-[#FAF8F5] border-b border-[#EAE3D6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#F4EFE6] text-xs font-bold uppercase tracking-wider text-[#1A2E4A] mb-3">
              <span>Minor Toetsing & Voortgang</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1A2E4A] tracking-tight">
              Leeruitkomsten (LU1 t/m LU5)
            </h2>
            <p className="mt-3 text-lg text-[#556980]">
              Voor elke leeruitkomst vind je hier de officiële doelstelling en alle gekoppelde bewijsstukken 
              uit Research, User en Learning Stories.
            </p>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => handleOpenAddModal('LU1')}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#1A2E4A] hover:bg-[#2C476F] text-white text-xs font-bold shadow-xs transition-all"
            >
              <Plus className="w-4 h-4 text-[#C58B2E]" />
              Bewijsstuk Toevoegen
            </button>
            <button
              onClick={copyJsonToClipboard}
              title="Exporteer alle bewijsstukken als JSON voor je broncode"
              className="inline-flex items-center gap-1.5 px-3 py-2.5 rounded-xl bg-[#F4EFE6] hover:bg-[#EBE2D3] border border-[#DDD3C2] text-xs font-semibold text-[#1A2E4A] transition-colors"
            >
              {copiedNotification ? (
                <>
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span className="text-emerald-700">Gekopieerd!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-[#556980]" />
                  <span>Kopieer JSON</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          <button
            onClick={() => setSelectedLuFilter('ALL')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              selectedLuFilter === 'ALL'
                ? 'bg-[#1A2E4A] text-white shadow-xs'
                : 'bg-[#F4EFE6] text-[#4A5D73] hover:bg-[#EAE3D6]'
            }`}
          >
            Alle Leeruitkomsten ({evidenceList.length} items)
          </button>
          {defaultLUs.map((lu) => {
            const count = evidenceList.filter((e) => e.luId === lu.id).length;
            const isSelected = selectedLuFilter === lu.id;
            return (
              <button
                key={lu.id}
                onClick={() => setSelectedLuFilter(lu.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-2 ${
                  isSelected
                    ? 'bg-[#1A2E4A] text-white shadow-xs'
                    : 'bg-[#F4EFE6] text-[#4A5D73] hover:bg-[#EAE3D6]'
                }`}
              >
                <span>{lu.code}</span>
                <span className={`px-1.5 py-0.5 rounded-full text-[10px] ${
                  isSelected ? 'bg-white/20 text-white' : 'bg-[#E8DFCFC0] text-[#1A2E4A]'
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Learning Outcome Cards Container */}
        <div className="space-y-8">
          {filteredOutcomes.map((lu) => {
            const items = evidenceList.filter((e) => e.luId === lu.id);
            const isExpanded = expandedLu === lu.id;

            return (
              <div
                key={lu.id}
                id={lu.id.toLowerCase()}
                className="bg-[#FFFFFF] rounded-2xl border border-[#E8E1D5] shadow-xs overflow-hidden transition-all hover:border-[#D0C4B0]"
              >
                
                {/* Header Strip of the LU Card */}
                <div className="p-6 lg:p-8 border-b border-[#F0EAE0]">
                  <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                    
                    <div className="space-y-2 max-w-4xl">
                      <div className="flex items-center gap-3">
                        <span className="px-3 py-1 rounded-lg text-xs font-extrabold tracking-wider bg-[#1A2E4A] text-white">
                          {lu.code}
                        </span>
                        <span className="text-xs font-semibold text-[#6C7E92]">
                          HU Minor Future-proof met AI!
                        </span>
                        <span className="text-xs px-2 py-0.5 rounded bg-[#FAF8F5] border border-[#E0D7C6] text-[#556980] font-medium">
                          {items.length} {items.length === 1 ? 'bewijsstuk' : 'bewijsstukken'}
                        </span>
                      </div>

                      <h3 className="text-xl sm:text-2xl font-bold text-[#1A2E4A]">
                        {lu.title}
                      </h3>

                      <p className="text-sm text-[#475A70] leading-relaxed">
                        {lu.shortDescription}
                      </p>
                    </div>

                    {/* Actions on this LU */}
                    <div className="flex items-center gap-2.5 shrink-0 pt-2 lg:pt-0">
                      <button
                        onClick={() => toggleExpand(lu.id)}
                        className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-[#1A2E4A] bg-[#F4EFE6] hover:bg-[#EBE2D3] transition-colors"
                      >
                        {isExpanded ? (
                          <>
                            <span>Minder details</span>
                            <ChevronUp className="w-3.5 h-3.5" />
                          </>
                        ) : (
                          <>
                            <span>Beoordelingscriteria</span>
                            <ChevronDown className="w-3.5 h-3.5" />
                          </>
                        )}
                      </button>

                      <button
                        onClick={() => handleOpenAddModal(lu.id)}
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-white bg-[#1A2E4A] hover:bg-[#2C476F] transition-colors"
                      >
                        <Plus className="w-3.5 h-3.5 text-[#E8A948]" />
                        <span>Koppel bewijs</span>
                      </button>
                    </div>

                  </div>

                  {/* Collapsible Criteria & Details */}
                  {isExpanded && (
                    <div className="mt-6 pt-6 border-t border-[#F0EAE0] grid grid-cols-1 md:grid-cols-12 gap-6 bg-[#FAF8F5] p-5 rounded-xl animate-in fade-in duration-200">
                      <div className="md:col-span-6 space-y-2">
                        <div className="text-xs font-bold uppercase tracking-wider text-[#1A2E4A]">
                          Toelichting & Context
                        </div>
                        <p className="text-xs text-[#52667A] leading-relaxed">
                          {lu.detailedDescription}
                        </p>
                      </div>
                      <div className="md:col-span-6 space-y-2">
                        <div className="text-xs font-bold uppercase tracking-wider text-[#1A2E4A]">
                          Toetscriteria voor de Minor
                        </div>
                        <ul className="space-y-1.5 text-xs text-[#52667A]">
                          {lu.assessmentCriteria.map((crit, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <CheckCircle2 className="w-3.5 h-3.5 text-[#52796F] shrink-0 mt-0.5" />
                              <span>{crit}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                </div>

                {/* Evidence items container for this LU */}
                <div className="p-6 lg:p-8 bg-[#FAF8F5]/60">
                  <div className="text-xs font-bold uppercase tracking-wider text-[#6C7E92] mb-4 flex items-center justify-between">
                    <span>Gekoppelde bewijsstukken ({items.length})</span>
                    <span className="text-[11px] font-normal text-[#8A9BA8]">
                      Klik op een bewijsstuk om direct naar het document/prototype te gaan
                    </span>
                  </div>

                  {items.length === 0 ? (
                    <div className="p-8 text-center border-2 border-dashed border-[#E0D7C6] rounded-xl bg-white/50">
                      <Layers className="w-8 h-8 text-[#A89F91] mx-auto mb-2" />
                      <div className="text-sm font-bold text-[#1A2E4A]">Nog geen bewijsstukken gekoppeld</div>
                      <p className="text-xs text-[#6C7E92] mt-1 max-w-sm mx-auto">
                        Voeg je eerste Research Story, User Story of Learning Story toe voor deze leeruitkomst.
                      </p>
                      <button
                        onClick={() => handleOpenAddModal(lu.id)}
                        className="mt-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-white bg-[#1A2E4A]"
                      >
                        <Plus className="w-3.5 h-3.5" /> Voeg toe
                      </button>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {items.map((item) => {
                        const isPending = item.status === 'Binnenkort';
                        const isExternal = Boolean(item.linkUrl && item.linkUrl !== '#');

                        return (
                          <div
                            key={item.id}
                            className={`p-5 rounded-xl border transition-all flex flex-col justify-between ${
                              isPending
                                ? 'bg-[#FCFBF9] border-[#E8E1D5] opacity-85'
                                : 'bg-white border-[#E0D7C6] hover:border-[#1A2E4A] hover:shadow-xs'
                            }`}
                          >
                            <div className="space-y-3">
                              {/* Metadata chips */}
                              <div className="flex flex-wrap items-center gap-2 justify-between">
                                <div className="flex items-center gap-1.5">
                                  <span className="p-1 rounded bg-[#F4EFE6]">
                                    {getFormatIcon(item.format)}
                                  </span>
                                  <span className="text-[11px] font-bold text-[#1A2E4A]">
                                    {item.storyType}
                                  </span>
                                  {item.sprint && (
                                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#E7EEF6] text-[#1A2E4A] font-semibold">
                                      Sprint {item.sprint}
                                    </span>
                                  )}
                                </div>

                                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                                  item.status === 'Afgerond'
                                    ? 'bg-emerald-100 text-emerald-800'
                                    : item.status === 'In uitvoering'
                                    ? 'bg-amber-100 text-amber-900'
                                    : 'bg-[#EDE7DB] text-[#6B5E4E]'
                                }`}>
                                  {item.status}
                                </span>
                              </div>

                              {/* Title & Description */}
                              <div>
                                <h4 className="text-base font-bold text-[#1A2E4A] group-hover:text-[#2C476F]">
                                  {item.title}
                                </h4>
                                <p className="text-xs text-[#52667A] leading-relaxed mt-1.5">
                                  {item.description}
                                </p>
                              </div>
                            </div>

                            {/* Link / Action row */}
                            <div className="pt-4 mt-3 border-t border-[#F2ECE0] flex items-center justify-between">
                              <span className="text-[11px] text-[#8C9AA8]">
                                {item.date || `Formaat: ${item.format}`}
                              </span>

                              {isPending ? (
                                <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#8C9AA8] bg-[#F4EFE6] px-3 py-1.5 rounded-lg cursor-not-allowed">
                                  <Clock className="w-3.5 h-3.5" />
                                  <span>Binnenkort beschikbaar</span>
                                </span>
                              ) : (
                                <a
                                  href={item.linkUrl || '#'}
                                  target={isExternal ? '_blank' : '_self'}
                                  rel={isExternal ? 'noopener noreferrer' : undefined}
                                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1A2E4A] hover:text-[#2C476F] bg-[#F4EFE6] hover:bg-[#EBE2D3] px-3 py-1.5 rounded-lg transition-colors"
                                >
                                  <span>{item.linkLabel || 'Bekijk bewijsstuk'}</span>
                                  <ExternalLink className="w-3.5 h-3.5 text-[#C58B2E]" />
                                </a>
                              )}
                            </div>

                          </div>
                        );
                      })}
                    </div>
                  )}

                </div>

              </div>
            );
          })}
        </div>

      </div>

      {/* Add Modal */}
      <AddEvidenceModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onAdd={onAddEvidence}
        defaultLuId={targetLuId}
      />
    </section>
  );
};
