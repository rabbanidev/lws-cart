/* eslint-disable @typescript-eslint/ban-ts-comment */
import Image from 'next/image';
import {
  Color,
  Dictionary,
  Product as IProduct,
  Size,
} from '../../../types/index';
import { getDictionary } from '../../../lib/dictionaries';
import { Locale } from '@/i18n.config';
import ViewButton from '../shared/ViewButton';
import WishlistButton from '../shared/WishlistButton';
import AddToCartButton from '../shared/AddToCartButton';
import Rating from '../shared/Rating';
import LwsLink from '../shared/LwsLink';
import numberFixed from '../../../utils/numberFixed';
import { auth } from '@/auth';
import { replaceMongoIdInObject } from '../../../utils/mongo';

type Props = {
  lang: Locale;
  product: IProduct;
};

export default async function ProductCard({ lang, product }: Props) {
  const dict: Dictionary = await getDictionary(lang);
  const session = await auth();

  const {
    id: productId,
    images,
    name,
    price,
    discountPrice,
    reviews,
    rating,
    colors,
    sizes,
  } = product || {};

  return (
    <div className="group overflow-hidden rounded bg-white shadow">
      <div className="relative">
        <Image
          src={images[0]}
          alt={name}
          className="h-auto w-full object-contain"
          width={100}
          height={100}
        />
        <div className="absolute inset-0 flex items-center justify-center gap-2 bg-black bg-opacity-40 opacity-0 transition group-hover:opacity-100">
          <ViewButton title={dict.product.view} />
          <WishlistButton
            text={dict.product.addToWishlist}
            productId={productId}
            lang={lang}
            session={session}
          />
        </div>
      </div>
      <div className="px-4 pb-3 pt-4">
        <LwsLink lang={lang} href={`/products/${productId}`}>
          <h4
            className="mb-2 truncate text-xl font-medium uppercase text-gray-800 transition hover:text-primary"
            title={name}
          >
            {name}
          </h4>
        </LwsLink>
        <div className="mb-1 flex items-baseline space-x-2">
          <p className="text-xl font-semibold text-primary">
            ${numberFixed(price, 2)}
          </p>
          {discountPrice && (
            <p className="text-sm text-gray-400 line-through">
              ${numberFixed(discountPrice, 2)}
            </p>
          )}
        </div>
        <div className="flex items-center">
          <Rating rating={rating} />
          <div className="ml-3 text-xs text-gray-500">
            ({reviews?.length || 0})
          </div>
        </div>
      </div>
      <AddToCartButton
        text={dict.product.addToCart}
        session={session}
        productId={productId}
        lang={lang}
        quantity={1}
        color={replaceMongoIdInObject(colors[0]) as Color}
        size={replaceMongoIdInObject(sizes[0]) as Size}
      />
    </div>
  );
}
