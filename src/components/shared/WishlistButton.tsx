'use client';

import { Locale } from '@/i18n.config';
import { useRouter } from 'next/navigation';
import { FaRegHeart } from 'react-icons/fa';

type Props = {
  text: string;
  isDetails: boolean;
  isLoggedIn: boolean;
  productId: string;
  lang: Locale;
};

export default function WishlistButton({
  text,
  isDetails,
  isLoggedIn,
  productId,
  lang,
}: Props) {
  const router = useRouter();

  const handleWishlist = () => {
    if (!isLoggedIn) {
      router.push(`/${lang}/login?next=/wishlist&id=${productId}`);
    }

    // Others works
  };

  return isDetails ? (
    <button
      type="button"
      className="flex items-center gap-2 rounded border border-gray-300 px-8 py-2 font-medium uppercase text-gray-600 transition hover:text-primary"
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
