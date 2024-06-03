/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-explicit-any */

'use server';

import { auth } from '@/auth';
import envConfig from '../../config/envConfig';
import { revalidateTag } from 'next/cache';
import { User as IUser } from '../../types/index';

export const getUserAccount = async () => {
  const session = await auth();
  const response = await fetch(`${envConfig.client_uri}/api/user/account`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${session?.backendTokens.accessToken}`,
    },
    next: { tags: ['user'] },
  });
  const result = await response.json();

  return result.user;
};

export const updateUserAccount = async (
  user: Partial<IUser>,
): Promise<{
  message: string;
  status?: number;
  user?: IUser;
}> => {
  try {
    const session = await auth();

    const response = await fetch(`${envConfig.client_uri}/api/user/account`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${session?.backendTokens.accessToken}`,
      },
      body: JSON.stringify(user),
    });
    const result = await response.json();

    if (response.status === 200) {
      revalidateTag('user');

      return {
        status: 200,
        message: '',
        user: result.user,
      };
    }

    return {
      status: response.status,
      message: result.message,
    };
  } catch (error: any) {
    return {
      status: 500,
      message: error.message,
    };
  }
};
