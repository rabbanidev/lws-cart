import RegisterForm from '@/components/auth/RegisterForm';
import SocialLogin from '@/components/auth/SocialLogin';
import LwsLink from '@/components/shared/LwsLink';
import { Locale } from '@/i18n.config';
import { getDictionary } from '../../../../../lib/dictionaries';
import { Suspense } from 'react';

type Props = {
  params: {
    lang: Locale;
  };
};

export default async function RegisterPage({ params: { lang } }: Props) {
  const dict = await getDictionary(lang);

  return (
    <div className="contain py-16">
      <div className="mx-auto max-w-lg overflow-hidden rounded px-6 py-7 shadow">
        <h2 className="mb-1 text-2xl font-medium uppercase">
          {dict.auth.register.title}
        </h2>
        <p className="mb-6 text-sm text-gray-600">
          {dict.auth.register.shortDescription}
        </p>

        <Suspense>
          <RegisterForm lang={lang} dict={dict} />
        </Suspense>
        <Suspense>
          <SocialLogin dict={dict} lang={lang} />
        </Suspense>

        <p className="mt-4 text-center text-gray-600">
          {dict.auth.register.noAccount}{' '}
          <LwsLink lang={lang} href="/login" className="text-primary">
            {dict.auth.register.loginNow}
          </LwsLink>
        </p>
      </div>
    </div>
  );
}
