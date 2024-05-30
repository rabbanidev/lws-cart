import AutoCartItemAdder from '@/components/cart/AutoCartItemAdder';
import { Suspense } from 'react';

type Props = {
  searchParams: {
    [key: string]: string;
  };
};

export default function CartPage({ searchParams }: Props) {
  return (
    <div>
      CartPage
      {searchParams.id &&
        searchParams.color &&
        searchParams.size &&
        searchParams.qty && (
          <Suspense>
            <AutoCartItemAdder />
          </Suspense>
        )}
    </div>
  );
}
