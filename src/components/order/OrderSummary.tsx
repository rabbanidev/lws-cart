import { Locale } from '@/i18n.config';
import { Dictionary } from '../../../types/index';
import { getDictionary } from '../../../lib/dictionaries';
import { getFromCartsAction } from '@/actions/cart';
import numberFixed from '../../../utils/numberFixed';
import {
  shippingChargeCal,
  subTotalCal,
  totalPriceCal,
} from '../../../utils/cal';

type Props = {
  lang: Locale;
  isCheckout?: boolean;
  children?: React.ReactNode;
};

export default async function OrderSummary({
  lang,
  isCheckout = false,
  children,
}: Props) {
  const dict: Dictionary = await getDictionary(lang);
  const cart = await getFromCartsAction();
  const cartItems = cart?.items || [];

  const subTotal = subTotalCal(cartItems);
  const shippingCharge = shippingChargeCal(subTotal);
  const total = totalPriceCal(subTotal, shippingCharge);

  return (
    <>
      <h4 className="mb-4 text-lg font-medium uppercase text-gray-800">
        {dict.orders.summary.title}
      </h4>
      {isCheckout && (
        <div className="space-y-2">
          {cartItems.map((cartItem) => (
            <div key={cartItem.id} className="flex justify-between">
              <div>
                <h5 className="w-56 truncate font-medium text-gray-800">
                  {cartItem.product.name}Templeton Solid Formal Shirt
                </h5>
                <p className="text-sm uppercase text-gray-600">
                  {dict.product.colors}: {cartItem.selectedColor.title}
                </p>
                <p className="text-sm uppercase text-gray-600">
                  {dict.product.sizes}: {cartItem.selectedSize.title}
                </p>
              </div>
              <p className="text-gray-600">x{cartItem.quantity}</p>
              <p className="font-medium text-gray-800">
                ${numberFixed(cartItem.subTotal, 2)}
              </p>
            </div>
          ))}
        </div>
      )}

      <div className="uppercas mt-1 flex justify-between border-b border-gray-200 py-3 font-medium text-gray-800">
        <p>{dict.orders.summary.subTotal}</p>
        <p>${numberFixed(subTotal, 2)}</p>
      </div>

      <div className="uppercas mt-1 flex justify-between border-b border-gray-200 py-3 font-medium text-gray-800">
        <p>{dict.orders.summary.shipping}</p>
        <p>
          {shippingCharge === 0
            ? dict.orders.summary.free
            : `$${numberFixed(shippingCharge)}`}
        </p>
      </div>

      <div className="uppercas flex justify-between py-3 font-medium text-gray-800">
        <p className="font-semibold">{dict.orders.summary.total}</p>
        <p>${numberFixed(total, 2)}</p>
      </div>

      {children}
    </>
  );
}
