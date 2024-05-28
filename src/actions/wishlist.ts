/* eslint-disable @typescript-eslint/no-explicit-any */
'use server';

import { auth } from '@/auth';
import envConfig from '../../config/envConfig';
import { WishlistItem } from '../../types/index';
import { revalidateTag } from 'next/cache';

export const createOrRemoveWishlistItemAction = async (
  productId: string,
): Promise<{ message: string; status: number }> => {
  try {
    const session = await auth();
    const response = await fetch(`${envConfig.client_uri}/api/wishlist`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${session?.backendTokens.accessToken}`,
      },
      body: JSON.stringify({ productId }),
    });
    const result = await response.json();

    if (response.status === 201) {
      revalidateTag('wishlist');
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

export const getWishlistItemsAction = async (): Promise<{
  status: number;
  message?: string;
  items?: WishlistItem[];
}> => {
  try {
    const session = await auth();
    const response = await fetch(`${envConfig.client_uri}/api/wishlist`, {
      next: { tags: ['wishlist'] },
      method: 'GET',
      headers: {
        Authorization: `Bearer ${session?.backendTokens.accessToken}`,
      },
    });
    const result = await response.json();

    return {
      status: response.status,
      items: result.items,
      message: result.message,
    };
  } catch (error: any) {
    return {
      status: 500,
      message: error.message,
    };
  }
};
