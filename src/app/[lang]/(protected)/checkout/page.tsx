import BreadCrumb from '@/components/UI/BreadCrumb';
import { Locale } from '@/i18n.config';
import { getDictionary } from '../../../../../lib/dictionaries';
import { Dictionary } from '../../../../../types/index';
import { getFromCartsAction } from '@/actions/cart';
import CheckoutForm from '@/components/checkout/CheckoutForm';
import { getUserAddressAction } from '@/actions/address';

type Props = {
  params: {
    lang: Locale;
  };
};

export default async function CheckoutPage({ params: { lang } }: Props) {
  const dict: Dictionary = await getDictionary(lang);
  const cart = await getFromCartsAction();
  const result = await getUserAddressAction();

  const cartItems = cart?.items || [];

  return (
    <>
      <BreadCrumb lang={lang} title={dict.checkout.title} />
      <div className="container gap-6 pb-16 pt-4">
        <CheckoutForm
          lang={lang}
          dict={dict}
          cartItems={cartItems}
          address={result.address}
        />
      </div>
    </>
  );
}
