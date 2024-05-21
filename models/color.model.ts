import mongoose, { Schema } from 'mongoose';
import { Color as IColor } from '../types';

const colorSchema = new Schema<IColor>(
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

const Color =
  mongoose.models.Color ?? mongoose.model<IColor>('Color', colorSchema);

export default Color;
