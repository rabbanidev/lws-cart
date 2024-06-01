import type { Locale } from '@/i18n.config';
import { getDictionary } from '../../../../lib/dictionaries';
import Banner from '@/components/home/Banner';
import Features from '@/components/home/Features';
import Categories from '@/components/home/Categories';
import TopNewArrival from '@/components/home/TopNewArrival';
import Trending from '@/components/home/Trending';
import Advertise from '@/components/home/Advertise';
import { Suspense } from 'react';
import { ProductTopArrivalSkeleton } from '@/components/skeleton/ProductsSkeleton';
import { BannerCategoriesSkeleton } from '@/components/skeleton/CategoriesSkeleton';
import { Dictionary } from '../../../../types/index';

type Props = {
  params: { lang: Locale };
};

export default async function HomePage({ params: { lang } }: Props) {
  const dict: Dictionary = await getDictionary(lang);

  return (
    <>
      <Banner lang={lang} />
      <Features lang={lang} />

      <Suspense fallback={<BannerCategoriesSkeleton lang={lang} />}>
        <Categories lang={lang} />
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
