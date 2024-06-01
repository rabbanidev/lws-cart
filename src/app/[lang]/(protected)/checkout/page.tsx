import BreadCrumb from '@/components/UI/BreadCrumb';
import { Locale } from '@/i18n.config';
import { getDictionary } from '../../../../../lib/dictionaries';
import { Dictionary } from '../../../../../types/index';
import { getFromCartsAction } from '@/actions/cart';
import { redirect } from 'next/navigation';
import OrderSummary from '@/components/order/OrderSummary';

type Props = {
  params: {
    lang: Locale;
  };
};

export default async function CheckoutPage({ params: { lang } }: Props) {
  const dict: Dictionary = await getDictionary(lang);
  const cart = await getFromCartsAction();

  const cartItems = cart?.items || [];

  if (cartItems.length === 0) {
    redirect('/cart');
  }

  return (
    <>
      <BreadCrumb lang={lang} title={dict.checkout.title} />
      <div className="container gap-6 pb-16 pt-4">
        <form>
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
            <div className="col-span-1 space-y-4 lg:col-span-8"></div>
            <div className="col-span-4 rounded border border-gray-200 p-4">
              <OrderSummary isCheckout lang={lang}>
                <div className="mb-4 mt-2 flex items-center">
                  <input
                    type="checkbox"
                    name="aggrement"
                    id="aggrement"
                    className="h-3 w-3 cursor-pointer rounded-sm text-primary focus:ring-0"
                    required={true}
                  />
                  <label
                    htmlFor="aggrement"
                    className="ml-3 cursor-pointer text-sm text-gray-600"
                    dangerouslySetInnerHTML={{
                      __html: dict.checkout.termsCondition,
                    }}
                  ></label>
                </div>
                <button
                  type="submit"
                  className="block w-full rounded-md border border-primary bg-primary px-4 py-3 text-center font-medium text-white transition hover:bg-transparent hover:text-primary"
                >
                  {dict.checkout.placeOrder}
                </button>
              </OrderSummary>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
