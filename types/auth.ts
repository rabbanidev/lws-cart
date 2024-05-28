export type AuthSession = {
  user: { id: string; email: string; name: string; image?: string };
  backendTokens: { accessToken: string; refreshToken: string };
};
