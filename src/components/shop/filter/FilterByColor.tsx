'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Color } from '../../../../types/index';

type Props = {
  title: string;
  colors: Color[];
};

export default function FilterByColors({ title, colors }: Props) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const queryString = searchParams.get('colors') as string;
  const decodedQueryString = queryString && decodeURI(queryString);

  const queries = decodedQueryString?.split('|') || [];

  const handleColor = (id: string) => {
    const index = queries.indexOf(id);

    if (index !== -1) {
      queries.splice(index, 1);
    } else {
      queries.push(id);
    }

    const params = new URLSearchParams(searchParams.toString());
    if (queries.length > 0) {
      params.set('colors', encodeURIComponent(queries.join('|')));
    } else {
      params.delete('colors');
    }

    router.replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="pt-4">
      <h3 className="mb-3 text-xl font-medium uppercase text-gray-800">
        {title}
      </h3>
      <div className="flex flex-wrap items-center gap-2">
        {colors.map((color) => (
          <div key={color.id} className="size-selector">
            <button
              type="button"
              className={`flex h-6 cursor-pointer items-center justify-center rounded-sm border px-1  text-xs  shadow-sm ${queries.includes(color.id) ? 'border-primary text-primary' : 'border-gray-200 text-gray-600'}`}
              onClick={() => handleColor(color.id)}
            >
              {color.title}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
