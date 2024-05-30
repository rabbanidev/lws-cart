import AutoWishlistItemAdder from '@/components/wishlist/AutoWishlistItemAdder';
import { Suspense } from 'react';

type Props = {
  searchParams: {
    [key: string]: string;
  };
};

export default function WishlistPage({ searchParams }: Props) {
  return (
    <div>
      WishlistPage
      {searchParams.id && (
        <Suspense>
          <AutoWishlistItemAdder />
        </Suspense>
      )}
    </div>
  );
}
