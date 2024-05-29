/* eslint-disable @typescript-eslint/no-explicit-any */

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

export const redirectUrl = (
  prevPath: string,
  searchParams: FormData | any,
  type?: 'page' | 'component',
) => {
  if (type === 'page') {
    if (searchParams.id) {
      prevPath += `&id=${searchParams.id}`;
    }
    if (searchParams.qty) {
      prevPath += `&qty=${searchParams.qty}`;
    }
    if (searchParams.size) {
      prevPath += `&size=${searchParams.size}`;
    }
    if (searchParams.color) {
      prevPath += `&color=${searchParams.color}`;
    }
  } else {
    if (searchParams.get('id')) {
      prevPath += `?id=${searchParams.get('id')}`;
    }
    if (searchParams.get('qty')) {
      prevPath += `&qty=${searchParams.get('qty')}`;
    }
    if (searchParams.get('size')) {
      prevPath += `&size=${searchParams.get('size')}`;
    }
    if (searchParams.get('color')) {
      prevPath += `&color=${searchParams.get('color')}`;
    }
  }

  return prevPath;
};
