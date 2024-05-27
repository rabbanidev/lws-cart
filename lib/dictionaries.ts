import 'server-only';

import type { Locale } from '@/i18n.config';
import { Dictionaries } from '../types/index';

const dictionaries: Dictionaries = {
  en: () => import('../dictionaries/en.json').then((module) => module.default),
  bn: () => import('../dictionaries/bn.json').then((module) => module.default),
};

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export const getDictionary = async (locale: Locale): Promise<Dictionary> =>
  dictionaries[locale]();
