import React, { useState } from 'react';
import { Sparkles, Menu, X, BookOpen, User, FolderGit2, Calendar, Mail, FileText } from 'lucide-react';

interface NavbarProps {
  currentSprint?: number;
}

export const Navbar: React.FC<NavbarProps> = ({ currentSprint = 1 }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Over mij', href: '#over-mij', icon: User },
    { label: 'Leeruitkomsten (LU1-LU5)', href: '#leeruitkomsten', icon: BookOpen },
    { label: 'Onderzoek', href: '#onderzoek', icon: FileText },
    { label: 'AI-Projecten', href: '#projecten', icon: FolderGit2 },
    { label: 'Sprint-tijdlijn', href: '#sprints', icon: Calendar },
    { label: 'Contact', href: '#contact', icon: Mail },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#FAF8F5]/90 backdrop-blur-md border-b border-[#E8E1D5] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand identifier */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-[#1A2E4A] flex items-center justify-center text-white font-bold text-lg shadow-sm group-hover:bg-[#2C476F] transition-colors">
              JM
            </div>
            <div>
              <div className="text-base font-bold text-[#1A2E4A] tracking-tight group-hover:text-[#2C476F] transition-colors">
                Josse van der Mast
              </div>
              <div className="text-xs text-[#5C6F84] font-medium flex items-center gap-1.5">
                <span>HU Minor Future-proof met AI!</span>
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#C58B2E]"></span>
                <span className="text-[#C58B2E] font-semibold">Sprint {currentSprint}</span>
              </div>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="px-3 py-2 rounded-lg text-sm font-semibold text-[#33475B] hover:text-[#1A2E4A] hover:bg-[#F2ECE0] transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Action CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href="#leeruitkomsten"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider text-white bg-[#1A2E4A] hover:bg-[#2C476F] shadow-sm transition-all hover:shadow"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#E8A948]" />
              Bekijk Bewijzen
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-[#1A2E4A] hover:bg-[#F2ECE0] focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-[#E8E1D5] bg-[#FAF8F5] px-4 pt-2 pb-6 space-y-1 shadow-lg animate-in slide-in-from-top-2 duration-200">
          <div className="mb-3 px-3 py-2 bg-[#F4EFE6] rounded-lg text-xs font-medium text-[#4A6A8A]">
            Hogeschool Utrecht • 20 Weken Portfolio
          </div>
          {navLinks.map((link) => {
            const Icon = link.icon;
            return (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-semibold text-[#1A2E4A] hover:bg-[#F2ECE0]"
              >
                <Icon className="w-4 h-4 text-[#C58B2E]" />
                {link.label}
              </a>
            );
          })}
          <div className="pt-3">
            <a
              href="#leeruitkomsten"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-bold text-white bg-[#1A2E4A]"
            >
              <Sparkles className="w-4 h-4 text-[#E8A948]" />
              Naar Leeruitkomsten (LU1-LU5)
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
