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

export const generateNextUrl = (
  nextUrl: string,
  searchParams: FormData | any,
  type?: 'page' | 'component',
) => {
  if (type === 'page') {
    if (searchParams.next) {
      nextUrl += `?next=${removeLanguagePrefix(searchParams.next)}`;
    }
    if (searchParams.id) {
      nextUrl += `&id=${searchParams.id}`;
    }
    if (searchParams.qty) {
      nextUrl += `&qty=${searchParams.qty}`;
    }
    if (searchParams.size) {
      nextUrl += `&size=${searchParams.size}`;
    }
    if (searchParams.color) {
      nextUrl += `&color=${searchParams.color}`;
    }
  } else {
    if (searchParams.get('next')) {
      nextUrl += `?next=${removeLanguagePrefix(searchParams.get('next') as string)}`;
    }
    if (searchParams.get('id')) {
      nextUrl += `&id=${searchParams.get('id')}`;
    }
    if (searchParams.get('qty')) {
      nextUrl += `&qty=${searchParams.get('qty')}`;
    }
    if (searchParams.get('size')) {
      nextUrl += `&size=${searchParams.get('size')}`;
    }
    if (searchParams.get('color')) {
      nextUrl += `&color=${searchParams.get('color')}`;
    }
  }

  return nextUrl;
};

export const getQueryParams = (url: string): Record<string, string> => {
  const params: Record<string, string> = {};

  const queryString = url?.split('?')[1];
  const pairs = queryString?.split('&');

  pairs?.forEach((pair) => {
    const [key, value] = pair.split('=');
    params[key] = decodeURIComponent(value);
  });

  return params;
};

export const generateRedirectUrlAfterLogin = (paramsUrl: string) => {
  const { next, id, qty, size, color } = getQueryParams(paramsUrl) || {};

  let url = next;
  if (id) {
    url += `?id=${id}`;
  }
  if (qty) {
    url += `&qty=${qty}`;
  }
  if (size) {
    url += `&size=${size}`;
  }
  if (color) {
    url += `&color=${color}`;
  }

  return url;
};
