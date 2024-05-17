import Image from 'next/image';

type IProps = {
  dict: {
    shipping: string;
    orderOver: string;
    moneyReturns: string;
    moneyReturns30Day: string;
    support: string;
    customerSupport: string;
  };
};

export default function Features({ dict }: IProps) {
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
            <h4 className="text-lg font-medium capitalize">{dict.shipping}</h4>
            <p className="text-sm text-gray-500">{dict.orderOver}</p>
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
              {dict.moneyReturns}
            </h4>
            <p className="text-sm text-gray-500">{dict.moneyReturns30Day}</p>
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
            <h4 className="text-lg font-medium capitalize">{dict.support}</h4>
            <p className="text-sm text-gray-500">{dict.customerSupport}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
