import { CommonAddress, Dictionary } from '../../../types/index';

type Props = {
  dict: Dictionary;
  address: Partial<CommonAddress>;
};

export default function ShippingForm({ dict, address }: Props) {
  return (
    <div className="mt-8">
      <h3 className="text-lg font-medium uppercase leading-4 tracking-wider text-gray-600">
        {dict.address.shipping.title}
      </h3>
      <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">
        <div>
          <label htmlFor="shipping.name" className="mb-2 block text-gray-600">
            {dict.address.form.name}
          </label>
          <input
            type="text"
            name="shipping.name"
            id="shipping.name"
            className="block w-full rounded border border-gray-300 px-4 py-3 text-sm text-gray-600 placeholder-gray-400 focus:border-primary focus:ring-0"
            defaultValue={address?.name}
          />
        </div>
        <div>
          <label htmlFor="shipping.email" className="mb-2 block text-gray-600">
            {dict.address.form.email}
          </label>
          <input
            type="email"
            name="shipping.email"
            id="shipping.email"
            className="block w-full rounded border border-gray-300 px-4 py-3 text-sm text-gray-600 placeholder-gray-400 focus:border-primary focus:ring-0"
            defaultValue={address?.email}
          />
        </div>
        <div>
          <label
            htmlFor="shipping.contactNumber"
            className="mb-2 block text-gray-600"
          >
            {dict.address.form.contactNumber}
          </label>
          <input
            type="text"
            name="shipping.contactNumber"
            id="shipping.contactNumber"
            className="block w-full rounded border border-gray-300 px-4 py-3 text-sm text-gray-600 placeholder-gray-400 focus:border-primary focus:ring-0"
            defaultValue={address?.contactNumber}
          />
        </div>
        <div>
          <label
            htmlFor="shipping.streetAddress"
            className="mb-2 block text-gray-600"
          >
            {dict.address.form.streetAddress}
          </label>
          <input
            type="text"
            name="shipping.streetAddress"
            id="shipping.streetAddress"
            className="block w-full rounded border border-gray-300 px-4 py-3 text-sm text-gray-600 placeholder-gray-400 focus:border-primary focus:ring-0"
            defaultValue={address?.streetAddress}
          />
        </div>
        <div>
          <label htmlFor="shipping.city" className="mb-2 block text-gray-600">
            {dict.address.form.city}
          </label>
          <input
            type="text"
            name="shipping.city"
            id="shipping.city"
            className="block w-full rounded border border-gray-300 px-4 py-3 text-sm text-gray-600 placeholder-gray-400 focus:border-primary focus:ring-0"
            defaultValue={address?.city}
          />
        </div>
        <div>
          <label
            htmlFor="shipping.country"
            className="mb-2 block text-gray-600"
          >
            {dict.address.form.country}
          </label>
          <input
            type="text"
            name="shipping.country"
            id="shipping.country"
            className="block w-full rounded border border-gray-300 px-4 py-3 text-sm text-gray-600 placeholder-gray-400 focus:border-primary focus:ring-0"
            defaultValue={address?.country}
          />
        </div>
      </div>
    </div>
  );
}
