'use client';

import { createOrRemoveWishlistItemAction } from '@/actions/wishlist';
import { useState } from 'react';
import { FaRegTrashAlt } from 'react-icons/fa';
import { toast } from 'react-toastify';
import Loading from '../UI/Loading';

export default function WishlistRemoveButton({
  productId,
}: {
  productId: string;
}) {
  const [isLoading, setIsLoading] = useState(false);

  const removeWishlistItem = async () => {
    setIsLoading(true);
    try {
      const res = await createOrRemoveWishlistItemAction(productId);
      if (res.status === 201) {
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
      onClick={removeWishlistItem}
      disabled={isLoading}
    >
      <FaRegTrashAlt />
    </button>
  );
}
