'use server';

import envConfig from '../../config/envConfig';
import { loginSchema, registerSchema } from '../../lib/zod';
import { signIn } from '@/auth';
import { AuthError } from 'next-auth';
import { redirect } from 'next/navigation';

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
    } else {
      isRedirect = false;
      return {
        error: data?.message || 'Something went wrong!',
      };
    }
  } catch (error: unknown) {
    isRedirect = false;
    if (error instanceof Error) {
      return {
        error: error.message || 'Something went wrong!',
      };
    }
  } finally {
    if (isRedirect) {
      redirect(formData.get('redirectTo') as string);
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
      redirectTo: formData.get('redirectTo') as string,
    });

    return { message: 'success' };
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

export const googleSignin = async (_prevState: unknown, formData: FormData) => {
  await signIn('google', { redirectTo: formData.get('redirectTo') as string });
};

export const facebookSignin = async (
  _prevState: unknown,
  formData: FormData,
) => {
  await signIn('facebook', {
    redirectTo: formData.get('redirectTo') as string,
  });
};
