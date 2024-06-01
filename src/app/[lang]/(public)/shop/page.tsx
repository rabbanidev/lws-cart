import BreadCrumb from '@/components/UI/BreadCrumb';
import { Locale } from '@/i18n.config';
import { getDictionary } from '../../../../../lib/dictionaries';
import { Dictionary, ProductFilters } from '../../../../../types/index';
import Drawer from '@/components/UI/Drawer';
import Filter from '@/components/shop/filter';
import { Suspense } from 'react';
import ShopBoard from '@/components/shop/ShopBoard';
import { ShopProductLoading } from '@/components/skeleton/ProductsSkeleton';

type Props = {
  params: {
    lang: Locale;
  };
  searchParams: {
    [key: string]: string;
  };
};

export default async function ShopPage({
  params: { lang },
  searchParams,
}: Props) {
  const dict: Dictionary = await getDictionary(lang);
  const categories = searchParams.categories
    ? decodeURI(searchParams.categories).split('|')
    : [];

  const colors = searchParams.colors
    ? decodeURI(searchParams.colors).split('|')
    : [];

  const sizes = searchParams.sizes
    ? decodeURI(searchParams.sizes).split('|')
    : [];

  const minPrice = searchParams.minPrice
    ? Number(decodeURI(searchParams.minPrice))
    : undefined;

  const maxPrice = searchParams.maxPrice
    ? Number(decodeURI(searchParams.maxPrice))
    : undefined;

  const searchTerm = searchParams.searhTerm
    ? decodeURI(searchParams.searhTerm)
    : undefined;

  const filters: ProductFilters = {};
  if (categories.length > 0) filters.categories = categories;
  if (colors.length > 0) filters.colors = colors;
  if (sizes.length > 0) filters.sizes = sizes;
  if (minPrice) filters.minPrice = minPrice;
  if (maxPrice) filters.maxPrice = maxPrice;
  if (searchTerm) filters.searchTerm = searchTerm;

  return (
    <>
      <BreadCrumb lang={lang} title={dict.shop.title} />
      <div className="container grid grid-cols-2 items-start gap-6 pb-16 pt-4 md:grid-cols-4">
        <Drawer>
          <Filter lang={lang} />
        </Drawer>
        <div className="col-span-1 hidden overflow-hidden rounded bg-white px-4 pb-6 shadow md:block">
          <Filter lang={lang} />
        </div>
        <div className="col-span-3">
          <Suspense fallback={<ShopProductLoading />}>
            <ShopBoard lang={lang} filters={filters} />
          </Suspense>
        </div>
      </div>
    </>
  );
}
