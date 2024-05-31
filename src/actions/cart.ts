/* eslint-disable @typescript-eslint/no-explicit-any */
'use server';

import { auth } from '@/auth';
import envConfig from '../../config/envConfig';
import { Cart as ICart } from '../../types/index';
import { revalidateTag } from 'next/cache';

export const addToCartAction = async (
  productId: string,
  quantity: number,
  selectedColor: string,
  selectedSize: string,
): Promise<{ message: string; status: number }> => {
  try {
    const session = await auth();
    const response = await fetch(`${envConfig.client_uri}/api/cart`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${session?.backendTokens.accessToken}`,
      },
      body: JSON.stringify({
        productId,
        quantity,
        selectedColor,
        selectedSize,
      }),
    });
    const result = await response.json();

    if (response.status === 201) {
      revalidateTag('cart');
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

export const getFromCartsAction = async (): Promise<{
  status: number;
  message?: string;
  items?: ICart[];
}> => {
  try {
    const session = await auth();
    const response = await fetch(`${envConfig.client_uri}/api/cart`, {
      next: { tags: ['cart'] },
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

export const updateQuantityAction = async (
  cartItemId: string,
  productId: string,
  type: 'increase' | 'decrease',
): Promise<{ message: string; status: number }> => {
  try {
    const session = await auth();
    const response = await fetch(
      `${envConfig.client_uri}/api/cart/qty-increase-decrease`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${session?.backendTokens.accessToken}`,
        },
        body: JSON.stringify({
          cartItemId,
          productId,
          type,
        }),
      },
    );
    const result = await response.json();

    if (response.status === 200) {
      revalidateTag('cart');
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

export const removeCartItemAction = async (
  cartItemId: string,
): Promise<{ message: string; status: number }> => {
  try {
    const session = await auth();
    const response = await fetch(`${envConfig.client_uri}/api/cart`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${session?.backendTokens.accessToken}`,
      },
      body: JSON.stringify({
        cartItemId,
      }),
    });
    const result = await response.json();

    if (response.status === 200) {
      revalidateTag('cart');
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
