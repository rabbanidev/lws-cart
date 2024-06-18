/* eslint-disable @typescript-eslint/no-explicit-any */

'use server';

import { auth } from '@/auth';
import { checkoutSchema } from '../../lib/zod';
import envConfig from '../../config/envConfig';
import { revalidateTag } from 'next/cache';

export const placeOrder = async (_prevState: any, formData: FormData) => {
  const address = {
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

  const validatedFields = checkoutSchema.safeParse(address);
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.errors,
    };
  }

  const payload = {
    address,
    orderItems: formData.get('orderItems'),
    subTotal: formData.get('subTotal'),
    shipping: formData.get('shipping'),
    total: formData.get('total'),
  };

  try {
    const session = await auth();

    const response = await fetch(`${envConfig.client_uri}/api/order`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${session?.backendTokens.accessToken}`,
      },
      body: JSON.stringify({
        ...payload,
        subTotal: Number(payload.subTotal),
        shipping: Number(payload.shipping),
        total: Number(payload.total),
        orderItems: JSON.parse(payload.orderItems as string),
      }),
    });
    const result = await response.json();

    console.log('result', response.status, result);

    if (response.status === 201) {
      revalidateTag('cart');
      return {
        order: result.order,
        status: 201 || response.status,
        message: result.message,
      };
    }

    return {
      order: result.order,
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
