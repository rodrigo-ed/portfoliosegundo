import {useState} from 'react';
import {FAQ_ITEMS} from '../data/portfolioContent.ts';

interface FaqSectionProps {
  onOpenChat: () => void;
}

export function FaqSection({onOpenChat}: FaqSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="border-b border-slate-200 bg-white">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5">
            <p className="text-sm font-semibold text-[#1D4ED8]">Perguntas Frequentes</p>
            <h2 className="mt-2 font-display text-2xl font-bold tracking-tight text-[#0A0A0A] sm:text-3xl">
              Dúvidas comuns antes de agendar.
            </h2>
            <p className="mt-4 max-w-[45ch] text-base text-slate-600">
              Transparência sobre prazos, atendimento remoto ou presencial e serviços para uso
              pessoal e empresarial.
            </p>

            <div className="mt-8 border-t border-slate-200 pt-6">
              <p className="text-sm font-semibold text-[#0A0A0A]">
                Sua dúvida não está listada ao lado?
              </p>
              <button
                type="button"
                onClick={onOpenChat}
                className="mt-4 min-h-[44px] w-full whitespace-nowrap shrink-0 rounded-lg bg-[#1D4ED8] px-5 py-3 text-center text-sm font-semibold text-white transition-colors duration-150 hover:bg-[#1E40AF] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0A0A0A] cursor-pointer sm:w-auto"
              >
                Agendar pelo Chat
              </button>
            </div>
          </div>

          <div className="divide-y divide-slate-200 border-y border-slate-200 lg:col-span-7">
            {FAQ_ITEMS.map((item, index) => {
              const isOpen = openIndex === index;
              const panelId = `faq-panel-${index}`;
              const buttonId = `faq-button-${index}`;

              return (
                <div key={item.question} className="py-5">
                  <h3>
                    <button
                      id={buttonId}
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      onClick={() => setOpenIndex(isOpen ? null : index)}
                      className="flex min-h-[44px] w-full items-center justify-between gap-4 text-left font-display text-base font-bold text-[#0A0A0A] transition-colors duration-150 hover:text-[#1D4ED8] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1D4ED8] cursor-pointer sm:text-lg"
                    >
                      <span>{item.question}</span>
                      <span className="font-mono text-xs font-semibold text-[#1D4ED8] whitespace-nowrap shrink-0">
                        {isOpen ? 'Ocultar' : 'Expandir'}
                      </span>
                    </button>
                  </h3>
                  <div
                    id={panelId}
                    role="region"
                    aria-labelledby={buttonId}
                    hidden={!isOpen}
                    className="mt-3 max-w-[65ch] text-sm leading-relaxed text-slate-600"
                  >
                    {item.answer}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
