import assert from 'node:assert/strict';
import test from 'node:test';
import {resolveSiteUrl, resolveWhatsAppNumber, sanitizePhoneDigits} from './contact.ts';

test('sanitizePhoneDigits remove caracteres não numéricos e aplica fallback seguro', () => {
  assert.equal(sanitizePhoneDigits('+55 (11) 91234-5678'), '5511912345678');
  assert.equal(sanitizePhoneDigits('123'), '5511999999999');
  assert.equal(sanitizePhoneDigits(undefined), '5511999999999');
});

test('resolveWhatsAppNumber prioriza valor configurado', () => {
  assert.equal(resolveWhatsAppNumber('5521987654321'), '5521987654321');
});

test('resolveSiteUrl remove barra final e valida protocolo http/https', () => {
  assert.equal(
    resolveSiteUrl('https://rodrigosolucoesdigitais.com.br/'),
    'https://rodrigosolucoesdigitais.com.br',
  );
  assert.equal(resolveSiteUrl('invalido'), 'https://rodrigosolucoesdigitais.com.br');
});
