import { i18n } from '@/i18n.config';
import { match } from '@formatjs/intl-localematcher';
import Negotiator from 'negotiator';
import type { NextRequest } from 'next/server';

export const getLocale = (request: NextRequest): string | undefined => {
  const negotiatorHeaders: Record<string, string> = {};
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const locales: string[] = i18n.locales;
  const languages = new Negotiator({ headers: negotiatorHeaders }).languages();

  const locale = match(languages, locales, i18n.defaultLocale);
  return locale;
};
