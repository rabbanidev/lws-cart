import { CommonAddress } from './address';
import { Color } from './color';
import { Product } from './product';
import { Size } from './size';
import { User } from './user';

export type OrderItem = {
  product: Product;
  quantity: number;
  selectedColor: Color;
  selectedSize: Size;
  subTotal: number;
};

export type Order = {
  id: string;
  invoiceId: string;
  invoiceDate: string;
  user: User;
  address: {
    shipping: CommonAddress;
    delivery: CommonAddress;
  };
  orderItems: OrderItem[];
  subTotal: number;
  shipping: number;
  total: number;
  invoiceUrl: string;
};
