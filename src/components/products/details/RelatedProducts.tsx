import { Locale } from '@/i18n.config';
import { getDictionary } from '../../../../lib/dictionaries';
import { Dictionary, Product as IProduct } from '../../../../types/index';
import { getRelatedProducts } from '../../../../services/product.service';
import ProductCard from '../ProductCard';

type Props = {
  lang: Locale;
  id: string;
};

export default async function RelatedProducts({ lang, id }: Props) {
  const dict: Dictionary = await getDictionary(lang);
  const relatedProducts = (await getRelatedProducts(id)) as IProduct[];

  return (
    relatedProducts.length > 0 && (
      <div className="container pb-16">
        <h2 className="mb-6 text-2xl font-medium uppercase text-gray-800">
          {dict.product.relatedProducts}
        </h2>
        <div className="grid grid-cols-4 gap-6">
          {relatedProducts.map((product) => (
            <ProductCard key={product.id} lang={lang} product={product} />
          ))}
        </div>
      </div>
    )
  );
}
