import { Category } from './category';
import { Size } from './size';
import { Color } from './color';
import { Types } from 'mongoose';
import { Review } from './review';

export type Product = {
  id: string;
  name: string;
  categories: Types.ObjectId[] | Category[];
  price: number;
  discountPrice?: number;
  images: string[];
  brand: string;
  sku?: string | number;
  availability: 'In Stock' | 'Out Stock';
  shortDescription?: string;
  description?: string;
  sizes: Types.ObjectId[] | Size[];
  colors: Types.ObjectId[] | Color[];
  stock: number;
  soldCounts?: number;
  rating: number;
  reviews?: Types.ObjectId[] | Review[];
};
