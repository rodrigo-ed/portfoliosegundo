import {CASE_OUTCOMES} from '../data/portfolioContent.ts';

interface ResultsSectionProps {
  onOpenChat: () => void;
}

export function ResultsSection({onOpenChat}: ResultsSectionProps) {
  return (
    <section id="resultados" className="border-b border-slate-200 bg-white">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold text-[#1D4ED8]">Impacto Prático e Comprovação</p>
          <h2 className="mt-2 font-display text-2xl font-bold tracking-tight text-[#0A0A0A] sm:text-4xl">
            Entregas medidas por velocidade, economia e novos clientes.
          </h2>
          <p className="mt-4 max-w-[65ch] text-base text-slate-600">
            Cada projeto combina clareza visual com decisões técnicas que reduzem desperdício de
            tempo e orçamento tanto para uso pessoal quanto para empresas.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:mt-12 lg:grid-cols-3">
          {CASE_OUTCOMES.map((item) => (
            <article
              key={item.title}
              className="flex flex-col justify-between rounded-xl border border-slate-200 bg-slate-50 p-6 sm:p-7"
            >
              <div>
                <p className="text-xs font-medium text-slate-500">
                  {item.segment} · Perfil {item.audience}
                </p>
                <h3 className="mt-3 font-display text-lg font-bold tracking-tight text-[#0A0A0A]">
                  {item.title}
                </h3>

                <dl className="mt-5 space-y-4 border-t border-slate-200 pt-4 text-sm">
                  <div>
                    <dt className="text-xs font-semibold text-slate-500">Cenário inicial</dt>
                    <dd className="mt-1 text-slate-700">{item.before}</dd>
                  </div>
                  <div>
                    <dt className="text-xs font-semibold text-slate-500">Intervenção aplicada</dt>
                    <dd className="mt-1 text-slate-700">{item.solution}</dd>
                  </div>
                </dl>
              </div>

              <div className="mt-6 border-t border-slate-200 pt-4">
                <p className="text-xs font-semibold text-slate-500">Resultado apurado</p>
                <p className="mt-1 font-display text-base font-bold text-[#1D4ED8] tabular-nums">
                  {item.result}
                </p>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-10 flex flex-col items-start justify-between gap-6 rounded-xl border border-slate-200 bg-[#0A0A0A] p-6 text-white sm:mt-12 sm:flex-row sm:items-center sm:p-8">
          <div className="max-w-xl">
            <h3 className="font-display text-xl font-bold tracking-tight text-white">
              Precisa destravar seu site ou escolher o próximo computador?
            </h3>
            <p className="mt-2 text-sm text-slate-300">
              Responda 4 perguntas rápidas no chat e receba uma orientação direta no WhatsApp.
            </p>
          </div>
          <button
            type="button"
            onClick={onOpenChat}
            className="min-h-[44px] w-full whitespace-nowrap shrink-0 rounded-lg bg-[#1D4ED8] px-5 py-3 text-center text-sm font-semibold text-white transition-colors duration-150 hover:bg-[#1E40AF] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white cursor-pointer sm:w-auto"
          >
            Agendar Diagnóstico
          </button>
        </div>
      </div>
    </section>
  );
}
