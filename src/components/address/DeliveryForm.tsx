import { ZodIssue } from 'zod';
import { CommonAddress, Dictionary } from '../../../types/index';
import { findErrorByPath } from '../../../utils/zod';
import ErrorMessage from '../UI/Error';

type Props = {
  dict: Dictionary;
  address: Partial<CommonAddress>;
  errors: ZodIssue[] | undefined;
};
export default function DeliveryForm({ dict, address, errors }: Props) {
  return (
    <div className="mt-12">
      <h3 className="text-lg font-medium uppercase leading-4 tracking-wider text-gray-600">
        {dict.address.delivery.title}
      </h3>
      <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">
        <div>
          <label htmlFor="delivery.name" className="mb-2 block text-gray-600">
            {dict.address.form.name}
          </label>
          <input
            type="text"
            name="delivery.name"
            id="delivery.name"
            className="block w-full rounded border border-gray-300 px-4 py-3 text-sm text-gray-600 placeholder-gray-400 focus:border-primary focus:ring-0"
            defaultValue={address?.name}
          />
          {findErrorByPath(errors, ['delivery', 'name'])?.message && (
            <ErrorMessage
              message={
                findErrorByPath(errors, ['delivery', 'name'])?.message || ''
              }
            />
          )}
        </div>
        <div>
          <label htmlFor="delivery.email" className="mb-2 block text-gray-600">
            {dict.address.form.email}
          </label>
          <input
            type="email"
            name="delivery.email"
            id="delivery.email"
            className="block w-full rounded border border-gray-300 px-4 py-3 text-sm text-gray-600 placeholder-gray-400 focus:border-primary focus:ring-0"
            defaultValue={address?.email}
          />
          {findErrorByPath(errors, ['delivery', 'email'])?.message && (
            <ErrorMessage
              message={
                findErrorByPath(errors, ['delivery', 'email'])?.message || ''
              }
            />
          )}
        </div>
        <div>
          <label
            htmlFor="delivery.contactNumber"
            className="mb-2 block text-gray-600"
          >
            {dict.address.form.contactNumber}
          </label>
          <input
            type="text"
            name="delivery.contactNumber"
            id="delivery.contactNumber"
            className="block w-full rounded border border-gray-300 px-4 py-3 text-sm text-gray-600 placeholder-gray-400 focus:border-primary focus:ring-0"
            defaultValue={address?.contactNumber}
          />
          {findErrorByPath(errors, ['delivery', 'contactNumber'])?.message && (
            <ErrorMessage
              message={
                findErrorByPath(errors, ['delivery', 'contactNumber'])
                  ?.message || ''
              }
            />
          )}
        </div>
        <div>
          <label
            htmlFor="delivery.streetAddress"
            className="mb-2 block text-gray-600"
          >
            {dict.address.form.streetAddress}
          </label>
          <input
            type="text"
            name="delivery.streetAddress"
            id="delivery.streetAddress"
            className="block w-full rounded border border-gray-300 px-4 py-3 text-sm text-gray-600 placeholder-gray-400 focus:border-primary focus:ring-0"
            defaultValue={address?.streetAddress}
          />
          {findErrorByPath(errors, ['delivery', 'streetAddress'])?.message && (
            <ErrorMessage
              message={
                findErrorByPath(errors, ['delivery', 'streetAddress'])
                  ?.message || ''
              }
            />
          )}
        </div>
        <div>
          <label htmlFor="delivery.city" className="mb-2 block text-gray-600">
            {dict.address.form.city}
          </label>
          <input
            type="text"
            name="delivery.city"
            id="delivery.city"
            className="block w-full rounded border border-gray-300 px-4 py-3 text-sm text-gray-600 placeholder-gray-400 focus:border-primary focus:ring-0"
            defaultValue={address?.city}
          />
          {findErrorByPath(errors, ['delivery', 'city'])?.message && (
            <ErrorMessage
              message={
                findErrorByPath(errors, ['delivery', 'city'])?.message || ''
              }
            />
          )}
        </div>
        <div>
          <label
            htmlFor="delivery.country"
            className="mb-2 block text-gray-600"
          >
            {dict.address.form.country}
          </label>
          <input
            type="text"
            name="delivery.country"
            id="delivery.country"
            className="block w-full rounded border border-gray-300 px-4 py-3 text-sm text-gray-600 placeholder-gray-400 focus:border-primary focus:ring-0"
            defaultValue={address?.country}
          />
          {findErrorByPath(errors, ['delivery', 'country'])?.message && (
            <ErrorMessage
              message={
                findErrorByPath(errors, ['delivery', 'country'])?.message || ''
              }
            />
          )}
        </div>
      </div>
    </div>
  );
}
