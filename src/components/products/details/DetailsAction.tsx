'use client';

import AddToCartButton from '@/components/shared/AddToCartButton';
import WishlistButton from '@/components/shared/WishlistButton';
import { useState } from 'react';

type Props = {
  qtyTitle: string;
};

export default function DetailsAction({ qtyTitle }: Props) {
  const [quantity, setQuantity] = useState(1);

  return (
    <>
      <div className="mt-4">
        <h3 className="mb-1 text-sm uppercase text-gray-800">{qtyTitle}</h3>
        <div className="flex w-max divide-x divide-gray-300 border border-gray-300 text-gray-600">
          <button
            type="button"
            className={`flex h-8 w-8 select-none items-center justify-center text-xl ${quantity === 1 ? 'cursor-not-allowed' : 'cursor-pointer'}`}
            disabled={quantity === 1}
            onClick={() => setQuantity((prev) => prev - 1)}
          >
            -
          </button>
          <span className="flex h-8 w-8 items-center justify-center text-base">
            {quantity}
          </span>
          <button
            className="flex h-8 w-8 cursor-pointer select-none items-center justify-center text-xl"
            onClick={() => setQuantity((prev) => prev + 1)}
          >
            +
          </button>
        </div>
      </div>

      <div className="mt-6 flex gap-3 border-b border-gray-200 pb-5 pt-5">
        <AddToCartButton isDetails text="Add To Cart" />
        <WishlistButton isDetails text="Wishlist" />
      </div>
    </>
  );
}
