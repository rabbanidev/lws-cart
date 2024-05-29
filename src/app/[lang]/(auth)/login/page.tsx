import LoginForm from '@/components/auth/LoginForm';
import SocialLogin from '@/components/auth/SocialLogin';
import LwsLink from '@/components/shared/LwsLink';
import { Locale } from '@/i18n.config';
import { getDictionary } from '../../../../../lib/dictionaries';
import { redirectUrl, removeLanguagePrefix } from '../../../../../utils/url';
import { Suspense } from 'react';

type Props = {
  params: {
    lang: Locale;
  };
  searchParams: {
    [key: string]: string;
  };
};

export default async function LoginPage({
  params: { lang },
  searchParams,
}: Props) {
  const dict = await getDictionary(lang);

  let redirectTo = `/register`;

  if (Object.keys(searchParams).length > 0) {
    if (searchParams.next) {
      redirectTo += `?next=${removeLanguagePrefix(searchParams.next)}`;
    }

    redirectTo = redirectUrl(redirectTo, searchParams, 'page');

    // if (searchParams.id) {
    //   href += `&id=${searchParams.id}`;
    // }
    // if (searchParams.qty) {
    //   href += `&qty=${searchParams.qty}`;
    // }
  }

  return (
    <div className="container py-16">
      <div className="mx-auto max-w-lg overflow-hidden rounded px-6 py-7 shadow">
        <h2 className="mb-1 text-2xl font-medium uppercase">
          {dict.auth.login.title}
        </h2>
        <p className="mb-6 text-sm text-gray-600">
          {dict.auth.login.shortDescription}
        </p>
        <Suspense>
          <LoginForm lang={lang} dict={dict} />
        </Suspense>
        <Suspense>
          <SocialLogin dict={dict} lang={lang} />
        </Suspense>
        <p className="mt-4 text-center text-gray-600">
          {dict.auth.login.noAccount}{' '}
          <LwsLink lang={lang} href={redirectTo} className="text-primary">
            {dict.auth.login.registerNow}
          </LwsLink>
        </p>
      </div>
    </div>
  );
}
