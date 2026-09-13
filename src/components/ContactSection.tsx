import React, { useState } from 'react';
import { Mail, Linkedin, Github, Send, CheckCircle2, MessageSquare, ArrowUpRight } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    role: 'Beoordelaar / Docent HU',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name || !formState.email || !formState.message) return;
    setSubmitted(true);
  };

  return (
    <section id="contact" className="py-20 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#F4EFE6] text-xs font-bold uppercase tracking-wider text-[#1A2E4A] mb-3">
            <span>Direct Contact & Connectie</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1A2E4A] tracking-tight">
            Laten We in Contact Komen
          </h2>
          <p className="mt-3 text-lg text-[#556980]">
            Heb je feedback op mijn bewijsstukken, vragen over het minor-onderzoek of 
            wil je sparren over AI in het commerciële vakgebied? Neem gerust contact op.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Direct Channels & Socials */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#E8E1D5] shadow-xs space-y-6">
              
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-[#1A2E4A]">
                  Directe Contactgegevens
                </h3>
                <p className="text-xs text-[#6C7E92]">
                  Bereikbaar voor docenten, mentoren, praktijkpartners en medestudenten.
                </p>
              </div>

              {/* Email Card */}
              <a
                href="mailto:josse.mast@gmail.com"
                className="flex items-center justify-between p-4 rounded-2xl bg-[#FAF8F5] border border-[#E8E1D5] hover:border-[#1A2E4A] transition-all group"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-[#1A2E4A] text-white flex items-center justify-center">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-[#6C7E92] font-medium">E-mailadres</div>
                    <div className="text-sm font-bold text-[#1A2E4A] group-hover:text-[#2C476F]">
                      josse.mast@gmail.com
                    </div>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-[#C58B2E] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>

              {/* LinkedIn Card */}
              <a
                href="https://www.linkedin.com/in/josse-van-der-mast-1111b7292/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-4 rounded-2xl bg-[#FAF8F5] border border-[#E8E1D5] hover:border-[#1A2E4A] transition-all group"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-[#0077B5] text-white flex items-center justify-center">
                    <Linkedin className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-[#6C7E92] font-medium">LinkedIn Profiel</div>
                    <div className="text-sm font-bold text-[#1A2E4A] group-hover:text-[#2C476F]">
                      Josse van der Mast
                    </div>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-[#C58B2E] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>

              {/* GitHub Card */}
              <a
                href="https://github.com/jossevandermast"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-4 rounded-2xl bg-[#FAF8F5] border border-[#E8E1D5] hover:border-[#1A2E4A] transition-all group"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-[#24292E] text-white flex items-center justify-center">
                    <Github className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-[#6C7E92] font-medium">GitHub Repository & Code</div>
                    <div className="text-sm font-bold text-[#1A2E4A] group-hover:text-[#2C476F]">
                      github.com/jossevandermast
                    </div>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-[#C58B2E] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>

              {/* Institution note */}
              <div className="p-4 rounded-2xl bg-[#F4EFE6] border border-[#E0D7C6] text-xs text-[#52667A] space-y-1">
                <div className="font-bold text-[#1A2E4A]">Hogeschool Utrecht (HU)</div>
                <p>Opleiding Commerciële Economie • Minor Future-proof met AI! (2026)</p>
              </div>

            </div>

          </div>

          {/* Right Column: Interactive Message Box */}
          <div className="lg:col-span-7">
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#E8E1D5] shadow-xs">
              
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-xl font-bold text-[#1A2E4A]">
                    Stuur een Bericht of Feedback
                  </h3>
                  <p className="text-xs text-[#6C7E92] mt-0.5">
                    Feedback op een specifiek bewijsstuk of voorstel tot samenwerking?
                  </p>
                </div>
                <div className="p-2.5 rounded-xl bg-[#F4EFE6] text-[#1A2E4A]">
                  <MessageSquare className="w-5 h-5" />
                </div>
              </div>

              {submitted ? (
                <div className="p-8 text-center bg-[#FAF8F5] rounded-2xl border border-[#E0D7C6] space-y-3 animate-in fade-in duration-300">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h4 className="text-lg font-bold text-[#1A2E4A]">
                    Hartelijk dank voor je bericht!
                  </h4>
                  <p className="text-xs text-[#556980] max-w-md mx-auto leading-relaxed">
                    Ik heb je bericht ontvangen en neem zo snel mogelijk contact met je op via {formState.email}.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormState({ name: '', email: '', role: 'Beoordelaar / Docent HU', message: '' });
                    }}
                    className="mt-3 inline-flex items-center px-4 py-2 rounded-xl text-xs font-bold text-[#1A2E4A] bg-[#F4EFE6] hover:bg-[#EBE2D3]"
                  >
                    Nog een bericht sturen
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#1A2E4A] mb-1.5">
                        Naam *
                      </label>
                      <input
                        type="text"
                        required
                        value={formState.name}
                        onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                        placeholder="Bijv. Jan de Vries"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#D5CABE] bg-[#FAF8F5] text-sm text-[#1A2E4A] focus:bg-white focus:ring-2 focus:ring-[#1A2E4A] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#1A2E4A] mb-1.5">
                        E-mailadres *
                      </label>
                      <input
                        type="email"
                        required
                        value={formState.email}
                        onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                        placeholder="naam@organisatie.nl"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#D5CABE] bg-[#FAF8F5] text-sm text-[#1A2E4A] focus:bg-white focus:ring-2 focus:ring-[#1A2E4A] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#1A2E4A] mb-1.5">
                      Rol / Relatie
                    </label>
                    <select
                      value={formState.role}
                      onChange={(e) => setFormState({ ...formState, role: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#D5CABE] bg-[#FAF8F5] text-sm text-[#1A2E4A] focus:bg-white focus:ring-2 focus:ring-[#1A2E4A] focus:outline-none font-medium"
                    >
                      <option value="Beoordelaar / Docent HU">Beoordelaar / Docent HU</option>
                      <option value="Minor Medestudent">Minor Medestudent</option>
                      <option value="Praktijkpartner / Werkgever">Praktijkpartner / Bedrijf</option>
                      <option value="Overig">Overig</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#1A2E4A] mb-1.5">
                      Bericht of Feedback *
                    </label>
                    <textarea
                      rows={4}
                      required
                      value={formState.message}
                      onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                      placeholder="Laat hier je opmerkingen, feedback op bewijsstukken of contactverzoek achter..."
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#D5CABE] bg-[#FAF8F5] text-sm text-[#1A2E4A] focus:bg-white focus:ring-2 focus:ring-[#1A2E4A] focus:outline-none resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-[#1A2E4A] hover:bg-[#2C476F] text-white text-xs font-bold shadow-sm hover:shadow transition-all"
                  >
                    <Send className="w-4 h-4 text-[#E8A948]" />
                    <span>Verstuur Bericht</span>
                  </button>
                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
