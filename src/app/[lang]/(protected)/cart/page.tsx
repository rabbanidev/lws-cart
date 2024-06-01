import AutoCartItemAdder from '@/components/cart/AutoCartItemAdder';
import { Suspense } from 'react';
import { getDictionary } from '../../../../../lib/dictionaries';
import { getFromCartsAction } from '@/actions/cart';
import BreadCrumb from '@/components/UI/BreadCrumb';
import Empty from '@/components/shared/Empty';
import { Dictionary } from '../../../../../types/index';
import CartItem from '@/components/cart/CartItem';
import { Locale } from '@/i18n.config';
import OrderSummary from '@/components/order/OrderSummary';
import LwsLink from '@/components/shared/LwsLink';

type Props = {
  params: {
    lang: Locale;
  };
  searchParams: {
    [key: string]: string;
  };
};

export default async function CartPage({
  params: { lang },
  searchParams,
}: Props) {
  const dict: Dictionary = await getDictionary(lang);
  const cart = await getFromCartsAction();

  const cartItems = cart?.items || [];

  return (
    <>
      {searchParams.id &&
        searchParams.color &&
        searchParams.size &&
        searchParams.qty && (
          <Suspense>
            <AutoCartItemAdder />
          </Suspense>
        )}
      <BreadCrumb lang={lang} title={dict.cart.title} />
      <div className="container gap-6 pb-16 pt-4">
        {cartItems.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
            <div className="col-span-1 space-y-4 lg:col-span-8">
              <div className="grid grid-cols-12 gap-4 rounded border border-gray-200 p-2">
                <div className="col-span-6 flex items-center gap-x-4">
                  <p className="text-lg font-medium uppercase text-gray-800">
                    {dict.cart.product}
                  </p>
                </div>
                <div className="col-span-2">
                  <p className="text-lg font-medium uppercase text-gray-800">
                    {dict.cart.price}
                  </p>
                </div>
                <div className="col-span-4 text-lg font-semibold text-primary">
                  <p className="text-right text-lg font-medium uppercase text-gray-800">
                    {dict.cart.subTotal}
                  </p>
                </div>
              </div>
              {cartItems.map((cartItem) => (
                <CartItem key={cartItem.id} lang={lang} cartItem={cartItem} />
              ))}
            </div>
            <div className="col-span-4 rounded border border-gray-200 p-4">
              <OrderSummary lang={lang} isCheckout={false}>
                <LwsLink
                  lang={lang}
                  href="/checkout"
                  className="block w-full rounded-md border border-primary bg-primary px-4 py-3 text-center font-medium text-white transition hover:bg-transparent hover:text-primary"
                >
                  {dict.orders.summary.proceedToCheckout}
                </LwsLink>
              </OrderSummary>
            </div>
          </div>
        ) : (
          <Empty
            lang={lang}
            title={dict.cart.empty}
            description={dict.cart.description}
            btnText={dict.cart.btnText}
          />
        )}
      </div>
    </>
  );
}
