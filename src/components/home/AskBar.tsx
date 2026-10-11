import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { ArrowUp, Sparkles } from 'lucide-react';
import { useChat } from '../../lib/ChatContext';
import { MAX_MESSAGE_LENGTH } from '../../lib/chat';

export const HERO_QUESTIONS = [
  'Wat heeft Josse in sprint 1 gebouwd?',
  'Welke AI-tools gebruikt Josse?',
  'Wat onderzocht Josse over AI en zijn vak?',
  'Wie is Josse en wat drijft hem?',
];

/**
 * Vraagbalk in de hero. Leeg + Enter verstuurt de getoonde voorbeeldvraag; de chat opent en
 * verstuurt de vraag meteen.
 */
export const AskBar: React.FC = () => {
  const { openChat } = useChat();
  const reduce = useReducedMotion();
  const [value, setValue] = useState('');
  const [index, setIndex] = useState(0);
  const [focused, setFocused] = useState(false);

  useEffect(() => {
    if (reduce || value || focused) return;
    const id = window.setInterval(() => setIndex((i) => (i + 1) % HERO_QUESTIONS.length), 3600);
    return () => window.clearInterval(id);
  }, [reduce, value, focused]);

  const example = HERO_QUESTIONS[index];

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    openChat(value.trim() || example, { send: true });
    setValue('');
  };

  return (
    <form onSubmit={submit} role="search" aria-label="Vraag mijn AI-assistent" className="relative group max-w-xl">
      {/* Gradiëntrand die oplicht bij focus */}
      <div
        aria-hidden="true"
        className="absolute -inset-px rounded-[18px] bg-[linear-gradient(110deg,rgb(94_231_245/0.55),rgb(143_177_255/0.35)_45%,rgb(167_139_250/0.55))] opacity-50 group-focus-within:opacity-100 transition-opacity duration-300"
      />
      <div className="relative flex items-center gap-2 rounded-[17px] bg-night/80 backdrop-blur-xl p-1.5 pl-4 shadow-[0_12px_40px_-12px_rgb(94_231_245/0.35)]">
        <Sparkles className="w-[18px] h-[18px] text-ai-cyan shrink-0" aria-hidden="true" />
        <div className="relative flex-1 min-w-0 h-11">
          <label htmlFor="hero-vraag" className="sr-only">
            Stel een vraag aan mijn AI-assistent
          </label>
          <input
            id="hero-vraag"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            maxLength={MAX_MESSAGE_LENGTH}
            autoComplete="off"
            aria-describedby="hero-vraag-voorbeeld"
            className="absolute inset-0 w-full bg-transparent text-[1rem] text-white focus:outline-none caret-ai-cyan"
            style={{ outline: 'none' }}
          />
          {!value && (
            <span className="pointer-events-none absolute inset-0 flex items-center overflow-hidden text-[1rem] text-white/50" aria-hidden="true">
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={example}
                  className="truncate"
                  initial={reduce ? false : { opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduce ? undefined : { opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  {example}
                </motion.span>
              </AnimatePresence>
            </span>
          )}
          <span id="hero-vraag-voorbeeld" className="sr-only">
            Bijvoorbeeld: {example} Druk op Enter om de chat te openen.
          </span>
        </div>
        <button
          type="submit"
          aria-label="Vraag stellen"
          className="grid place-items-center w-11 h-11 shrink-0 rounded-[13px] bg-white text-night transition-transform hover:scale-[1.04] active:scale-95"
        >
          <ArrowUp className="w-[18px] h-[18px]" aria-hidden="true" />
        </button>
      </div>
    </form>
  );
};
