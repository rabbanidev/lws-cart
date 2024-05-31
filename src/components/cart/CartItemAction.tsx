'use client';

import { updateQuantityAction } from '@/actions/cart';
import { Cart, Product as IProduct } from '../../../types/index';
import { replaceMongoIdInObject } from '../../../utils/mongo';
import { useState } from 'react';
import { toast } from 'react-toastify';
import Loading from '../UI/Loading';

type Props = {
  cartItem: Cart;
};

export default function CartItemAction({ cartItem }: Props) {
  const [isLoading, setIsLoading] = useState(false);

  const handleQuantityIncreaseDecrease = async (
    type: 'increase' | 'decrease',
  ) => {
    const product = replaceMongoIdInObject(cartItem.product) as IProduct;

    setIsLoading(true);
    try {
      const res = await updateQuantityAction(cartItem.id, product.id, type);
      if (res.status === 200) {
        toast.success(res.message);
      } else {
        toast.error(res.message);
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div
        className="fixed inset-0 flex min-h-[65vh] w-full items-center justify-center bg-black/60 backdrop-blur-sm"
        style={{ zIndex: 999 }}
      >
        <Loading />
      </div>
    );
  }

  return (
    <div className="flex w-max divide-x divide-gray-300 border border-gray-300 text-gray-600">
      <button
        type="button"
        className={`flex h-8 w-8 select-none items-center justify-center text-xl ${cartItem.quantity === 1 ? 'cursor-not-allowed' : 'cursor-pointer'}`}
        disabled={cartItem.quantity === 1 || isLoading}
        onClick={() => handleQuantityIncreaseDecrease('decrease')}
      >
        -
      </button>
      <span className="flex h-8 w-8 items-center justify-center text-sm">
        {cartItem.quantity}
      </span>
      <button
        type="button"
        className={`flex h-8 w-8 select-none items-center justify-center text-xl ${cartItem.product.stock === 0 ? 'cursor-not-allowed' : 'cursor-pointer'}`}
        disabled={cartItem.product.stock === 0 || isLoading}
        onClick={() => handleQuantityIncreaseDecrease('increase')}
      >
        +
      </button>
    </div>
  );
}
