import React from 'react';
import { Cpu, Dumbbell, Github, Linkedin, Mail, MapPin, Music, Sparkles, Target, TrendingUp } from 'lucide-react';
import { aboutData } from '../../shared/portfolioContent';
import { Monogram } from '../components/layout/Monogram';
import { Button } from '../components/ui/Button';
import { Container } from '../components/ui/Container';
import { PageHeader } from '../components/ui/PageHeader';
import { Reveal } from '../components/ui/Reveal';
import { Eyebrow } from '../components/ui/SectionHeader';
import { useChat } from '../lib/ChatContext';
import { useDocumentTitle } from '../lib/useDocumentTitle';

const ICONS: Record<string, React.FC<{ className?: string }>> = { Target, TrendingUp, Sparkles, Dumbbell, Music, Cpu };

const ItemList: React.FC<{ items: { title: string; description: string; iconName: string }[] }> = ({ items }) => (
  <ul className="divide-y divide-line border-y border-line">
    {items.map((item) => {
      const Icon = ICONS[item.iconName] ?? Sparkles;
      return (
        <li key={item.title} className="flex gap-4 py-5">
          <span className="grid place-items-center w-10 h-10 shrink-0 rounded-xl bg-accent-soft text-accent">
            <Icon className="w-[18px] h-[18px]" aria-hidden="true" />
          </span>
          <div>
            <h3 className="font-semibold text-ink">{item.title}</h3>
            <p className="mt-1 text-muted">{item.description}</p>
          </div>
        </li>
      );
    })}
  </ul>
);

const Chapter: React.FC<{ eyebrow: string; title: string; children: React.ReactNode }> = ({ eyebrow, title, children }) => (
  <Reveal as="section" className="mt-16 sm:mt-20">
    <Eyebrow>{eyebrow}</Eyebrow>
    <h2 className="mt-2 mb-6 text-h2">{title}</h2>
    {children}
  </Reveal>
);

export default function AboutPage() {
  useDocumentTitle('Over mij', 'Wie is Josse van der Mast: student Commerciële Economie, talenten, passies, dromen en visie op AI.');
  const { openChat } = useChat();

  return (
    <Container className="pb-24">
      <PageHeader
        crumbs={[{ label: 'Home', to: '/' }, { label: 'Over mij' }]}
        eyebrow={<Monogram size="lg" />}
        title={<>Hoi, ik ben Josse.</>}
        lead={`${aboutData.role} en bezig met de minor ${aboutData.minorTitle}`}
      >
        <p className="mt-4 flex items-center gap-2 text-[0.9rem] text-subtle">
          <MapPin className="w-4 h-4" aria-hidden="true" />
          {aboutData.location}
        </p>
      </PageHeader>

      <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_300px] lg:gap-20 items-start">
        <div className="max-w-prose text-[1.05rem] leading-[1.8] text-ink/85">
          {/* Bio als lopend verhaal */}
          {aboutData.bioParagraphs.map((p, i) => (
            <p key={i} className={i === 0 ? 'text-[1.15rem] text-ink' : 'mt-5'}>
              {p}
            </p>
          ))}

          <Reveal>
            <figure className="my-14 relative pl-6 sm:pl-8">
              <span aria-hidden="true" className="absolute left-0 top-1 bottom-1 w-1 rounded-full bg-[linear-gradient(180deg,#3762ab,#7c5cf0)]" />
              <blockquote className="text-[1.5rem] sm:text-[1.75rem] leading-snug font-medium tracking-[-0.02em] text-ink text-balance">
                “{aboutData.quote}”
              </blockquote>
              <figcaption className="mt-3 text-[0.9rem] text-subtle">Mijn motto</figcaption>
            </figure>
          </Reveal>

          <Chapter eyebrow="Waar ik goed in ben" title="Talenten">
            <ItemList items={aboutData.talents} />
          </Chapter>

          <Chapter eyebrow="Waar ik energie van krijg" title="Passies">
            <ItemList items={aboutData.passions} />
          </Chapter>

          <Chapter eyebrow="Waar ik naartoe wil" title="Dromen">
            <p>{aboutData.dreamsText}</p>
          </Chapter>

          <Chapter eyebrow="Hoe ik ernaar kijk" title="Mijn visie op AI">
            {aboutData.aiVision.map((p, i) => (
              <p key={i} className={i > 0 ? 'mt-5' : undefined}>
                {p}
              </p>
            ))}
          </Chapter>
        </div>

        <aside className="lg:sticky lg:top-24 space-y-4" aria-label="Contact">
          <div className="rounded-card bg-card ring-1 ring-line shadow-card p-6">
            <h2 className="font-semibold text-ink">Contact</h2>
            <p className="mt-1 text-[0.875rem] text-muted">Vragen over mijn portfolio of samenwerken? Stuur gerust een bericht.</p>
            <div className="mt-5 grid gap-2">
              <Button href={`mailto:${aboutData.email}`}>
                <Mail className="w-4 h-4" aria-hidden="true" />
                Mail mij
              </Button>
              <Button href={aboutData.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" variant="secondary">
                <Linkedin className="w-4 h-4" aria-hidden="true" />
                LinkedIn
              </Button>
              <Button href={aboutData.socialLinks.github} target="_blank" rel="noopener noreferrer" variant="secondary">
                <Github className="w-4 h-4" aria-hidden="true" />
                GitHub
              </Button>
            </div>
            <p className="mt-4 text-[0.8rem] text-subtle break-all">{aboutData.email}</p>
          </div>
          <button
            type="button"
            onClick={() => openChat('Wie is Josse en wat drijft hem?', { send: true })}
            className="group w-full flex items-center gap-3 rounded-card bg-night p-4 text-left text-white shadow-lift"
          >
            <span className="grid place-items-center w-9 h-9 rounded-xl bg-white/10">
              <Sparkles className="w-4 h-4 text-ai-cyan" aria-hidden="true" />
            </span>
            <span className="text-[0.875rem]">
              <span className="block font-medium">Liever iets vragen?</span>
              <span className="block text-white/65">Mijn AI-assistent vertelt meer.</span>
            </span>
          </button>
        </aside>
      </div>
    </Container>
  );
}
