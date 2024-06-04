'use client';

import { useFormState } from 'react-dom';
import { Dictionary } from '../../../types/index';
import { register } from '@/actions/auth';
import ErrorMessage from '@/components/UI/Error';
import SubmitButton from '@/components/UI/SubmitButton';
import { Locale } from '@/i18n.config';
import { useSearchParams } from 'next/navigation';
import { generateNextUrl } from '../../../utils/url';

type Props = {
  lang: Locale;
  dict: Dictionary;
};

export default function RegisterForm({ lang, dict }: Props) {
  const [state, formAction] = useFormState(register, null);
  const searchParams = useSearchParams();

  const {
    name = [],
    email = [],
    password = [],
    confirmPassword = [],
  } = state?.errors || {};

  let nextUrl = `/${lang}/login`;
  nextUrl = generateNextUrl(nextUrl, searchParams);

  const handleAction = (formData: FormData) => {
    formData.append('redirectTo', nextUrl);
    formAction(formData);
  };

  return (
    <form action={handleAction} autoComplete="off">
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
          {name?.length > 0 && <ErrorMessage message={name[0]} />}
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
          {email?.length > 0 && <ErrorMessage message={email[0]} />}
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
          {password?.length > 0 && <ErrorMessage message={password[0]} />}
        </div>
        <div>
          <label htmlFor="confirmPassword" className="mb-2 block text-gray-600">
            {dict.auth.confirmPassword} <span className="text-primary">*</span>
          </label>
          <input
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            className="block w-full rounded border border-gray-300 px-4 py-3 text-sm text-gray-600 placeholder-gray-400 focus:border-primary focus:ring-0"
            placeholder="*******"
          />
          {confirmPassword?.length > 0 && (
            <ErrorMessage message={confirmPassword[0]} />
          )}
        </div>
      </div>
      <div className="mt-6">
        <div className="flex items-center">
          <input
            type="checkbox"
            name="aggrement"
            id="aggrement"
            className="cursor-pointer rounded-sm text-primary focus:ring-0"
            required={true}
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
        <SubmitButton
          lang={lang}
          className="block w-full rounded border border-primary bg-primary py-2 text-center font-roboto font-medium uppercase text-white transition hover:bg-transparent hover:text-primary"
        >
          {dict.auth.register.btnText}
        </SubmitButton>
      </div>
      {state?.error && (
        <div className="mt-4">
          <ErrorMessage message={state.error} />
        </div>
      )}
    </form>
  );
}
