import mongoose, { Schema, Types } from 'mongoose';
import { Product as IProduct } from '../types/index';

const productSchema = new Schema<IProduct>(
  {
    name: {
      type: String,
      required: true,
    },
    categories: [
      {
        type: Types.ObjectId,
        ref: 'Category',
        required: true,
      },
    ],
    price: {
      type: Number,
      min: 1,
      required: true,
    },
    discountPrice: {
      type: Number,
      min: 1,
    },
    images: {
      type: [String],
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    sku: {
      type: Schema.Types.Mixed,
    },
    availability: {
      type: String,
      enum: ['In Stock', 'Out Stock'],
      default: 'In Stock',
    },
    shortDescription: {
      type: String,
    },
    description: {
      type: String,
    },
    sizes: [
      {
        type: Types.ObjectId,
        ref: 'Size',
        required: true,
      },
    ],
    colors: [
      {
        type: Types.ObjectId,
        ref: 'Color',
        required: true,
      },
    ],
    stock: {
      type: Number,
      min: 1,
      required: true,
    },
    soldCounts: {
      type: Number,
      default: 0,
    },
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    reviews: [
      {
        type: Types.ObjectId,
        ref: 'Review',
      },
    ],
  },
  {
    timestamps: true,
  },
);

const Product =
  mongoose.models.Product ?? mongoose.model<IProduct>('Product', productSchema);

export default Product;
