import mongoose, { Schema } from 'mongoose';
import { Category as ICategory } from '../types/index';

const categorySchema = new Schema<ICategory>(
  {
    name: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    icon: {
      type: String,
    },
    image: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

const Category =
  mongoose.models.Category ??
  mongoose.model<ICategory>('Category', categorySchema);

export default Category;
