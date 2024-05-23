import { Locale } from '@/i18n.config';
import LwsLink from '@/components/shared/LwsLink';
import Signout from '@/components/auth/Signout';
import { getDictionary } from '../../../lib/dictionaries';
import { auth } from '@/auth';

type Props = {
  lang: Locale;
};

export default async function AuthPannel({ lang }: Props) {
  const { navbar } = await getDictionary(lang);
  const session = await auth();

  // console.log('sess', session);

  return (
    <>
      {session?.user ? (
        <Signout lang={lang} user={session.user} />
      ) : (
        // <Signout lang={lang} user={session.user} />
        <LwsLink
          lang={lang}
          href="/login"
          className="text-gray-200 transition hover:text-white"
        >
          {navbar.loginRegister}
        </LwsLink>
      )}
    </>
  );
}
