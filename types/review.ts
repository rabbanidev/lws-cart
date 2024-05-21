import { Types } from 'mongoose';
import { User } from './user';
import { Product } from './product';

export type Review = {
  id: string;
  user: Types.ObjectId | User;
  product: Types.ObjectId | Product;
  text: string;
};
