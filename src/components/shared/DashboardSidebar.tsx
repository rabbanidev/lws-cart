'use client';

import { Locale } from '@/i18n.config';
import LwsLink from './LwsLink';
import { Dictionary } from '../../../types/index';
import { FaRegAddressBook, FaRegUser } from 'react-icons/fa';
import { usePathname } from 'next/navigation';
import { removeLanguagePrefix } from '../../../utils/url';

export default function DashboardSidebar({
  lang,
  dict,
}: {
  lang: Locale;
  dict: Dictionary;
}) {
  const pathname = usePathname();
  const currentPathname = removeLanguagePrefix(pathname);

  return (
    <div className="col-span-1 lg:col-span-2">
      <div className="w-full pr-5">
        <LwsLink
          lang={lang}
          href="/account"
          className={`mb-2 flex items-center rounded px-6 py-3 transition hover:bg-gray-200 ${currentPathname === '/account' ? 'bg-gray-200' : ''}`}
        >
          <FaRegUser />
          <span className="ml-2 text-base font-medium text-gray-600">
            {dict.account.title}
          </span>
        </LwsLink>
        <LwsLink
          lang={lang}
          href="/address"
          className={`mb-2 flex items-center rounded px-6 py-3 transition hover:bg-gray-200 ${currentPathname === '/address' ? 'bg-gray-200' : ''}`}
        >
          <FaRegAddressBook />
          <span className="ml-2 text-base font-medium text-gray-600">
            {dict.address.title}
          </span>
        </LwsLink>
      </div>
    </div>
  );
}
