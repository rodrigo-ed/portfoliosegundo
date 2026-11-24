import {useState} from 'react';
import {
  SERVICES,
  filterServicesByAudience,
  type AudienceFilter,
} from '../data/portfolioContent.ts';
import type {ServiceId} from '../domain/scheduling.ts';

interface ServicesSectionProps {
  onSelectServiceForChat: (serviceId: ServiceId) => void;
}

const FILTER_OPTIONS: Array<{value: AudienceFilter; label: string}> = [
  {value: 'ALL', label: 'Todas as Soluções'},
  {value: 'PJ', label: 'Para Empresas (PJ)'},
  {value: 'PF', label: 'Para Pessoa Física (PF)'},
];

export function ServicesSection({onSelectServiceForChat}: ServicesSectionProps) {
  const [filter, setFilter] = useState<AudienceFilter>('ALL');
  const visibleServices = filterServicesByAudience(SERVICES, filter);

  return (
    <section id="solucoes" className="border-b border-slate-200 bg-slate-50">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
        <div className="flex flex-col justify-between gap-6 border-b border-slate-200 pb-6 sm:pb-8 lg:flex-row lg:items-end">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold text-[#1D4ED8]">Soluções Especializadas</p>
            <h2 className="mt-2 font-display text-2xl font-bold tracking-tight text-[#0A0A0A] sm:text-4xl">
              Estrutura técnica completa, do site ao computador na sua mesa.
            </h2>
          </div>

          <div
            role="group"
            aria-label="Filtrar serviços por perfil"
            className="grid w-full grid-cols-3 gap-1 rounded-lg border border-slate-200 bg-white p-1 sm:inline-flex sm:w-auto sm:flex-wrap sm:items-center"
          >
            {FILTER_OPTIONS.map((option) => {
              const active = filter === option.value;
              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setFilter(option.value)}
                  aria-pressed={active}
                  className={`min-h-[40px] truncate rounded-md px-2 py-2 text-center text-xs font-semibold transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1D4ED8] cursor-pointer sm:whitespace-nowrap sm:shrink-0 sm:px-3.5 ${
                    active
                      ? 'bg-[#0A0A0A] text-white'
                      : 'text-slate-600 hover:bg-slate-100 hover:text-[#0A0A0A]'
                  }`}
                >
                  {option.label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {visibleServices.map((service) => (
            <article
              key={service.id}
              className={`flex flex-col justify-between rounded-xl border p-6 sm:p-8 ${
                service.featured
                  ? 'border-slate-300 bg-white lg:col-span-2'
                  : 'border-slate-200 bg-white lg:col-span-1'
              } ${
                service.id === 'hardware-consulting' ? 'lg:col-span-3' : ''
              }`}
            >
              <div>
                <div className="flex flex-wrap items-baseline justify-between gap-2 text-xs text-slate-500">
                  <span className="font-mono font-semibold text-[#1D4ED8] tabular-nums">
                    {service.index}
                  </span>
                  <span>
                    {service.audience} · Atendimento remoto e local
                  </span>
                </div>

                <h3 className="mt-3 font-display text-2xl font-bold tracking-tight text-[#0A0A0A]">
                  {service.title}
                </h3>
                <p className="mt-3 max-w-[65ch] text-base font-semibold text-slate-800">
                  {service.headline}
                </p>
                <p className="mt-2 max-w-[65ch] text-sm leading-relaxed text-slate-600">
                  {service.description}
                </p>

                <ul className="mt-6 space-y-2 border-t border-slate-200 pt-5 text-sm text-slate-700">
                  {service.deliverables.map((item) => (
                    <li key={item} className="flex items-baseline gap-2.5">
                      <span className="font-mono text-xs text-[#1D4ED8]" aria-hidden="true">
                        —
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8 flex flex-col gap-4 border-t border-slate-200 pt-5 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-xs font-semibold text-[#0A0A0A]">{service.outcomeMetric}</p>
                <div className="flex flex-col gap-2.5 sm:flex-row sm:flex-wrap sm:items-center sm:gap-3">
                  {service.secondaryLink && (
                    <a
                      href={service.secondaryLink.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-[44px] w-full items-center justify-center whitespace-nowrap shrink-0 rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-[#0A0A0A] transition-colors duration-150 hover:border-[#1D4ED8] hover:text-[#1D4ED8] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1D4ED8] sm:w-auto"
                    >
                      {service.secondaryLink.label}
                    </a>
                  )}
                  <button
                    type="button"
                    onClick={() => onSelectServiceForChat(service.id)}
                    className="min-h-[44px] w-full whitespace-nowrap shrink-0 rounded-lg bg-[#1D4ED8] px-4 py-2.5 text-center text-sm font-semibold text-white transition-colors duration-150 hover:bg-[#1E40AF] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0A0A0A] cursor-pointer sm:w-auto"
                  >
                    {service.ctaLabel}
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
