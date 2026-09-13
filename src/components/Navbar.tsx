import React, { useState } from 'react';
import { Menu, X, ArrowRight } from 'lucide-react';

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
        <div className="flex items-center justify-between h-[68px]">
          
          {/* Logo / Brand identifier */}
          <a href="#" className="flex items-center gap-2.5 font-bold text-[19px] text-[#121D2F] whitespace-nowrap">
            <span className="w-8 h-8 rounded-[4px] bg-[#121D2F] text-white flex items-center justify-center font-bold text-sm tracking-tight">
              JM
            </span>
            <span>Josse van der Mast</span>
            <span className="hidden sm:inline-block text-xs font-normal text-[#6c7d8f] border-l border-[#e4e7ea] pl-2.5 ml-1">
              Minor AI • Sprint {currentSprint}
            </span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-7">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-[#121D2F] font-semibold text-[15px] hover:text-[#2b4d87] transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Header Action Button */}
          <div className="hidden md:flex items-center">
            <a
              href="#leeruitkomsten"
              className="inline-block bg-[#121D2F] text-white py-2.5 px-[18px] rounded-[4px] font-bold text-[14px] whitespace-nowrap hover:bg-[#2b4d87] transition-colors"
            >
              Bekijk Bewijsstukken
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#121D2F] hover:bg-[#f6f7f8] rounded-[4px] focus:outline-none"
              aria-label="Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6 text-[#121D2F]" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#e4e7ea] bg-[#f6f7f8] px-6 py-4 space-y-1">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block py-3 border-b border-[#e4e7ea] text-[15px] font-semibold text-[#121D2F] hover:text-[#2b4d87]"
            >
              {link.label}
            </a>
          ))}
          <div className="pt-3">
            <a
              href="#leeruitkomsten"
              onClick={() => setMobileMenuOpen(false)}
              className="block w-full text-center bg-[#3762AB] text-white py-3 px-4 rounded-[4px] font-bold text-[14px] hover:bg-[#2b4d87]"
            >
              Bekijk Bewijsstukken
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
