'use client';

import { FaShoppingBag } from 'react-icons/fa';
import { AuthSession, Color, Size } from '../../../types/index';
import { useRouter } from 'next/navigation';
import { Locale } from '@/i18n.config';
import { addToCartAction } from '@/actions/cart';
import { toast } from 'react-toastify';
import { useState } from 'react';
import Loading from '../UI/Loading';

type Props = {
  text: string;
  isDetails?: boolean;
  session: AuthSession | null;
  productId: string;
  lang: Locale;
  quantity: number;
  color: Color;
  size: Size;
  isDisabled?: boolean;
};

export default function AddToCartButton({
  text,
  isDetails,
  session,
  productId,
  lang,
  quantity,
  color,
  size,
  isDisabled,
}: Props) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleAddtoCart = async () => {
    if (!session?.user) {
      router.push(
        `/${lang}/login?next=/cart&id=${productId}&qty=${quantity}&color=${color.id}&size=${size.id}`,
      );
    } else {
      setIsLoading(true);

      try {
        const res = await addToCartAction(
          productId,
          quantity,
          color.id,
          size.id,
        );
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
    }
  };

  if (isLoading) {
    return (
      <div className="fixed inset-0 z-40 flex min-h-[65vh] w-full items-center justify-center bg-black/60 backdrop-blur-sm">
        <Loading />
      </div>
    );
  }

  return isDetails ? (
    <button
      type="button"
      className="flex items-center gap-2 rounded border border-primary bg-primary px-8 py-2 font-medium uppercase text-white transition hover:bg-transparent hover:text-primary"
      onClick={handleAddtoCart}
      disabled={isDisabled || isLoading}
    >
      <FaShoppingBag />
      {text}
    </button>
  ) : (
    <button
      type="button"
      className="block w-full rounded-b border border-primary bg-primary py-1 text-center text-white transition hover:bg-transparent hover:text-primary"
      onClick={handleAddtoCart}
      disabled={isDisabled || isLoading}
    >
      {text}
    </button>
  );
}
