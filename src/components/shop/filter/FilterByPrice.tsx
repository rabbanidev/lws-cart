'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

type Props = {
  title: string;
};

export default function FilterByPrice({ title }: Props) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const minPrice = searchParams.get('minPrice') as string;
  const maxPrice = searchParams.get('minPrice') as string;

  const handleMinPrice = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (Number(value) > 0) {
      params.set('minPrice', encodeURIComponent(value));
    } else {
      params.delete('minPrice');
    }

    router.replace(`${pathname}?${params.toString()}`);
  };

  const handleMaxPrice = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (Number(value) > 0) {
      params.set('maxPrice', encodeURIComponent(value));
    } else {
      params.delete('maxPrice');
    }

    router.replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="pt-4">
      <h3 className="mb-3 text-xl font-medium uppercase text-gray-800">
        {title}
      </h3>
      <div className="mt-4 flex items-center">
        <input
          type="number"
          name="min"
          id="min"
          className="w-full rounded border-gray-300 px-3 py-1 text-gray-600 shadow-sm focus:border-primary focus:ring-0"
          placeholder="min"
          min={0}
          defaultValue={Number(minPrice)}
          onChange={(e) => handleMinPrice(e.target.value)}
        />
        <span className="mx-3 text-gray-500">-</span>
        <input
          type="number"
          name="max"
          id="max"
          className="w-full rounded border-gray-300 px-3 py-1 text-gray-600 shadow-sm focus:border-primary focus:ring-0"
          placeholder="max"
          defaultValue={Number(maxPrice)}
          onChange={(e) => handleMaxPrice(e.target.value)}
        />
      </div>
    </div>
  );
}
