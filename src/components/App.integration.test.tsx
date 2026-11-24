import assert from 'node:assert/strict';
import test from 'node:test';
import {renderToStaticMarkup} from 'react-dom/server';
import App from '../App.tsx';
import {
  createInitialSchedulingState,
  schedulingReducer,
} from '../domain/scheduling.ts';
import {ChatStepContent} from './ChatStepContent.tsx';
import {SchedulingChat} from './SchedulingChat.tsx';

test('App renderiza estrutura semântica completa sem emojis nem SVGs decorativos', () => {
  const html = renderToStaticMarkup(<App />);

  assert.match(html, /Rodrigo Soluções Digitais/);
  assert.match(html, /text-\[#1D4ED8\][^>]*>Rodrigo Soluções Digitais/);
  assert.match(html, /Compromisso Técnico/);
  assert.match(html, /Criamos páginas leves para 4G/);
  assert.match(html, /Criação de Sites e Sistemas Web/);
  assert.match(html, /Suporte Técnico para Computadores/);
  assert.match(html, /Instalação de SO \+ Configuração Inicial/);
  assert.match(html, /Formatação de Computadores \(com Backup\)/);
  assert.match(html, /Limpeza Interna Preventiva/);
  assert.match(html, /Troca de Peças/);
  assert.match(html, /Instalação de Sistemas \/ Programas/);
  assert.match(html, /Consultoria para Aquisição de Computadores/);
  assert.match(html, /Entrar no Grupo de Produtos/);
  assert.match(html, /https:\/\/chat\.whatsapp\.com\/Kl0YUcKdSqrDGfBazRgmcQ/);
  assert.match(html, /Ir para o conteúdo principal/);
  assert.match(html, /Chat de Agendamento/);

  // Nenhum ícone SVG ou emoji deve estar presente no layout final
  assert.equal(/<svg[\s>]/i.test(html), false);
  assert.equal(/[\u{1F300}-\u{1FAFF}]/u.test(html), false);
});

test('SchedulingChat aberto renderiza diálogo acessível com etapas', () => {
  const html = renderToStaticMarkup(
    <SchedulingChat
      isOpen={true}
      preselectedService="web-systems"
      onOpen={() => {}}
      onClose={() => {}}
    />,
  );

  assert.match(html, /role="dialog"/);
  assert.match(html, /aria-modal="true"/);
  assert.match(html, /Agendamento Imediato/);
  assert.match(html, /Criação de Sites e Sistemas Web/);
  assert.match(html, /Pessoa Física \(PF\)/);
  assert.match(html, /Empresa \(PJ\)/);
});

test('ChatStepContent no passo final exibe resumo e link válido do WhatsApp', () => {
  let state = createInitialSchedulingState('hardware-consulting');
  state = schedulingReducer(state, {type: 'SELECT_PROFILE', profile: 'PJ'});
  state = schedulingReducer(state, {type: 'SELECT_MODE', mode: 'remote'});
  state = schedulingReducer(state, {
    type: 'UPDATE_DETAILS',
    field: 'clientName',
    value: 'Escritório Modelo',
  });
  state = schedulingReducer(state, {
    type: 'UPDATE_DETAILS',
    field: 'notes',
    value: 'Compra de 6 notebooks para equipe contábil.',
  });
  state = schedulingReducer(state, {type: 'SUBMIT_DETAILS'});

  const html = renderToStaticMarkup(
    <ChatStepContent
      state={state}
      dispatch={() => {}}
      whatsappNumber="5511999999999"
      copied={false}
      onCopySummary={() => {}}
    />,
  );

  assert.match(html, /https:\/\/wa\.me\/5511999999999\?text=/);
  assert.match(html, /Enviar Agendamento no WhatsApp/);
  assert.match(html, /Escritório Modelo/);
  assert.match(html, /Consultoria para Aquisição de Computadores/);
});
