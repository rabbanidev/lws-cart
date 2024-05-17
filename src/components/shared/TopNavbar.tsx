import Image from 'next/image';
import { IoSearch } from 'react-icons/io5';
import { FaRegHeart } from 'react-icons/fa';
import { FaShoppingBag } from 'react-icons/fa';
import { FaRegUser } from 'react-icons/fa';
import type { Locale } from '@/i18n.config';
import LwsLink from './LwsLink';
import { getDictionary } from '../../../lib/dictionaries';

type Props = {
  lang: Locale;
};

export default async function TopNavbar({ lang }: Props) {
  const dict = await getDictionary(lang);

  return (
    <header className="bg-white py-4 shadow-sm">
      <div className="container flex items-center justify-between">
        <LwsLink lang={lang} href="/">
          <Image
            src="/logo.svg"
            alt="LWS-Cart"
            className="w-32"
            width={128}
            height={40}
          />
        </LwsLink>

        <div className="relative flex w-full max-w-xl md:mx-5 lg:mx-0">
          <span className="absolute left-4 top-3.5 hidden text-lg text-gray-400 md:block">
            <IoSearch size={20} />
          </span>
          <input
            type="text"
            name="search"
            id="search"
            className="hidden w-full rounded-l-md border border-r-0 border-primary py-3 pl-12 pr-3 focus:outline-none md:flex"
            placeholder={dict.topNavbar.search}
          />
          <button className="hidden rounded-r-md border  border-primary bg-primary px-8 text-white transition hover:bg-transparent hover:text-primary md:block">
            {dict.topNavbar.search}
          </button>
        </div>

        <div className="flex items-center space-x-4">
          <LwsLink
            lang={lang}
            href="/wishlist"
            className="relative text-center text-gray-700 transition hover:text-primary"
          >
            <div className="flex justify-center text-2xl">
              <FaRegHeart />
            </div>
            <div className="mt-1 text-xs leading-3">
              {dict.topNavbar.wishlist}
            </div>
            <div className="absolute -top-2 right-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-white">
              8
            </div>
          </LwsLink>
          <LwsLink
            lang={lang}
            href="/cart"
            className="relative text-center text-gray-700 transition hover:text-primary"
          >
            <div className="text-2xl">
              <FaShoppingBag />
            </div>
            <div className="mt-1 text-xs leading-3">{dict.topNavbar.cart}</div>
            <div className="absolute -right-3 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-white">
              2
            </div>
          </LwsLink>
          <LwsLink
            lang={lang}
            href="/account"
            className="relative flex flex-col items-center text-center text-gray-700 transition hover:text-primary"
          >
            <div className="text-2xl">
              <FaRegUser />
            </div>
            <div className="mt-1 text-xs leading-3">
              {dict.topNavbar.account}
            </div>
          </LwsLink>
        </div>
      </div>
    </header>
  );
}
