'use client';

import { Dictionary } from '../../../types';

type Props = {
  dict: Dictionary;
};

export default function RegisterForm({ dict }: Props) {
  return (
    <form action="#" autoComplete="off">
      <div className="space-y-2">
        <div>
          <label htmlFor="name" className="mb-2 block text-gray-600">
            {dict.auth.name} <span className="text-primary">*</span>
          </label>
          <input
            type="text"
            name="name"
            id="name"
            className="block w-full rounded border border-gray-300 px-4 py-3 text-sm text-gray-600 placeholder-gray-400 focus:border-primary focus:ring-0"
            placeholder="fulan fulana"
          />
        </div>
        <div>
          <label htmlFor="email" className="mb-2 block text-gray-600">
            {dict.auth.emailAddress} <span className="text-primary">*</span>
          </label>
          <input
            type="email"
            name="email"
            id="email"
            className="block w-full rounded border border-gray-300 px-4 py-3 text-sm text-gray-600 placeholder-gray-400 focus:border-primary focus:ring-0"
            placeholder="youremail.@domain.com"
          />
        </div>
        <div>
          <label htmlFor="password" className="mb-2 block text-gray-600">
            {dict.auth.password} <span className="text-primary">*</span>
          </label>
          <input
            type="password"
            name="password"
            id="password"
            className="block w-full rounded border border-gray-300 px-4 py-3 text-sm text-gray-600 placeholder-gray-400 focus:border-primary focus:ring-0"
            placeholder="*******"
          />
        </div>
        <div>
          <label htmlFor="confirm" className="mb-2 block text-gray-600">
            {dict.auth.confirmPassword} <span className="text-primary">*</span>
          </label>
          <input
            type="password"
            name="confirm"
            id="confirm"
            className="block w-full rounded border border-gray-300 px-4 py-3 text-sm text-gray-600 placeholder-gray-400 focus:border-primary focus:ring-0"
            placeholder="*******"
          />
        </div>
      </div>
      <div className="mt-6">
        <div className="flex items-center">
          <input
            type="checkbox"
            name="aggrement"
            id="aggrement"
            className="cursor-pointer rounded-sm text-primary focus:ring-0"
          />
          <label
            htmlFor="aggrement"
            className="ml-3 cursor-pointer text-gray-600"
            dangerouslySetInnerHTML={{
              __html: dict.auth.register.termsCondition,
            }}
          ></label>
        </div>
      </div>
      <div className="mt-4">
        <button
          type="submit"
          className="block w-full rounded border border-primary bg-primary py-2 text-center font-roboto font-medium uppercase text-white transition hover:bg-transparent hover:text-primary"
        >
          {dict.auth.register.btnText}
        </button>
      </div>
    </form>
  );
}
