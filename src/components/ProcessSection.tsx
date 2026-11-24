import {PROCESS_STEPS} from '../data/portfolioContent.ts';

export function ProcessSection() {
  return (
    <section id="processo" className="border-b border-slate-200 bg-slate-50">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold text-[#1D4ED8]">Método de Trabalho</p>
          <h2 className="mt-2 font-display text-2xl font-bold tracking-tight text-[#0A0A0A] sm:text-4xl">
            Do primeiro contato à entrega validada em três etapas diretas.
          </h2>
        </div>

        <ol className="mt-10 grid grid-cols-1 gap-6 sm:mt-12 lg:grid-cols-3">
          {PROCESS_STEPS.map((step) => (
            <li
              key={step.index}
              className="rounded-xl border border-slate-200 bg-white p-6 sm:p-8"
            >
              <p className="font-mono text-sm font-semibold text-[#1D4ED8] tabular-nums">
                {step.index}
              </p>
              <h3 className="mt-3 font-display text-xl font-bold tracking-tight text-[#0A0A0A]">
                {step.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">{step.description}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
