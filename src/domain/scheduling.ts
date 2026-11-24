import {sanitizePhoneDigits} from '../config/contact.ts';

export type ServiceId = 'web-systems' | 'pc-support' | 'hardware-consulting';
export type AudienceProfile = 'PF' | 'PJ';
export type AttendanceMode = 'remote' | 'onsite';
export type PreferredWindow = 'morning' | 'afternoon' | 'flexible';
export type SchedulingStep = 'service' | 'profile' | 'mode' | 'details' | 'summary';

export interface SchedulingFormData {
  serviceId: ServiceId | null;
  profile: AudienceProfile | null;
  mode: AttendanceMode | null;
  clientName: string;
  preferredWindow: PreferredWindow;
  notes: string;
}

export interface SchedulingErrors {
  clientName?: string;
  notes?: string;
}

export interface SchedulingState {
  step: SchedulingStep;
  data: SchedulingFormData;
  errors: SchedulingErrors;
}

export const SERVICE_LABELS: Record<ServiceId, string> = {
  'web-systems': 'Criação de Sites e Sistemas Web',
  'pc-support': 'Suporte Técnico para Computadores',
  'hardware-consulting': 'Consultoria para Aquisição de Computadores',
};

export const PROFILE_LABELS: Record<AudienceProfile, string> = {
  PF: 'Pessoa Física (PF)',
  PJ: 'Empresa (PJ)',
};

export const MODE_LABELS: Record<AttendanceMode, string> = {
  remote: 'Atendimento Remoto (Todo o Brasil)',
  onsite: 'Suporte Presencial (Local)',
};

export const WINDOW_LABELS: Record<PreferredWindow, string> = {
  morning: 'Manhã (08h às 12h)',
  afternoon: 'Tarde (13h às 18h)',
  flexible: 'Horário flexível',
};

const STEP_ORDER: SchedulingStep[] = ['service', 'profile', 'mode', 'details', 'summary'];

export function createInitialSchedulingState(preselectedService?: ServiceId | null): SchedulingState {
  return {
    step: preselectedService ? 'profile' : 'service',
    data: {
      serviceId: preselectedService ?? null,
      profile: null,
      mode: null,
      clientName: '',
      preferredWindow: 'morning',
      notes: '',
    },
    errors: {},
  };
}

export type SchedulingAction =
  | {type: 'SELECT_SERVICE'; serviceId: ServiceId}
  | {type: 'SELECT_PROFILE'; profile: AudienceProfile}
  | {type: 'SELECT_MODE'; mode: AttendanceMode}
  | {type: 'UPDATE_DETAILS'; field: 'clientName' | 'preferredWindow' | 'notes'; value: string}
  | {type: 'SUBMIT_DETAILS'}
  | {type: 'GO_BACK'}
  | {type: 'RESET'; preselectedService?: ServiceId | null};

export function validateDetails(data: Pick<SchedulingFormData, 'clientName' | 'notes'>): SchedulingErrors {
  const errors: SchedulingErrors = {};
  const trimmedName = data.clientName.trim();
  const trimmedNotes = data.notes.trim();

  if (trimmedName.length < 2) {
    errors.clientName = 'Informe seu nome completo ou nome da empresa (mínimo de 2 caracteres).';
  }
  if (trimmedNotes.length < 8) {
    errors.notes = 'Descreva brevemente sua necessidade (mínimo de 8 caracteres).';
  }
  return errors;
}

export function schedulingReducer(state: SchedulingState, action: SchedulingAction): SchedulingState {
  switch (action.type) {
    case 'SELECT_SERVICE':
      return {...state, step: 'profile', data: {...state.data, serviceId: action.serviceId}, errors: {}};
    case 'SELECT_PROFILE':
      return {...state, step: 'mode', data: {...state.data, profile: action.profile}, errors: {}};
    case 'SELECT_MODE':
      return {...state, step: 'details', data: {...state.data, mode: action.mode}, errors: {}};
    case 'UPDATE_DETAILS':
      return {
        ...state,
        data: {...state.data, [action.field]: action.value},
        errors: {...state.errors, [action.field]: undefined},
      };
    case 'SUBMIT_DETAILS': {
      const errors = validateDetails(state.data);
      if (Object.keys(errors).length > 0) {
        return {...state, errors};
      }
      return {...state, step: 'summary', errors: {}};
    }
    case 'GO_BACK': {
      const currentIndex = STEP_ORDER.indexOf(state.step);
      if (currentIndex <= 0) {
        return state;
      }
      return {...state, step: STEP_ORDER[currentIndex - 1], errors: {}};
    }
    case 'RESET':
      return createInitialSchedulingState(action.preselectedService);
    default:
      return state;
  }
}

export function formatWhatsAppMessage(data: SchedulingFormData): string {
  const service = data.serviceId ? SERVICE_LABELS[data.serviceId] : 'Não informado';
  const profile = data.profile ? PROFILE_LABELS[data.profile] : 'Não informado';
  const mode = data.mode ? MODE_LABELS[data.mode] : 'Não informado';
  const windowLabel = WINDOW_LABELS[data.preferredWindow];
  const name = data.clientName.trim() || 'Visitante';
  const notes = data.notes.trim() || 'Sem observações adicionais.';

  return [
    'Olá, Rodrigo. Gostaria de agendar um atendimento pela Rodrigo Soluções Digitais.',
    '',
    `Nome: ${name}`,
    `Serviço: ${service}`,
    `Perfil: ${profile}`,
    `Modalidade: ${mode}`,
    `Turno preferido: ${windowLabel}`,
    `Demanda: ${notes}`,
  ].join('\n');
}

export function buildWhatsAppUrl(data: SchedulingFormData, rawPhone?: string): string {
  const phone = sanitizePhoneDigits(rawPhone);
  const text = encodeURIComponent(formatWhatsAppMessage(data));
  return `https://wa.me/${phone}?text=${text}`;
}
