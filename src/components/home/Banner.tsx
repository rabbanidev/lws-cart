import type { Locale } from '@/i18n.config';
import LwsLink from '../shared/LwsLink';
import { getDictionary } from '../../../lib/dictionaries';
import { Dictionary } from '../../../types/index';

type IProps = {
  lang: Locale;
};

export default async function Banner({ lang }: IProps) {
  const dict: Dictionary = await getDictionary(lang);
  return (
    <div
      className="bg-cover bg-center bg-no-repeat py-40"
      style={{
        backgroundImage: `url('/banner-bg.jpg')`,
      }}
    >
      <div className="container">
        <h1 className="mb-4 text-6xl font-medium capitalize text-black">
          {dict.home.banner.title[0]} <br />
          {dict.home.banner.title[1]}
        </h1>
        <p className="text-gray-600">
          {dict.home.banner.description[0]} <br />
          {dict.home.banner.description[1]}
        </p>
        <div className="mt-12">
          <LwsLink
            lang={lang}
            href="/shop"
            className="rounded-md border border-primary bg-primary px-8 py-3 font-medium text-white hover:bg-transparent hover:text-primary"
          >
            {dict.home.banner.shopNow}
          </LwsLink>
        </div>
      </div>
    </div>
  );
}
