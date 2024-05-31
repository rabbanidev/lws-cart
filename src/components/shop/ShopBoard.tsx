import { Locale } from '@/i18n.config';
import { getProducts } from '../../../services/product.service';
import { Product, ProductFilters } from '../../../types/index';
import ProductCard from '../products/ProductCard';
import { HiOutlineDocumentSearch } from 'react-icons/hi';

type Props = {
  lang: Locale;
  filters: ProductFilters;
};

export default async function ShopBoard({ lang, filters }: Props) {
  const products: Product[] = await getProducts(filters);

  if (products.length === 0) {
    return (
      <div className="mt-10 flex flex-col items-center justify-center">
        <HiOutlineDocumentSearch size={100} />
        <h4 className="text-3xl font-medium text-primary">Sad no result!</h4>
        <p className="mt-1">We can&apos;t find the product you are searching</p>
      </div>
    );
  }
  return (
    <div className="grid grid-cols-2 gap-6 md:grid-cols-3">
      {products.map((product) => (
        <ProductCard key={product.id} lang={lang} product={product} />
      ))}
    </div>
  );
}
