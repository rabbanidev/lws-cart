import { User } from './user';
import { Product } from './product';

export type Review = {
  id: string;
  user: User;
  product: Product;
  text: string;
};
