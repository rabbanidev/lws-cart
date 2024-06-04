import mongoose, { Schema } from 'mongoose';
import { Order as IOrder } from '../types/index';

const orderSchema = new Schema<IOrder>(
  {
    user: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: true,
    },

    invoiceId: {
      type: String,
      required: true,
    },

    invoiceDate: {
      type: String,
      required: true,
    },

    address: {
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
    },

    orderItems: [
      {
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
        subTotal: {
          type: Number,
          required: true,
        },
      },
    ],

    subTotal: {
      type: Number,
      required: true,
    },
    shipping: {
      type: Number,
      default: 0,
    },
    total: {
      type: Number,
      required: true,
    },
    invoiceUrl: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const Order =
  mongoose.models.Order ?? mongoose.model<IOrder>('Order', orderSchema);

export default Order;
