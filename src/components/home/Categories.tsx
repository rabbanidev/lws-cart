import Image from 'next/image';
import { categories } from '../../../constants';
import { Category } from '../../../types';
import LwsLink from '../shared/LwsLink';
import { Locale } from '@/i18n.config';

type Props = {
  dict: {
    title: string;
    categoryItems: string[];
    collection: string;
  };
  lang: Locale;
};

export default function Categories({ dict, lang }: Props) {
  const langCategoryItems: Category[] = categories.map((cate, index) => ({
    ...cate,
    label: dict.categoryItems[index],
  }));

  return (
    <div className="container py-16">
      <h2 className="mb-6 text-2xl font-medium uppercase text-gray-800">
        {dict.title}
      </h2>
      <div className="grid grid-cols-6 gap-3">
        {langCategoryItems.map((category, index) => (
          <div
            key={category.id}
            className={`group relative overflow-hidden rounded-sm ${index >= langCategoryItems.length - 3 ? 'col-span-2' : 'col-span-3'}`}
          >
            <Image
              src={`/categories/${category.image}`}
              alt={category.value}
              className="w-full"
              width={100}
              height={100}
              unoptimized={true}
            />
            <LwsLink
              lang={lang}
              href={`/categories/${category.value}`}
              className="absolute bottom-4 flex items-center justify-center bg-black bg-opacity-40 font-roboto text-xl font-medium text-white transition group-hover:bg-opacity-60 md:text-3xl md:font-semibold"
            >
              {category.label} {dict.collection}
            </LwsLink>
          </div>
        ))}
      </div>
    </div>
  );
}
