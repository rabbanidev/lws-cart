import Image from 'next/image';
import { Dictionary } from '../../../types/index';
import { Locale } from '@/i18n.config';
import { getDictionary } from '../../../lib/dictionaries';

type IProps = {
  lang: Locale;
};

export default async function Features({ lang }: IProps) {
  const dict: Dictionary = await getDictionary(lang);

  return (
    <div className="container py-16">
      <div className="mx-auto grid w-10/12 grid-cols-1 justify-center gap-6 md:grid-cols-3">
        <div className="flex items-center justify-center gap-5 rounded-sm border border-primary px-3 py-6">
          <Image
            src="/icons/delivery-van.svg"
            alt="Delivery"
            className="h-12 w-12 object-contain"
            width={48}
            height={48}
          />
          <div>
            <h4 className="text-lg font-medium capitalize">
              {dict.home.features.shipping}
            </h4>
            <p className="text-sm text-gray-500">
              {dict.home.features.orderOver}
            </p>
          </div>
        </div>
        <div className="flex items-center justify-center gap-5 rounded-sm border border-primary px-3 py-6">
          <Image
            src="/icons/money-back.svg"
            alt="Delivery"
            className="h-12 w-12 object-contain"
            width={48}
            height={48}
          />
          <div>
            <h4 className="text-lg font-medium capitalize">
              {dict.home.features.moneyReturns}
            </h4>
            <p className="text-sm text-gray-500">
              {dict.home.features.moneyReturns30Day}
            </p>
          </div>
        </div>
        <div className="flex items-center justify-center gap-5 rounded-sm border border-primary px-3 py-6">
          <Image
            src="/icons/service-hours.svg"
            alt="Delivery"
            className="h-12 w-12 object-contain"
            width={48}
            height={48}
          />
          <div>
            <h4 className="text-lg font-medium capitalize">
              {dict.home.features.support}
            </h4>
            <p className="text-sm text-gray-500">
              {dict.home.features.customerSupport}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
