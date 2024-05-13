import type { Locale } from '@/i18n.config';
import { getDictionary } from '@/lib/dictionaries';

type Props = {
  params: { lang: Locale };
};

export default async function HomePage({ params: { lang } }: Props) {
  const dict = await getDictionary(lang);

  return <div>{dict.home.text}</div>;
}
