/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { Locale } from '@/i18n.config';
import { Dictionary, User as IUser } from '../../../types/index';
import { updateUserAccount } from '@/actions/user';
import ErrorMessage from '../UI/Error';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

type Props = {
  lang: Locale;
  dict: Dictionary;
  user?: IUser;
};

export default function AccountForm({ lang, dict, user }: Props) {
  const session = useSession();
  const [errorMessage, setErrorMessage] = useState('');
  const [pending, setPending] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const user = {
      name: formData.get('name'),
      email: formData.get('email'),
      contactNumber: formData.get('contactNumber'),
      image: formData.get('image'),
    };

    setPending(true);
    try {
      const res = await updateUserAccount(user as IUser);
      if (res.status === 200) {
        // TODO: Update Session
        session.update({ user: { ...res.user, s: 'a' } });
        console.log('updated');
        router.refresh();
      } else {
        setErrorMessage(res.message);
      }
    } catch (error: any) {
      setErrorMessage(error.message);
    } finally {
      setPending(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-2 block text-gray-600">
            {dict.account.form.name}
          </label>
          <input
            type="text"
            name="name"
            id="name"
            className="block w-full rounded border border-gray-300 px-4 py-3 text-sm text-gray-600 placeholder-gray-400 focus:border-primary focus:ring-0"
            required={true}
            defaultValue={user?.name}
          />
        </div>
        <div>
          <label htmlFor="email" className="mb-2 block text-gray-600">
            {dict.account.form.email}
          </label>
          <input
            type="email"
            name="email"
            id="email"
            className="block w-full rounded border border-gray-300 px-4 py-3 text-sm text-gray-600 placeholder-gray-400 focus:border-primary focus:ring-0"
            required={true}
            defaultValue={user?.email}
          />
        </div>
        <div>
          <label htmlFor="contactNumber" className="mb-2 block text-gray-600">
            {dict.account.form.contactNumber}
          </label>
          <input
            type="text"
            name="contactNumber"
            id="contactNumber"
            className="block w-full rounded border border-gray-300 px-4 py-3 text-sm text-gray-600 placeholder-gray-400 focus:border-primary focus:ring-0"
            defaultValue={user?.contactNumber}
          />
        </div>
        <div>
          <label htmlFor="image" className="mb-2 block text-gray-600">
            {dict.account.form.image}
          </label>
          <input
            type="text"
            name="image"
            id="image"
            className="block w-full rounded border border-gray-300 px-4 py-3 text-sm text-gray-600 placeholder-gray-400 focus:border-primary focus:ring-0"
            defaultValue={user?.image}
          />
        </div>
      </div>
      <button
        type="submit"
        className="mt-5 block cursor-pointer rounded border border-primary bg-primary px-8 py-2 text-center font-roboto font-medium uppercase text-white transition hover:bg-transparent hover:text-primary"
        disabled={pending}
      >
        {lang === 'en' && pending
          ? 'Loading...'
          : lang === 'bn' && pending
            ? 'লোডিং...'
            : dict.account.form.submitBtnText}
      </button>

      {errorMessage && (
        <div className="mt-4">
          <ErrorMessage message={errorMessage} />
        </div>
      )}
    </form>
  );
}
