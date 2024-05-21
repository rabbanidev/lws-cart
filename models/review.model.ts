import mongoose, { Schema } from 'mongoose';
import { Review as IReview } from '../types';

const reviewSchema = new Schema<IReview>(
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
    text: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const Review =
  mongoose.models.Review ?? mongoose.model<IReview>('Review', reviewSchema);

export default Review;
