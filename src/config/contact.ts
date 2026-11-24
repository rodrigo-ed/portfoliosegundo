const DEFAULT_WHATSAPP_NUMBER = '5511999999999';
const DEFAULT_SITE_URL = 'https://rodrigosolucoesdigitais.com.br';

export const HARDWARE_OFFERS_GROUP_URL =
  'https://chat.whatsapp.com/Kl0YUcKdSqrDGfBazRgmcQ?s=sh&p=a&iam=2&utm_source=ig&utm_medium=social&utm_content=link_in_bio&fbclid=PAZXh0bgNhZW0CMTEAcGRvZgJzcnRjBmFwcF9pZA85MzY2MTk3NDMzOTI0NTkAAadrfFIsoirKOyOC3RGx6xM-YrPXtw2D7RdRnCinz-ZpALKBiYwOtVJmL94xkQ_aem_BZBcykdkTQMckCY6nj962w';

export function sanitizePhoneDigits(raw: string | undefined): string {
  const digits = (raw ?? '').replace(/\D/g, '');
  return digits.length >= 10 ? digits : DEFAULT_WHATSAPP_NUMBER;
}

export function resolveWhatsAppNumber(envValue?: string): string {
  if (envValue !== undefined) {
    return sanitizePhoneDigits(envValue);
  }
  const metaEnv = (import.meta as unknown as {env?: Record<string, string | undefined>}).env;
  return sanitizePhoneDigits(metaEnv?.VITE_WHATSAPP_NUMBER);
}

export function resolveSiteUrl(envValue?: string): string {
  const raw =
    envValue ??
    (import.meta as unknown as {env?: Record<string, string | undefined>}).env?.VITE_SITE_URL;
  if (!raw) {
    return DEFAULT_SITE_URL;
  }
  const trimmed = raw.trim().replace(/\/+$/, '');
  return trimmed.startsWith('http') ? trimmed : DEFAULT_SITE_URL;
}
