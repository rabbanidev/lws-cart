import { Locale } from '@/i18n.config';
import LwsLink from '../shared/LwsLink';
import { getDictionary } from '../../../lib/dictionaries';
import { Dictionary } from '../../../types/index';

type Props = {
  lang: Locale;
};

export default async function Advertise({ lang }: Props) {
  const dict: Dictionary = await getDictionary(lang);

  return (
    <div className="container pb-16">
      <div className="grid grid-cols-1 md:grid-cols-2">
        <div className="col-span-1 flex h-auto w-full items-center bg-[#f6ece1] px-7 py-10">
          <div>
            <h2 className="mb-3 text-xl font-medium uppercase text-gray-800 md:text-2xl">
              {dict.home.advertise.title}
            </h2>
            <p className="text-gray-600">{dict.home.advertise.description}</p>
            <div className="mt-6">
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
        <div
          className="col-span-1 hidden bg-cover bg-center bg-no-repeat py-40 md:block"
          style={{
            backgroundImage: `url('/offer.jpg')`,
          }}
        ></div>
      </div>
    </div>
  );
}
