import assert from 'node:assert/strict';
import test from 'node:test';
import {
  buildWhatsAppUrl,
  createInitialSchedulingState,
  formatWhatsAppMessage,
  schedulingReducer,
  validateDetails,
} from './scheduling.ts';

test('validateDetails rejeita nome curto e descrição vazia', () => {
  const errors = validateDetails({clientName: 'A', notes: 'curto'});
  assert.ok(errors.clientName);
  assert.ok(errors.notes);
});

test('validateDetails aceita nome e descrição válidos', () => {
  const errors = validateDetails({
    clientName: 'Mariana Costa',
    notes: 'Preciso de um site institucional rápido para meu escritório.',
  });
  assert.deepEqual(errors, {});
});

test('schedulingReducer inicia em profile quando serviço vem pré-selecionado', () => {
  const initial = createInitialSchedulingState('hardware-consulting');
  assert.equal(initial.step, 'profile');
  assert.equal(initial.data.serviceId, 'hardware-consulting');
});

test('schedulingReducer percorre fluxo completo até resumo com validação', () => {
  let state = createInitialSchedulingState();
  assert.equal(state.step, 'service');

  state = schedulingReducer(state, {type: 'SELECT_SERVICE', serviceId: 'web-systems'});
  assert.equal(state.step, 'profile');

  state = schedulingReducer(state, {type: 'SELECT_PROFILE', profile: 'PJ'});
  assert.equal(state.step, 'mode');

  state = schedulingReducer(state, {type: 'SELECT_MODE', mode: 'remote'});
  assert.equal(state.step, 'details');

  state = schedulingReducer(state, {type: 'SUBMIT_DETAILS'});
  assert.equal(state.step, 'details');
  assert.ok(state.errors.clientName);

  state = schedulingReducer(state, {
    type: 'UPDATE_DETAILS',
    field: 'clientName',
    value: 'Empresa Alpha Ltda',
  });
  state = schedulingReducer(state, {
    type: 'UPDATE_DETAILS',
    field: 'notes',
    value: 'Novo site institucional com foco em orçamento.',
  });
  state = schedulingReducer(state, {type: 'SUBMIT_DETAILS'});

  assert.equal(state.step, 'summary');
  assert.deepEqual(state.errors, {});
});

test('schedulingReducer permite voltar etapas sem perder dados anteriores', () => {
  let state = createInitialSchedulingState();
  state = schedulingReducer(state, {type: 'SELECT_SERVICE', serviceId: 'pc-support'});
  state = schedulingReducer(state, {type: 'SELECT_PROFILE', profile: 'PF'});
  state = schedulingReducer(state, {type: 'GO_BACK'});

  assert.equal(state.step, 'profile');
  assert.equal(state.data.serviceId, 'pc-support');
});

test('formatWhatsAppMessage e buildWhatsAppUrl geram texto limpo e link válido sem emojis', () => {
  const data = {
    serviceId: 'pc-support' as const,
    profile: 'PF' as const,
    mode: 'onsite' as const,
    clientName: 'Carlos Eduardo',
    preferredWindow: 'afternoon' as const,
    notes: 'Notebook aquecendo e reiniciando durante reuniões.',
  };

  const message = formatWhatsAppMessage(data);
  assert.match(message, /Rodrigo Soluções Digitais/);
  assert.match(message, /Carlos Eduardo/);
  assert.match(message, /Suporte Técnico para Computadores/);
  assert.match(message, /Pessoa Física \(PF\)/);
  assert.match(message, /Suporte Presencial \(Local\)/);

  const url = buildWhatsAppUrl(data, '+55 (11) 98888-7777');
  assert.ok(url.startsWith('https://wa.me/5511988887777?text='));
  assert.ok(decodeURIComponent(url).includes('Carlos Eduardo'));
});
