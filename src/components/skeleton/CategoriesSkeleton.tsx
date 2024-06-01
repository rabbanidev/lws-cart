import { Locale } from '@/i18n.config';
import { getDictionary } from '../../../lib/dictionaries';
import { Dictionary } from '../../../types/index';

export async function BannerCategoriesSkeleton({ lang }: { lang: Locale }) {
  const dict: Dictionary = await getDictionary(lang);

  const items = Array.from({ length: 5 }).fill(null);
  return (
    <div className="container py-16">
      <h2 className="mb-6 text-2xl font-medium uppercase text-gray-800">
        {dict.home.categories.title}
      </h2>
      <div className="grid grid-cols-6 gap-3">
        {items.map((_item, index) => (
          <div
            key={index}
            className={`animate group relative overflow-hidden rounded-sm ${index >= items.length - 3 ? 'col-span-2' : 'col-span-3'}`}
          >
            <div className="h-56 w-full bg-gray-300"></div>
            <div className="absolute bottom-4 flex items-center justify-center bg-black bg-opacity-40 font-roboto text-xl font-medium text-white transition">
              <div className="h-6 w-36 bg-gray-400"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
