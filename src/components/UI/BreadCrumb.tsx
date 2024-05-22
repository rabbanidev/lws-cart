import { MdOutlineHome } from 'react-icons/md';
import LwsLink from '../shared/LwsLink';
import { IoChevronForward } from 'react-icons/io5';
import { Locale } from '@/i18n.config';

type Props = {
  lang: Locale;
  title: string;
};

export default function BreadCrumb({ lang, title }: Props) {
  return (
    <div className="container flex items-center gap-3 py-4">
      <LwsLink lang={lang} href="/" className="text-base text-primary">
        <MdOutlineHome size={22} />
      </LwsLink>
      <span className="text-sm text-gray-400">
        <IoChevronForward size={22} />
      </span>
      <p className="font-medium text-gray-600">{title}</p>
    </div>
  );
}
