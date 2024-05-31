'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Category } from '../../../../types/index';

type Props = {
  title: string;
  categories: Category[];
};

export default function FilterByCategories({ title, categories }: Props) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const queryString = searchParams.get('categories') as string;
  const decodedQueryString = queryString && decodeURI(queryString);

  const queries = decodedQueryString?.split('|') || [];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const index = queries.indexOf(name);

    if (index !== -1) {
      queries.splice(index, 1);
    } else {
      queries.push(name);
    }

    const params = new URLSearchParams(searchParams.toString());
    if (queries.length > 0) {
      params.set('categories', encodeURIComponent(queries.join('|')));
    } else {
      params.delete('categories');
    }

    router.replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div>
      <h3 className="mb-3 text-xl font-medium uppercase text-gray-800">
        {title}
      </h3>
      <div className="space-y-2">
        {categories.map((category) => (
          <div key={category.id} className="flex items-center">
            <input
              type="checkbox"
              name={category.id}
              id={category.id}
              className="cursor-pointer rounded-sm text-primary focus:ring-0"
              checked={queries.includes(category.id)}
              onChange={handleChange}
            />
            <label
              htmlFor={category.id}
              className="cusror-pointer ml-3 text-gray-600"
            >
              {category.name}
            </label>
            <div className="ml-auto text-sm text-gray-600">
              ({category?.totalProducts})
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
