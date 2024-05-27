export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
  image?: string;
  provider?: 'google' | 'facebook';
};
