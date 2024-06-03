import { Locale } from '@/i18n.config';
import { Dictionary } from '../../../../../../types/index';
import { getDictionary } from '../../../../../../lib/dictionaries';
import AddressForm from '@/components/address/AddressForm';
import { getUserAddressAction } from '@/actions/address';
import ErrorMessage from '@/components/UI/Error';

type Props = {
  params: {
    lang: Locale;
  };
};

export default async function AddressPage({ params: { lang } }: Props) {
  const dict: Dictionary = await getDictionary(lang);
  const result = await getUserAddressAction();

  if (result.status !== 200) {
    return (
      <div className="mt-4">
        <ErrorMessage message={result?.message} />
      </div>
    );
  }

  return (
    <div>
      <h3 className="text-2xl font-medium uppercase leading-4 tracking-wider text-gray-600">
        {dict.address.title}
      </h3>
      <AddressForm lang={lang} dict={dict} address={result.address} />
    </div>
  );
}
