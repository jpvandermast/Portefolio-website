import React from 'react';
import { ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#0c1420] text-white/70 py-12 px-6 border-t border-white/10 text-[14px]">
      <div className="max-w-[1120px] mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-white/10 text-center md:text-left">
          
          <div>
            <div className="flex items-center justify-center md:justify-start gap-2.5 mb-2 font-bold text-white text-[16px]">
              <span className="w-6 h-6 rounded-[4px] bg-[#3762AB] text-white flex items-center justify-center text-xs font-bold">
                JM
              </span>
              <span>Josse van der Mast</span>
            </div>
            <p className="text-[13px] text-white/60">
              Portfolio Minor "Future-proof met AI!" • Hogeschool Utrecht (2026)
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-[14px]">
            <a href="#over-mij" className="text-white/80 hover:text-white transition-colors">
              Over mij
            </a>
            <a href="#leeruitkomsten" className="text-white/80 hover:text-white transition-colors">
              Leeruitkomsten
            </a>
            <a href="#onderzoek" className="text-white/80 hover:text-white transition-colors">
              Onderzoek
            </a>
            <a href="#projecten" className="text-white/80 hover:text-white transition-colors">
              Projecten
            </a>
            <a href="#sprints" className="text-white/80 hover:text-white transition-colors">
              Sprint-tijdlijn
            </a>
            <a href="#contact" className="text-white/80 hover:text-white transition-colors">
              Contact
            </a>
          </div>

          <div>
            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-1.5 bg-white/10 hover:bg-white/20 text-white py-2.5 px-4 rounded-[4px] font-bold text-xs transition-colors"
            >
              <ArrowUp className="w-3.5 h-3.5" />
              <span>Naar boven</span>
            </button>
          </div>

        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-white/50 text-center sm:text-left">
          <p>© {new Date().getFullYear()} Josse van der Mast. Alle rechten voorbehouden.</p>
          <p>Commerciële Economie • Hogeschool Utrecht</p>
        </div>
      </div>
    </footer>
  );
};
