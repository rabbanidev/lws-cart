/* eslint-disable @typescript-eslint/no-explicit-any */
import Link from 'next/link';
import { ReactNode } from 'react';
import type { Locale } from '@/i18n.config';

type Props = {
  children: ReactNode;
  lang: Locale;
  href: string;
  [key: string]: any;
};

export default function LwsLink({ children, lang, href, ...rest }: Props) {
  return (
    <Link href={`/${lang}${href}`} {...rest}>
      {children}
    </Link>
  );
}
