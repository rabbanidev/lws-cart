'use server';

import { redirect } from 'next/navigation';
import envConfig from '../../config/envConfig';
import { loginSchema, registerSchema } from '../../lib/zod';
import { signIn } from '@/auth';
import { AuthError } from 'next-auth';

export const register = async (_prevState: unknown, formData: FormData) => {
  let isRedirect = false;

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

    // TODO: Register user API call
    const res = await fetch(`${envConfig.client_uri}/api/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });
    const data = await res.json();

    if (res.status === 201) {
      isRedirect = true;
    }

    return {
      error: data?.message || 'Something went wrong!',
    };
  } catch (error: unknown) {
    isRedirect = false;

    if (error instanceof Error) {
      return {
        error: error.message || 'Something went wrong!',
      };
    }
  } finally {
    if (isRedirect) {
      redirect(`/${formData.get('lang')}/login`);
    }
  }
};

export const login = async (_prevState: unknown, formData: FormData) => {
  try {
    const user = {
      email: formData.get('email'),
      password: formData.get('password'),
    };
    const validatedFields = loginSchema.safeParse(user);
    if (!validatedFields.success) {
      return {
        errors: validatedFields.error.flatten().fieldErrors,
      };
    }

    await signIn('credentials', {
      ...user,
      redirectTo: '/',
    });

    return undefined;
  } catch (error: unknown) {
    if (error instanceof AuthError) {
      // TODO: Error handling
      switch (error.type) {
        case 'CredentialsSignin':
          return { error: 'Invalid credentials!' };
        default:
          return { error: 'Something went wrong!' };
      }
    }
    throw error;
  }
};
