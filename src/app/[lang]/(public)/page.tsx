import type { Locale } from '@/i18n.config';
import { getDictionary } from '../../../../lib/dictionaries';
import Banner from '@/components/home/Banner';

type Props = {
  params: { lang: Locale };
};

export default async function HomePage({ params: { lang } }: Props) {
  const dict = await getDictionary(lang);

  return (
    <>
      <Banner lang={lang} dict={dict.home.banner} />
    </>
  );
}
