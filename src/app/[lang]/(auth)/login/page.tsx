import LoginForm from '@/components/auth/LoginForm';
import SocialLogin from '@/components/auth/SocialLogin';
import LwsLink from '@/components/shared/LwsLink';
import { Locale } from '@/i18n.config';
import { getDictionary } from '../../../../../lib/dictionaries';

type Props = {
  params: {
    lang: Locale;
  };
};

export default async function LoginPage({ params: { lang } }: Props) {
  const dict = await getDictionary(lang);

  return (
    <div className="container py-16">
      <div className="mx-auto max-w-lg overflow-hidden rounded px-6 py-7 shadow">
        <h2 className="mb-1 text-2xl font-medium uppercase">
          {dict.auth.login.title}
        </h2>
        <p className="mb-6 text-sm text-gray-600">
          {dict.auth.login.shortDescription}
        </p>
        <LoginForm lang={lang} dict={dict} />
        <SocialLogin dict={dict} />
        <p className="mt-4 text-center text-gray-600">
          {dict.auth.login.noAccount}{' '}
          <LwsLink lang={lang} href="/register" className="text-primary">
            {dict.auth.login.registerNow}
          </LwsLink>
        </p>
      </div>
    </div>
  );
}
