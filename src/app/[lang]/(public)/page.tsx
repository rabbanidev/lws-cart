import type { Locale } from '@/i18n.config';
import { getDictionary } from '../../../../lib/dictionaries';
import Banner from '@/components/home/Banner';
import Features from '@/components/home/Features';
import Categories from '@/components/home/Categories';
import { getProducts } from '../../../../services/product.service';
import TopNewArrival from '@/components/home/TopNewArrival';
import Trending from '@/components/home/Trending';
import Advertise from '@/components/home/Advertise';
import { Suspense } from 'react';
import { ProductTopArrivalSkeleton } from '@/components/skeleton/ProductsSkeleton';
import { BannerCategoriesSkeleton } from '@/components/skeleton/CategoriesSkeleton';

type Props = {
  params: { lang: Locale };
};

export default async function HomePage({ params: { lang } }: Props) {
  const dict = await getDictionary(lang);

  await getProducts();

  return (
    <>
      <Banner lang={lang} dict={dict.home.banner} />
      <Features dict={dict.home.features} />

      <Suspense
        fallback={
          <BannerCategoriesSkeleton title={dict.home.categories.title} />
        }
      >
        <Categories
          dict={{
            title: dict.home.categories.title,
            collection: dict.home.categories.collection,
            categoryItems: dict.category.categoryItems,
          }}
          lang={lang}
        />
      </Suspense>

      <Suspense
        fallback={
          <ProductTopArrivalSkeleton title={dict.home.newArrival.title} />
        }
      >
        <TopNewArrival lang={lang} />
      </Suspense>

      <Advertise lang={lang} />

      <Suspense
        fallback={
          <ProductTopArrivalSkeleton title={dict.home.trending.title} />
        }
      >
        <Trending lang={lang} />
      </Suspense>
    </>
  );
}
