'use client';

import { Locale } from '@/i18n.config';
import OrderSummary from '../order/OrderSummary';
import { Address, Cart, Dictionary } from '../../../types/index';
import ShippingForm from '../address/ShippingForm';
import DeliveryForm from '../address/DeliveryForm';
import SubmitButton from '../UI/SubmitButton';
import { useFormState } from 'react-dom';
import { placeOrder } from '@/actions/checkout';

type Props = {
  lang: Locale;
  dict: Dictionary;
  cartItems: Cart[];
  address: Address;
};

export default function CheckoutForm({
  lang,
  dict,
  cartItems,
  address,
}: Props) {
  const [state, formAction] = useFormState(placeOrder, null);

  const handleAction = (formData: FormData) => {
    formAction(formData);
  };

  return (
    <form action={handleAction}>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
        <div className="col-span-1 space-y-4 lg:col-span-8">
          <ShippingForm
            dict={dict}
            address={address.shipping}
            errors={state?.errors}
          />
          <div className="mt-8">
            <DeliveryForm
              dict={dict}
              address={address.delivery}
              errors={state?.errors}
            />
          </div>
        </div>
        <div className="col-span-4 rounded border border-gray-200 p-4">
          <OrderSummary isCheckout dict={dict} cartItems={cartItems}>
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
            <SubmitButton
              lang={lang}
              className="block w-full rounded-md border border-primary bg-primary px-4 py-3 text-center font-medium text-white transition hover:bg-transparent hover:text-primary"
            >
              {dict.checkout.placeOrder}
            </SubmitButton>
          </OrderSummary>
        </div>
      </div>
    </form>
  );
}
