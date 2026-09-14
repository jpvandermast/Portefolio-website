import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

interface NavbarProps {
  currentSprint?: number;
}

export const Navbar: React.FC<NavbarProps> = ({ currentSprint = 1 }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Over mij', href: '#over-mij' },
    { label: 'Leeruitkomsten', href: '#leeruitkomsten' },
    { label: 'Onderzoek', href: '#onderzoek' },
    { label: 'Projecten', href: '#projecten' },
    { label: 'Sprint-tijdlijn', href: '#sprints' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-[#e4e7ea] transition-all">
      <div className="max-w-[1120px] mx-auto px-6">
        <div className="flex items-center justify-between h-[68px] gap-4">
          
          {/* Logo / Brand identifier */}
          <a href="#" className="flex items-center gap-2.5 font-bold text-[18px] sm:text-[19px] text-[#121D2F] whitespace-nowrap shrink-0">
            <span className="w-8 h-8 rounded-[4px] bg-[#121D2F] text-white flex items-center justify-center font-bold text-sm tracking-tight shrink-0">
              JM
            </span>
            <span>Josse van der Mast</span>
            <span className="hidden xl:inline-block text-xs font-normal text-[#6c7d8f] border-l border-[#e4e7ea] pl-2.5 ml-1">
              Minor AI • Sprint {currentSprint}
            </span>
          </a>

          {/* Desktop Navigation (Visible only from lg breakpoint, with tight responsive spacing) */}
          <nav className="hidden lg:flex items-center gap-3.5 xl:gap-6 shrink-0">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-[#121D2F] font-semibold text-[13.5px] xl:text-[15px] hover:text-[#3762AB] transition-colors whitespace-nowrap py-1 px-1"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Header Action Button (Desktop only) */}
          <div className="hidden lg:flex items-center shrink-0">
            <a
              href="#leeruitkomsten"
              className="inline-block bg-[#121D2F] text-white py-2 px-3.5 xl:py-2.5 xl:px-[18px] rounded-[4px] font-bold text-[13px] xl:text-[14px] whitespace-nowrap hover:bg-[#2b4d87] transition-colors shadow-sm"
            >
              Bekijk Bewijsstukken
            </a>
          </div>

          {/* Mobile / Tablet Menu Button (Visible below lg) */}
          <div className="flex lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#121D2F] hover:bg-[#f6f7f8] rounded-[4px] focus:outline-none"
              aria-label="Menu openen of sluiten"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6 text-[#121D2F]" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile / Tablet Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[#e4e7ea] bg-[#f6f7f8] px-6 py-4 space-y-1 shadow-md">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block py-3 border-b border-[#e4e7ea] text-[15px] font-semibold text-[#121D2F] hover:text-[#3762AB] whitespace-nowrap"
            >
              {link.label}
            </a>
          ))}
          <div className="pt-3">
            <a
              href="#leeruitkomsten"
              onClick={() => setMobileMenuOpen(false)}
              className="block w-full text-center bg-[#3762AB] text-white py-3 px-4 rounded-[4px] font-bold text-[14px] hover:bg-[#2b4d87] transition-colors"
            >
              Bekijk Bewijsstukken
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
