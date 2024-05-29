import mongoose, { Schema } from 'mongoose';
import { Cart as ICart } from '../types/index';

const cartSchema = new Schema<ICart>(
  {
    user: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    product: {
      type: mongoose.Types.ObjectId,
      ref: 'Product',
      required: true,
    },
    quantity: {
      type: Number,
      min: 1,
      required: true,
    },
    selectedColor: {
      type: mongoose.Types.ObjectId,
      ref: 'Color',
      required: true,
    },
    selectedSize: {
      type: mongoose.Types.ObjectId,
      ref: 'Size',
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const Cart = mongoose.models.Cart ?? mongoose.model<ICart>('Cart', cartSchema);

export default Cart;
