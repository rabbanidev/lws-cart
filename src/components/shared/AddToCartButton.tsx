'use client';

import { FaShoppingBag } from 'react-icons/fa';
import { AuthSession, Color, Size } from '../../../types/index';
import { useRouter } from 'next/navigation';
import { Locale } from '@/i18n.config';
import { addToCartAction } from '@/actions/cart';
import { toast } from 'react-toastify';

type Props = {
  text: string;
  isDetails?: boolean;
  session: AuthSession | null;
  productId: string;
  lang: Locale;
  quantity: number;
  color: Color;
  size: Size;
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
}: Props) {
  const router = useRouter();

  const handleAddtoCart = async () => {
    if (!session?.user) {
      router.push(
        `/${lang}/login?next=/cart&id=${productId}&qty=${quantity}&color=${color.id}&size=${size.id}`,
      );
    } else {
      const res = await addToCartAction(productId, quantity, color.id, size.id);
      if (res.status === 201) {
        toast.success(res.message);
      } else {
        toast.error(res.message);
      }
    }
  };

  return isDetails ? (
    <button
      type="button"
      className="flex items-center gap-2 rounded border border-primary bg-primary px-8 py-2 font-medium uppercase text-white transition hover:bg-transparent hover:text-primary"
      onClick={handleAddtoCart}
    >
      <FaShoppingBag />
      {text}
    </button>
  ) : (
    <button
      type="button"
      className="block w-full rounded-b border border-primary bg-primary py-1 text-center text-white transition hover:bg-transparent hover:text-primary"
      onClick={handleAddtoCart}
    >
      {text}
    </button>
  );
}
