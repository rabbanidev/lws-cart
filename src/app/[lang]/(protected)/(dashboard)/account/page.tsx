import { Locale } from '@/i18n.config';
import { Dictionary } from '../../../../../../types/index';
import { getDictionary } from '../../../../../../lib/dictionaries';
import AccountForm from '@/components/account/AccountForm';
import { getUserAccount } from '@/actions/user';

type Props = {
  params: {
    lang: Locale;
  };
};

export default async function AccountPage({ params: { lang } }: Props) {
  const dict: Dictionary = await getDictionary(lang);
  const user = await getUserAccount();

  return (
    <div>
      <h3 className="text-2xl font-medium uppercase leading-4 tracking-wider text-gray-600">
        {dict.account.title}
      </h3>
      <AccountForm lang={lang} dict={dict} user={user} />
    </div>
  );
}
