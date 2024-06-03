import mongoose, { Schema } from 'mongoose';
import { Address as IAddress } from '../types/index';

const addressSchema = new Schema<IAddress>(
  {
    shipping: {
      name: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
      },
      contactNumber: {
        type: String,
        required: true,
      },
      streetAddress: {
        type: String,
        required: true,
      },
      city: {
        type: String,
        required: true,
      },
      country: {
        type: String,
        required: true,
      },
    },
    delivery: {
      name: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
      },
      contactNumber: {
        type: String,
        required: true,
      },
      streetAddress: {
        type: String,
        required: true,
      },
      city: {
        type: String,
        required: true,
      },
      country: {
        type: String,
        required: true,
      },
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const Address =
  mongoose.models.Address ?? mongoose.model<IAddress>('Address', addressSchema);

export default Address;
