/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */

import NextAuth from 'next-auth';
import { JWT } from 'next-auth/jwt';

declare module 'next-auth' {
  interface Session {
    user: { id: string; email: string; name: string; image?: string };
    backendTokens: {
      accessToken: string;
      refreshToken: string;
      expireIn: string;
    };

    error?: 'RefreshAccessTokenError';
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    user: { id: string; email: string; name: string; image?: string };
    backendTokens: {
      accessToken: string;
      refreshToken: string;
      expireIn: string;
    };
  }
}
