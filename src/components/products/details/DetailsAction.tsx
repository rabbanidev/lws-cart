'use client';

import AddToCartButton from '@/components/shared/AddToCartButton';
import WishlistButton from '@/components/shared/WishlistButton';
import { Locale } from '@/i18n.config';
import { useState } from 'react';
import {
  AuthSession,
  Cart,
  Color,
  Dictionary,
  Product,
  Size,
} from '../../../../types/index';
import { replaceMongoIdInArray } from '../../../../utils/mongo';

type Props = {
  dict: Dictionary;
  lang: Locale;
  product: Product;
  session: AuthSession | null;
  alreadyAddedInWishlist?: boolean;
  cartItem: Cart | null | undefined;
};

export default function DetailsAction({ dict, product, lang, session }: Props) {
  const [quantity, setQuantity] = useState<number>(1);

  const colors = replaceMongoIdInArray(product.colors) as Color[];
  const sizes = replaceMongoIdInArray(product.sizes) as Size[];

  const [selectedColor, setSelectedColor] = useState<Color>(colors[0]);
  const [selectedSize, setSelectedSize] = useState<Size>(sizes[0]);

  return (
    <>
      <div className="mt-4 flex items-center gap-x-5">
        <div>
          <h3 className="mb-1 text-sm uppercase text-gray-800">
            {dict.product.colors}
          </h3>
          <div className="flex w-max divide-x divide-gray-300 border border-gray-300 text-gray-600">
            {colors.map((color: Color) => (
              <button
                key={color.id}
                type="button"
                className={`flex h-8 cursor-pointer select-none items-center justify-center px-3 text-sm capitalize ${color.id === selectedColor.id ? 'bg-gray-200' : ''}`}
                onClick={() => setSelectedColor({ ...selectedColor, ...color })}
              >
                {color.title}
              </button>
            ))}
          </div>
        </div>
        <div>
          <h3 className="mb-1 text-sm uppercase text-gray-800">
            {dict.product.sizes}
          </h3>
          <div className="flex w-max divide-x divide-gray-300 border border-gray-300 text-gray-600">
            {sizes.map((size: Size) => (
              <button
                key={size.id}
                type="button"
                className={`flex h-8 cursor-pointer select-none items-center justify-center px-3 text-sm capitalize ${size.id === selectedSize.id ? 'bg-gray-200' : ''}`}
                onClick={() => setSelectedSize({ ...selectedSize, ...size })}
              >
                {size.title}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-4">
        <h3 className="mb-1 text-sm uppercase text-gray-800">
          {dict.product.qty}
        </h3>
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
            className={`flex h-8 w-8 select-none items-center justify-center text-xl ${quantity === product.stock ? 'cursor-not-allowed' : 'cursor-pointer'}`}
            onClick={() => setQuantity((prev) => prev + 1)}
            disabled={quantity === product.stock}
          >
            +
          </button>
        </div>
      </div>

      <div className="mt-6 flex gap-3 border-b border-gray-200 pb-5 pt-5">
        <AddToCartButton
          isDetails
          text={
            product.stock === 0 ? dict.product.stockOut : dict.product.addToCart
          }
          productId={product.id}
          lang={lang}
          session={session}
          quantity={quantity}
          color={selectedColor}
          size={selectedSize}
          isDisabled={product.stock === 0}
        />
        <WishlistButton
          isDetails
          text={dict.product.addToWishlist}
          productId={product.id}
          lang={lang}
          session={session}
        />
      </div>
    </>
  );
}
