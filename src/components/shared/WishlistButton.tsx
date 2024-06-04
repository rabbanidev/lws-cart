'use client';

import { Locale } from '@/i18n.config';
import { useRouter } from 'next/navigation';
import { FaRegHeart } from 'react-icons/fa';
import { AuthSession } from '../../../types/index';
import { createOrRemoveWishlistItemAction } from '@/actions/wishlist';
import { toast } from 'react-toastify';
import { useState } from 'react';
import Loading from '../UI/Loading';

type Props = {
  text: string;
  isDetails?: boolean;
  productId: string;
  lang: Locale;
  session: AuthSession | null;
};

export default function WishlistButton({
  text,
  isDetails,
  productId,
  lang,
  session,
}: Props) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleWishlist = async () => {
    if (!session?.user) {
      router.push(`/${lang}/login?next=/wishlist&id=${productId}`);
    } else {
      setIsLoading(true);

      try {
        const res = await createOrRemoveWishlistItemAction(productId);
        if (res.status === 201) {
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
    }
  };

  if (isLoading) {
    return (
      <div
        className="fixed inset-0 z-40 flex min-h-[65vh] w-full items-center justify-center bg-black/60 backdrop-blur-sm"
        style={{ zIndex: 999 }}
      >
        <Loading />
      </div>
    );
  }

  return isDetails ? (
    <button
      type="button"
      className="flex items-center gap-2 rounded border border-gray-300 px-8 py-2 font-medium uppercase text-gray-600 transition hover:text-primary"
      onClick={handleWishlist}
      disabled={isLoading}
    >
      <FaRegHeart />
      {text}
    </button>
  ) : (
    <button
      type="button"
      className="flex h-8 w-9 items-center justify-center rounded-full bg-primary text-lg text-white transition hover:bg-gray-800"
      title={text}
      onClick={handleWishlist}
      disabled={isLoading}
    >
      <FaRegHeart />
    </button>
  );
}
