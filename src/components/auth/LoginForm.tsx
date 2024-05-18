'use client';

import { Locale } from '@/i18n.config';
import { Dictionary } from '../../../types';
import { useFormState } from 'react-dom';
import { login } from '@/actions/auth';
import ErrorMessage from '@/components/UI/Error';
import SubmitButton from '@/components/UI/SubmitButton';

type Props = {
  lang: Locale;
  dict: Dictionary;
};

export default function LoginForm({ lang, dict }: Props) {
  const [state, formAction] = useFormState(login, null);

  const { email = [], password = [] } = state?.errors || {};

  return (
    <form action={formAction} autoComplete="off">
      <div className="space-y-2">
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
      </div>
      <div className="mt-6 flex items-center justify-between">
        <div className="flex items-center">
          <input
            type="checkbox"
            name="remember"
            id="remember"
            className="cursor-pointer rounded-sm text-primary focus:ring-0"
          />
          <label
            htmlFor="remember"
            className="ml-3 cursor-pointer text-gray-600"
          >
            {dict.auth.login.remberMe}
          </label>
        </div>
        <a href="#" className="text-primary">
          {dict.auth.forgotPassword.title}
        </a>
      </div>

      <div className="mt-4">
        <SubmitButton
          lang={lang}
          className="block w-full rounded border border-primary bg-primary py-2 text-center font-roboto font-medium uppercase text-white transition hover:bg-transparent hover:text-primary"
        >
          {dict.auth.login.btnText}
        </SubmitButton>

        {state?.error && (
          <div className="mt-4">
            <ErrorMessage message={state.error} />
          </div>
        )}
      </div>
    </form>
  );
}
