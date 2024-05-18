import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { getUserByEmail } from '../services/user.service';
import { comparePassword } from '../lib/bcrypt';

export const { handlers, signIn, signOut, auth } = NextAuth({
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

        // TODO: Get user from DB
        const user = await getUserByEmail(email);

        if (!user || !user.password) {
          return null;
        }
        const isPasswordMatched = await comparePassword(
          password,
          user.password,
        );
        if (isPasswordMatched) {
          return user;
        }

        return null;
      },
    }),
  ],
});
