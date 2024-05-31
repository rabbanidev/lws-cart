import Image from 'next/image';
import { FaRegHeart } from 'react-icons/fa';
import { FaShoppingBag } from 'react-icons/fa';
import { FaRegUser } from 'react-icons/fa';
import type { Locale } from '@/i18n.config';
import LwsLink from './LwsLink';
import { getDictionary } from '../../../lib/dictionaries';
import { getWishlistItemsAction } from '@/actions/wishlist';
import { getFromCartsAction } from '@/actions/cart';
import SearchBar from './SearchBar';
import { Suspense } from 'react';

type Props = {
  lang: Locale;
};

export default async function TopNavbar({ lang }: Props) {
  const dict = await getDictionary(lang);
  const wishlist = await getWishlistItemsAction();

  const carts = await getFromCartsAction();

  const totalQuantity =
    carts.items &&
    carts.items.length > 0 &&
    carts.items.reduce(function (acc, curr) {
      return acc + curr.quantity;
    }, 0);

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

        <Suspense>
          <SearchBar lang={lang} title={dict.topNavbar.search} />
        </Suspense>

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
              {wishlist?.items?.length || 0}
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
              {totalQuantity || 0}
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
