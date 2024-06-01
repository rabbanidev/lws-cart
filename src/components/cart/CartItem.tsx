import Image from 'next/image';
import { Cart as ICart, Dictionary, Product } from '../../../types/index';
import { Locale } from '@/i18n.config';
import { getDictionary } from '../../../lib/dictionaries';
import numberFixed from '../../../utils/numberFixed';
import LwsLink from '../shared/LwsLink';
import { replaceMongoIdInObject } from '../../../utils/mongo';
import CartItemAction from './CartItemAction';
import CartRemoveButton from '../wishlist/CartRemoveButton';

type Props = {
  lang: Locale;
  cartItem: ICart;
};

export default async function CartItem({ lang, cartItem }: Props) {
  const dict: Dictionary = await getDictionary(lang);

  const product = replaceMongoIdInObject(cartItem.product) as Product;

  const { id: productId, name, images, availability, price, stock } = product;

  return (
    <div className="grid grid-cols-12 gap-4 rounded border border-gray-200 p-4">
      <div className="col-span-6 flex items-center gap-x-4">
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
        <div>
          <LwsLink
            lang={lang}
            href={`/products/${productId}`}
            className="text-lg font-medium uppercase text-gray-800 hover:text-primary hover:underline"
          >
            {name}
          </LwsLink>
          <p className="text-sm text-gray-600">
            {dict.product.colors} -{' '}
            <span className="font-medium uppercase text-primary">
              {cartItem.selectedColor.title}
            </span>
          </p>
          <p className="text-sm text-gray-600">
            {dict.product.sizes} -{' '}
            <span className="font-medium uppercase text-primary">
              {cartItem.selectedSize.title}
            </span>
          </p>
          <p className="text-sm text-gray-600">
            {dict.product.availability} -{' '}
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
          <CartItemAction cartItem={cartItem} />
        </div>
      </div>
      <div className="col-span-2 mt-10">${numberFixed(price)}</div>
      <div className="col-span-4 mt-10 text-lg font-semibold text-primary">
        <div className="flex items-center justify-end gap-x-4">
          <p className="text-base font-medium text-primary">
            ${numberFixed(cartItem.subTotal)}
          </p>
          <CartRemoveButton cartItemId={cartItem.id} />
        </div>
      </div>
    </div>
  );
}
