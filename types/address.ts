import { User } from './user';

export type CommonAddress = {
  name: string;
  email: string;
  contactNumber: string;
  streetAddress: string;
  city: string;
  country: string;
};

export type Address = {
  id: string;
  user: User;
  shipping: CommonAddress;
  delivery: CommonAddress;
};
