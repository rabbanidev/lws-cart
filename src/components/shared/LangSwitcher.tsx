'use client';

import { Locale, i18n } from '@/i18n.config';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';

export default function LangSwitcher({ lang }: { lang: Locale }) {
  const router = useRouter();
  const pathname = usePathname();
  const [showManu, setShowManu] = useState<boolean>(false);
  const [selectedLanguage, setSelectedLanguage] = useState<Locale>(lang);

  const handleLanguageChange = (lang: Locale) => {
    setSelectedLanguage(lang);
    setShowManu(false);

    const newPathname = pathname.replace(/^\/[a-z]{2}/, `/${lang}`);

    router.push(newPathname, {
      scroll: false,
    });
  };

  return (
    <div className="flex items-center gap-4 text-white">
      <div className="relative">
        <button
          className="flex items-center gap-2"
          onClick={() => setShowManu(!showManu)}
        >
          <Image
            className="max-w-8"
            src={selectedLanguage === 'en' ? '/usa.png' : '/bd.png'}
            alt="bangla"
            height={100}
            width={165}
          />
          {selectedLanguage === 'en' ? 'English' : 'বাংলা'}
        </button>

        {showManu && (
          <div className="absolute right-0 top-[51px] z-10 mt-2 w-40 divide-y divide-dashed rounded-b-md bg-white py-2 shadow-md lg:top-[43px]">
            {i18n.locales.map((locale) => (
              <li
                key={locale}
                className="flex cursor-pointer items-center gap-2 rounded-md p-2 text-black hover:bg-gray-100"
                onClick={() => handleLanguageChange(locale)}
              >
                <Image
                  className="max-w-8"
                  src={locale === 'en' ? '/usa.png' : '/bd.png'}
                  alt="bangla"
                  height={100}
                  width={165}
                />
                {locale === 'en' ? 'English' : 'বাংলা'}
              </li>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
