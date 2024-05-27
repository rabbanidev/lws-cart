import mongoose, { Schema } from 'mongoose';
import { Size as ISize } from '../types/index';

const sizeSchema = new Schema<ISize>(
  {
    title: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const Size = mongoose.models.Size ?? mongoose.model<ISize>('Size', sizeSchema);

export default Size;
