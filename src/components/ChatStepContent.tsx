import {
  MODE_LABELS,
  PROFILE_LABELS,
  SERVICE_LABELS,
  WINDOW_LABELS,
  buildWhatsAppUrl,
  formatWhatsAppMessage,
  type AttendanceMode,
  type AudienceProfile,
  type PreferredWindow,
  type SchedulingAction,
  type SchedulingState,
  type ServiceId,
} from '../domain/scheduling.ts';

interface ChatStepContentProps {
  state: SchedulingState;
  dispatch: (action: SchedulingAction) => void;
  whatsappNumber: string;
  copied: boolean;
  onCopySummary: (text: string) => void;
}

const SERVICE_OPTIONS: ServiceId[] = ['web-systems', 'pc-support', 'hardware-consulting'];
const PROFILE_OPTIONS: AudienceProfile[] = ['PJ', 'PF'];
const MODE_OPTIONS: AttendanceMode[] = ['remote', 'onsite'];
const WINDOW_OPTIONS: PreferredWindow[] = ['morning', 'afternoon', 'flexible'];

export function ChatStepContent({
  state,
  dispatch,
  whatsappNumber,
  copied,
  onCopySummary,
}: ChatStepContentProps) {
  const {step, data, errors} = state;

  if (step === 'service') {
    return (
      <div className="space-y-3">
        <p className="text-sm font-semibold text-[#0A0A0A]">
          Qual solução você precisa agendar hoje?
        </p>
        <div className="space-y-2">
          {SERVICE_OPTIONS.map((serviceId) => (
            <button
              key={serviceId}
              type="button"
              onClick={() => dispatch({type: 'SELECT_SERVICE', serviceId})}
              className="flex min-h-[44px] w-full items-center justify-between gap-3 rounded-lg border border-slate-200 bg-white px-4 py-3 text-left text-sm font-semibold text-[#0A0A0A] transition-colors duration-150 hover:border-[#1D4ED8] hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1D4ED8] cursor-pointer"
            >
              <span>{SERVICE_LABELS[serviceId]}</span>
              <span className="shrink-0 text-xs font-medium text-[#1D4ED8]">Selecionar</span>
            </button>
          ))}
        </div>
      </div>
    );
  }

  if (step === 'profile') {
    return (
      <div className="space-y-3">
        <p className="text-sm font-semibold text-[#0A0A0A]">O atendimento é para você ou empresa?</p>
        <div className="space-y-2">
          {PROFILE_OPTIONS.map((profile) => (
            <button
              key={profile}
              type="button"
              onClick={() => dispatch({type: 'SELECT_PROFILE', profile})}
              className="flex min-h-[44px] w-full items-center justify-between gap-3 rounded-lg border border-slate-200 bg-white px-4 py-3 text-left text-sm font-semibold text-[#0A0A0A] transition-colors duration-150 hover:border-[#1D4ED8] hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1D4ED8] cursor-pointer"
            >
              <span>{PROFILE_LABELS[profile]}</span>
              <span className="shrink-0 text-xs font-medium text-[#1D4ED8]">Selecionar</span>
            </button>
          ))}
        </div>
      </div>
    );
  }

  if (step === 'mode') {
    return (
      <div className="space-y-3">
        <p className="text-sm font-semibold text-[#0A0A0A]">Qual modalidade prefere?</p>
        <div className="space-y-2">
          {MODE_OPTIONS.map((mode) => (
            <button
              key={mode}
              type="button"
              onClick={() => dispatch({type: 'SELECT_MODE', mode})}
              className="flex min-h-[44px] w-full items-center justify-between gap-3 rounded-lg border border-slate-200 bg-white px-4 py-3 text-left text-sm font-semibold text-[#0A0A0A] transition-colors duration-150 hover:border-[#1D4ED8] hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1D4ED8] cursor-pointer"
            >
              <span>{MODE_LABELS[mode]}</span>
              <span className="shrink-0 text-xs font-medium text-[#1D4ED8]">Selecionar</span>
            </button>
          ))}
        </div>
      </div>
    );
  }

  if (step === 'details') {
    return (
      <form
        noValidate
        onSubmit={(event) => {
          event.preventDefault();
          dispatch({type: 'SUBMIT_DETAILS'});
        }}
        className="space-y-4"
      >
        <div>
          <label htmlFor="chat-client-name" className="block text-xs font-semibold text-[#0A0A0A]">
            Seu nome ou empresa
          </label>
          <input
            id="chat-client-name"
            type="text"
            value={data.clientName}
            onChange={(event) =>
              dispatch({type: 'UPDATE_DETAILS', field: 'clientName', value: event.target.value})
            }
            placeholder="Ex.: Mariana Silva ou Clínica Horizonte"
            className="mt-1.5 min-h-[44px] w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-base text-[#0A0A0A] placeholder:text-slate-400 focus:border-[#1D4ED8] focus:outline-none sm:text-sm"
          />
          {errors.clientName && (
            <p role="alert" className="mt-1 text-xs font-medium text-red-700">
              {errors.clientName}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="chat-window" className="block text-xs font-semibold text-[#0A0A0A]">
            Melhor turno para contato
          </label>
          <select
            id="chat-window"
            value={data.preferredWindow}
            onChange={(event) =>
              dispatch({
                type: 'UPDATE_DETAILS',
                field: 'preferredWindow',
                value: event.target.value,
              })
            }
            className="mt-1.5 min-h-[44px] w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-base text-[#0A0A0A] focus:border-[#1D4ED8] focus:outline-none sm:text-sm"
          >
            {WINDOW_OPTIONS.map((windowKey) => (
              <option key={windowKey} value={windowKey}>
                {WINDOW_LABELS[windowKey]}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="chat-notes" className="block text-xs font-semibold text-[#0A0A0A]">
            Resumo da necessidade
          </label>
          <textarea
            id="chat-notes"
            rows={3}
            value={data.notes}
            onChange={(event) =>
              dispatch({type: 'UPDATE_DETAILS', field: 'notes', value: event.target.value})
            }
            placeholder="Descreva o site/sistema, problema no computador ou objetivo de compra."
            className="mt-1.5 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-base text-[#0A0A0A] placeholder:text-slate-400 focus:border-[#1D4ED8] focus:outline-none sm:text-sm"
          />
          {errors.notes && (
            <p role="alert" className="mt-1 text-xs font-medium text-red-700">
              {errors.notes}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="min-h-[44px] w-full rounded-lg bg-[#1D4ED8] px-4 py-2.5 text-sm font-semibold text-white transition-colors duration-150 hover:bg-[#1E40AF] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0A0A0A] cursor-pointer"
        >
          Gerar Resumo para WhatsApp
        </button>
      </form>
    );
  }

  const summaryText = formatWhatsAppMessage(data);
  const whatsappUrl = buildWhatsAppUrl(data, whatsappNumber);

  return (
    <div className="space-y-4">
      <p className="text-sm font-semibold text-[#0A0A0A]">
        Solicitação pronta para envio imediato
      </p>
      <div className="rounded-lg border border-slate-200 bg-slate-50 p-3.5 text-xs leading-relaxed text-slate-700 whitespace-pre-line">
        {summaryText}
      </div>

      <div className="space-y-2">
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex min-h-[44px] w-full items-center justify-center rounded-lg bg-[#1D4ED8] px-4 py-3 text-sm font-semibold text-white transition-colors duration-150 hover:bg-[#1E40AF] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0A0A0A]"
        >
          Enviar Agendamento no WhatsApp
        </a>
        <button
          type="button"
          onClick={() => onCopySummary(summaryText)}
          className="min-h-[44px] w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-xs font-semibold text-[#0A0A0A] transition-colors duration-150 hover:border-[#0A0A0A] hover:bg-slate-50 cursor-pointer"
        >
          {copied ? 'Resumo copiado com sucesso' : 'Copiar resumo da solicitação'}
        </button>
      </div>
    </div>
  );
}
