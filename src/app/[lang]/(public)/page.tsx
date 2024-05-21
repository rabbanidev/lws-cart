import type { Locale } from '@/i18n.config';
import { getDictionary } from '../../../../lib/dictionaries';
import Banner from '@/components/home/Banner';
import Features from '@/components/home/Features';
import Categories from '@/components/home/Categories';
import { getProducts } from '../../../../services/product.service';

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
      <Categories
        dict={{
          title: dict.home.categories.title,
          collection: dict.home.categories.collection,
          categoryItems: dict.category.categoryItems,
        }}
        lang={lang}
      />
    </>
  );
}
