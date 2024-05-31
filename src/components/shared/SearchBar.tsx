'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { IoSearch } from 'react-icons/io5';
import { removeLanguagePrefix } from '../../../utils/url';
import { useState } from 'react';
import useDebounce from '@/hooks/useDebounce';
import { Locale } from '@/i18n.config';

type Props = {
  title: string;
  lang: Locale;
};

export default function SearchBar({ title, lang }: Props) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const actualPathname = removeLanguagePrefix(pathname);

  const [searchTerm, setSearchTerm] = useState<string>(
    (searchParams.get('searhTerm') as string) || '',
  );

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    handleSearch(value);
    setSearchTerm(value);
  };

  const handleSearch = useDebounce((term) => {
    const params = new URLSearchParams(searchParams.toString());
    if (term) {
      params.set('searhTerm', encodeURIComponent(term));
    } else {
      params.delete('searhTerm');
    }

    if (actualPathname !== '/shop' && term) {
      router.replace(`/${lang}/shop?${params.toString()}`);
    } else {
      router.replace(`${pathname}?${params.toString()}`);
    }
  }, 500);

  return (
    <div className="relative flex w-full max-w-xl md:mx-5 lg:mx-0">
      <span className="absolute left-4 top-3.5 hidden text-lg text-gray-400 md:block">
        <IoSearch size={20} />
      </span>
      <input
        type="text"
        name="search"
        id="search"
        className="hidden w-full rounded-l-md border border-r-0 border-primary py-3 pl-12 pr-3 focus:outline-none md:flex"
        placeholder={title}
        value={searchTerm}
        onChange={handleChange}
      />
      <button className="hidden rounded-r-md border  border-primary bg-primary px-8 text-white transition hover:bg-transparent hover:text-primary md:block">
        {title}
      </button>
    </div>
  );
}
