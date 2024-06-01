// import FilterByCategories from '@/components/shop/filter/FilterByCategories';
import { Locale } from '@/i18n.config';
import { Dictionary } from '../../../../types/index';
import { getDictionary } from '../../../../lib/dictionaries';
import FilterByCategories from './FilterByCategories';
import { getCategories } from '../../../../services/category.service';
import { Suspense } from 'react';
import FilterBySizes from './FilterBySizes';
import { getSizes } from '../../../../services/size.service';
import { getColors } from '../../../../services/color.service';
import FilterByColors from './FilterByColor';
import FilterByPrice from './FilterByPrice';

type Props = {
  lang: Locale;
};

export default async function Filter({ lang }: Props) {
  const dict: Dictionary = await getDictionary(lang);
  const categories = await getCategories();
  const sizes = await getSizes();
  const colors = await getColors();

  return (
    <div className="space-y-5 divide-y divide-gray-200">
      <Suspense>
        <FilterByCategories
          title={dict.filters.categories}
          categories={categories}
        />
      </Suspense>

      <Suspense>
        <FilterByPrice title={dict.filters.price} />
      </Suspense>

      <Suspense>
        <FilterBySizes title={dict.filters.size} sizes={sizes} />
      </Suspense>
      <Suspense>
        <FilterByColors title={dict.filters.color} colors={colors} />
      </Suspense>
    </div>
  );
}
