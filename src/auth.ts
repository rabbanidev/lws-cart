/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */

import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import FacebookProvider from 'next-auth/providers/facebook';
import GoogleProvider from 'next-auth/providers/google';
import envConfig from '../config/envConfig';

const socialSignin = async (
  account: { provider: string },
  user: any,
): Promise<Response> => {
  const response = await fetch(
    `${envConfig.client_uri}/api/auth/signin/social`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: user.name,
        email: user.email,
        provider: account.provider,
      }),
    },
  );
  return response;
};

export const { handlers, signIn, signOut, auth } = NextAuth({
  trustHost: true,
  secret: envConfig.auth.secret,
  pages: {
    signIn: '/login',
  },

  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        const email = credentials.email as string | undefined;
        const password = credentials.password as string | undefined;

        if (!email || !password) return null;

        const response = await fetch(
          `${envConfig.client_uri}/api/auth/signin`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
          },
        );

        const result = await response.json();

        if (response.status === 200 && result.user) {
          return result;
        }

        return null;
      },
    }),
    GoogleProvider({
      clientId: envConfig.auth.google_client_id,
      clientSecret: envConfig.auth.google_client_secret,
    }),
    FacebookProvider({
      clientId: envConfig.auth.facebook_client_id,
      clientSecret: envConfig.auth.facebook_client_secret,
    }),
  ],

  callbacks: {
    async signIn({ account, user }) {
      if (
        account &&
        (account.provider === 'google' || account.provider === 'facebook') &&
        user.email
      ) {
        const response = await socialSignin(account, user);
        const result = await response.json();

        if (response.status === 200 && result.user) {
          // @ts-ignore
          user.user = result.user;
          // @ts-ignore
          user.backendTokens = result.backendTokens;
          return true;
        } else {
          return false;
        }
      }
      return true;
    },

    async jwt({ token, user, account, trigger, session }) {
      if (account) {
        // TODO: Save the access token and refresh token in the JWT on the initial login
        return {
          ...token,
          ...user,
        };
      }

      // TODO: Update session
      if (trigger === 'update') {
        token.user = session?.user || token.user;
        token.backendTokens = session?.backendTokens || token.backendTokens;
      }
      return token;
    },

    async session({ token, session }) {
      session.error = token.error as 'RefreshAccessTokenError';

      // @ts-ignore
      session.user = token.user;
      session.backendTokens = token.backendTokens;

      return session;
    },
  },
});
