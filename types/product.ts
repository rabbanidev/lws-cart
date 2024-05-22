import { Category } from './category';
import { Size } from './size';
import { Color } from './color';
import { Review } from './review';

export type Product = {
  id: string;
  name: string;
  categories: Category[];
  price: number;
  discountPrice?: number;
  images: string[];
  brand: string;
  sku?: string | number;
  availability: 'In Stock' | 'Out Stock';
  shortDescription?: string;
  description?: string;
  sizes: Size[];
  colors: Color[];
  stock: number;
  soldCounts?: number;
  rating: number;
  reviews?: Review[];
};
