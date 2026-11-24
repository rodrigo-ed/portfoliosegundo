import assert from 'node:assert/strict';
import test from 'node:test';
import {
  CASE_OUTCOMES,
  FAQ_ITEMS,
  HERO_STRIP_METRICS,
  PROCESS_STEPS,
  SERVICES,
  filterServicesByAudience,
} from './portfolioContent.ts';

test('catálogo mantém os 3 serviços centrais e métricas esperadas', () => {
  assert.equal(SERVICES.length, 3);
  assert.equal(HERO_STRIP_METRICS.length, 4);
  assert.equal(CASE_OUTCOMES.length, 3);
  assert.equal(PROCESS_STEPS.length, 3);
  assert.ok(FAQ_ITEMS.length >= 4);
});

test('filterServicesByAudience retorna serviços compatíveis com ALL, PF e PJ', () => {
  assert.equal(filterServicesByAudience(SERVICES, 'ALL').length, 3);
  assert.equal(filterServicesByAudience(SERVICES, 'PF').length, 3);
  assert.equal(filterServicesByAudience(SERVICES, 'PJ').length, 3);
});

test('nenhum texto de catálogo contém emojis', () => {
  const emojiRegex = /[\u{1F300}-\u{1FAFF}]/u;
  const serialized = JSON.stringify({SERVICES, CASE_OUTCOMES, PROCESS_STEPS, FAQ_ITEMS});
  assert.equal(emojiRegex.test(serialized), false);
});

test('suporte técnico lista os 6 serviços exatos e consultoria inclui link do grupo de produtos', () => {
  const support = SERVICES.find((item) => item.id === 'pc-support');
  assert.ok(support);
  assert.deepEqual(support.deliverables, [
    'Instalação de SO + Configuração Inicial',
    'Formatação de Computadores (com Backup)',
    'Configuração Inicial',
    'Limpeza Interna Preventiva',
    'Troca de Peças',
    'Instalação de Sistemas / Programas',
  ]);

  const consulting = SERVICES.find((item) => item.id === 'hardware-consulting');
  assert.ok(consulting?.secondaryLink);
  assert.match(consulting.secondaryLink.href, /^https:\/\/chat\.whatsapp\.com\/Kl0YUcKdSqrDGfBazRgmcQ/);
});
