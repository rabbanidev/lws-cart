import { ZodIssue } from 'zod';
import { CommonAddress, Dictionary } from '../../../types/index';
import { findErrorByPath } from '../../../utils/zod';
import ErrorMessage from '../UI/Error';

type Props = {
  dict: Dictionary;
  address: Partial<CommonAddress>;
  errors: ZodIssue[] | undefined;
};

export default function ShippingForm({ dict, address, errors }: Props) {
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
          {findErrorByPath(errors, ['shipping', 'name'])?.message && (
            <ErrorMessage
              message={
                findErrorByPath(errors, ['shipping', 'name'])?.message || ''
              }
            />
          )}
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
          {findErrorByPath(errors, ['shipping', 'email'])?.message && (
            <ErrorMessage
              message={
                findErrorByPath(errors, ['shipping', 'email'])?.message || ''
              }
            />
          )}
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
          {findErrorByPath(errors, ['shipping', 'contactNumber'])?.message && (
            <ErrorMessage
              message={
                findErrorByPath(errors, ['shipping', 'contactNumber'])
                  ?.message || ''
              }
            />
          )}
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
          {findErrorByPath(errors, ['shipping', 'streetAddress'])?.message && (
            <ErrorMessage
              message={
                findErrorByPath(errors, ['shipping', 'streetAddress'])
                  ?.message || ''
              }
            />
          )}
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
          {findErrorByPath(errors, ['shipping', 'city'])?.message && (
            <ErrorMessage
              message={
                findErrorByPath(errors, ['shipping', 'city'])?.message || ''
              }
            />
          )}
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
          {findErrorByPath(errors, ['shipping', 'country'])?.message && (
            <ErrorMessage
              message={
                findErrorByPath(errors, ['shipping', 'country'])?.message || ''
              }
            />
          )}
        </div>
      </div>
    </div>
  );
}
