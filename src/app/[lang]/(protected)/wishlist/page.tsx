import BreadCrumb from '@/components/UI/BreadCrumb';
import AutoWishlistItemAdder from '@/components/wishlist/AutoWishlistItemAdder';
import { Locale } from '@/i18n.config';
import { Suspense } from 'react';
import { Dictionary } from '../../../../../types/index';
import { getDictionary } from '../../../../../lib/dictionaries';
import WishlistItem from '@/components/wishlist/WishlistItem';
import { getWishlistItemsAction } from '@/actions/wishlist';
import Empty from '@/components/shared/Empty';

type Props = {
  params: {
    lang: Locale;
  };
  searchParams: {
    [key: string]: string;
  };
};

export default async function WishlistPage({
  params: { lang },
  searchParams,
}: Props) {
  const dict: Dictionary = await getDictionary(lang);
  const wishlist = await getWishlistItemsAction();

  const wishlistItems = wishlist?.items || [];

  return (
    <>
      {searchParams.id && (
        <Suspense>
          <AutoWishlistItemAdder />
        </Suspense>
      )}
      <BreadCrumb lang={lang} title={dict.wishlist.title} />
      <div className="container gap-6 pb-16 pt-4">
        <div className="mx-auto max-w-6xl space-y-4">
          {wishlistItems.length > 0 ? (
            wishlistItems.map((wishlistItem) => (
              <WishlistItem
                key={wishlistItem.id}
                lang={lang}
                wishlistItem={wishlistItem}
              />
            ))
          ) : (
            <Empty
              lang={lang}
              title={dict.wishlist.empty}
              description={dict.wishlist.description}
              btnText={dict.wishlist.btnText}
            />
          )}
        </div>
      </div>
    </>
  );
}
