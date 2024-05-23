import { Locale } from '@/i18n.config';

export const removeLanguagePrefix = (url: string) => {
  return url.replace(/^\/(bn|en)/, '');
};

export const getLanguageFromURL = (url: string): Locale => {
  const regex = /^\/(en|bn)(\/|$)/;
  const match = url.match(regex);

  if (match) {
    return match[1] as Locale;
  } else {
    return 'en';
  }
};
