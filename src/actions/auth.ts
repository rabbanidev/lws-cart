'use server';

import envConfig from '../../config/envConfig';
import { registerSchema } from '../../lib/zod';

export const register = async (_prevState: unknown, formData: FormData) => {
  try {
    const user = {
      name: formData.get('name'),
      email: formData.get('email'),
      password: formData.get('password'),
      confirmPassword: formData.get('confirmPassword'),
    };

    const validatedFields = registerSchema.safeParse(user);

    if (!validatedFields.success) {
      return {
        errors: validatedFields.error.flatten().fieldErrors,
      };
    }

    const res = await fetch(`${envConfig.client_uri}/api/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });

    const data = await res.json();

    if (res.status === 201) {
      // Create user done
    } else {
      return {
        error: data?.message || 'Something went wrong!',
      };
    }

    // const registerUser = await createUser(user);

    // return {
    //   message: 'User registered successfully!',
    //   user: registerUser,
    // };
  } catch (error: unknown) {
    if (error instanceof Error) {
      return {
        error: error.message || 'Something went wrong!',
      };
    }
  }
};
