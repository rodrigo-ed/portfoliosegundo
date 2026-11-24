import {HERO_STRIP_METRICS} from '../data/portfolioContent.ts';

interface HeroSectionProps {
  onOpenChat: () => void;
}

export function HeroSection({onOpenChat}: HeroSectionProps) {
  return (
    <section id="topo" className="border-b border-slate-200 bg-white">
      <div className="mx-auto max-w-6xl px-4 pt-10 pb-12 sm:px-6 sm:pt-16 sm:pb-16 lg:px-8 lg:pt-24 lg:pb-20">
        <div className="grid grid-cols-1 items-stretch gap-8 lg:grid-cols-12 lg:gap-12">
          <div className="flex flex-col justify-between lg:col-span-8">
            <div>
              <p className="text-xs font-semibold text-[#1D4ED8] sm:text-sm">
                Atendimento remoto nacional · Suporte presencial local
              </p>
              <h1 className="mt-3 max-w-3xl font-display text-[clamp(1.875rem,4.5vw,3.75rem)] font-bold leading-[1.1] tracking-tight text-[#0A0A0A] sm:mt-4">
                Sites profissionais, sistemas sob medida e suporte técnico que resolve.
              </h1>
              <p className="mt-4 max-w-[65ch] text-base leading-relaxed text-slate-600 sm:mt-6 sm:text-lg">
                Desenvolvimento web leve para gerar contatos reais, manutenção completa de
                computadores e consultoria técnica para você ou sua empresa comprarem o equipamento
                certo.
              </p>
            </div>

            <div className="mt-7 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
              <button
                type="button"
                onClick={onOpenChat}
                className="min-h-[44px] w-full whitespace-nowrap shrink-0 rounded-lg bg-[#1D4ED8] px-6 py-3 text-center text-sm font-semibold text-white transition-colors duration-150 hover:bg-[#1E40AF] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0A0A0A] cursor-pointer sm:w-auto"
              >
                Iniciar Agendamento Imediato
              </button>
              <a
                href="#solucoes"
                className="inline-flex min-h-[44px] w-full items-center justify-center whitespace-nowrap shrink-0 rounded-lg border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-[#0A0A0A] transition-colors duration-150 hover:border-[#0A0A0A] hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1D4ED8] sm:w-auto"
              >
                Explorar Soluções
              </a>
            </div>
          </div>

          <aside
            aria-label="Resumo de atuação técnica"
            className="flex flex-col justify-between rounded-xl border border-slate-800 bg-[#0A0A0A] p-6 text-white lg:col-span-4 sm:p-8"
          >
            <div>
              <p className="text-xs font-semibold tracking-wide text-blue-400">
                Compromisso Técnico
              </p>
              <h2 className="mt-3 font-display text-xl font-bold leading-snug tracking-tight text-white">
                Soluções diretas para vender mais online e trabalhar sem lentidão.
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-slate-300">
                Criamos páginas leves para 4G, realizamos manutenção preventiva e corretiva de
                computadores e orientamos suas compras de hardware para evitar gastos errados.
              </p>
            </div>

            <div className="mt-8 border-t border-slate-800 pt-5 text-xs text-slate-300">
              <p className="font-semibold text-white">Atendimento para Pessoa Física e Empresas</p>
              <p className="mt-1">
                Triagem rápida pelo chat com resumo enviado direto para o WhatsApp.
              </p>
            </div>
          </aside>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-slate-200 bg-slate-200 sm:mt-12 lg:grid-cols-4">
          {HERO_STRIP_METRICS.map((metric) => (
            <div key={metric.label} className="bg-slate-50 p-4 sm:p-6">
              <p className="font-mono text-xl font-semibold tracking-tight text-[#0A0A0A] tabular-nums sm:text-2xl">
                {metric.value}
              </p>
              <p className="mt-1 text-xs font-semibold text-[#0A0A0A] sm:text-sm">{metric.label}</p>
              <p className="mt-1 text-xs text-slate-600">{metric.context}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
