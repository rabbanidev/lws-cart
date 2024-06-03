import { Locale } from '@/i18n.config';
import LwsLink from '@/components/shared/LwsLink';
import Signout from '@/components/auth/Signout';
import { Dictionary, User } from '../../../types/index';

type Props = {
  lang: Locale;
  dict: Dictionary;
  user?: User;
};

export default async function AuthPannel({ lang, dict, user }: Props) {
  return (
    <>
      {user ? (
        <Signout lang={lang} user={user} />
      ) : (
        <LwsLink
          lang={lang}
          href="/login"
          className="text-gray-200 transition hover:text-white"
        >
          {dict.navbar.loginRegister}
        </LwsLink>
      )}
    </>
  );
}
