import Image from 'next/image';
import {
  Color,
  Dictionary,
  WishlistItem as IWishlistItem,
  Product,
  Size,
} from '../../../types/index';
import { Locale } from '@/i18n.config';
import { getDictionary } from '../../../lib/dictionaries';
import numberFixed from '../../../utils/numberFixed';
import AddToCartButton from '../shared/AddToCartButton';
import { auth } from '@/auth';
import WishlistRemoveButton from './WishlistRemoveButton';
import { replaceMongoIdInObject } from '../../../utils/mongo';
import LwsLink from '../shared/LwsLink';

type Props = {
  lang: Locale;
  wishlistItem: IWishlistItem;
};

export default async function WishlistItem({ lang, wishlistItem }: Props) {
  const dict: Dictionary = await getDictionary(lang);
  const session = await auth();

  const product = replaceMongoIdInObject(wishlistItem.product) as Product;

  const {
    id: productId,
    name,
    images,
    availability,
    price,
    stock,
    colors,
    sizes,
  } = product;

  return (
    <div className="flex items-center justify-between gap-6 rounded border border-gray-200 p-4">
      <div className="h-28 w-28">
        <LwsLink lang={lang} href={`/products/${productId}`}>
          <Image
            src={images[0]}
            alt={name}
            width={100}
            height={100}
            className="h-full w-full"
          />
        </LwsLink>
      </div>
      <div className="w-1/3">
        <LwsLink
          lang={lang}
          href={`/products/${productId}`}
          className="text-xl font-medium uppercase text-gray-800 hover:text-primary hover:underline"
        >
          {name}
        </LwsLink>
        <p className="text-sm text-gray-500">
          {dict.product.availability}:{' '}
          <span
            className={
              availability === 'In Stock' ? 'text-green-600' : 'text-primary'
            }
          >
            {availability} ({stock})
          </span>
        </p>
      </div>
      <div className="text-lg font-semibold text-primary">
        ${numberFixed(price)}
      </div>

      <AddToCartButton
        isDetails
        text={
          product.stock === 0 ? dict.product.stockOut : dict.product.addToCart
        }
        productId={productId}
        lang={lang}
        session={session}
        quantity={1}
        color={replaceMongoIdInObject(colors[0]) as Color}
        size={replaceMongoIdInObject(sizes[0]) as Size}
        isDisabled={product.stock === 0}
      />

      <WishlistRemoveButton productId={productId} />
    </div>
  );
}
