import LwsLink from '@/components/shared/LwsLink';
import { Locale } from '@/i18n.config';
import { headers } from 'next/headers';
import { FaRegAddressBook, FaRegUser } from 'react-icons/fa';
import { Dictionary } from '../../../../../types/index';
import { getDictionary } from '../../../../../lib/dictionaries';

export default async function UserDashboardLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { lang: Locale };
}>) {
  const headerList = headers();
  const currentPathname = headerList.get('pathname-name');
  const dict: Dictionary = await getDictionary(params.lang);

  return (
    <div className="container gap-6 pb-16 pt-8">
      <div className="grid grid-cols-1 lg:grid-cols-12">
        <div className="col-span-1 lg:col-span-2">
          <div className="w-full pr-5">
            <LwsLink
              lang={params.lang}
              href="/account"
              className={`mb-2 flex items-center rounded px-6 py-3 transition hover:bg-gray-200 ${currentPathname === '/account' ? 'bg-gray-200' : ''}`}
            >
              <FaRegUser />
              <span className="ml-2 text-base font-medium text-gray-600">
                {dict.account.title}
              </span>
            </LwsLink>
            <LwsLink
              lang={params.lang}
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
        <div className="col-span-1 mt-8 border-l border-gray-200 lg:col-span-10 lg:mt-0 lg:px-5">
          {children}
        </div>
      </div>
    </div>
  );
}
