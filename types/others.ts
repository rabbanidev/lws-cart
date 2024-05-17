/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { Locale } from '@/i18n.config';

export type NavbarItem = { text: string; path: string };

export type Dictionary = {
  [key: string]: any;
};

export type Dictionaries = {
  [locale in Locale]: () => Promise<Dictionary>;
};
