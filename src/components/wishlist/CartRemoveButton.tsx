'use client';

import { removeCartItemAction } from '@/actions/cart';
import { useState } from 'react';
import { FaRegTrashAlt } from 'react-icons/fa';
import { toast } from 'react-toastify';
import Loading from '../UI/Loading';

export default function CartRemoveButton({
  cartItemId,
}: {
  cartItemId: string;
}) {
  const [isLoading, setIsLoading] = useState(false);

  const handleRemoveCartItem = async () => {
    setIsLoading(true);
    try {
      const res = await removeCartItemAction(cartItemId);
      if (res.status === 200) {
        toast.success(res.message);
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="fixed inset-0 flex min-h-[65vh] w-full items-center justify-center bg-black/60 backdrop-blur-sm">
        <Loading />
      </div>
    );
  }

  return (
    <button
      type="button"
      className="cursor-pointer text-gray-600 hover:text-primary"
      onClick={handleRemoveCartItem}
      disabled={isLoading}
    >
      <FaRegTrashAlt />
    </button>
  );
}
