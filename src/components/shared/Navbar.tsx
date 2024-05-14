import Image from 'next/image';
import { IoMenuOutline } from 'react-icons/io5';
import { categories, navbarItems } from '../../../constants';
import { Locale } from '@/i18n.config';
import { getDictionary } from '../../../lib/dictionaries';
import type { Category, NavbarItem } from '../../../types';
import LwsLink from './LwsLink';

type Props = {
  lang: Locale;
};

export default async function Navbar({ lang }: Props) {
  const { navbar, category } = await getDictionary(lang);

  const langNavbarItems: NavbarItem[] = navbarItems.map((nav, index) => ({
    ...nav,
    text: navbar.items[index],
  }));

  const langCategoryItems: Category[] = categories.map((cate, index) => ({
    ...cate,
    label: category.categoryItems[index],
  }));

  return (
    <nav className="bg-gray-800">
      <div className="container flex">
        <div className="group relative hidden cursor-pointer items-center bg-primary px-8 py-4 md:flex">
          <span className="text-white">
            <IoMenuOutline size={24} />
          </span>
          <span className="ml-2 capitalize text-white">
            {category.allCategory}
          </span>

          {/*  dropdown */}
          <div className="invisible absolute left-0 top-full w-[300px] divide-y divide-dashed divide-gray-300 bg-white py-3 opacity-0 shadow-md transition duration-300 group-hover:visible group-hover:opacity-100">
            {langCategoryItems.map((category) => (
              <LwsLink
                key={category.id}
                lang={lang}
                href={`/categories/${category.value}`}
                className="flex items-center px-6 py-3 transition hover:bg-gray-100"
              >
                <Image
                  src={`/icons/${category.icon}`}
                  alt={category.value}
                  className="h-5 w-5 object-contain"
                  width={20}
                  height={20}
                />
                <span className="ml-6 text-sm text-gray-600">
                  {category.label}
                </span>
              </LwsLink>
            ))}
          </div>
        </div>

        <div className="flex flex-grow items-center justify-between py-5 md:pl-12">
          <div className="flex items-center space-x-6 capitalize">
            {langNavbarItems.map((navItem) => (
              <LwsLink
                key={navItem.text}
                lang={lang}
                href={navItem.path}
                className="text-gray-200 transition hover:text-white"
              >
                {navItem.text}
              </LwsLink>
            ))}
          </div>

          <LwsLink
            lang={lang}
            href="/login"
            className="text-gray-200 transition hover:text-white"
          >
            {navbar.loginRegister}
          </LwsLink>
        </div>
      </div>
    </nav>
  );
}
