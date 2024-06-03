import { Locale } from '@/i18n.config';
import Image from 'next/image';
import { Dictionary } from '../../../types/index';
import { getDictionary } from '../../../lib/dictionaries';
import LwsLink from './LwsLink';

export default async function Footer({ lang }: { lang: Locale }) {
  const dict: Dictionary = await getDictionary(lang);

  return (
    <footer className="border-t border-gray-100 bg-white pb-12 pt-16">
      <div className="container grid grid-cols-1">
        <div className="sm:flex sm:items-center sm:justify-between">
          <LwsLink
            lang={lang}
            href="/"
            className="mb-4 flex items-center space-x-3 sm:mb-0"
          >
            <Image
              src="/logo.svg"
              alt="LWS-Cart"
              className="w-48"
              width={100}
              height={40}
            />
          </LwsLink>
          <ul className="mb-6 flex flex-wrap items-center text-base font-medium text-gray-600 sm:mb-0">
            <li>
              <LwsLink
                lang={lang}
                href="/shop"
                className="me-4 hover:underline md:me-6"
              >
                {dict.shop.title}
              </LwsLink>
            </li>
            <li>
              <LwsLink
                lang={lang}
                href="/login"
                className="me-4 hover:underline md:me-6"
              >
                {dict.auth.login.title}
              </LwsLink>
            </li>
            <li>
              <LwsLink
                lang={lang}
                href="/register"
                className="me-4 hover:underline md:me-6"
              >
                {dict.auth.register.title}
              </LwsLink>
            </li>
          </ul>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto lg:my-8 dark:border-gray-700" />
        <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">
          © 2024{' '}
          <a href="/" className="hover:underline">
            LWSKart
          </a>
          . All Rights Reserved.
        </span>
      </div>
    </footer>
  );
}
