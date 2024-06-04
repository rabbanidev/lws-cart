/* eslint-disable @typescript-eslint/ban-ts-comment */
'use client';

import { User } from 'next-auth';
import { useEffect, useState } from 'react';
import LwsLink from '@/components/shared/LwsLink';
import { Locale } from '@/i18n.config';
import { FaRegUser } from 'react-icons/fa';
import { PiSignOutBold } from 'react-icons/pi';
import { signOut, useSession } from 'next-auth/react';

type Props = {
  lang: Locale;
  user: User;
};

export default function Signout({ lang, user }: Props) {
  const [showManu, setShowManu] = useState<boolean>(false);
  const session = useSession();

  const handleSignout = async () => {
    await signOut();
  };

  const name = session.data?.user ? session.data?.user.name : user?.name;

  useEffect(() => {
    //@ts-ignore
    if (session?.data.error === 'RefreshAccessTokenError') {
      signOut();
    }
  }, [session]);

  return (
    <div className="flex items-center gap-4 text-white">
      <div className="relative">
        <button
          className="flex items-center gap-2"
          onClick={() => setShowManu(!showManu)}
        >
          <span className="text-lg font-medium">{name}</span>
        </button>

        {showManu && (
          <div className="absolute right-0 top-[51px] z-10 mt-2 w-36 divide-y divide-dashed rounded-b-md bg-white py-2 shadow-md lg:top-[43px]">
            <li className="flex cursor-pointer items-center gap-2 rounded-md p-2 text-black hover:bg-gray-100">
              <LwsLink
                lang={lang}
                href="/account"
                className="flex w-full items-center gap-x-2"
              >
                <FaRegUser width={20} height={20} />
                Account
              </LwsLink>
            </li>
            <li className="flex w-full cursor-pointer items-center gap-x-2 rounded-md p-2 text-black hover:bg-gray-100">
              <PiSignOutBold width={20} height={20} />
              <button onClick={handleSignout}>Signout</button>
            </li>
          </div>
        )}
      </div>
    </div>
  );
}
