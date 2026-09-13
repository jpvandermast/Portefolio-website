import React from 'react';
import { ArrowUp, Sparkles, BookOpen, User, FolderGit2, FileText, Calendar, Mail } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#101E33] text-white pt-14 pb-10 border-t border-[#22354F]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-12 border-b border-[#243A58]">
          
          {/* Brand / Student Column */}
          <div className="md:col-span-6 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#C58B2E] text-white font-extrabold flex items-center justify-center text-sm">
                JM
              </div>
              <span className="text-lg font-bold text-white tracking-tight">
                Josse van der Mast
              </span>
            </div>
            <p className="text-xs text-[#9BB1CA] max-w-md leading-relaxed">
              Centraal portfolio voor de Hogeschool Utrecht minor <em>"Future-proof met AI!"</em> (2026). 
              Verzamelplek van onderzoeken, bewijsstukken voor LU1-LU5 en gerealiseerde AI-oplossingen.
            </p>
            <div className="text-[11px] text-[#C58B2E] font-semibold">
              Opleiding Commerciële Economie • Hogeschool Utrecht
            </div>
          </div>

          {/* Quick navigation */}
          <div className="md:col-span-4 space-y-2">
            <div className="text-xs font-bold uppercase tracking-wider text-[#9BB1CA] mb-3">
              Paginanavigatie
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs text-[#CCD9E8]">
              <a href="#over-mij" className="hover:text-white transition-colors">Over mij</a>
              <a href="#leeruitkomsten" className="hover:text-white transition-colors">Leeruitkomsten (LU1-5)</a>
              <a href="#onderzoek" className="hover:text-white transition-colors">AI-Onderzoek</a>
              <a href="#projecten" className="hover:text-white transition-colors">AI-Projecten</a>
              <a href="#sprints" className="hover:text-white transition-colors">Sprint-tijdlijn</a>
              <a href="#contact" className="hover:text-white transition-colors">Contact</a>
            </div>
          </div>

          {/* Back to top */}
          <div className="md:col-span-2 flex flex-col justify-between items-start md:items-end">
            <div className="text-xs font-bold uppercase tracking-wider text-[#9BB1CA]">
              Terug
            </div>
            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-bold text-white transition-all"
            >
              <ArrowUp className="w-3.5 h-3.5 text-[#C58B2E]" />
              <span>Naar boven</span>
            </button>
          </div>

        </div>

        {/* Subfooter */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#8198B2]">
          <div>
            © {new Date().getFullYear()} Josse van der Mast • Portfolio Future-proof met AI!
          </div>
          <div>
            Hogeschool Utrecht (HU) • Commerciële Economie
          </div>
        </div>

      </div>
    </footer>
  );
};
