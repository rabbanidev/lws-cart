/* eslint-disable @typescript-eslint/no-explicit-any */

import { checkoutSchema } from '../../lib/zod';

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

  try {
    // return {
    //   status: response.status,
    //   message: result.message || 'Failed to create order!',
    // };
  } catch (error: any) {
    return {
      status: 500,
      message: error.message,
    };
  }
};
