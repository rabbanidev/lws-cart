'use client';

import { Locale } from '@/i18n.config';
import { Address as IAddress, Dictionary } from '../../../types/index';
import ShippingForm from './ShippingForm';
import DeliveryForm from './DeliveryForm';
import SubmitButton from '../UI/SubmitButton';
import { useFormState } from 'react-dom';
import { createOrRemoveAddressAction } from '@/actions/address';
import ErrorMessage from '../UI/Error';

type Props = {
  lang: Locale;
  dict: Dictionary;
  address: IAddress;
};

export default function AddressForm({ dict, lang, address }: Props) {
  const [state, formAction] = useFormState(createOrRemoveAddressAction, null);

  return (
    <form action={formAction}>
      <ShippingForm dict={dict} address={address.shipping} />
      <DeliveryForm dict={dict} address={address.delivery} />
      <SubmitButton
        lang={lang}
        className="mt-5 block cursor-pointer rounded border border-primary bg-primary px-8 py-2 text-center font-roboto font-medium uppercase text-white transition hover:bg-transparent hover:text-primary"
      >
        {dict.address.form.submitBtnText}
      </SubmitButton>
      {state?.status !== 201 && state?.message && (
        <div className="mt-4">
          <ErrorMessage message={state?.message} />
        </div>
      )}
    </form>
  );
}
