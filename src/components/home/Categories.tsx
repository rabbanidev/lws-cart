import Image from 'next/image';
import { Category, Dictionary } from '../../../types/index';
import LwsLink from '../shared/LwsLink';
import { Locale } from '@/i18n.config';
import { getCategories } from '../../../services/category.service';
import { getDictionary } from '../../../lib/dictionaries';

type Props = {
  lang: Locale;
};

export default async function Categories({ lang }: Props) {
  const categories: Category[] = await getCategories();
  const dict: Dictionary = await getDictionary(lang);

  const langCategoryItems: Category[] = categories.map((cate, index) => ({
    ...cate,
    name: dict.category.categoryItems[index],
  }));

  return (
    <div className="container py-16">
      <h2 className="mb-6 text-2xl font-medium uppercase text-gray-800">
        {dict.home.categories.title}
      </h2>
      <div className="grid grid-cols-6 gap-3">
        {langCategoryItems.map((category, index) => (
          <div
            key={category.id}
            className={`group relative overflow-hidden rounded-sm ${index >= langCategoryItems.length - 3 ? 'col-span-2' : 'col-span-3'}`}
          >
            {category.image && (
              <Image
                src={category.image}
                alt={category.name}
                className="w-full"
                width={100}
                height={100}
              />
            )}
            <LwsLink
              lang={lang}
              href={`/shop?categories=${category.id}`}
              className="absolute bottom-4 flex items-center justify-center bg-black bg-opacity-40 font-roboto text-xl font-medium text-white transition group-hover:bg-opacity-60 md:text-3xl md:font-semibold"
            >
              {category.name} {dict.home.categories.collection}
            </LwsLink>
          </div>
        ))}
      </div>
    </div>
  );
}
