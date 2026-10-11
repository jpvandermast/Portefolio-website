import React from 'react';
import { Link } from 'react-router';
import { ArrowUpRight, Github, Linkedin, Mail } from 'lucide-react';
import { aboutData } from '../../../shared/portfolioContent';
import { Container } from '../ui/Container';
import { Monogram } from './Monogram';
import { useNavItems } from './useNavItems';

export const Footer: React.FC = () => {
  const items = useNavItems();
  return (
    <footer className="on-dark relative bg-night text-white/70 overflow-hidden">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgb(143_177_255/0.4),transparent)]" aria-hidden="true" />
      <Container className="py-14 sm:py-16">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          <div className="max-w-sm">
            <div className="flex items-center gap-2.5 text-white font-semibold">
              <Monogram />
              {aboutData.name}
            </div>
            <p className="mt-4 text-[0.925rem] leading-relaxed">
              Portfolio voor de minor Future-proof met AI aan de Hogeschool Utrecht. Alle bewijsstukken komen live uit
              de database; de site zelf is ook een stuk bewijs.
            </p>
          </div>

          <nav aria-label="Footer">
            <h2 className="font-mono text-[0.7rem] uppercase tracking-[0.14em] text-white/60 mb-4">Pagina's</h2>
            <ul className="space-y-1">
              {[{ label: 'Home', to: '/' }, ...items].map((item) => (
                <li key={item.to}>
                  <Link to={item.to} className="inline-flex min-h-9 items-center text-[0.925rem] text-white/75 hover:text-white transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="font-mono text-[0.7rem] uppercase tracking-[0.14em] text-white/60 mb-4">Contact</h2>
            <ul className="space-y-1 text-[0.925rem]">
              <li>
                <a href={`mailto:${aboutData.email}`} className="inline-flex min-h-9 items-center gap-2.5 text-white/75 hover:text-white transition-colors break-all">
                  <Mail className="w-4 h-4 shrink-0" aria-hidden="true" />
                  {aboutData.email}
                </a>
              </li>
              <li>
                <a href={aboutData.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-9 items-center gap-2.5 text-white/75 hover:text-white transition-colors">
                  <Linkedin className="w-4 h-4" aria-hidden="true" />
                  LinkedIn
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-60" aria-hidden="true" />
                </a>
              </li>
              <li>
                <a href={aboutData.socialLinks.github} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-9 items-center gap-2.5 text-white/75 hover:text-white transition-colors">
                  <Github className="w-4 h-4" aria-hidden="true" />
                  GitHub
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-60" aria-hidden="true" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row gap-2 justify-between text-[0.8rem] text-white/55">
          <p>© {new Date().getFullYear()} {aboutData.name} · Commerciële Economie, Hogeschool Utrecht</p>
          <p>Gebouwd met React, Supabase en Gemini</p>
        </div>
      </Container>
    </footer>
  );
};
