'use client';

import { Locale } from '@/i18n.config';
import OrderSummary from '../order/OrderSummary';
import { Address, Cart, Dictionary } from '../../../types/index';
import ShippingForm from '../address/ShippingForm';
import DeliveryForm from '../address/DeliveryForm';
import SubmitButton from '../UI/SubmitButton';
import { useFormState } from 'react-dom';
import { placeOrder } from '@/actions/checkout';
import {
  shippingChargeCal,
  subTotalCal,
  totalPriceCal,
} from '../../../utils/cal';
import ErrorMessage from '../UI/Error';
import Modal from '../UI/Modal';
import { useEffect, useState } from 'react';
import { AiOutlineCheck } from 'react-icons/ai';
import { useRouter } from 'next/navigation';

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
  const [show, setShow] = useState(false);
  const router = useRouter();
  const [state, formAction] = useFormState(placeOrder, null);

  const subTotal = subTotalCal(cartItems);
  const shippingCharge = shippingChargeCal(subTotal);
  const total = totalPriceCal(subTotal, shippingCharge);

  const handleAction = (formData: FormData) => {
    formData.set('orderItems', JSON.stringify(cartItems));
    formData.set('subTotal', String(subTotal));
    formData.set('shipping', String(shippingCharge));
    formData.set('total', String(total));

    formAction(formData);
  };

  useEffect(() => {
    if (state?.status === 201 && state.order) {
      setShow(true);
    }
  }, [state?.order, state?.status]);

  return (
    <>
      <form action={handleAction}>
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
          <div className="col-span-1 space-y-4 lg:col-span-8">
            <ShippingForm
              dict={dict}
              address={address?.shipping}
              errors={state?.errors}
            />
            <div className="mt-8">
              <DeliveryForm
                dict={dict}
                address={address?.delivery}
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
              {state?.status !== 201 && state?.message && (
                <div className="mt-4">
                  <ErrorMessage message={state.message} />
                </div>
              )}
            </OrderSummary>
          </div>
        </div>
      </form>
      {show && (
        <Modal
          show={show}
          size="sm"
          onClose={() => {
            setShow(false);
            router.push('/');
          }}
        >
          <div className="flex flex-col items-center justify-center p-8">
            <AiOutlineCheck size={50} />
            <p className="mt-5 text-3xl font-medium text-gray-800">
              {dict.orders.success.title}
            </p>
            <p className="mt-2 px-10 text-center text-lg font-medium text-gray-800">
              {dict.orders.success.description}
            </p>
            <a
              href={`/uploads/invoices/${state?.order.invoiceId}.pdf`}
              className="mt-5 block rounded-b border border-primary bg-primary px-5 py-1.5 text-center text-white transition hover:bg-transparent hover:text-primary"
            >
              {dict.orders.success.download}
            </a>
          </div>
        </Modal>
      )}
    </>
  );
}
