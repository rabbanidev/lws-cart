/* eslint-disable @typescript-eslint/ban-ts-comment */

import Rating from '@/components/shared/Rating';
import DetailsAction from './DetailsAction';
import SocialShare from './SocialShare';
import { Locale } from '@/i18n.config';
import { getDictionary } from '../../../../lib/dictionaries';
import { Dictionary, Product as IProduct } from '../../../../types/index';
import numberFixed from '../../../../utils/numberFixed';
import { auth } from '@/auth';
import { getWishlistItemsAction } from '@/actions/wishlist';
import { getFromCartsAction } from '@/actions/cart';
import { replaceMongoIdInObject } from '../../../../utils/mongo';

type Props = {
  lang: Locale;
  product: IProduct;
};

export default async function DetailsContent({ lang, product }: Props) {
  const dict: Dictionary = await getDictionary(lang);
  const session = await auth();
  const wishlist = await getWishlistItemsAction();
  const carts = await getFromCartsAction();

  const {
    id: productId,
    name,
    reviews,
    availability,
    categories,
    brand,
    sku,
    price,
    discountPrice,
    shortDescription,
    stock,
  } = product || {};

  const wishlistItem =
    wishlist.items &&
    wishlist.items.find((item) => {
      const cartProduct = replaceMongoIdInObject(item.product) as IProduct;
      return cartProduct.id === productId;
    });

  const cartItem =
    carts.items &&
    carts.items.find((item) => {
      const cartProduct = replaceMongoIdInObject(item.product) as IProduct;
      return cartProduct.id === productId;
    });

  return (
    <div>
      <h2 className="mb-2 text-3xl font-medium uppercase">{name}</h2>
      <div className="mb-4 flex items-center">
        <Rating rating={3} />
        <div className="ml-3 text-xs text-gray-500">
          ({reviews?.length} {dict.product.reviews})
        </div>
      </div>
      <div className="space-y-2">
        <p className="space-x-2 font-semibold text-gray-800">
          <span>{dict.product.availability}: </span>
          <span
            className={
              availability === 'In Stock' || stock !== 0
                ? 'text-green-600'
                : 'text-primary'
            }
          >
            {availability} ({stock})
          </span>
        </p>
        <p className="space-x-2">
          <span className="font-semibold text-gray-800">
            {dict.product.brand}:{' '}
          </span>
          <span className="text-gray-600">{brand}</span>
        </p>
        <p className="space-x-2">
          <span className="font-semibold text-gray-800">
            {dict.product.category}:{' '}
          </span>
          <span className="text-gray-600">
            {categories.map((category, index) =>
              index + 1 === categories.length
                ? `${category.name}`
                : `${category.name}, `,
            )}
          </span>
        </p>
        <p className="space-x-2">
          <span className="font-semibold text-gray-800">
            {dict.product.sku}:{' '}
          </span>
          <span className="text-gray-600">{sku}</span>
        </p>
      </div>
      <div className="mb-1 mt-4 flex items-baseline space-x-2 font-roboto">
        <p className="text-xl font-semibold text-primary">
          ${numberFixed(price, 2)}
        </p>
        {discountPrice && (
          <p className="text-base text-gray-400 line-through">
            ${numberFixed(discountPrice, 2)}
          </p>
        )}
      </div>

      <p className="mt-4 text-gray-600">{shortDescription}</p>

      <DetailsAction
        dict={dict}
        lang={lang}
        product={JSON.parse(JSON.stringify(product))}
        session={session}
        alreadyAddedInWishlist={Boolean(wishlistItem)}
        cartItem={cartItem}
      />
      <SocialShare id={productId} />
    </div>
  );
}
