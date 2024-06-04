import { IoMdEye } from 'react-icons/io';
import LwsLink from './LwsLink';
import { Locale } from '@/i18n.config';

type Props = {
  title: string;
  id: string;
  lang: Locale;
};

export default function ViewButton({ title, lang, id }: Props) {
  return (
    <LwsLink
      lang={lang}
      href={`/products/${id}`}
      className="flex h-8 w-9 items-center justify-center rounded-full bg-primary text-lg text-white transition hover:bg-gray-800"
      title={title}
    >
      <IoMdEye />
    </LwsLink>
  );
}
