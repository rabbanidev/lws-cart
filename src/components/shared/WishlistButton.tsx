'use client';

import { Locale } from '@/i18n.config';
import { useRouter } from 'next/navigation';
import { FaRegHeart } from 'react-icons/fa';
import { AuthSession } from '../../../types/index';
import { createOrRemoveWishlistItemAction } from '@/actions/wishlist';
import { toast } from 'react-toastify';

type Props = {
  text: string;
  isDetails?: boolean;
  productId: string;
  lang: Locale;
  session: AuthSession | null;
  alreadyAdded?: boolean;
};

export default function WishlistButton({
  text,
  isDetails,
  productId,
  lang,
  session,
  alreadyAdded,
}: Props) {
  const router = useRouter();

  const handleWishlist = async () => {
    if (!session?.user) {
      router.push(`/${lang}/login?next=/wishlist&id=${productId}`);
    } else {
      const res = await createOrRemoveWishlistItemAction(productId);
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
      className={`flex items-center gap-2 rounded border border-gray-300 px-8 py-2 font-medium uppercase text-gray-600 transition hover:text-primary ${alreadyAdded ? 'text-primary' : ''}`}
      onClick={handleWishlist}
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
    >
      <FaRegHeart />
    </button>
  );
}
