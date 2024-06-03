/* eslint-disable @typescript-eslint/no-explicit-any */
'use server';

import { auth } from '@/auth';
import envConfig from '../../config/envConfig';
import { revalidateTag } from 'next/cache';

export const getUserAddressAction = async () => {
  try {
    const session = await auth();
    const response = await fetch(`${envConfig.client_uri}/api/user/address`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${session?.backendTokens.accessToken}`,
      },
    });
    const result = await response.json();

    return {
      address: result.address,
      status: response.status,
      message: result.message || 'Fetched to failed address!',
    };
  } catch (error: any) {
    return {
      error,
      status: 500,
      message: error.message,
    };
  }
};

export const createOrRemoveAddressAction = async (
  _prevState: any,
  formData: FormData,
): Promise<{ message: string; status: number }> => {
  try {
    const payload = {
      shipping: {
        name: formData.get('shipping.name'),
        email: formData.get('shipping.email'),
        contactNumber: formData.get('shipping.contactNumber'),
        streetAddress: formData.get('shipping.streetAddress'),
        city: formData.get('shipping.city'),
        country: formData.get('shipping.country'),
      },
      delivery: {
        name: formData.get('delivery.name'),
        email: formData.get('delivery.email'),
        contactNumber: formData.get('delivery.contactNumber'),
        streetAddress: formData.get('delivery.streetAddress'),
        city: formData.get('delivery.city'),
        country: formData.get('delivery.country'),
      },
    };

    const session = await auth();
    const response = await fetch(`${envConfig.client_uri}/api/user/address`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${session?.backendTokens.accessToken}`,
      },
      body: JSON.stringify(payload),
    });
    const result = await response.json();

    if (response.status === 201) {
      revalidateTag('address');
    }

    return {
      status: response.status,
      message: result.message || 'Failed to create or updated address!',
    };
  } catch (error: any) {
    return {
      status: 500,
      message: error.message,
    };
  }
};
