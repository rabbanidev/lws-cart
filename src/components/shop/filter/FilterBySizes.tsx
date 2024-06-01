'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Size } from '../../../../types/index';

type Props = {
  title: string;
  sizes: Size[];
};

export default function FilterBySizes({ title, sizes }: Props) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const queryString = searchParams.get('sizes') as string;
  const decodedQueryString = queryString && decodeURI(queryString);

  const queries = decodedQueryString?.split('|') || [];

  const handleSize = (id: string) => {
    const index = queries.indexOf(id);

    if (index !== -1) {
      queries.splice(index, 1);
    } else {
      queries.push(id);
    }

    const params = new URLSearchParams(searchParams.toString());
    if (queries.length > 0) {
      params.set('sizes', encodeURIComponent(queries.join('|')));
    } else {
      params.delete('sizes');
    }

    router.replace(`${pathname}?${params.toString()}`);
    router.refresh();
  };

  return (
    <div className="pt-4">
      <h3 className="mb-3 text-xl font-medium uppercase text-gray-800">
        {title}
      </h3>
      <div className="flex flex-wrap items-center gap-2">
        {sizes.map((size) => (
          <div key={size.id} className="size-selector">
            <button
              type="button"
              className={`flex h-6 w-6 cursor-pointer items-center justify-center rounded-sm border text-xs  uppercase  shadow-sm ${queries.includes(size.id) ? 'border-primary text-primary' : 'border-gray-200 text-gray-600'}`}
              onClick={() => handleSize(size.id)}
            >
              {size.title}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
