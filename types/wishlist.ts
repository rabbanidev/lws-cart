import { Product } from './product';
import { User } from './user';

export type WishlistItem = {
  id: string;
  user: User;
  product: Product;
};
