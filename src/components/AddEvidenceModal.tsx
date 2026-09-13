import React, { useState } from 'react';
import { X, Plus, ExternalLink, Sparkles, Check } from 'lucide-react';
import { EvidenceFormat, EvidenceItem, LearningOutcomeId, StoryType } from '../types';
import { learningOutcomes } from '../data/portfolioData';

interface AddEvidenceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (item: EvidenceItem) => void;
  defaultLuId?: LearningOutcomeId;
}

export const AddEvidenceModal: React.FC<AddEvidenceModalProps> = ({
  isOpen,
  onClose,
  onAdd,
  defaultLuId = 'LU1',
}) => {
  const [luId, setLuId] = useState<LearningOutcomeId>(defaultLuId);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [storyType, setStoryType] = useState<StoryType>('Research Story');
  const [format, setFormat] = useState<EvidenceFormat>('Document');
  const [status, setStatus] = useState<'Afgerond' | 'In uitvoering' | 'Binnenkort'>('In uitvoering');
  const [sprint, setSprint] = useState<number>(1);
  const [linkUrl, setLinkUrl] = useState('');
  const [linkLabel, setLinkLabel] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const newItem: EvidenceItem = {
      id: `ev-${Date.now()}`,
      luId,
      title: title.trim(),
      description: description.trim(),
      storyType,
      format,
      status,
      sprint,
      linkUrl: linkUrl.trim() || undefined,
      linkLabel: linkLabel.trim() || (linkUrl ? 'Bekijk bewijsstuk' : undefined),
      date: `Sprint ${sprint}`,
    };

    onAdd(newItem);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-[#FAF8F5] border border-[#E0D7C6] rounded-2xl w-full max-w-xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 bg-[#1A2E4A] text-white">
          <div>
            <h3 className="text-xl font-bold flex items-center gap-2">
              <Plus className="w-5 h-5 text-[#C58B2E]" />
              Nieuw Bewijsstuk Toevoegen
            </h3>
            <p className="text-xs text-[#E7EEF6] mt-0.5">
              Koppel een verslag, video, prototype of presentatie aan een van de 5 leeruitkomsten.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 overflow-y-auto flex-1">
          
          {/* LU Selector */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#1A2E4A] mb-1.5">
              Kies Leeruitkomst
            </label>
            <select
              value={luId}
              onChange={(e) => setLuId(e.target.value as LearningOutcomeId)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#D5CABE] bg-white text-sm text-[#1A2E4A] font-medium focus:ring-2 focus:ring-[#1A2E4A] focus:outline-none"
            >
              {learningOutcomes.map((lu) => (
                <option key={lu.id} value={lu.id}>
                  {lu.code}: {lu.title}
                </option>
              ))}
            </select>
          </div>

          {/* Title */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#1A2E4A] mb-1.5">
              Titel van het bewijsstuk *
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Bijv. Verslag literatuuronderzoek of POC demonstratievideo"
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#D5CABE] bg-white text-sm text-[#1A2E4A] focus:ring-2 focus:ring-[#1A2E4A] focus:outline-none"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#1A2E4A] mb-1.5">
              Korte beschrijving / verantwoording
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Wat toont dit bewijsstuk aan? Welke methoden zijn gebruikt en wat was het resultaat?"
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#D5CABE] bg-white text-sm text-[#1A2E4A] focus:ring-2 focus:ring-[#1A2E4A] focus:outline-none resize-none"
            />
          </div>

          {/* Type & Format & Status Row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#1A2E4A] mb-1.5">
                Story Type
              </label>
              <select
                value={storyType}
                onChange={(e) => setStoryType(e.target.value as StoryType)}
                className="w-full px-3 py-2 rounded-xl border border-[#D5CABE] bg-white text-xs text-[#1A2E4A] focus:ring-2 focus:ring-[#1A2E4A] focus:outline-none"
              >
                <option value="Research Story">Research Story</option>
                <option value="User Story">User Story</option>
                <option value="Learning Story">Learning Story</option>
                <option value="Reflectie">Reflectie</option>
                <option value="Overig">Overig</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#1A2E4A] mb-1.5">
                Formaat
              </label>
              <select
                value={format}
                onChange={(e) => setFormat(e.target.value as EvidenceFormat)}
                className="w-full px-3 py-2 rounded-xl border border-[#D5CABE] bg-white text-xs text-[#1A2E4A] focus:ring-2 focus:ring-[#1A2E4A] focus:outline-none"
              >
                <option value="Document">Document / PDF</option>
                <option value="Prototype">Prototype / Live Web</option>
                <option value="Video">Video / YouTube</option>
                <option value="GitHub">GitHub Repo</option>
                <option value="Presentatie">Presentatie / Slides</option>
                <option value="Binnenkort">Binnenkort beschikbaar</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#1A2E4A] mb-1.5">
                Sprint (1 t/m 10)
              </label>
              <input
                type="number"
                min={1}
                max={10}
                value={sprint}
                onChange={(e) => setSprint(parseInt(e.target.value) || 1)}
                className="w-full px-3 py-2 rounded-xl border border-[#D5CABE] bg-white text-xs text-[#1A2E4A] focus:ring-2 focus:ring-[#1A2E4A] focus:outline-none"
              />
            </div>
          </div>

          {/* External Link */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#1A2E4A] mb-1.5">
                Externe Link URL (OneDrive, YouTube, etc.)
              </label>
              <input
                type="text"
                value={linkUrl}
                onChange={(e) => setLinkUrl(e.target.value)}
                placeholder="https://onedrive.live.com/... of https://github.com/..."
                className="w-full px-3.5 py-2 rounded-xl border border-[#D5CABE] bg-white text-xs text-[#1A2E4A] focus:ring-2 focus:ring-[#1A2E4A] focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#1A2E4A] mb-1.5">
                Knop Tekst (Optioneel)
              </label>
              <input
                type="text"
                value={linkLabel}
                onChange={(e) => setLinkLabel(e.target.value)}
                placeholder="Bijv. Open in OneDrive of Bekijk video"
                className="w-full px-3.5 py-2 rounded-xl border border-[#D5CABE] bg-white text-xs text-[#1A2E4A] focus:ring-2 focus:ring-[#1A2E4A] focus:outline-none"
              />
            </div>
          </div>

          {/* Status */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#1A2E4A] mb-1.5">
              Voortgangsstatus
            </label>
            <div className="flex gap-4">
              {(['In uitvoering', 'Afgerond', 'Binnenkort'] as const).map((st) => (
                <label key={st} className="flex items-center gap-2 text-xs font-medium text-[#1A2E4A] cursor-pointer">
                  <input
                    type="radio"
                    name="status"
                    value={st}
                    checked={status === st}
                    onChange={() => setStatus(st)}
                    className="text-[#1A2E4A] focus:ring-[#1A2E4A]"
                  />
                  <span>{st}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Footer Actions */}
          <div className="pt-4 border-t border-[#EAE3D6] flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-bold text-[#556980] hover:text-[#1A2E4A]"
            >
              Annuleren
            </button>
            <button
              type="submit"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#1A2E4A] hover:bg-[#2C476F] text-white text-xs font-bold shadow-sm transition-all"
            >
              <Check className="w-4 h-4 text-[#C58B2E]" />
              Bewijsstuk Opslaan
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};
