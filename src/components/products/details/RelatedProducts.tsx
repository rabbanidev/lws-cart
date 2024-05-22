import { Locale } from '@/i18n.config';
import { getDictionary } from '../../../../lib/dictionaries';
import { Dictionary } from '../../../../types';

type Props = {
  lang: Locale;
};

export default async function RelatedProducts({ lang }: Props) {
  const dict: Dictionary = await getDictionary(lang);

  return (
    <div className="container pb-16">
      <h2 className="mb-6 text-2xl font-medium uppercase text-gray-800">
        {dict.product.relatedProducts}
      </h2>
      <div className="grid grid-cols-4 gap-6"></div>
    </div>
  );
}
