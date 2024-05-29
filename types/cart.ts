import { Color } from './color';
import { Product } from './product';
import { Size } from './size';
import { User } from './user';

export type Cart = {
  id: string;
  user: User;
  product: Product;
  quantity: number;
  selectedColor: Color;
  selectedSize: Size;
};
