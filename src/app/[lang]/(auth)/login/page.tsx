import LoginForm from '@/components/auth/LoginForm';
import SocialLogin from '@/components/auth/SocialLogin';
import LwsLink from '@/components/shared/LwsLink';
import { Locale } from '@/i18n.config';
import { getDictionary } from '../../../../../lib/dictionaries';
import { generateNextUrl } from '../../../../../utils/url';
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

  let nextUrl = `/register`;

  if (Object.keys(searchParams).length > 0) {
    nextUrl = generateNextUrl(nextUrl, searchParams, 'page');
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
          <LwsLink lang={lang} href={nextUrl} className="text-primary">
            {dict.auth.login.registerNow}
          </LwsLink>
        </p>
      </div>
    </div>
  );
}
