import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { Command } from 'cmdk';
import { ArrowRight, Bot, CalendarRange, FileText, FlaskConical, Home, Search, Sparkles, User } from 'lucide-react';
import { learningOutcomes } from '../../../shared/portfolioContent';
import { NAV_ITEMS } from '../../data/navigation';
import { normalize } from '../../lib/derive';
import { LU_STYLES, luPath } from '../../lib/lu';
import { STORY_TYPE_LABELS } from '../../lib/stories';
import { useChat } from '../../lib/ChatContext';
import { useProjecten } from '../../lib/ProjectenContext';
import type { Project } from '../../types';
import { useSearch } from '../../lib/SearchContext';
import { useStories } from '../../lib/StoriesContext';
import { cn } from '../ui/cn';

const PAGE_ICONS: Record<string, React.FC<{ className?: string }>> = {
  '/': Home,
  '/stories': FileText,
  '/leeruitkomsten': Sparkles,
  '/sprints': CalendarRange,
  '/over-mij': User,
  '/onderzoek': FlaskConical,
  '/ai-oplossingen': Bot,
};

/** Alle zoekwoorden moeten voorkomen (zonder accenten); titels wegen zwaarder dan de korte versie. */
function filter(value: string, search: string, keywords?: string[]): number {
  const words = normalize(search).split(/\s+/).filter(Boolean);
  if (words.length === 0) return 1;
  const title = normalize(value);
  const rest = normalize((keywords ?? []).join(' '));
  if (!words.every((w) => title.includes(w) || rest.includes(w))) return 0;
  return words.every((w) => title.includes(w)) ? 1 : 0.5;
}

const itemClass =
  'group flex items-center gap-3 min-h-12 px-3 py-2 rounded-control cursor-pointer text-[0.925rem] text-ink data-[selected=true]:bg-sunken';

/** Cmd/Ctrl+K: zoekt in stories (titel + korte versie), pagina's en leeruitkomsten. */
export default function CommandPalette() {
  const { open, setOpen } = useSearch();
  const { stories, status } = useStories();
  const { projecten } = useProjecten();
  const { openChat } = useChat();
  const navigate = useNavigate();
  const [query, setQuery] = useState('');

  const pages = [{ label: 'Home', to: '/', description: 'Startpagina' }, ...NAV_ITEMS];
  const projectPath = (p: Project) => (p.type === 'onderzoek' ? '/onderzoek' : '/ai-oplossingen');

  const go = (to: string) => {
    setOpen(false);
    setQuery('');
    navigate(to);
  };

  return (
    <Command.Dialog
      open={open}
      onOpenChange={(o) => {
        setOpen(o);
        if (!o) setQuery('');
      }}
      label="Zoeken in het portfolio"
      filter={filter}
      loop
      overlayClassName="fixed inset-0 z-[80] bg-night/50 backdrop-blur-sm"
      contentClassName="fixed z-[81] left-1/2 top-[max(1rem,12vh)] -translate-x-1/2 w-[calc(100%-1.5rem)] max-w-xl rounded-panel bg-card shadow-panel ring-1 ring-line overflow-hidden"
    >
      <div className="flex items-center gap-3 px-4 border-b border-line">
        <Search className="w-4 h-4 text-subtle shrink-0" aria-hidden="true" />
        <Command.Input
          value={query}
          onValueChange={setQuery}
          placeholder="Zoek een story, leeruitkomst of pagina…"
          className="flex-1 h-14 bg-transparent text-[1rem] text-ink placeholder:text-subtle focus:outline-none"
        />
        <kbd className="hidden sm:inline-flex h-6 items-center px-1.5 rounded-md bg-sunken font-mono text-[0.7rem] text-subtle">Esc</kbd>
      </div>

      <Command.List className="max-h-[min(60vh,440px)] overflow-y-auto overscroll-contain p-2 scroll-py-2">
        <Command.Empty className="px-4 py-8 text-center text-[0.925rem] text-muted">
          Niets gevonden voor “{query}”.
        </Command.Empty>

        {query.trim() && (
          <Command.Group heading="AI-assistent" className="cmdk-group">
            <Command.Item
              value={`ai-vraag ${query}`}
              keywords={[query]}
              onSelect={() => {
                setOpen(false);
                openChat(query, { send: true });
                setQuery('');
              }}
              className={itemClass}
            >
              <span className="grid place-items-center w-8 h-8 rounded-lg bg-[linear-gradient(135deg,#3762ab,#7c5cf0)] text-white shrink-0">
                <Sparkles className="w-4 h-4" aria-hidden="true" />
              </span>
              <span className="min-w-0 truncate">
                Vraag mijn AI: <span className="font-medium">{query}</span>
              </span>
            </Command.Item>
          </Command.Group>
        )}

        <Command.Group heading="Stories" className="cmdk-group">
          {status === 'loading' && <Command.Loading>Stories laden…</Command.Loading>}
          {stories.map((s) => (
            <Command.Item
              key={s.slug}
              value={`${s.titel} ${s.slug}`}
              keywords={[s.korte_versie, STORY_TYPE_LABELS[s.type], `sprint ${s.sprint}`, ...s.lus.map((l) => `lu${l}`)]}
              onSelect={() => go(`/stories/${s.slug}`)}
              className={itemClass}
            >
              <span className="grid place-items-center w-8 h-8 rounded-lg bg-sunken font-mono text-[0.7rem] text-muted shrink-0">
                {s.type}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block truncate font-medium">{s.titel}</span>
                <span className="block truncate text-[0.8rem] text-subtle">
                  Sprint {s.sprint} · {s.korte_versie}
                </span>
              </span>
              <ArrowRight className="w-4 h-4 text-subtle opacity-0 group-data-[selected=true]:opacity-100" aria-hidden="true" />
            </Command.Item>
          ))}
        </Command.Group>

        {projecten.length > 0 && (
          <Command.Group heading="Onderzoek en AI-oplossingen" className="cmdk-group">
            {projecten.map((p) => (
              <Command.Item
                key={p.id}
                value={`${p.titel} ${p.id}`}
                keywords={[p.beschrijving ?? '', ...(p.tools ?? []), p.type]}
                onSelect={() => go(projectPath(p))}
                className={itemClass}
              >
                <span className="grid place-items-center w-8 h-8 rounded-lg bg-sunken text-muted shrink-0">
                  {p.type === 'onderzoek' ? <FlaskConical className="w-4 h-4" aria-hidden="true" /> : <Bot className="w-4 h-4" aria-hidden="true" />}
                </span>
                <span className="min-w-0 truncate font-medium">{p.titel}</span>
              </Command.Item>
            ))}
          </Command.Group>
        )}

        <Command.Group heading="Leeruitkomsten" className="cmdk-group">
          {learningOutcomes.map((lu) => (
            <Command.Item
              key={lu.id}
              value={`${lu.code} ${lu.title}`}
              keywords={[lu.label, lu.shortDescription]}
              onSelect={() => go(luPath(lu.nummer))}
              className={itemClass}
            >
              <span className={cn('grid place-items-center w-8 h-8 rounded-lg font-mono text-[0.7rem] font-semibold shrink-0', LU_STYLES[lu.nummer].soft, LU_STYLES[lu.nummer].ink)}>
                {lu.nummer}
              </span>
              <span className="min-w-0 truncate">
                <span className="font-medium">{lu.code}</span> · {lu.title}
              </span>
            </Command.Item>
          ))}
        </Command.Group>

        <Command.Group heading="Pagina's" className="cmdk-group">
          {pages.map((p) => {
            const Icon = PAGE_ICONS[p.to] ?? FileText;
            return (
              <Command.Item key={p.to} value={p.label} keywords={[p.description]} onSelect={() => go(p.to)} className={itemClass}>
                <span className="grid place-items-center w-8 h-8 rounded-lg bg-sunken text-muted shrink-0">
                  <Icon className="w-4 h-4" aria-hidden="true" />
                </span>
                <span className="font-medium">{p.label}</span>
                <span className="text-[0.8rem] text-subtle truncate">{p.description}</span>
              </Command.Item>
            );
          })}
        </Command.Group>
      </Command.List>

      <div className="hidden sm:flex items-center gap-4 px-4 h-10 border-t border-line text-[0.75rem] text-subtle">
        <span>
          <kbd className="font-mono">↑↓</kbd> kiezen
        </span>
        <span>
          <kbd className="font-mono">↵</kbd> openen
        </span>
        <span>
          <kbd className="font-mono">Esc</kbd> sluiten
        </span>
      </div>
    </Command.Dialog>
  );
}
