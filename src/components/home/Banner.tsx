import type { Locale } from '@/i18n.config';
import LwsLink from '../shared/LwsLink';

type IProps = {
  lang: Locale;
  dict: {
    title: string[];
    description: string[];
    shopNow: string;
  };
};

export default function Banner({ dict, lang }: IProps) {
  return (
    <div
      className="bg-cover bg-center bg-no-repeat py-40"
      style={{
        backgroundImage: `url('/banner-bg.jpg')`,
      }}
    >
      <div className="container">
        <h1 className="mb-4 text-6xl font-medium capitalize text-black">
          {dict.title[0]} <br />
          {dict.title[1]}
        </h1>
        <p className="text-black">
          {dict.description[0]} <br />
          {dict.description[1]}
        </p>
        <div className="mt-12">
          <LwsLink
            lang={lang}
            href="/shop"
            className="rounded-md border border-primary bg-primary px-8 py-3 font-medium text-white hover:bg-transparent hover:text-primary"
          >
            {dict.shopNow}
          </LwsLink>
        </div>
      </div>
    </div>
  );
}
