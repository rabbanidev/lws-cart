import Image from 'next/image';
import LwsLink from './LwsLink';
import { Locale } from '@/i18n.config';
import { IoIosArrowRoundForward } from 'react-icons/io';

type Props = {
  title: string;
  description: string;
  btnText: string;
  lang: Locale;
};

export default function Empty({ title, description, btnText, lang }: Props) {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="w-56">
        <Image
          src="/empty_cart.png"
          alt="empty wishlist"
          width={100}
          height={100}
          className="h-full w-full"
        />
      </div>
      <h4 className="text-3xl font-medium capitalize text-black">{title}</h4>
      <p className="my-3 w-full px-5 text-center font-normal text-gray-600 md:w-2/3 lg:w-1/2 xl:w-6/12">
        {description}
      </p>
      <LwsLink
        lang={lang}
        href="/shop"
        className="flex items-center gap-2 rounded border border-primary bg-primary px-8 py-2 font-medium uppercase text-white transition hover:bg-transparent hover:text-primary"
      >
        {btnText}
        <IoIosArrowRoundForward size={30} />
      </LwsLink>
    </div>
  );
}
