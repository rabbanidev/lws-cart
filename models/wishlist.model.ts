import mongoose, { Schema } from 'mongoose';
import { WishlistItem } from '../types/index';

const wishlistSchema = new Schema<WishlistItem>(
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
  },
  {
    timestamps: true,
  },
);

const Wishlist =
  mongoose.models.Wishlist ??
  mongoose.model<WishlistItem>('Wishlist', wishlistSchema);

export default Wishlist;
