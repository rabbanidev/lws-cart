import { Locale } from '@/i18n.config';
import { getDictionary } from '../../../lib/dictionaries';
import ProductCard from '../products/ProductCard';
import { Dictionary, Product as IProduct } from '../../../types/index';
import { getTrendingProducts } from '../../../services/product.service';

type Props = {
  lang: Locale;
};

export default async function Trending({ lang }: Props) {
  const dict: Dictionary = await getDictionary(lang);

  const products: IProduct[] = await getTrendingProducts();

  return (
    <div className="container pb-16">
      <h2 className="mb-6 text-2xl font-medium uppercase text-gray-800">
        {dict.home.trending.title}
      </h2>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product.id} lang={lang} product={product} />
        ))}
      </div>
    </div>
  );
}
