import {useEffect, useReducer, useState} from 'react';
import {resolveWhatsAppNumber} from '../config/contact.ts';
import {
  SERVICE_LABELS,
  createInitialSchedulingState,
  schedulingReducer,
  type SchedulingStep,
  type ServiceId,
} from '../domain/scheduling.ts';
import {ChatStepContent} from './ChatStepContent.tsx';

interface SchedulingChatProps {
  isOpen: boolean;
  preselectedService: ServiceId | null;
  onOpen: () => void;
  onClose: () => void;
}

const STEP_TITLES: Record<SchedulingStep, string> = {
  service: 'Etapa 1 de 4 · Escolha o serviço',
  profile: 'Etapa 2 de 4 · Perfil de atendimento',
  mode: 'Etapa 3 de 4 · Modalidade',
  details: 'Etapa 4 de 4 · Dados de contato',
  summary: 'Pronto para enviar ao WhatsApp',
};

export function SchedulingChat({
  isOpen,
  preselectedService,
  onOpen,
  onClose,
}: SchedulingChatProps) {
  const [state, dispatch] = useReducer(
    schedulingReducer,
    preselectedService,
    createInitialSchedulingState,
  );
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (isOpen) {
      dispatch({type: 'RESET', preselectedService});
      setCopied(false);
    }
  }, [isOpen, preselectedService]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const handleCopySummary = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  };

  if (!isOpen) {
    return (
      <div className="fixed right-4 bottom-4 z-40">
        <button
          type="button"
          onClick={onOpen}
          className="min-h-[44px] whitespace-nowrap shrink-0 rounded-lg bg-[#0A0A0A] px-5 py-2.5 text-sm font-semibold text-white shadow-md transition-colors duration-150 hover:bg-[#1D4ED8] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1D4ED8] cursor-pointer"
        >
          Chat de Agendamento
        </button>
      </div>
    );
  }

  const whatsappNumber = resolveWhatsAppNumber();

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="scheduling-chat-title"
      className="fixed inset-x-3 bottom-3 z-50 mx-auto max-w-md overflow-hidden rounded-xl border border-slate-300 bg-white shadow-xl sm:inset-x-auto sm:right-6 sm:bottom-6 sm:w-full"
    >
      <div className="flex items-center justify-between gap-4 border-b border-slate-800 bg-[#0A0A0A] px-4 py-3.5 text-white sm:px-5 sm:py-4">
        <div>
          <h2 id="scheduling-chat-title" className="font-display text-base font-bold text-white">
            Agendamento Imediato
          </h2>
          <p className="mt-0.5 text-xs text-slate-300">{STEP_TITLES[state.step]}</p>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="min-h-[40px] whitespace-nowrap shrink-0 rounded-md border border-slate-700 px-3 py-1.5 text-xs font-semibold text-white transition-colors duration-150 hover:border-white cursor-pointer"
        >
          Fechar
        </button>
      </div>

      <div className="max-h-[72dvh] overflow-y-auto p-4 sm:max-h-[75vh] sm:p-5">
        {state.data.serviceId && state.step !== 'service' && (
          <p className="mb-4 border-b border-slate-200 pb-3 text-xs text-slate-600">
            Serviço selecionado:{' '}
            <span className="font-semibold text-[#0A0A0A]">
              {SERVICE_LABELS[state.data.serviceId]}
            </span>
          </p>
        )}

        <ChatStepContent
          state={state}
          dispatch={dispatch}
          whatsappNumber={whatsappNumber}
          copied={copied}
          onCopySummary={handleCopySummary}
        />

        {state.step !== 'service' && (
          <div className="mt-4 flex items-center justify-between border-t border-slate-200 pt-3">
            <button
              type="button"
              onClick={() => dispatch({type: 'GO_BACK'})}
              className="min-h-[40px] text-xs font-semibold text-slate-600 hover:text-[#0A0A0A] hover:underline cursor-pointer"
            >
              Voltar etapa anterior
            </button>

            <button
              type="button"
              onClick={() => {
                dispatch({type: 'RESET', preselectedService: null});
                setCopied(false);
              }}
              className="min-h-[40px] text-xs font-semibold text-slate-600 hover:text-[#1D4ED8] hover:underline cursor-pointer"
            >
              Recomeçar triagem
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
